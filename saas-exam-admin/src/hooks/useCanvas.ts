import { ref } from 'vue';
import { fabric } from 'fabric';

const useCanvas = () => {
    const canvas = ref<fabric.Canvas>(null);
    const initCanvas = async () => {
        canvas.value = await new fabric.Canvas('canvas');
        // 设置背景颜色
        canvas.value.setBackgroundColor('#FFFFFF');
    }

    const addImage = (url: string, x: number, y: number, width: number, height: number) => {
        fabric.Image.fromURL(url, (img) => {
            img.scaleToWidth(width);
            img.scaleToHeight(height);
            img.set({
                hasControls: false,
                borderColor: 'transparent',
                borderDashArray: [10, 5],
                borderScaleFactor: 1,
                borderOpacityWhenMoving: 1,
            });
            canvas.value.insertAt(img, x, y);
        });
    }

    return {
        canvas,
        initCanvas,
        addImage
    }
}

export default useCanvas;
