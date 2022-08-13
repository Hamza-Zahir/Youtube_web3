<template>
  <div class="">
    <div class="uderImg p-2 py-4 border-bottom">
      <div class="d-flex align-items-center">
        <h1
          class="rounded-circle ml-1 ml-sm-3 cp userProfil d-flex justify-content-center align-items-center fw-bold text-light"
        >
          H
        </h1>
        <!--  <h1
        class="rounded-circle ml-1 ml-sm-3 cp userProfil d-flex justify-content-center align-items-center fw-bold text-light"
      >
        H
      </h1> -->
        <div class="ml-3">
          <h4 class="m-0">User Name</h4>
          <small class="p-0 m-0">{{
            `${CurrentAccount.slice(0, 6)}...${CurrentAccount.slice(
              CurrentAccount.length - 6
            )}`
          }}</small>
        </div>
      </div>
    </div>
    <div v-if="true">
      <div class="d-flex flex-wrap mt-3">
        <div
          class="py-2 col-12 col-sm-6 col-lg-4 col-xl-3"
          v-for="i in 20"
          :key="i"
        >
          <div class="border border-secondary">
            <videoCard />
          </div>
        </div>
      </div>
    </div>
    <div v-if="true" class="impty text-center py-5 px-3">

        <img
          src="https://www.gstatic.com/youtube/img/channels/empty_channel_dark_illustration.svg"
          alt=""
        />
      <h2 class="my-4">This channel does not contain any content</h2>
         </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["CurrentAccount"]),
  
  },

};
</script>
<style lang="scss" scoped>
.userProfil {
  width: 75px;
  height: 75px;
  background: #028363;
}
.impty{
  img{
max-width: 250px;
  }
}


</style>
