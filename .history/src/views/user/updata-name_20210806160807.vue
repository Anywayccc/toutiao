<template>
  <div class="updat-name">
     <!-- 导航栏 -->
    <van-nav-bar
    title="设置昵称"
    left-text="取消"
    right-text="完成"
    @click-left="$router.back()" />
    <!-- 输入框 -->
    <div class="input-name">

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