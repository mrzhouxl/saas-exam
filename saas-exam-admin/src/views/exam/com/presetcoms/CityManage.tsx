import services from "@/utils/axios";
import { defineComponent, onMounted, ref } from "vue";



export default defineComponent({
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  setup(props, { emit }) {
    const options1 = [
      { label: '请选择省份', checkAll: true },
    ];
    const options2 = [
      { label: '请选择城市', checkAll: true },
    ];
    const options3 = [
      { label: '请选择区县', checkAll: true },
    ];

    const cityType = (type: number) => {
      if (type == 1) {
        return (
          <div>
            <t-select  options={options1} disabled></t-select>
            <t-select className="mt-2" options={options2} disabled></t-select>
            <t-select className="mt-2" options={options3} disabled></t-select>
            <t-input className="mt-2" disabled placeholder="请输入详细地址"></t-input>
          </div>
        )
      }
      if (type == 2) {
        return (
          <div>
            <t-select options={options1} disabled></t-select>
            <t-select className="mt-2" options={options2} disabled></t-select>
            <t-select className="mt-2" options={options3} disabled></t-select>
          </div>
        )
      }
      if (type == 3) {
        return (
          <div>
            <t-select options={options1} disabled></t-select>
            <t-select className="mt-2" options={options2} disabled></t-select>
          </div>
        )
      }
      if (type == 4) {
        return (
          <div>
            <t-select options={options1} disabled></t-select>
          </div>
        )
      }
    }
    return {
      options1,
      cityType
    }
  },
  render() {
    return (<div>
      {this.cityType(this.type)}
    </div>)
  }
})