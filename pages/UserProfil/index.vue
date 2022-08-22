<template>
  <div v-if="User" class="">
    <Header />
    <div v-if="userVideos.length">
      <div class="d-flex flex-wrap mt-3 justify-content-center">
        <div
          class="py-2 col-12 col-sm-6 col-lg-4 col-xl-3"
          v-for="video in userVideos"
          :key="video.id"
        >
          <div class="h-100 border d-flex flex-column justify-content-between">
            <videoCard :video="video" class="h-100" />
            <div class="text-right">
              <div class="btn btn-secondary py-1 px-2 m-1"
              @click="deleteVideo(video.id)"
              >Delet</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!userVideos.length" class="impty text-center py-5 px-3">
      <div class="img my-3">
        <img
          src="https://www.gstatic.com/youtube/img/channels/empty_channel_dark_illustration.svg"
          alt=""
        />
      </div>
      <h2 class="my-4">Download a video to get started</h2>
      <p>
        Start sharing your story and connect with viewers. The videos you upload
        will appear here.
      </p>
      <nuxt-link to="/DownloadVideo" class="btn btn-primary my-2"
        >DOWNLOAD VIDEO</nuxt-link
      >
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Header from "~/components/UserProfil/header.vue";
import plugins from "~/plugins";
export default {
  data() {
    return {
      userVideos: [],
    };
  },
  computed: {
    ...mapGetters(["CurrentAccount"]),
    ...mapGetters(["User"]),
  },
  mounted() {
    this.getUserVideos();
  },
  methods: {
    async getUserVideos() {
      if (this.User.userVideos.length) {
        for (let i = 0; i < this.User.userVideos.length; i++) {
          const _video = await plugins.getVideo(this.User.userVideos[i]);

          this.userVideos.push(_video);
        }
      }
    },
    async deleteVideo(_videoId){
       try {
        if (this.CurrentAccount) {
          await plugins
            .deleteVideo(Number(_videoId), this.CurrentAccount)
            .then(async () => {
              await this.getUserVideos();
            });
        } else {
          alert("please connect your wallet first");
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  components: { Header },
};
</script>
<style lang="scss" scoped>
.impty {
  background: #161616;
  img {
    max-width: 250px;
  }
}
</style>
