<template>
  <div class="px-2 px-sm-4 px-md-5">
    <NavBar />
    <div class="d-flex flex-wrap mt-3">
      <div
        class="py-2 col-12 col-sm-6 col-lg-4 col-xl-3"
        v-for="video in NatureVideos"
        :key="video.id"
      >
        <videoCard :video="video" class="h-100"  />
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters("loadBlockchainData", ["NatureVideos"]),
  },
  mounted() {
  },
  methods: {

  },
};
</script>
