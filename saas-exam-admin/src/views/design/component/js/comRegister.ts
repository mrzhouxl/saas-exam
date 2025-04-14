import { App } from 'vue'
import search from '@/views/design/component/search.vue';
import swiper from '@/views/design/component/swiper.vue';
import Icon from '@/components/Icon';
import DataTable from '@/components/DataTable.vue';
import FormBuilder from '@/components/FormBuilder.vue';
import ImageList from '@/components/ImageList.vue';
import SwiperSetting from '../settingCom/SwiperSetting.vue'
import ExamItem from '@/views/exam/com/ExamItem.vue'
import Notice from '@/views/design/component/notice.vue'
import Text from '@/views/design/component/text.vue'
import Division from '@/views/design/component/division.vue'
import Tip from '@/views/design/component/settingCom/tip.vue'
import PageHeader from '@/views/design/component/pageHeader.vue'
import HeaderItem from '@/views/design/component/settingCom/HeaderItem.vue'
import ContentList from '@/components/ContentList.vue'
import QuestionList from '@/views/design/component/questionList.vue'
import tabs from '@/views/design/component/tabs.vue'
import MutilpItem from '@/views/design/component/settingCom/MutilpItem.vue'
import RadioGroup from '@/views/design/component/settingCom/RadioGroud.vue';
import nutui from '@nutui/nutui'
import "@nutui/nutui/dist/style.css";
import FooterTabbar from '../footerTabbar.vue';
import CustomAudio from '../CustomAudio.vue'
import Choose from '../settingCom/Choose.vue'

export const registerCom = (app: App) => {
  app.component('search', search)
  app.component('swiper', swiper)
  app.component('icon-font', Icon)
  app.component('data-table', DataTable)
  app.component('form-builder', FormBuilder)
  app.component('image-list', ImageList)
  app.component('swiper-setting', SwiperSetting)
  app.component('MutilpItem', MutilpItem)
  app.component('RadioGroup', RadioGroup)
  app.component('ExamItem', ExamItem)
  app.component('Notice', Notice)
  app.component('Text', Text)
  app.component('Division', Division)
  app.component('Tip', Tip)
  app.component('PageHeader', PageHeader)
  app.component('HeaderItem', HeaderItem)
  app.component('ContentList', ContentList)
  app.component('QuestionList', QuestionList)
  app.component('CustomTabs', tabs)
  app.component('FooterTabbar', FooterTabbar)
  app.component('CustomAudio', CustomAudio)
  app.component('Choose', Choose)
  app.use(nutui)
}