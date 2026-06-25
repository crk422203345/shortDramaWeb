import http from '@/utils/request';

// ==========================================
// 1. TypeScript 实体类型定义 (Data Models)
// ==========================================

/**
 * 每一集短剧的信息定义
 */
export interface Episode {
  id: number;
  dramaId: number;
  title: string;       // 单集标题，如 "第一集"
  videoUrl: string;    // 视频播放地址
  duration: number;    // 时长（秒）
  episodeIndex: number;// 集数索引（从1开始）
  isFree: boolean;     // 是否免费播放
}

/**
 * 短剧列表条目定义
 */
export interface DramaItem {
  id: number;
  title: string;       // 短剧名称
  cover: string;       // 封面图 URL
  description: string; // 剧情简介
  category: string;    // 分类（如：都市、爽剧、逆袭、言情）
  episodesCount: number; // 总集数
  playsCount: number;  // 播放量
  rating: number;      // 评分
  status: 'ongoing' | 'finished'; // 状态：连载中 / 已完结
  createTime: string;  // 上架时间
}

/**
 * 短剧详情（包含剧集列表）定义
 */
export interface DramaDetail extends DramaItem {
  episodes: Episode[]; // 剧集列表
  tags: string[];      // 标签列表
}

/**
 * 播放记录实体定义
 */
export interface PlayRecord {
  dramaId: number;     // 短剧ID
  dramaTitle: string;  // 短剧标题
  cover: string;       // 封面图
  episodeIndex: number;// 上次播放的集数
  progressTime: number;// 播放进度（秒）
  updatedTime: string; // 记录更新时间
}

// ==========================================
// 2. 请求与响应参数类型定义 (Request/Response Types)
// ==========================================

/**
 * 获取短剧列表的查询参数
 */
export interface DramaListParams {
  page: number;
  pageSize: number;
  category?: string;   // 可选分类筛选
  keyword?: string;    // 可选关键词搜索
}

/**
 * 短剧列表的分页响应结构
 */
export interface DramaListResponse {
  list: DramaItem[];
  total: number;
}

// ==========================================
// 3. 短剧模块 API 请求函数封装 (API Methods)
// ==========================================

export const dramaApi = {
  /**
   * 分页获取短剧列表
   * @param params 查询参数 (包含 page, pageSize, category, keyword)
   * @returns 包含短剧列表及总条数的数据 Promise
   */
  getDramaList(params: DramaListParams): Promise<DramaListResponse> {
    return http.get<DramaListResponse>('/drama/list', params);
  },

  /**
   * 根据 ID 获取短剧详情（包含分集列表）
   * @param id 短剧 ID
   */
  getDramaDetail(id: number): Promise<DramaDetail> {
    return http.get<DramaDetail>(`/drama/detail/${id}`);
  },

  /**
   * 获取指定短剧的本地/云端历史播放记录
   * @param dramaId 短剧 ID
   */
  getPlayRecord(dramaId: number): Promise<PlayRecord | null> {
    return http.get<PlayRecord | null>(`/drama/record/${dramaId}`);
  },

  /**
   * 上报/更新短剧的播放记录进度
   * @param dramaId 短剧 ID
   * @param episodeIndex 播放到第几集
   * @param progressTime 播放的秒数位置
   */
  updatePlayRecord(
    dramaId: number,
    episodeIndex: number,
    progressTime: number
  ): Promise<{ success: boolean; record: PlayRecord }> {
    return http.post<{ success: boolean; record: PlayRecord }>('/drama/record/update', {
      dramaId,
      episodeIndex,
      progressTime,
    });
  }
};

export default dramaApi;
