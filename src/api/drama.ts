import http from '@/utils/request'

export interface Episode {
  id: number
  dramaId: number
  title: string
  videoUrl: string
  duration: number
  episodeIndex: number
  isFree: boolean
}

export interface DramaItem {
  id: number
  title: string
  cover: string
  description: string
  category: string
  episodesCount: number
  playsCount: number
  rating: number
  status: 'ongoing' | 'finished'
  createTime: string
}

export interface DramaDetail extends DramaItem {
  episodes: Episode[]
  tags: string[]
}

export interface PlayRecord {
  dramaId: number
  dramaTitle: string
  cover: string
  episodeIndex: number
  progressTime: number
  updatedTime: string
}

export interface DramaListParams {
  page: number
  pageSize: number
  category?: string
  keyword?: string
}

export interface DramaListResponse {
  list: DramaItem[]
  total: number
}

export const dramaApi = {
  getDramaList(params: DramaListParams): Promise<DramaListResponse> {
    return http.get<DramaListResponse>('/drama/list', params)
  },

  getDramaDetail(id: number): Promise<DramaDetail> {
    return http.get<DramaDetail>(`/drama/detail/${id}`)
  },

  getPlayRecord(dramaId: number): Promise<PlayRecord | null> {
    return http.get<PlayRecord | null>(`/drama/record/${dramaId}`)
  },

  updatePlayRecord(
    dramaId: number,
    episodeIndex: number,
    progressTime: number,
  ): Promise<{ success: boolean; record: PlayRecord }> {
    return http.post<{ success: boolean; record: PlayRecord }>('/drama/record/update', {
      dramaId,
      episodeIndex,
      progressTime,
    })
  },
}

export default dramaApi
