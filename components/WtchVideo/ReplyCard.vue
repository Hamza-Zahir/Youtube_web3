<template>
  <div>
    <div class="">
      <div class="d-flex my-3">
        <span>
          <nuxt-link
            v-if="!reply.owner.profileImag"
            :to="`/Userschanel/${reply.owner.id}`"
            class="userProfil text-light rounded-circle d-flex justify-content-center align-items-center mr-2 mt-1"
        :style="`background:${
            plugins.stringToColour(reply.owner.userName)}`"  >
            {{ reply.owner.userName[0] }}
          </nuxt-link>
          <nuxt-link
            v-if="reply.owner.profileImag"
            :to="`/Userschanel/${reply.owner.id}`"
            class="userimg rounded-circle d-block mr-2 mt-1"
            ><img
              :src="`https://ipfs.io/ipfs/${reply.owner.profileImag}`"
              alt=""
              class="w-100 h-100 rounded-circle"
            />
          </nuxt-link>
        </span>
        <div class="col p-0 m-0">
          <nuxt-link to="" class="text-light fs-14">
            <span class="fw-600">{{ reply.owner.userName }}</span>
          </nuxt-link>
          <small class="fs-12 text-secondary mx-2">{{
            formatDate(reply.timestamp * 1000)
          }}</small>
          <div class="ml-2">{{ reply.reply }}</div>
          <div class="d-flex align-items-end mt-2">
            <span class="mx-2 cp">
              <small v-if="reply.likes.length" class="fs-12">{{
                reply.likes.length
              }}</small>

              <b-icon
                :icon="`hand-thumbs-up${
                  reply.likes.length && reply.likes.includes(CurrentAccount)
                    ? '-fill'
                    : ''
                }`"
                :class="
                  reply.likes.length && reply.likes.includes(CurrentAccount)
                    ? 'text-primary'
                    : ''
                "
                @click="likeReply()"
                class="m-0"
              ></b-icon>
            </span>
            <span class="mx-2 cp">
              <small v-if="reply.dislike.length" class="fs-12">{{
                reply.dislike.length
              }}</small>
              <b-icon
                :icon="`hand-thumbs-down${
                  reply.dislike.length && reply.dislike.includes(CurrentAccount)
                    ? '-fill'
                    : ''
                }`"
                @click="dislikeReply()"
                :class="
                  reply.dislike.length && reply.dislike.includes(CurrentAccount)
                    ? 'text-primary'
                    : ''
                "
                class="m-0"
              ></b-icon>
            </span>
            >
             <small v-if="reply.owner.userAddress == CurrentAccount || videoOwner == CurrentAccount" class="fs-12 ml-4 cp text-secondary" @click="deletReply()"
              >delete</small
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import plugins from "~/plugins";
export default {
  props: {
    reply: {
      required: true,
      type: Object,
    },
    videoId: {
      required: true,
      type: Number,
    },
    commentId: {
      required: true,
      type: Number,
    },
    videoOwner: {
      required: true,
      type: String,
    },
    getVideo: {
      required: true,
      type: Function,
    },
  },
  data() {
    return {plugins};
  },
  computed: {
    ...mapGetters(["CurrentAccount"]),
    ...mapGetters(["User"]),
  },

  mounted() {},
  methods: {
     async deletReply() {
      try {
        await plugins
          .deletReply(
            this.videoId,
              this.commentId,
              this.reply.id,
              this.CurrentAccount
          )
          .then(async () => {
            await this.getVideo();
          });
      } catch (error) {
        console.log(error);
      }
    },
    async likeReply() {
      try {
        if (this.CurrentAccount) {
          await plugins
            .likeReply(
              this.videoId,
              this.commentId,
              this.reply.id,
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

    async dislikeReply() {
      try {
        if (this.CurrentAccount) {
          await plugins
            .dislikeReply(
              this.videoId,
              this.commentId,
              this.reply.id,
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
};
</script>

<style lang="scss" scoped>
.userProfil {
  background: #1a9134;
  width: 30px;
  height: 30px;
}
.userimg {
  width: 30px;
  height: 30px;
}
</style>
