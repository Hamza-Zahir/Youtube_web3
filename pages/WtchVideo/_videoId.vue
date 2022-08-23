<template>
  <div class="pt-4 px-lg-5 pb-5 mb-5">
    <div class="d-lg-flex ">
      <div  class="col p-2 p-0 m-0">
        <WtchVideocard v-if="ShownVideo.id" :ShownVideo="ShownVideo" :getVideo="getShownVideo" />

      </div>
      <div class="col-lg-4 p-0 m-0">
        <div class="d-sm-flex flex-wrap p-0 ">
          <div
            v-if="ShownVideo.id"
            class="py-2 col-12 col-sm-6 col-md-4 col-lg-12"
          >
            <videoPlayed :video="ShownVideo" />
          </div>
          <div
            v-for="video in AllVideos"
            :key="video.id"
            class="py-2 col-12 col-sm-6 col-md-4 col-lg-12"
            :class="ShownVideo.id == video.id ? 'd-none' : ''"
          >
            <videoCard :video="video" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import plugins from "~/plugins";
import WtchVideocard from "~/components/WtchVideo/WtchVideo_card.vue";
import videoPlayed from "~/components/WtchVideo/VideoPlayedCard.vue"
export default {
  data() {
    return {
      ShownVideo: {},
      Comment: "",
    };
  },
  components: {
    WtchVideocard,
    videoPlayed
  },
  computed: {
    ...mapGetters(["CurrentAccount"]),
    ...mapGetters(["User"]),
    ...mapGetters("loadBlockchainData", ["AllVideos"]),
  },
  mounted() {
    this.getShownVideo();
  },
  methods: {

    async getShownVideo() {
      const _video = await plugins.getVideo(this.$route.params.videoId);
      this.ShownVideo = _video;
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

<style lang="scss" scoped></style>
