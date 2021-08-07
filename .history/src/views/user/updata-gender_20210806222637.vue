<template>
  <div class="updat-gender">
     <van-picker
    title="性别"
    show-toolbar
    :columns="columns"
    @cancel="$emit('close')" 
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
  methods:{
    async onConfirm(){

    }
  }
}
</script>

<style>

</style>