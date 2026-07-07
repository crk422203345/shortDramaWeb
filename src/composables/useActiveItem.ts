import { computed, ref, type ComputedRef, type Ref } from 'vue'

interface Identifiable {
  id: string
}

export interface ActiveItemState<TItem extends Identifiable> {
  activeId: Ref<string>
  activeItem: ComputedRef<TItem>
  setActiveItem: (itemId: string) => void
}

export const useActiveItem = <TItem extends Identifiable>(
  items: ComputedRef<readonly TItem[]>,
  defaultId: string,
): ActiveItemState<TItem> => {
  const activeId = ref<string>(defaultId)
  const fallbackItem = computed<TItem>(() => items.value[0]!)
  const activeItem = computed<TItem>(() => {
    return items.value.find((item) => item.id === activeId.value) ?? fallbackItem.value
  })

  const setActiveItem = (itemId: string): void => {
    activeId.value = itemId
  }

  return {
    activeId,
    activeItem,
    setActiveItem,
  }
}
