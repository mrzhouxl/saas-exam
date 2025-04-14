import { defineComponent, reactive, ref, shallowRef } from "vue";
import { LockOnIcon, UserAddIcon } from 'tdesign-icons-vue-next';
import './login.less'
import services from '@/utils/axios'
import { MessagePlugin } from "tdesign-vue-next";
import { useRouter } from "vue-router";
import { info } from "console";
import { userStore } from "@/store/userStore";
export default defineComponent({
  setup() {
    const router = useRouter()
    const user = userStore()
    const login = reactive({
      mobile: '',
      code: ''
    })
    const btnState = shallowRef<boolean>(false)
    const isRegister = shallowRef<boolean>(false)
    const register = () => {
      isRegister.value = !isRegister.value;
    }
    const nowLogin = () => {
      isRegister.value = false;
    }
    const sendCode = async () => {
      let code = await services.post<{}, { message: string }>('code/getCode', {
        mobile: login.mobile
      })
      MessagePlugin.info(code.message)
    }

    const loginFuc = async () => {
      let res = await services.post<any, { type: string, data: any }>('auth/login', {
        mobile: login.mobile,
        code: login.code
      })
      if (res.type === 'success') {
        if (res.data) {
          localStorage.setItem('yunti_ad_info', res.data.admin._id)
          localStorage.setItem('yunti_t_id', res.data.tenant._id)
          localStorage.setItem('token', res.data.token)
          user.$patch(state => {
            state.admin = res.data.admin;
            state.tenant = res.data.tenant;
            state.token = res.data.token;
          })
          router.push('/index/dashboard')
        }
      } else {
        // MessagePlugin.error('登录异常！')
      }
    }

    return {
      login,
      isRegister,
      register,
      nowLogin,
      sendCode,
      loginFuc
    }
  },
  render() {
    return (
      <div class="content">
        <div class="loginFrom">
          <div class="left">
            <div class="leftContent">
              <div class="line"></div>
              <p class="text1" onClick={this.test}>考试saas系统</p>
              <p class="text2"></p>
            </div>
            <img src="https://nft.degallery.cn/oss-fs/9/2022/8/5/o_1g9mc55gdbl216cr9if1mcu15qla.png" />
          </div>
          <div class="right">
            <div class="textTop">
              <span>登录</span>
              <p class="line"></p>
            </div>
            <div class="loginInput ">
              <div class="">
                <t-input type="text" v-model={this.login.mobile} style={{ borderRadius: '7px' }}>
                  {{
                    prefixIcon: () => <UserAddIcon />
                  }}
                </t-input>
                <div class="d-flex align-items-center mt-8">
                  <t-input type="text" v-model={this.login.code}>
                    {{
                      prefixIcon: () => <LockOnIcon />
                    }}
                  </t-input> <t-button class="ms-2" onClick={this.sendCode}>发送验证码</t-button>
                </div>
              </div>
            </div>
            <div>
            </div>
            <div class="register">
              {/* <div onClick={this.nowLogin}>
                现在登录
              </div>
              <div onClick={this.register}>
                立即注册
              </div> */}
            </div>
            <div class="button">
              <t-button onClick={this.loginFuc}>登录</t-button>
            </div>
          </div>
        </div>
      </div>
    )
  }
})