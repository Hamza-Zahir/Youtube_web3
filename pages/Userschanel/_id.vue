<template>
  <div v-if="user" class="">
    <div class="uderImg p-2 py-4 border-bottom">
      <div class="d-flex align-items-center container">
        <h1
          v-if="!user.profileImag"
          class="rounded-circle ml-1 ml-sm-3 cp userProfil d-flex justify-content-center align-items-center fw-bold text-light"
       :style="`background:${
            plugins.stringToColour(user.userName)}`" >
          {{ user.userName[0] }}
        </h1>
        <h1
          v-if="user.profileImag"
          class="rounded-circle ml-1 ml-sm-3 cp userProfil d-flex justify-content-center align-items-center fw-bold text-light"
        >
          <img
            v-if="user"
            :src="`https://ipfs.io/ipfs/${user.profileImag}`"
            alt=""
            class="w-100 h-100 rounded-circle"
          />
        </h1>

        <div class="ml-3">
          <h4 class="m-0">{{ user.userName }}</h4>
          <small class="p-0 m-0">{{
            `${user.userAddress.slice(0, 8)}...${user.userAddress.slice(
              user.userAddress.length - 8
            )}`
          }}</small>
        </div>
      </div>
    </div>
    <div v-if="user && userVideos.length" class="container">
      <div class="d-flex flex-wrap mt-3 justify-content-center">
        <div
          class="py-2 col-12 col-sm-6 col-lg-4 col-xl-3"
          v-for="video in userVideos"
          :key="video.id"
        >
          <div class="h-100">
            <videoCard :video="video" class="h-100" />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="user && !user.userVideos.length"
      class="impty text-center py-5 px-3 container"
    >
      <img
        src="https://www.gstatic.com/youtube/img/channels/empty_channel_dark_illustration.svg"
        alt=""
      />
      <h2 class="my-4">This channel does not contain any content yet</h2>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import plugins from "~/plugins";
export default {
  data() {
    return {
      user: "",
      userVideos: [],
      plugins
    };
  },
  computed: {
    ...mapGetters(["CurrentAccount"]),
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    async getUserData() {
      const _user = await plugins.getUserById(this.$route.params.id);
      this.user = _user;

      if (_user.userVideos.length > 0) {
        for (let i = 0; i < _user.userVideos.length; i++) {
          const _video = await plugins.getVideo(_user.userVideos[i]);
          if (_video.id > 0) {
            this.userVideos.unshift(_video);
          }
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.userProfil {
  width: 75px;
  height: 75px;
}
.impty {
  img {
    max-width: 250px;
  }
}
</style>
