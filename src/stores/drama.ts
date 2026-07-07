import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  dramaApi,
  type DramaDetail,
  type DramaItem,
  type DramaListParams,
  type PlayRecord,
} from '@/api/drama'

export const useDramaStore = defineStore('drama', () => {
  const dramaList = ref<DramaItem[]>([])
  const total = ref<number>(0)
  const currentDrama = ref<DramaDetail | null>(null)
  const loading = ref<boolean>(false)
  const playRecords = ref<Record<number, PlayRecord>>({})

  const runWithLoading = async <T>(task: () => Promise<T>): Promise<T> => {
    loading.value = true

    try {
      return await task()
    } finally {
      loading.value = false
    }
  }

  const fetchDramaList = async (params: DramaListParams): Promise<void> => {
    return runWithLoading(async () => {
      try {
        const result = await dramaApi.getDramaList(params)
        dramaList.value = result.list
        total.value = result.total
      } catch (error) {
        console.error('[Store Error]: fetchDramaList failed', error)
        throw error
      }
    })
  }

  const fetchDramaDetail = async (id: number): Promise<DramaDetail> => {
    return runWithLoading(async () => {
      try {
        const result = await dramaApi.getDramaDetail(id)
        currentDrama.value = result
        return result
      } catch (error) {
        console.error(`[Store Error]: fetchDramaDetail failed for ID: ${id}`, error)
        throw error
      }
    })
  }

  const fetchPlayRecord = async (dramaId: number): Promise<PlayRecord | null> => {
    try {
      const record = await dramaApi.getPlayRecord(dramaId)

      if (record) {
        playRecords.value[dramaId] = record
      }

      return record
    } catch (error) {
      console.warn(`[Store Warning]: fetchPlayRecord failed for ID: ${dramaId}`, error)
      return null
    }
  }

  const reportPlayProgress = async (
    dramaId: number,
    episodeIndex: number,
    progressTime: number,
  ): Promise<PlayRecord> => {
    try {
      const result = await dramaApi.updatePlayRecord(dramaId, episodeIndex, progressTime)

      if (result.success && result.record) {
        playRecords.value[dramaId] = result.record
      }

      return result.record
    } catch (error) {
      console.error('[Store Error]: reportPlayProgress failed', error)
      throw error
    }
  }

  return {
    currentDrama,
    dramaList,
    fetchDramaDetail,
    fetchDramaList,
    fetchPlayRecord,
    loading,
    playRecords,
    reportPlayProgress,
    total,
  }
})
