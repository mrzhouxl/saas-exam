<template>
  <div class="box">
    <template v-if="list.length">
      <div class="layer-box">
        <div
          v-for="item in list"
          @click="select(item.id)"
          :key="item.id"
          :class="isSelect(item) && 'active'"
        >
          <div>{{ textType(item.type, item) }}</div>
        </div>
      </div>
      <!-- 层级调整按钮 -->
      <div class="btn-box">
          <t-button @click="up">上移</t-button>
          <t-button @click="down">下移</t-button>
          <t-button @click="upTop">移到顶部</t-button>
          <t-button @click="downTop">移到底部</t-button>
      </div>
    </template>
    <template v-else>
      <p class="empty-text">暂无图层</p>
    </template>
  </div>
</template>

<script setup name="Layer">
import { uniqBy } from 'lodash-es';
import useSelect from '@/hooks/select';


const { canvasEditor, isOne, fabric, mixinState } = useSelect();

const list = ref([]);

// 是否选中元素
const isSelect = (item) => {
  return item.id === mixinState.mSelectId || mixinState.mSelectIds.includes(item.id);
};

// 图层类型图标
const iconType = (type) => {
  const iconType = {
    group: groupIcon,
    textbox: textbox,
    'i-text': iText,
    image: imageIcon,
    rect: rectIcon,
    circle: circleIcon,
    triangle: triangleIcon,
    polygon: polygonIcon,
  };
  const defaultIcon = '';
  return iconType[type] || defaultIcon;
};
const textType = (type, item) => {
  if (type.includes('text')) {
    return item.name || item.text;
  }
  const typeText = {
    group: '组合',
    image: '图片',
    rect: '矩形',
    circle: '圆形',
    triangle: '三角形',
    polygon: '多边形',
    path: '路径',
  };
  return typeText[type] || '默认元素';
};
// 选中元素
const select = (id) => {
  const info = canvasEditor.canvas.getObjects().find((item) => item.id === id);
  canvasEditor.canvas.discardActiveObject();
  canvasEditor.canvas.setActiveObject(info);
  canvasEditor.canvas.requestRenderAll();
};

// 按钮类型
const btnIconType = (type) => {
  const iconType = {
    up: upIcon,
    down: downIcon,
    upTop: upTopIcon,
    downTop: downTopIcon,
  };
  return iconType[type];
};
const up = () => {
  canvasEditor.up();
};
const upTop = () => {
  canvasEditor.toFront();
};
const down = () => {
  canvasEditor.down();
};
const downTop = () => {
  canvasEditor.toBack();
};

const getList = () => {
  // 不改原数组 反转
  list.value = [
    ...canvasEditor.canvas.getObjects().filter((item) => {
      // return item;
      // 过滤掉辅助线
      return !(item instanceof fabric.GuideLine || item.id === 'workspace');
    }),
  ]
    .reverse()
    .map((item) => {
      const { type, id, name, text, selectable } = item;
      return {
        type,
        id,
        name,
        text,
        isLock: !selectable,
      };
    });
  list.value = uniqBy(unref(list), 'id');
};

const doLock = (item) => {
  select(item.id);
  item.isLock ? canvasEditor.unLock() : canvasEditor.lock();
  canvasEditor.canvas.discardActiveObject();
};

onMounted(() => {
  getList();
  canvasEditor.canvas.on('after:render', getList);
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
:deep(.ivu-tooltip-inner) {
  white-space: normal;
}

:deep(.ivu-tooltip) {
  display: block;
}

// :deep(.ivu-tooltip-rel) {
//   display: block;
// }
.box {
  padding: 10px;
}
.layer-box {
  height: calc(100vh - 170px);
  overflow-y: auto;
  margin-bottom: 5px;
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
  & > div {
    padding: 0px 5px;
    margin: 3px 0;
    background: #f7f7f7;
    color: #c8c8c8;
    border-radius: 3px;
    font-size: 14px;
    line-height: 28px;
    &.active {
      color: #2d8cf0;
      background: #f0faff;
      font-weight: bold;
    }
  }
}
.btn-box {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
  background: #f3f3f3;

}
svg {
  vertical-align: text-top;
}
:deep(.ivu-divider-plain) {
  &.ivu-divider-with-text-left {
    margin: 10px 0;
    font-size: 16px;
    font-weight: bold;
    color: #000000;
  }
}
.empty-text {
  width: 100%;
  text-align: center;
  padding-top: 10px;
  color: #999;
}
</style>

<style lang="less">
span {
  svg {
    vertical-align: middle;
  }
  &.active {
    svg.icon {
      fill: #2d8cf0;
    }
  }
}
</style>
