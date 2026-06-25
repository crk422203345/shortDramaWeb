import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  dramaApi,
  type DramaItem,
  type DramaDetail,
  type DramaListParams,
  type PlayRecord,
} from '@/api/drama';

/**
 * 短剧模块全局状态仓库
 * 遵循 Vue3 Setup Store 写法，集成强类型约束
 */
export const useDramaStore = defineStore('drama', () => {
  // ==========================================
  // 1. 响应式状态声明 (State)
  // ==========================================
  
  // 短剧列表数据
  const dramaList = ref<DramaItem[]>([]);
  // 短剧总条数（用于分页）
  const total = ref<number>(0);
  // 当前正在浏览或播放的短剧详情
  const currentDrama = ref<DramaDetail | null>(null);
  // 全局请求加载状态
  const loading = ref<boolean>(false);
  // 播放记录映射表，以短剧ID为 key 缓存，提高查询效率
  const playRecords = ref<Record<number, PlayRecord>>({});

  // ==========================================
  // 2. 业务动作封装 (Actions)
  // ==========================================

  /**
   * 加载短剧列表
   * @param params 筛选及分页参数
   */
  const fetchDramaList = async (params: DramaListParams): Promise<void> => {
    loading.value = true;
    try {
      const res = await dramaApi.getDramaList(params);
      dramaList.value = res.list;
      total.value = res.total;
    } catch (error) {
      console.error('[Store Error]: fetchDramaList failed', error);
      throw error; // 向上抛出错误，让组件层可以捕获并进行特定处理
    } finally {
      loading.value = false;
    }
  };

  /**
   * 获取指定短剧的详细数据
   * @param id 短剧 ID
   */
  const fetchDramaDetail = async (id: number): Promise<DramaDetail> => {
    loading.value = true;
    try {
      const res = await dramaApi.getDramaDetail(id);
      currentDrama.value = res;
      return res;
    } catch (error) {
      console.error(`[Store Error]: fetchDramaDetail failed for ID: ${id}`, error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  /**
   * 加载指定短剧的播放记录进度，并更新到本地缓存中
   * @param dramaId 短剧 ID
   */
  const fetchPlayRecord = async (dramaId: number): Promise<PlayRecord | null> => {
    try {
      const record = await dramaApi.getPlayRecord(dramaId);
      if (record) {
        playRecords.value[dramaId] = record;
      }
      return record;
    } catch (error) {
      console.warn(`[Store Warning]: fetchPlayRecord failed for ID: ${dramaId}`, error);
      return null;
    }
  };

  /**
   * 上报最新的短剧播放进度并更新缓存
   * @param dramaId 短剧 ID
   * @param episodeIndex 集数索引
   * @param progressTime 播放进度时间(秒)
   */
  const reportPlayProgress = async (
    dramaId: number,
    episodeIndex: number,
    progressTime: number
  ): Promise<PlayRecord> => {
    try {
      const res = await dramaApi.updatePlayRecord(dramaId, episodeIndex, progressTime);
      if (res.success && res.record) {
        // 同步更新本地 Store 中的播放记录缓存
        playRecords.value[dramaId] = res.record;
      }
      return res.record;
    } catch (error) {
      console.error('[Store Error]: reportPlayProgress failed', error);
      throw error;
    }
  };

  // ==========================================
  // 3. 暴露属性与方法
  // ==========================================
  return {
    // States
    dramaList,
    total,
    currentDrama,
    loading,
    playRecords,
    // Actions
    fetchDramaList,
    fetchDramaDetail,
    fetchPlayRecord,
    reportPlayProgress,
  };
});
