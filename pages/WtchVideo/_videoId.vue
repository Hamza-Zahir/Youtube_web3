<template>
  <div class="pt-2 px-lg-3 px-xl-5">
    <div class="d-lg-flex">
      <div class="video p-2 ">
        <video
          :src="`https://ipfs.infura.io/ipfs/QmWp2CNvCFoxb1qb4JxsouRJBrfuFRPAZqQECy1vqasaNC`"
          controls
          class="mx-auto"
        ></video>
        <div class="px-2">
          <h4 class="title my-1">
            tetle of video elit. Unde, excepturi Lorem ipsum dolor sit amet.
          </h4>
          04/08/2022
          <div class="NavBar py-2">
            <div class="link mx-3 p-2">
              <span class="d-flex flex-column align-items-center mr-1">
                <b-icon icon="hand-thumbs-up" class="h4 m-0"></b-icon>
                <small>LIKE</small>
              </span>
            </div>
            <div class="link mx-3 p-2">
              <span class="d-flex flex-column align-items-center mr-1">
                <b-icon icon="hand-thumbs-down" class="h4 m-0"></b-icon>
                <small>DISLIKE</small>
              </span>
            </div>
            <div class="link mx-3 p-2">
              <b-icon icon="cloud-plus" class="h4 m-0 mr-1"></b-icon>
              <span class="">WATCH LATER</span>
            </div>
          </div>
        </div>
        <div class="border-bottom">
        <nuxt-link
          to="/Userschanel/1"
          class="ml-2 py-3 d-flex fw-600  text-light wfc"
        >
          <div class="">
            <span
              class="userProfil rounded-circle d-flex justify-content-center align-items-center mr-2 mt-1"
            >
              H
            </span>
          </div>
          <div to="/UserProfil" class="">
            <h5 class="m-0">user Name</h5>
            <small>9798...h89y98h</small>
          </div>
        </nuxt-link>
        </div>
        <div class="p-2">
          <div @click="showComments = !showComments" class="Comments p-2 d-flex justify-content-between">
          <h3  class="">

            Comments <span v-if="true">{{ 13 }}</span>
          </h3>
          <b-icon v-if="!showComments" icon="chevron-down" class="h4 m-0 mr-1"></b-icon>
          <b-icon v-if="showComments" icon="chevron-up" class="h4 m-0 mr-1"></b-icon>
          </div>
          <div v-if="showComments" class="">
            <div v-for="i in 13" :key="`coment${i}`">
              <div class="d-flex my-3">
                <nuxt-link
                  to=""
                  class="userProfil text-light rounded-circle d-flex justify-content-center align-items-center mr-2 mt-1"
                >
                  H
                </nuxt-link>
                <div class="">
                  <nuxt-link to="" class="text-light">
                    <h5>user Name</h5>
                  </nuxt-link>
                  <div class="ml-2">sam coment Lorem ipsum dolor sit amet.</div>
                  <div class=""></div>
                  <b-icon icon="hand-thumbs-down" class="h5 m-2"></b-icon>
                  <b-icon icon="hand-thumbs-up" class="h5 m-2"></b-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="videos col-lg-4">
        <div class="d-sm-flex flex-wrap">
          <div
            class="py-2 col-12 col-sm-6 col-md-4 col-lg-12"
            v-for="i in 20"
            :key="i"
          >
            <videoCard />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      showComments: false,
    };
  },
  computed: {
    ...mapGetters(["CurrentAccount"]),
    ...mapGetters(["ChainId"]),
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.wfc {
  width: fit-content;
  // width: fit-content;
}
video {
  max-width: 100%;
}
.userProfil {
  background: #41fac2;
  width: 40px;
  height: 40px;
}
.title {
  overflow: hidden;
  display: -webkit-box;
  display: -moz-box;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  line-clamp: 2;
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
  @media (min-width: 400px) {
    overflow: hidden;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  .link {
    min-width: fit-content;
    cursor: pointer;
    &:hover {
      color: #4191fa;
    }
  }
}
.Comments {
  border-bottom: 1px solid #505050;
}
</style>
