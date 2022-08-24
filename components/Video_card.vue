<template>
  <div class="text-light video_card d-flex flex-column justify-content-between">
    <nuxt-link :to="`/WtchVideo/${video.id}`" class="text-light">
      <div class="mx-auto video text-center">
        <video
          :src="`https://ipfs.io/ipfs/${video.videoHash}`"
          class="m-0 mx-auto h-100 rounded"
        ></video>

        <b-icon icon="play-circle" class="h1 m-0 cp mt-1 icon"></b-icon>
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
          <span class="userimg cp rounded-circle d-block mr-2 mt-1 ml-0 p-0">
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
      <div class="select">
        <div
          v-if="showOptions"
          class="options"
          @click="showOptions = !showOptions"
        >
          <span
            v-if="!video.likes.includes(CurrentAccount) && !like"
            @click="likeVideo(video.id)"
            >like video</span
          >
          <span
            v-if="!User.videoSaved.includes(video.id.toString()) && !save"
            @click="saveVideo(video.id)"
            >save video</span
          >
        </div>
        <b-icon
          icon="three-dots-vertical"
          class="h5 m-0 cp mt-1"
          :class="`showOptions-${video.id}`"
          @click="
            () => {
              ShowOptions(`showOptions-${video.id}`);
            }
          "
        ></b-icon>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import plugins from "~/plugins";
export default {
  data() {
    return {
      plugins,
      showOptions: false,
      like: false,
      save: false,
    };
  },
  props: {
    video: {
      required: true,
      type: Object,
    },
  },
  computed: {
    ...mapGetters(["CurrentAccount"]),
    ...mapGetters(["User"]),
  },

  methods: {
    async likeVideo(_videoId) {
      try {
        if (this.CurrentAccount) {
          this.like = true;
          await plugins
            .likeVideo(Number(_videoId), this.CurrentAccount)
            .then(async (status) => {
              if (!status) {
                this.like = false;
              }
            });
        } else {
          alert("please connect your wallet first");
        }
      } catch (error) {
        console.log(error);
        this.like = false;
      }
    },
    async saveVideo(_videoId) {
      try {
        if (this.CurrentAccount) {
          this.save = true;
          await plugins
            .saveVideo(Number(_videoId), this.CurrentAccount)
            .then(async (status) => {
              if (!status) {
                this.save = false;
              }
            });
        } else {
          alert("please connect your wallet first");
        }
      } catch (error) {
        console.log(error);
        this.save = false;
      }
    },

    formatDate(timestamp) {
      const date = new Date(timestamp);

      return `${
        date.getDate().toString().length == 1 ? "0" : ""
      }${date.getDate()}/${
        date.getMonth().toString().length == 1 ? "0" : ""
      }${date.getMonth()}/${date.getFullYear()}`;
    },
    async headOptions(_class) {
      document.addEventListener("click", (e) => {
        if (!e.target.classList.contains(_class)) this.showOptions = false;
      });
    },
    async ShowOptions(_class) {
      await this.headOptions(_class).then(
        (this.showOptions = !this.showOptions)
      );
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
  .userimg {
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
  .select {
    position: relative;
    .options {
      position: absolute;
      width: 120px;
      right: 10px;
      bottom: 100%;
      background: #383838e7;
      border-bottom: 1px solid #9b9b9b8c;

      span {
        display: block;
        padding: 5px;
        border-top: 1px solid #9b9b9b8c;
        &:hover {
          background: rgba(0, 0, 0, 0.575);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
