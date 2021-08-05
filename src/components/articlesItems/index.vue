<template>
  <van-cell class="article-item" :to="`/article/${article.art_id}`">
    <!-- 标题 -->
    <template #title>
      <div class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    </template>
    <!-- 标题end -->

    <template #label>
      <!-- 封面 -->
      <div class="cover-wrap" v-if="article.cover.type===3">
        <div class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image class="cover-item-img" fit="cover" :src="img" />
        </div>
      </div>
      <!-- 封面end -->

      <div class="label-info-wap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate |relativeTime}}</span>
      </div>
    </template>
    <template #default>
      <van-image v-if="article.cover.type===1" fit="cover" class="right-cover" :src="article.cover.images[0]"/>
    </template>
  </van-cell>
</template>

<script>

export default {
  name: "articleList",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="less">
.article-item{
  /deep/.title {
    font-size: 32px;
    color:#3a3a3a;
  }
  .van-cell_title{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /deep/.van-cell__value {
    flex: unset;
    padding-left: 25px;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }

  .van-cell__label span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
    z-index: 1;
  }

 .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height:146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>