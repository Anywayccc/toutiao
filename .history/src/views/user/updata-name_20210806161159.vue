<template>
  <div class="updat-name">
     <!-- 导航栏 -->
    <van-nav-bar
    title="设置昵称"
    left-text="取消"
    right-text="完成"
    @click-left="$emit('close')" />
    <!-- 输入框 -->
    <div class="input-name">
        <van-field
  v-model="message"
  rows="2"
  autosize
  label="留言"
  type="textarea"
  maxlength="50"
  placeholder="请输入留言"
  show-word-limit
/>
    </div>
  </div>
</template>

<script>
export default {
name:'updat-name',

}
</script>

<style>
.input-name{
    padding: 20px;
}
</style>