import { ref } from "vue"


export function useDesignDelete() {
  const comDelete = ref<boolean>(false);

  //鼠标移入事件
  const mouseenter = (e:any) => {
    comDelete.value = true;
  }
  const mouseleave = (e:any) => { 
    comDelete.value = false;
  }

  return {
    comDelete,
    mouseenter,
    mouseleave
  }
}