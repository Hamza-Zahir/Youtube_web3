<template>
  <div class="">
    <Header />
    <div v-if="LikedVideos.length">
      <div class="d-flex flex-wrap mt-3">
        <div
          class="py-2 col-12 col-sm-6 col-lg-4 col-xl-3"
          v-for="video in LikedVideos"
          :key="video.id"
        >
            <VideoCard :video="video" class="h-100" />
        </div>
      </div>
    </div>
    <div v-if="!LikedVideos.length" class="impty text-center py-5 px-3">
      <div class="img my-3">
        <img
          src="https://www.gstatic.com/youtube/img/channels/empty_channel_dark_illustration.svg"
          alt=""
        />
      </div>
      <h2 class="my-4">There are no liked videos yet !</h2>
      <p>Watch the available videos now</p>
      <nuxt-link to="/" class="btn btn-primary my-2"> Watch Videos </nuxt-link>
    </div>
    <span class="d-none">{{ getLikedVideos() }}</span>

  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Header from "~/components/UserProfil/header.vue";
import VideoCard from "~/components/Video_card.vue"

export default {
  data() {
    return {
      LikedVideos: [],
    };
  },
  computed: {
    ...mapGetters(["CurrentAccount"]),
    ...mapGetters(["ChainId"]),
    ...mapGetters("loadBlockchainData", ["AllVideos"]),
  },
  mounted() {
  },
  methods: {


    async getLikedVideos() {
      this.AllVideos.map((video) => {
        if (video.likes.length) {
          for (let i = 0; i < video.likes.length; i++) {
            if (
              video.likes[i] === this.CurrentAccount && !this.LikedVideos.includes(video)
            ) {
              this.LikedVideos.unshift(video);
            }
          }
        }
      });
    },
  },
  components: { Header, VideoCard },
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
