<template>
  <div class="updat-name">
     <!-- /导航栏 -->
    <van-cell title="头像" is-link @click="$refs.inputFile.click()">
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="user.photo"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
name:'updat-name',

}
</script>

<style>

</style>