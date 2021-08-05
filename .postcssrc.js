module.exports = {
  //配置要使用的PostCSS插件
  plugins: {
    //作用：生成浏览器CSS样式规则前缀
    //VueCLI内部已经配置了autoprefixer插件，在此又配置一次产生冲突
    // autoprefixer: {
    //     //配置要兼容的环境信息
    //   browsers: ["Android >= 4.0", "iOS >= 8"]
    // },
    //作用：把px转为rem
    "postcss-pxtorem": {
      //lib-fixible  的REM方案：把一行分为10分。每份就是1/10
      //所以 rootValue 应该设置设计稿宽度的1/10
      //设计稿是750   所以应该设置为750 /10
      //但是Vant建议设置为37.5  因为Vant是基于37.5写的
      //使用设计稿的尺寸都必须/2
      //如果是Vant就按照37.5转换，如果自己的样式按照37.5转换
      //rootValue支持两种类型，数字：固定的值 函数：可以动态处理返回
        // postcss-poxtorem 处理每个css文件的时候都会来调用这个函数
        // 它会把处理的css文件相关的信息传递给这个函数
      rootValue({file}){
        //   console.log('处理的css文件',file);
          return file.indexOf('vant')!==-1?37.5:75
      },
    //   rootValue: 37.5,

      //配置要转换的CSS属性
      //* 表示所有
      propList: ["*"],
      exclude:'github-markdown'
    }
  }
};
//Post是一个处理css的处理工具