<template>
  <div>
    <van-nav-bar class="page-nav-bar" title="登录" >
        <template #left>
            <van-icon name="cross" @click="$router.back()"/>
        </template>
    </van-nav-bar>
    <!-- 1.给van-filed配置验证规则
        2.当扁担提交时会自动触发表单验证
            如果验证通过，会触发sunbmit事件
            如果验证失败，不会触发submit事件
     -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field
        type="phone"
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userFormRules.code"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
            <van-count-down v-if="isCountDownShow" @finish="isCountDownShow = false" :time="1000*60" format="ss s" />
          <van-button v-else size="small" type="default" round class="send-sms-btn" @click='onSendms' native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px;" class="login-btn-wrap">
        <van-button block type="info" native-type="submit" class="login-btn"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getUser, login,sendSms } from "../../../api/index";
export default {
  name: "LoginPage",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "",
        code: ""
      },
      userFormRules: {
          //手机号的效验规则
        mobile: [
          //一个对象表示一个效验规则
          //校验顺序从上至下，从前到后
          {
            required: true,
            message: "手机号不能为空"
          },
          {
              //手机号的正则表达式
            pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "手机号格式错误"
          }
        ],
        //验证码的校验规则
        code: [
          {
            required: true,
            message: "验证码不能为空"
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误"
          }
        ]
      },
      isCountDownShow:false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      //在组件中必须通过this.$toast来调用Toast组件
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true, //禁用背景点击
        duration: 0 //持续时间，默认是2000，如果是0则持续展示
      });
      try {
        const res = await login(this.user);
        // console.log('登录成功',res);
        this.$store.commit('updateUser',res.data.data)
        //登录成功用success
        this.$toast.success("登录成功");
        //登录成功返回页面
        this.$router.back()
      } catch (err) {
        console.dir(err);
        if (err.response.status === 400) {
          this.$toast.fail("手机号或者验证码错误");
        } else {
          this.$toast.fail("登陆失败");
        }
      }
    },
   async onSendms(){
        //1.效验手机号
        try{
            await this.$refs.loginForm.validate('mobile')
            //  console.log('验证通过');
        }catch(err){
           return console.log('验证失败',err);
            
        }
       
        //2.验证通过，显示倒计时
         this.isCountDownShow = true
        //3.请求发送验证码
        try{
             const res=await sendSms(this.user.mobile)
            //  console.log(res);
        }catch(err){
            //发送失败，关闭倒计时
            this.isCountDownShow = false
            if(err.response.status === 429){
                this.$toast('发送太频繁了，请稍后重试')
            }else{
                this.$toast('发送失败，请稍后重试')
            }
        }
      
    }
  }
};
</script>

<style scoped>
.toutiao {
  font-size: 37px;
}
.send-sms-btn {
  width: 152px;
  height: 46px;
  font-size: 22px;
  line-height: 46px;
  background-color: #ededed;
  color: #666;
}
.login-btn-wrap {
  padding: 53px 33px;
}
.login-btn {
  background-color: #6db4fb;
  border: none;
}
</style>