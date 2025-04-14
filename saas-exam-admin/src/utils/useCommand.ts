import { DropdownOption } from "tdesign-vue-next";
import { Ref, ref } from "vue"
import { useFileDialog } from '@vueuse/core'
import services from "./axios";

export const useCommand = () => {

  const fontSizeOptions = [
    { content: '12', value: 12 },
    { content: '14', value: 14 },
    { content: '16', value: 16 },
    { content: '18', value: 18 },
    { content: '20', value: 20 },
    { content: '22', value: 22 },
    { content: '24', value: 24 },
  ]

  const addBlod = () => {
    const selection = window.getSelection();
    console.log(selection?.toString(), 'selection');

    document.execCommand('bold', false, selection?.toString())
  }

  const addUnderline = () => {
    const selection = window.getSelection();
    document.execCommand('underline', false, selection?.toString())
  }

  // 修改所选字体颜色
  const updateFontColor = (color: string) => {
    const selection = window.getSelection();
    document.execCommand('foreColor', false, color)
  }

  // 修改字体大小
  const updateFontSize = (size: string) => {
    document.execCommand('fontSize', false, '1');
    // const parent = document.querySelector('[contenteditable=true]')
    const text = (window.getSelection() as Selection).anchorNode?.parentNode as HTMLElement;
    text.style.fontSize = size + 'px';
  }

  // 添加图片
  const addImage = () => {
    const { files, open, reset, onChange } = useFileDialog()
    open()
    onChange(async (file) => {
      if (file) {
        console.log(file,'file');
        const formData = new FormData();
        formData.append('file', file[0]);
        // 上传文件
        const res = await services.post('upload/img', formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        // console.log(res,'res');
        const url = res.data.file;
        document.execCommand('insertImage',true,url)
      }

    })

  }

  //检查光标前面字体大小和颜色
  const checkCursorContent = (content: Ref<[string, string]>): Ref<[string, string]> => {
    const selection = window.getSelection() as Selection;
    if (selection?.rangeCount > 0) {
      const range = selection.getRangeAt(0) as any;
      const startOffset = range.startOffset;

      if (startOffset > 0) {
        const previousChar = range.startContainer.textContent[startOffset - 1];
        var previousCharStyle = getComputedStyle(range.startContainer.parentElement);
        content.value = [previousCharStyle.fontSize.substring(0, 2), previousCharStyle.color];
        return content
      }
    }
    return content
  }

  return {
    addBlod,
    addUnderline,
    updateFontColor,
    updateFontSize,
    fontSizeOptions,
    checkCursorContent,
    addImage
  }
}