<template>
  <div class="px-1">
    <div class="uderImg p-2">
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
