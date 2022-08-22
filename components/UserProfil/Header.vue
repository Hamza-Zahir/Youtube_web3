<template>
  <div v-if="User" class="px-1">
    <div class="uderImg p-2">
      <div class="d-flex align-items-center">
        <h1
          v-if="!User.profileImag"
          class="rounded-circle ml-1 ml-sm-3 cp userProfil d-flex justify-content-center align-items-center fw-bold text-light"
        >
          {{ User.userName[0] }}
        </h1>
        <h1
          v-if="User.profileImag"
          class="rounded-circle ml-1 ml-sm-3 cp userimg"
        >
          <img
            :src="`https://ipfs.io/ipfs/${User.profileImag}`"
            alt=""
            class="w-100 h-100 rounded-circle"
          />
        </h1>
        <!--   <nuxt-link
            v-if="User.profileImag"
            to="/UserProfil"
            class="cp rounded-circle ml-1 ml-sm-3 cp userProfil"
            >
          </nuxt-link> -->
        <div class="ml-3">
          <h4 class="m-0">{{ User.userName }}</h4>
          <small class="p-0 m-0">{{
            `${User.userAddress.slice(0, 8)}...${User.userAddress.slice(
              User.userAddress.length - 8
            )}`
          }}</small>
        </div>
      </div>
    </div>
    <div class="NavBar py-2 mx-auto justify-content-lg-center">
      <nuxt-link to="/UserProfil" class="link"> YOUR VIDEOS </nuxt-link>
      <nuxt-link to="/UserProfil/WatchLater" class="link"
        >WATCH LATER</nuxt-link
      >
      <nuxt-link to="/UserProfil/Videos_you_liked" class="link"
        >VIDEOS YOU LIKED</nuxt-link
      >
      <nuxt-link to="/UserProfil/Settings" class="link">SETTINGS</nuxt-link>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["CurrentAccount"]),
    ...mapGetters(["ChainId"]),
    ...mapGetters(["User"]),
  },
};
</script>
<style lang="scss" scoped>
.uderImg {
  border-bottom: 1px solid #505050;
}

.userProfil {
  width: 75px;
  height: 75px;
  background: #ff7676;
}
.userimg {
  width: 75px;
  height: 75px;
}
.NavBar {
  border-bottom: 1px solid #505050;
  color: #f5efef;
  padding: 6px 10px;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  overflow: scroll;
  font-size: 14px;

  @media (min-width: 576px) {
    font-size: 1rem;
  }
  &::-webkit-scrollbar {
    display: none;
  }

  .link {
    text-decoration: none;
    color: #d3d0d0;
    padding: 6px 15px;
    font-weight: 600;
    margin: 0 5px;
    min-width: fit-content;
    border: 1px solid #505050;
    border-radius: 30px;

    &:hover {
      color: white;
      background: #5e5e5e;
    }
  }
  a.nuxt-link-exact-active {
    color: white;
    background: #5e5e5e;
    border: 1px solid #adadad;
  }
}
</style>
