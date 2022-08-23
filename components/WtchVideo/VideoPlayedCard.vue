<template>
  <div class="text-light video_card d-flex flex-column justify-content-between">
    <nuxt-link :to="`/WtchVideo/${video.id}`" class="text-light">
      <div class="mx-auto video text-center">
        <video
          :src="`https://ipfs.io/ipfs/${video.videoHash}`"
          class="m-0 mx-auto h-100 rounded"
        ></video>
        <div class="icon">
          <span class="span span-1"></span>
          <span class="span span-2"></span>
          <span class="span span-3"></span>
          <span class="span span-4"></span>
        </div>
      </div>
    </nuxt-link>
    <div class="mb-2 pl-1 d-flex justify-content-between fw-bold">
      <div class="d-flex col p-0 m-0">
        <nuxt-link
          v-if="!video.owner.profileImag"
          :to="`/Userschanel/${video.owner.id}`"
          class="text-light"
        >
          <span
            :style="`background:${plugins.stringToColour(
              video.owner.userName
            )}`"
            class="userProfil cp rounded-circle d-flex justify-content-center align-items-center mr-2 mt-1 ml-0"
          >
            {{ video.owner.userName[0] }}
          </span>
        </nuxt-link>
        <nuxt-link
          v-if="video.owner.profileImag"
          :to="`/Userschanel/${video.owner.id}`"
          class=""
        >
          <span class="userProfil cp rounded-circle d-block mr-2 mt-1 ml-0 p-0">
            <img
              :src="`https://ipfs.io/ipfs/${video.owner.profileImag}`"
              alt=""
              class="w-100 h-100 m-0 rounded-circle"
            />
          </span>
        </nuxt-link>
        <div class="">
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
import plugins from "~/plugins";
export default {
  data() {
    return {
      plugins,
    };
  },
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
    width: 30px;
    height: 30px;
  }
  .video {
    position: relative;
    width: 100%;

    video {
      width: 100%;
      max-height: 140px;
      background: #000;
    }

    .icon {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 50px;
      font-size: 70px;
      background: #535353d5;
      overflow: hidden;
      span {
        display: inline-block;
        border: 5px solid;
        border-color: white transparent transparent transparent;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
      .span-1 {
        width: 90px;
        height: 90px;
        top: 5px;
      }
        .span-2 {
        width: 70px;
        height: 70px;
        top: 15px;
      }
        .span-3 {
        width: 50px;
        height: 50px;
        top: 25px;
      }
        .span-4 {
        width: 30px;
        height: 30px;
        top: 35px;
      }
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
