<template>
  <div class="">
    <Header />
    <div v-if="Savedvideo.length">
      <div class="d-flex flex-wrap mt-3">
        <div
          class="py-2 col-12 col-sm-6 col-lg-4 col-xl-3"
          v-for="video in Savedvideo"
          :key="video.id"
        >
          <div
            class="h-100 border border-secondary d-flex flex-column justify-content-between"
          >
            <videoCard :video="video" class="h-100" />
            <div class="text-right">
              <div
                class="btn btn-secondary py-1 px-2 m-1"
                @click="deleteSavedVideo(video.id)"
              >
                Delet
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!Savedvideo.length" class="impty text-center py-5 px-3">
      <div class="img my-3">
        <img
          src="https://www.gstatic.com/youtube/img/channels/empty_channel_dark_illustration.svg"
          alt=""
        />
      </div>
      <h2 class="my-4">You don't have any saved videos yet !</h2>
      <p>Watch the available videos now</p>
      <nuxt-link to="/" class="btn btn-primary my-2"> Watch Videos </nuxt-link>
    </div>
    <span class="d-none">{{ getvideoSaved() }}</span>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import Header from "~/components/UserProfil/header.vue";
import plugins from "~/plugins";
export default {
  data() {
    return {
      Savedvideo: [],
      SavedvideoIds: [],
    };
  },
  mounted() {
    this.getvideoSaved();
  },
  computed: {
    ...mapGetters(["CurrentAccount", "User"]),
  },
  methods: {
    ...mapMutations(["setUser"]),
    async getvideoSaved() {
      if (this.User && this.User.videoSaved.length) {
        for (let i = 0; i < this.User.videoSaved.length; i++) {
          const _video = await plugins.getVideo(this.User.videoSaved[i]);
          if (
            !this.SavedvideoIds.includes(_video.id) &&
            this.User.videoSaved[i] > 0
          ) {
            this.Savedvideo.unshift(_video);
            this.SavedvideoIds.push(_video.id);
          }
        }
      }
    },
    async deleteSavedVideo(_videoId) {
      try {
        if (this.CurrentAccount) {
          await plugins
            .deleteSavedVideo(Number(_videoId), this.CurrentAccount)
            .then(async () => {
              const _user = await plugins.getUserByAddress(this.CurrentAccount);
              this.setUser(_user);
               this.Savedvideo = [];
              this.SavedvideoIds = [];

            });
        } else {
          alert("please connect your wallet first");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: { Header },
};
</script>
<style lang="scss" scoped>
.impty {
  background: #161616;
    min-height: 100%;
  img {
    max-width: 250px;
  }
}
</style>
