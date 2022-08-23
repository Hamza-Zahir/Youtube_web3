<template>
  <div class="header text-light py-1 px-2 px-sm-4 px-md-5">
    <div class="d-flex justify-content-between align-items-center">
      <nuxt-link to="/" class="d-flex align-items-center logo">
        <span class="">
          <img src="../assets/images/youtube.png" alt="" class=" "
        /></span>

        <span class="ml-2 fw-bold text-light">Youtube Web3</span>
      </nuxt-link>
      <div class="">
        <div
          v-if="!CurrentAccount"
          class="btn fs-14 wallet-btn"
          @click="
            () => {
              connectMetamask();
            }
          "
        >
          Connect Wallet
        </div>
        <nuxt-link
          to="/SignUp"
          v-if="CurrentAccount && !User"
          class="btn fs-14 py-1 fw-600 wallet-btn text-light"
        >
          Sign Up
        </nuxt-link>

        <div v-if="CurrentAccount && User" class="d-flex align-items-center">
          <nuxt-link to="/DownloadVideo">
            <img
              src="../assets/images/add-video.png"
              alt=""
              class="mx-1 mx-sm-3 cp"
          /></nuxt-link>

          <nuxt-link to="/Notifications" class="mx-1 mx-sm-3 cp text-light"
            ><b-icon icon="bell" class="h5 m-0 p-0"></b-icon>
            <sup class="bg-red rounded px-1">+2</sup>
          </nuxt-link>

          <nuxt-link
            v-if="!User.profileImag"
            to="/UserProfil"
            class="btn rounded-circle ml-1 ml-sm-3 cp userProfil d-flex justify-content-center align-items-center fw-bold text-light"
           :style="`background:${
            plugins.stringToColour(User.userName)}`" >{{ User.userName[0] }}</nuxt-link
          >
          <nuxt-link
            v-if="User.profileImag"
            to="/UserProfil"
            class="cp rounded-circle ml-1 ml-sm-3 cp userProfil"
            ><img
              :src="`https://ipfs.io/ipfs/${User.profileImag}`"
              alt=""
              class="w-100 h-100 rounded-circle"
            />
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import plugins from "../plugins";

export default {
  data() {
    return {
      plugins
    };
  },
  computed: {
    ...mapGetters(["CurrentAccount"]),
    ...mapGetters(["ChainId"]),
    ...mapGetters(["User"]),
  },
  mounted() {
    this.getAllVideos();
  },
  methods: {
    ...mapActions(["connectMetamask"]),
    ...mapActions("loadBlockchainData", ["getAllVideos"]),
  },
};
</script>
<style lang="scss" scoped>
.header {
  border-bottom: 1px solid #6d6d6d;
  position: relative;
  sup {
    margin-left: -10px;
  }
  img {
    width: 30px;
  }
  .userProfil {
    width: 30px;
    height: 30px;
  }
  .wallet-btn {
    background: #fa6c78;
  }

  @media (min-width: 576px) {
    img {
      width: 40px;
    }
    .logo {
      font-size: 20px;
    }
    .userProfil {
      width: 35px;
      height: 35px;
    }
  }

  .bg_dark {
    width: 100vw;
    height: 100vh;
    position: fixed;
    background: #000000bb;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }
}
</style>
