<template>
  <div class="text-light video_card d-flex flex-column justify-content-between">
    <nuxt-link :to="`/WtchVideo/${video.id}`" class="text-light">
      <div class="mx-auto video text-center">
        <video
          :src="`https://ipfs.io/ipfs/${video.videoHash}`"
          class="mx-auto h-100"
        ></video>

        <b-icon icon="play-circle" class="h1 m-0 cp mt-1 icon"></b-icon>
      </div>
    </nuxt-link>
    <div class="mb-2 pl-1 d-flex justify-content-between fw-bold">
      <div class="d-flex col p-0 m-0">
        <nuxt-link v-if="!video.owner.profileImag"
         :to="`/Userschanel/${video.owner.id}`"
          class="text-light">
          <span
            class="userProfil cp rounded-circle d-flex justify-content-center align-items-center mr-2 mt-1 ml-0"
          >
            {{ video.owner.userName[0] }}
          </span>
        </nuxt-link>
         <nuxt-link v-if="video.owner.profileImag"
         :to="`/Userschanel/${video.owner.id}`"
          class="">
          <span
            class="userimg cp rounded-circle d-block  mr-2 mt-1 ml-0 p-0"
          >
            <img
              :src="`https://ipfs.io/ipfs/${video.owner.profileImag}`"
              alt=""
              class="w-100 h-100 m-0 rounded-circle"
            />
          </span>
        </nuxt-link>
        <div class="">
          <!-- <span class="title">{{ video.videoType }} </span> -->
          <span class="title">{{ video.videoTitle }} </span>
          <nuxt-link :to="`/Userschanel/${video.owner.id}`" class="text-light">
            <small class="text-secondary">{{ video.owner.userName }} </small>
          </nuxt-link>
          <small class="text-secondary fs-12">{{
            formatDate(video.timestamp * 1000)
          }}</small>
        </div>
      </div>

      <b-icon icon="three-dots-vertical" class="h5 m-0 cp mt-1"></b-icon>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    video: {
      required: true,
      type: Object,
    },
  },

  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp);

      return `${
        date.getDate().toString().length == 1 ? "0" : ""
      }${date.getDate()}/${
        date.getMonth().toString().length == 1 ? "0" : ""
      }${date.getMonth()}/${date.getFullYear()}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.video_card {
  .userProfil {
    background: #4163fa;
    width: 30px;
    height: 30px;
  }
  .userimg {
    width: 30px;
    height: 30px;
  }
  .video {
    position: relative;
    width: 100%;

    video {
      width: 100%;
    }

    .icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 70px;
    }
  }
  .title {
    overflow: hidden;
    display: -webkit-box;
    display: -moz-box;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
  .fs-12 {
    font-size: 12px;
  }
}
</style>
