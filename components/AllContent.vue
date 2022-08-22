<template>
  <div class="px-2 px-sm-4 px-md-5">
    <NavBar />

    <div v-if="AllVideos.length" class="d-flex flex-wrap mt-3 justify-content-center">
      <div
        class="py-2 col-12 col-sm-6 col-lg-4 col-xl-3"
        v-for="video in AllVideos"
        :key="video.id"
      >
         <videoCard :video ="video" class="h-100" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions , mapGetters } from "vuex";

export default {

  data() {
    return {
    };
  },
  computed: {
    ...mapGetters("loadBlockchainData",["AllVideos"]),
  },
  mounted() {
    // this.getAllVideos()
  },
  methods: {
  //  ...mapActions("loadBlockchainData",["getAllVideos"]),
  }
}
</script>
<style lang="scss" scoped>

</style>
