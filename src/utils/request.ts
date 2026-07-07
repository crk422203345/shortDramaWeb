import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

const TOKEN_STORAGE_KEY = 'token'
const HTTP_OK_CODE = 200
const UNAUTHORIZED_CODE = 401
const TOAST_CONTAINER_ID = 'custom-http-toast'
const TOAST_VISIBLE_DURATION_MS = 3000
const LOGIN_REDIRECT_DELAY_MS = 1000

const statusMessages: Readonly<Record<number, string>> = {
  400: '请求参数错误 (400)',
  401: '您的登录已失效，请重新登录 (401)',
  403: '访问被拒绝，权限不足 (403)',
  404: '请求的接口地址不存在 (404)',
  408: '请求超时，请重试 (408)',
  500: '服务器内部错误 (500)',
  502: '网关错误 (502)',
  503: '服务器正在维护中 (503)',
  504: '网关超时，未能连接上服务器 (504)',
}

const redirectToLogin = (): void => {
  if (typeof window === 'undefined') return

  window.localStorage.removeItem(TOKEN_STORAGE_KEY)
  window.setTimeout(() => {
    window.location.href = '/login'
  }, LOGIN_REDIRECT_DELAY_MS)
}

const getToastContainer = (): HTMLElement | null => {
  if (typeof document === 'undefined') return null

  let container = document.getElementById(TOAST_CONTAINER_ID)
  if (container) return container

  container = document.createElement('div')
  container.id = TOAST_CONTAINER_ID
  container.style.cssText =
    'position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 9999; display: flex; flex-direction: column; gap: 10px; pointer-events: none;'
  document.body.appendChild(container)

  return container
}

const showErrorToast = (message: string): void => {
  console.error(`[HTTP ERROR]: ${message}`)

  const container = getToastContainer()
  if (!container) return

  const toast = document.createElement('div')
  toast.innerText = message
  toast.style.cssText =
    'background: rgba(255, 77, 79, 0.95); color: #fff; padding: 12px 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-size: 14px; font-weight: 500; text-align: center; transition: all 0.3s ease; opacity: 0; transform: translateY(-20px); pointer-events: auto; max-width: 90vw; word-break: break-all;'
  container.appendChild(toast)

  window.requestAnimationFrame(() => {
    toast.style.opacity = '1'
    toast.style.transform = 'translateY(0)'
  })

  window.setTimeout(() => {
    toast.style.opacity = '0'
    toast.style.transform = 'translateY(-20px)'
    window.setTimeout(() => toast.remove(), 300)
  }, TOAST_VISIBLE_DURATION_MS)
}

const getNetworkErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status

    if (status === UNAUTHORIZED_CODE) {
      redirectToLogin()
    }

    if (status) {
      return statusMessages[status] ?? `系统连接异常 (${status})`
    }

    if (error.message.includes('timeout')) {
      return '请求超时，请检查网络状况后重试'
    }
  }

  if (typeof window !== 'undefined' && !window.navigator.onLine) {
    return '当前网络已断开，请检查网络连接'
  }

  return error instanceof Error && error.message ? error.message : '网络请求失败，请稍后重试'
}

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

service.interceptors.request.use((config) => {
  const token =
    typeof window === 'undefined' ? null : window.localStorage.getItem(TOKEN_STORAGE_KEY)

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const result = response.data

    if (result.code === HTTP_OK_CODE) {
      return result.data as unknown as AxiosResponse<ApiResponse>
    }

    if (result.code === UNAUTHORIZED_CODE) {
      showErrorToast('身份验证过期，请重新登录')
      redirectToLogin()
      return Promise.reject(new Error(result.message || 'Unauthorized'))
    }

    showErrorToast(result.message || '业务处理失败')
    return Promise.reject(new Error(result.message || 'Business Error'))
  },
  (error: unknown) => {
    showErrorToast(getNetworkErrorMessage(error))
    return Promise.reject(error)
  },
)

export const http = {
  request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return service(config) as unknown as Promise<T>
  },

  get<T = unknown>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, { params, ...config }) as unknown as Promise<T>
  },

  post<T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config) as unknown as Promise<T>
  },

  put<T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config) as unknown as Promise<T>
  },

  delete<T = unknown>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, { params, ...config }) as unknown as Promise<T>
  },
}

export default http
