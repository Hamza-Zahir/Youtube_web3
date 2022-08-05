<template>
  <div class="">
    <Header />
    <div v-if="false">
      <div class="d-flex flex-wrap mt-3">
        <div
          class="py-2 col-12 col-sm-6 col-lg-4 col-xl-3"
          v-for="i in 20"
          :key="i"
        >
          <div class="border border-secondary">
            <videoCard />
            <div class="text-right">
              <div class="btn btn-secondary py-1 px-2 m-1">Delet</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="true" class="impty text-center py-5 px-3">
      <div class="img my-3">
        <img
          src="https://www.gstatic.com/youtube/img/channels/empty_channel_dark_illustration.svg"
          alt=""
        />
      </div>
      <h2 class="my-4">You don't have any saved videos yet !</h2>
      <p>
        Watch the available videos now
      </p>
      <nuxt-link to="/" class="btn btn-primary my-2"> Watch Videos </nuxt-link>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Header from "../../components/UserProfil/header.vue";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["CurrentAccount"]),
    ...mapGetters(["ChainId"]),
  },
  components: { Header },
};
</script>
<style lang="scss" scoped>
.impty {
  background: #161616;
  img{
max-width: 250px;
  }
}
</style>
