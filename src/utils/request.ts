/**
 * HTTP 基础设施：统一配置 Axios、鉴权请求头、业务响应解包和全局错误提示。
 * 各业务 API 通过本模块导出的 http 方法发起请求，避免重复处理网络细节。
 */
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import i18n from '@/i18n'

// 1. 定义通用后端返回的数据格式接口
export interface ApiResponse<T = unknown> {
  code: number
  message?: string
  msg?: string
  data?: T
}

type ApiSuccessResponse<T> = ApiResponse<T> & { data: T }

const getApiMessage = (response: ApiResponse): string => {
  return response.message || response.msg || ''
}

const hasApiData = <T>(response: ApiResponse<T>): response is ApiSuccessResponse<T> => {
  return Object.prototype.hasOwnProperty.call(response, 'data')
}

// 2. 统一错误消息提示函数（在实际项目中可与 Element Plus / Vant / Ant Design 的 Message/Toast 组件对接）
const showErrorToast = (message: string) => {
  console.error(`[HTTP ERROR]: ${message}`)
  if (typeof window !== 'undefined') {
    // 动态在页面顶部创建一个提示栏，提供流畅的提示体验
    const id = 'custom-http-toast'
    let container = document.getElementById(id)
    if (!container) {
      container = document.createElement('div')
      container.id = id
      container.style.cssText =
        'position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 9999; display: flex; flex-direction: column; gap: 10px; pointer-events: none;'
      document.body.appendChild(container)
    }

    const toast = document.createElement('div')
    toast.style.cssText =
      'background: rgba(255, 77, 79, 0.95); color: #fff; padding: 12px 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-size: 14px; font-weight: 500; text-align: center; transition: all 0.3s ease; opacity: 0; transform: translateY(-20px); pointer-events: auto; max-width: 90vw; word-break: break-all;'
    toast.innerText = message
    container.appendChild(toast)

    // 触发过渡动画
    requestAnimationFrame(() => {
      toast.style.opacity = '1'
      toast.style.transform = 'translateY(0)'
    })

    // 3秒后淡出移除
    setTimeout(() => {
      toast.style.opacity = '0'
      toast.style.transform = 'translateY(-20px)'
      setTimeout(() => {
        toast.remove()
        if (!container.childElementCount) container.remove()
      }, 300)
    }, 3000)
  }
}

let authRedirectTimer: ReturnType<typeof setTimeout> | null = null

const scheduleAuthRedirect = () => {
  if (authRedirectTimer) return
  authRedirectTimer = setTimeout(() => {
    authRedirectTimer = null
    window.location.hash = `#/${i18n.global.locale.value}`
  }, 1000)
}

// 3. 创建 Axios 实例
const service: AxiosInstance = axios.create({
  // 根据 Vite 环境变量自动切换 baseURL
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000, // 请求超时时间：10秒
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

// 4. 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 自动从本地缓存获取 token
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      // 在请求头中挂载 Token，约定使用 Authorization: Bearer <Token> 规范
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 5. 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<unknown>>) => {
    const res = response.data

    // 业务 code 判断，约定 0 为接口正常响应状态码
    if (res.code === 0 || res.code === 200) {
      return response
    }

    // 401 登录失效逻辑
    if (res.code === 401) {
      // 清除本地缓存的无效 token
      localStorage.removeItem('token')
      const message = getApiMessage(res) || i18n.global.t('error.unauthorized')
      showErrorToast(message)
      // 延迟 1 秒后跳转登录页面，让提示框有时间展示
      scheduleAuthRedirect()
      return Promise.reject(new Error(message))
    }

    // 其他业务逻辑错误（例如：账号密码错误、短剧未购买等，code 不为 200 的情况）
    const message = getApiMessage(res) || i18n.global.t('error.business_failed')
    showErrorToast(message)
    return Promise.reject(new Error(message))
  },
  (error) => {
    let message = i18n.global.t('error.network_failed')

    if (error.response) {
      // 根据 HTTP 状态码进行统一的友好提示
      const { status } = error.response
      switch (status) {
        case 400:
          message = i18n.global.t('error.network_failed') + ' (400)'
          break
        case 401:
          localStorage.removeItem('token')
          message = i18n.global.t('error.unauthorized') + ' (401)'
          scheduleAuthRedirect()
          break
        case 403:
          message = i18n.global.t('error.network_failed') + ' (403)'
          break
        case 404:
          message = i18n.global.t('error.network_failed') + ' (404)'
          break
        case 408:
          message = i18n.global.t('error.timeout') + ' (408)'
          break
        case 500:
        case 502:
        case 503:
        case 504:
          message = i18n.global.t('error.server_error') + ` (${status})`
          break
        default:
          message = `${i18n.global.t('error.network_failed')} (${status})`
      }
    } else if (error.message && error.message.includes('timeout')) {
      message = i18n.global.t('error.timeout')
    } else if (typeof window !== 'undefined' && !window.navigator.onLine) {
      message = i18n.global.t('error.timeout')
    } else if (error.message) {
      message = error.message
    }

    showErrorToast(message)
    return Promise.reject(error)
  },
)

// 6. 包装工具导出，利用泛型彻底规范请求方法返回值类型
const unwrapApiData = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
  if (hasApiData(response.data)) return response.data.data
  throw new Error(getApiMessage(response.data) || i18n.global.t('error.business_failed'))
}

export const http = {
  /**
   * 通用请求方法
   */
  request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return service.request<ApiResponse<T>>(config).then(unwrapApiData)
  },

  /**
   * GET 请求
   * @param url 请求路径
   * @param params URL 参数
   * @param config 额外 Axios 配置
   */
  get<T = unknown>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
    return service
      .get<ApiResponse<T>>(url, { params, ...config })
      .then(unwrapApiData)
  },

  /**
   * POST 请求
   * @param url 请求路径
   * @param data 请求体数据
   * @param config 额外 Axios 配置
   */
  post<T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post<ApiResponse<T>>(url, data, config).then(unwrapApiData)
  },

  /**
   * PUT 请求
   * @param url 请求路径
   * @param data 请求体数据
   * @param config 额外 Axios 配置
   */
  put<T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.put<ApiResponse<T>>(url, data, config).then(unwrapApiData)
  },

  /**
   * DELETE 请求
   * @param url 请求路径
   * @param params 附加参数
   * @param config 额外 Axios 配置
   */
  delete<T = unknown>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
    return service
      .delete<ApiResponse<T>>(url, { params, ...config })
      .then(unwrapApiData)
  },
}

export default http
