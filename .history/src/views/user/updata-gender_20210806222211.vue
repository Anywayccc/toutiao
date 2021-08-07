<template>
  <div class="updat-name">
     <van-picker
    title="性别"
    show-toolbar
    :columns="columns"
    @cancel="$emit('close')"
    @change="onChange"
    @confirm="onConfirm"
  />
  </div>
</template>

<script>
export default {
name:'updat-gender',
 data () {
    return {
      columns: ['男', '女']
    }
  },

}
</script>

<style>

</style>