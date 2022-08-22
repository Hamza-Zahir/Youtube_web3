<template>
  <div class="px-2 px-sm-4 px-md-5">
    <NavBar />
    <div class="d-flex flex-wrap mt-3">
      <div
        class="py-2 col-12 col-sm-6 col-lg-4 col-xl-3"
        v-for="video in AnimalsVideos"
        :key="video.id"
      >
         <VideoCard :video="video"/>
      </div>
    </div>
  </div>
</template>


<script>
import {mapActions, mapGetters } from "vuex";
import VideoCard from "~/components/Video_card.vue";
// import plugins from "~/plugins";
export default {
    data() {
        return {

        };
    },

     computed: {
    ...mapGetters("loadBlockchainData",["AnimalsVideos" ]),

  },
    mounted() {
    },
    methods: {
    },
    components: { VideoCard }
};
</script>
