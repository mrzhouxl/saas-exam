<template>
  <div class="design-container flex w-full h-full">
    <div class="flex-1 p-2 flex justify-center items-center bg" ref="container">
      <!-- 画布撑满当前容器 -->
      <Content class="w-full" style="display: flex; height: calc(100vh - 64px); position: relative">
        <div id="workspace" class="w-full">
          <div class="canvas-box">
            <div class="inside-shadow"></div>
            <canvas id="canvas" :class="state.ruler ? 'design-stage-grid' : ''"></canvas>
          </div>
        </div>
      </Content>

    </div>
    <div class="operation-container w-[450px] h-full">
      <div class="operation-item">
        <button>添加图片</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, shallowRef, onMounted, nextTick, reactive } from 'vue';
import useCanvas from '@/hooks/useCanvas';
import { fabric } from 'fabric';
import Editor, {
  IEditor,
  DringPlugin,
  AlignGuidLinePlugin,
  ControlsPlugin,
  // ControlsRotatePlugin,
  CenterAlignPlugin,
  LayerPlugin,
  CopyPlugin,
  MoveHotKeyPlugin,
  DeleteHotKeyPlugin,
  GroupPlugin,
  DrawLinePlugin,
  GroupTextEditorPlugin,
  GroupAlignPlugin,
  WorkspacePlugin,
  HistoryPlugin,
  FlipPlugin,
  RulerPlugin,
  MaterialPlugin,
  WaterMarkPlugin,
  FontPlugin,
  PolygonModifyPlugin,
  DrawPolygonPlugin,
  FreeDrawPlugin,
  PathTextPlugin,
  PsdPlugin,
  SimpleClipImagePlugin,
  BarCodePlugin,
  QrCodePlugin,
  ImageStroke,
  ResizePlugin,
  LockPlugin,
  AddBaseTypePlugin,
  MaskPlugin,
} from '@kuaitu/core';
const state = reactive({
  show: false,
  select: null,
  ruler: true,
});
const { canvas, initCanvas, addImage } = useCanvas();
// 获取当前dom的宽高
const container = ref<HTMLDivElement>();

const width = ref(0);
const height = ref(0);
// 创建编辑器
const canvasEditor = new Editor() as IEditor;
const getContainerSize = () => {
  if (!container.value) return;
  // 获取当前dom的宽高
  width.value = container.value.clientWidth;
  height.value = container.value.clientHeight;
}

onMounted(async () => {
  // 初始化fabric
  const canvas = new fabric.Canvas('canvas', {
    fireRightClick: true, // 启用右键，button的数字为3
    stopContextMenu: true, // 禁止默认右键菜单
    controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
    // imageSmoothingEnabled: false, // 解决文字导出后不清晰问题
    preserveObjectStacking: true, // 当选择画布中的对象时，让对象不在顶层。
  });
  // 初始化编辑器
  canvasEditor.init(canvas);
  canvasEditor
    .use(DringPlugin)
    .use(PolygonModifyPlugin)
    .use(AlignGuidLinePlugin)
    .use(ControlsPlugin)
    // .use(ControlsRotatePlugin)
    .use(CenterAlignPlugin)
    .use(LayerPlugin)
    .use(CopyPlugin)
    .use(MoveHotKeyPlugin)
    .use(DeleteHotKeyPlugin)
    .use(GroupPlugin)
    .use(DrawLinePlugin)
    .use(GroupTextEditorPlugin)
    .use(GroupAlignPlugin)
    .use(WorkspacePlugin)
    .use(HistoryPlugin)
    .use(FlipPlugin)
    .use(RulerPlugin)
    .use(DrawPolygonPlugin)
    .use(FreeDrawPlugin)
    .use(PathTextPlugin)
    .use(SimpleClipImagePlugin)
    .use(BarCodePlugin)
    .use(QrCodePlugin)
    .use(WaterMarkPlugin)
    .use(PsdPlugin)
    .use(ImageStroke)
    .use(ResizePlugin)
    .use(LockPlugin)
    .use(AddBaseTypePlugin)
    .use(MaskPlugin);
});
</script>
<style scoped>
.canvas-box {
  position: relative;
}

.inside-shadow {
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 9px 2px #0000001f;
  z-index: 2;
  pointer-events: none;
}

#canvas {
  width: 300px;
  height: 300px;
  margin: 0 auto;
}

/* // 网格背景 */
.design-stage-grid {
  --offsetX: 0px;
  --offsetY: 0px;
  --size: 16px;
  --color: #dedcdc;
  background-image: linear-gradient(45deg,
      var(--color) 25%,
      transparent 0,
      transparent 75%,
      var(--color) 0),
    linear-gradient(45deg, var(--color) 25%, transparent 0, transparent 75%, var(--color) 0);
  background-position: var(--offsetX) var(--offsetY),
    calc(var(--size) + var(--offsetX)) calc(var(--size) + var(--offsetY));
  background-size: calc(var(--size) * 2) calc(var(--size) * 2);
}
</style>
