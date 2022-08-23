<template>
  <div>
    <div class="">
      <div class="d-flex my-3">
        <span>
          <nuxt-link
            v-if="!comment.owner.profileImag"
            :to="`/Userschanel/${comment.owner.id}`"
            class="userProfil text-light rounded-circle d-flex justify-content-center align-items-center fw-bold mr-2 mt-1"
           :style="`background:${
            plugins.stringToColour(comment.owner.userName)}`"   >
            {{ comment.owner.userName[0] }}
          </nuxt-link>
          <nuxt-link
            v-if="comment.owner.profileImag"
            :to="`/Userschanel/${comment.owner.id}`"
            class="userimg text-light rounded-circle d-block mr-2 mt-1"
            ><img
              :src="`https://ipfs.io/ipfs/${comment.owner.profileImag}`"
              alt=""
              class="w-100 h-100 rounded-circle"
            />
          </nuxt-link>
        </span>
        <div class="col p-0 m-0">
          <nuxt-link
            :to="`/Userschanel/${comment.owner.id}`"
            class="text-light fs-14"
          >
            <span class="fw-600">{{ comment.owner.userName }}</span>
          </nuxt-link>
          <small class="fs-12 text-secondary mx-2">{{
            formatDate(comment.timestamp * 1000)
          }}</small>
          <div class="ml-2">{{ comment.comment }}</div>
          <div class="d-flex align-items-end mt-2 ml-3">
            <span
              class="mx-2 cp"
              :class="
                comment.likes.length && comment.likes.includes(CurrentAccount)
                  ? 'text-primary'
                  : ''
              "
            >
              <small v-if="comment.likes.length" class="fs-12">{{
                comment.likes.length
              }}</small>

              <b-icon
                :icon="`hand-thumbs-up${
                  comment.likes.length && comment.likes.includes(CurrentAccount)
                    ? '-fill'
                    : ''
                }`"
                @click="likeComment()"
                class="m-0"
              ></b-icon>
            </span>
            <span
              class="mx-2 cp"
              :class="
                comment.dislike.length &&
                comment.dislike.includes(CurrentAccount)
                  ? 'text-primary'
                  : ''
              "
            >
              <small v-if="comment.dislike.length" class="fs-12">{{
                comment.dislike.length
              }}</small>
              <b-icon
                :icon="`hand-thumbs-down${
                  comment.dislike.length &&
                  comment.dislike.includes(CurrentAccount)
                    ? '-fill'
                    : ''
                }`"
                @click="dislikeComment()"
                class="m-0"
              ></b-icon>
            </span>
            <small class="fs-12 ml-4 cp" @click="addReplyInput = !addReplyInput"
              >Reply</small
            >
          </div>

          <div
            v-if="User && addReplyInput"
            class="d-flex addReply border-bottom border-secondary py-1"
          >
            <span
              v-if="!User.profileImag"
              class="userProfil text-light rounded-circle d-flex justify-content-center align-items-center mr-2 mt-1"
             :style="`background:${
            plugins.stringToColour(User.userName)}`" >
              {{ User.userName[0] }}
            </span>
            <span
              v-if="User.profileImag"
              class="userimg text-light rounded-circle d-block mr-2 mt-1"
            >
              <img
                :src="`https://ipfs.io/ipfs/${User.profileImag}`"
                alt=""
                class="w-100 h-100 rounded-circle"
              />
            </span>
            <div class="col my-1 p-0">
              <input
                type="text"
                placeholder="Add Reply"
                class="w-100 p-1 text-light fs-12"
                :value="Reply"
                @input="
                  (e) => {
                    Reply = e.target.value;
                  }
                "
              />
            </div>
          </div>
          <div v-if="User && addReplyInput" class="text-right mt-1 pt-2">
            <div
              v-if="Reply"
              class="btn btn-primary fs-12"
              @click="
                () => {
                  addReply();
                }
              "
            >
              Reply
            </div>
            <div
              class="btn btn-dark fs-12"
              @click="
                () => {
                  Reply = '';
                  addReplyInput = !addReplyInput;
                }
              "
            >
              Cancellation
            </div>
          </div>
          <div v-if="comment.replies.length" class="fs-12">
            <div class="text-primary cp" @click="showReplies = !showReplies">
              <span
                >{{
                  comment.replies.length == 1
                    ? "one Reply"
                    : `${comment.replies.length} responses`
                }}
              </span>
              <b-icon
                v-if="!showReplies"
                icon="caret-down-fill"
                class="m-0"
              ></b-icon>
              <b-icon
                v-if="showReplies"
                icon="caret-up-fill"
                class="m-0"
              ></b-icon>
            </div>
            <div v-if="showReplies">
              <div
                v-for="reply in comment.replies"
                :key="`${comment.id}-reply-${reply.id}`"
                class=""
              >
                <ReplyCard
                  :reply="reply"
                  :videoId="Number(videoId)"
                  :commentId="Number(comment.id)"
                  :getVideo="getVideo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import plugins from "~/plugins";
import ReplyCard from "./ReplyCard.vue";
export default {
  props: {
    comment: {
      required: true,
      type: Object,
    },
    videoId: {
      required: true,
      type: Number,
    },
    getVideo: {
      required: true,
      type: Function,
    },
  },
  data() {
    return {
      Reply: "",
      showReplies: false,
      addReplyInput: false,
      plugins
    };
  },
  computed: {
    ...mapGetters(["CurrentAccount"]),
    ...mapGetters(["User"]),
  },
  mounted() {},
  methods: {
    async addReply() {
      try {
        await plugins
          .addReply(
            this.videoId,
            Number(this.comment.id),
            this.Reply,
            this.CurrentAccount
          )
          .then(async () => {
            this.Reply = "";
            this.addReplyInput = false;
            await this.getVideo();
          });
      } catch (error) {
        console.log(error);
      }
    },
    async likeComment() {
      try {
        if (this.CurrentAccount) {
          await plugins
            .likeComment(
              this.videoId,
              Number(this.comment.id),
              this.CurrentAccount
            )
            .then(async () => {
              await this.getVideo();
            });
        } else {
          alert("please connect your wallet first");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async dislikeComment() {
      try {
        if (this.CurrentAccount) {
          await plugins
            .dislikeComment(
              this.videoId,
              Number(this.comment.id),
              this.CurrentAccount
            )
            .then(async () => {
              await this.getVideo();
            });
        } else {
          alert("please connect your wallet first");
        }
      } catch (error) {
        console.log(error);
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
  components: { ReplyCard },
};
</script>

<style lang="scss" scoped>
.userProfil {
  width: 35px;
  height: 35px;
}
.userimg {
  width: 35px;
  height: 35px;
}
.addReply {
  .userProfil {
    background: #c59630;
    width: 30px;
    height: 30px;
  }
  .userimg {
    width: 30px;
    height: 30px;
  }
  input {
    background: none;
    border: none;
    outline: none;
  }
}
</style>
