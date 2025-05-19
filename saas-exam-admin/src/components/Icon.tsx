import { defineComponent, render, PropType, useAttrs, computed } from "vue";
import { IconFont } from 'tdesign-icons-vue-next';
export default defineComponent({
    name: 'IconFont',
    props: {
        size: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        color: String,
        onClick: {
            type: Function as PropType<(context: {
                e: MouseEvent;
            }) => void>,
            default: () => { }
        },
        loadDefaultIcons: {
            type: Boolean,
            default: false
        },
        tag: {
            type: String,
            default: ''
        }
    },
    setup(props, { attrs }) {
        // const finalStyle = computed(() => {
        //     return attrs.style
        // })
        // console.log(finalStyle, 'finalStyle')
        // return {
        //     finalStyle
        // }
    },
    render() {
        const url = `//at.alicdn.com/t/c/font_863307_0bnvivk465fe.css`
        return <>
            <IconFont tag={this.tag} loadDefaultIcons={this.loadDefaultIcons} onClick={this.onClick} icon-font class="iconfont" size={this.size} name={this.name}
                url={url} style={{ color: this.color }}></IconFont>
        </>
    }
})