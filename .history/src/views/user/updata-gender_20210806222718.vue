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
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try{

      }catch(err){
        
      }
    }
  }
}
</script>

<style>

</style>