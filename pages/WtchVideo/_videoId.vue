<template>
  <div class="pt-2 container pb-5 mb-5">
    <div class="d-lg-flex">
      <div  class="p-2 col">
        <WtchVideocard v-if="ShownVideo.id" :ShownVideo="ShownVideo" :getVideo="getShownVideo" />

      </div>
      <div class="col-lg-4">
        <div class="d-sm-flex flex-wrap">
          <div
            v-if="ShownVideo.id"
            class="py-2 col-12 col-sm-6 col-md-4 col-lg-12"
          >
            <videoCard :video="ShownVideo" />
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

export default {
  data() {
    return {
      ShownVideo: {},
      Comment: "",
    };
  },
  components: {
    WtchVideocard,
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
