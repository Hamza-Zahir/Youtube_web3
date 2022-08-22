<template>
  <div>
    <video
      :src="`https://ipfs.io/ipfs/${ShownVideo.videoHash}`"
      controls
      class="mx-auto w-100"
    ></video>
    <div class="px-2">
      <h4 class="title my-1">
        {{ ShownVideo.videoTitle }}
      </h4>
      <span class="text-secondary">{{
        formatDate(ShownVideo.timestamp * 1000)
      }}</span>

      <div class="NavBar py-2">
        <div class="link mx-3 p-2">
          <span
            class="d-flex flex-column align-items-center mr-1"
            :class="
              ShownVideo.likes.includes(CurrentAccount) || like
                ? 'text-primary'
                : ''
            "
            @click="likeVideo()"
          >
            <b-icon
              :icon="`hand-thumbs-up${
                ShownVideo.likes.includes(CurrentAccount) || like ? '-fill' : ''
              }`"
              class="h4 m-0"
            ></b-icon>
            <small>{{
              ShownVideo.likes.length ? ShownVideo.likes.length : "LIKE"
            }}</small>
          </span>
        </div>
        <div class="link mx-3 p-2">
          <span
            class="d-flex flex-column align-items-center mr-1"
            :class="
              ShownVideo.dislike.includes(CurrentAccount) || dislike
                ? 'text-primary'
                : ''
            "
            @click="dislikeVideo()"
          >
            <b-icon
              :icon="`hand-thumbs-down${
                ShownVideo.dislike.includes(CurrentAccount) || dislike
                  ? '-fill'
                  : ''
              }`"
              class="h4 m-0"
            ></b-icon>
            <small>{{
              ShownVideo.dislike.length ? ShownVideo.dislike.length : "DISLIKE"
            }}</small>
          </span>
        </div>
        <div class="link mx-3 p-2">
          <div
            class="d-flex flex-column justify-content-center align-items-center text-primary"
            v-if="
              (User && User.videoSaved.includes(ShownVideo.id.toString())) ||
              save
            "
          >
            <b-icon icon="cloud-check-fill" class="h4 m-0"></b-icon>
            <small>video saved</small>
          </div>
          <div
            class="d-flex flex-column justify-content-center align-items-center"
            v-if="
              (!User || !User.videoSaved.includes(ShownVideo.id.toString())) &&
              !save
            "
            @click="saveVideo()"
          >
            <b-icon icon="cloud-plus" class="h4 m-0"></b-icon>
            <small class="">WATCH LATER</small>
          </div>
        </div>
      </div>
    </div>
    <div class="border-bottom">
      <nuxt-link
        :to="`/Userschanel/${ShownVideo.owner.id}`"
        class="ml-2 py-3 d-flex fw-600 text-light wfc"
      >
        <div class="">
          <span
            v-if="!ShownVideo.owner.profileImag"
            class="userProfil fw-bold rounded-circle d-flex justify-content-center align-items-center mr-2 mt-1 text-light"
          >
            {{ ShownVideo.owner.userName[0] }}
          </span>
          <span
            v-if="ShownVideo.owner.profileImag"
            class="userimg fw-bold rounded-circle mr-2 mt-1 d-block"
          >
            <img
              :src="`https://ipfs.io/ipfs/${ShownVideo.owner.profileImag}`"
              alt=""
              class="w-100 h-100 rounded-circle"
            />
          </span>
        </div>
        <div to="/UserProfil" class="">
          <div class="m-0 fw-bold">{{ ShownVideo.owner.userName }}</div>
          <small>
            {{
              `${ShownVideo.owner.userAddress.slice(
                0,
                6
              )}...${ShownVideo.owner.userAddress.slice(
                ShownVideo.owner.userAddress.length - 6
              )}`
            }}
          </small>
        </div>
      </nuxt-link>
    </div>
    <div class="p-2">
      <div class="Comments p-2">
        <h5 class="">
          <span
            >{{
              ShownVideo.comments.length
                ? ` ${ShownVideo.comments.length} Comments`
                : "No comments yet"
            }}
          </span>
        </h5>
      </div>
      <div v-if="User" class="d-flex addComment border-bottom border-secondary">
        <span
          v-if="!User.profileImag"
          class="userProfil text-light rounded-circle d-flex justify-content-center align-items-center mr-2 mt-1"
        >
          {{ User.userName[0] }}
        </span>
        <span class="userimg text-light rounded-circle d-block mr-2 mt-1">
          <img
            v-if="User.profileImag"
            :src="`https://ipfs.io/ipfs/${User.profileImag}`"
            alt=""
            class="w-100 h-100 rounded-circle"
          />
        </span>
        <div class="col my-1 p-0">
          <input
            type="text"
            placeholder="Add Comment"
            class="w-100 p-2 text-light"
            :value="Comment"
            @input="
              (e) => {
                Comment = e.target.value;
              }
            "
          />
        </div>
      </div>
      <div v-if="Comment" class="text-right mt-1 pt-2">
        <div
          class="btn btn-primary"
          @click="
            () => {
              addComment(Number(ShownVideo.id));
            }
          "
        >
          Comment
        </div>
        <div class="btn btn-dark" @click="Comment = ''">Cancellation</div>
      </div>

      <div v-if="ShownVideo.comments.length" class="">
        <div
          v-for="comment in ShownVideo.comments"
          :key="`coment-${comment.id}`"
        >
          <CommentsCard
            :comment="comment"
            :videoId="Number(ShownVideo.id)"
            :getVideo="getVideo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import plugins from "~/plugins";
import CommentsCard from "./CommentsCard.vue";
export default {
  props: {
    ShownVideo: {
      required: true,
      type: Object,
    },
    getVideo: {
      required: true,
      type: Function,
    },
  },
  data() {
    return {
      Comment: "",
      like: false,
      dislike: false,
      save: false,
    };
  },
  components: {
    CommentsCard,
  },
  computed: {
    ...mapGetters(["CurrentAccount"]),
    ...mapGetters(["ChainId"]),
    ...mapGetters(["User"]),
  },

  mounted() {},

  methods: {
    async addComment(_videoId) {
      try {
        await plugins
          .addComment(_videoId, this.Comment, this.CurrentAccount)
          .then(async () => {
            this.Comment = ""
            await this.getVideo();
          });
      } catch (error) {
        console.log(error);
      }
    },

    async likeVideo() {
      try {
        if (this.CurrentAccount) {
          this.like = true;
          await plugins
            .likeVideo(Number(this.ShownVideo.id), this.CurrentAccount)
            .then(async () => {
              await this.getVideo();
              this.like = false;
            });
        } else {
          alert("please connect your wallet first");
        }
      } catch (error) {
        console.log(error);
        this.like = false;
      }
    },

    async dislikeVideo() {
      try {
        if (this.CurrentAccount) {
          this.dislike = true;
          await plugins
            .dislikeVideo(Number(this.ShownVideo.id), this.CurrentAccount)
            .then(async () => {
              await this.getVideo();
              this.dislike = false;
            });
        } else {
          alert("please connect your wallet first");
        }
      } catch (error) {
        console.log(error);
        this.dislike = false;
      }
    },
    async saveVideo() {
      try {
        if (this.CurrentAccount) {
          this.save = true;
          await plugins.saveVideo(
            Number(this.ShownVideo.id),
            this.CurrentAccount
          );
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
  },
};
</script>

<style lang="scss" scoped>
.userProfil {
  background: #a141fa;
  width: 40px;
  height: 40px;
}
.userimg{
   width: 40px;
  height: 40px;
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
.NavBar {
  border-bottom: 1px solid #505050;
  color: #f5efef;
  padding: 6px 10px;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  overflow: scroll;
  font-size: 14px;
  @media (min-width: 400px) {
    overflow: hidden;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  .link {
    min-width: fit-content;
    cursor: pointer;
    &:hover {
      color: #4191fa;
    }
  }
}
.Comments {
  border-bottom: 1px solid #505050;
}
.addComment {
  input {
    background: none;
    border: none;
    outline: none;
  }
}
</style>
