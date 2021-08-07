<template>
  <div class="updat-name">
     <van-picker
    title="性别"
    show-toolbar
    :columns="columns"
    @cancel="$emit('close')"
  />
  </div>
</template>

<script>
export default {
name:'updat-name',

}
</script>

<style>

</style>