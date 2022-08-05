<template>
  <div class="">
    <Header />
    <div class="d-flex flex-wrap mt-3 ">
      <div class="py-3 col-12 col-sm-8 col-lg-6 col-xl-5 mx-auto">
        <div class="p-2 py-4 text-center border rounded">
          <h3 class="text-center">Change profile picture</h3>
          <div class="">
            <input
              type="file"
              class="my-3"
              @change="
                (e) => {
                  imgHash = '';
                  handelFile(e.target.files[0]);
                }
              "
            />
          </div>
          <div class="mx-auto profil-img" v-if="imgHash">
            <img
              :src="`https://ipfs.infura.io/ipfs/${imgHash}`"
              alt=""
              class="rounded-circle"
            />
          </div>
          <div class="text-right mt-3 mr-2">
            <div class="btn b-sh-l" :class="imgHash ? 'btn-primary' : 'btn-secondary'">
              Change profile picture
            </div>
          </div>
        </div>
      </div>
      <div class="py-3 col-12 col-sm-8 col-lg-6 col-xl-5 mx-auto">
        <div class="p-2 pt-4 text-center border rounded">
          <h3 class="text-center">Change Username</h3>
          <div class="my-3 fw-600">
            <input
              type="text"
              name=""
              id=""
              placeholder="User Name"
              class="fw-600 px-2 py-1 col"
              maxlength="25"
              @input="
                (e) => {
                  userName = e.target.value;
                }
              "
            />
             <div class="text-right mt-3 mr-2">
            <div class="btn b-sh-l" :class="imgHash ? 'btn-primary' : 'btn-secondary'">
              Change Username
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../../components/UserProfil/header.vue";
import { mapActions, mapGetters } from "vuex";
import create from "ipfs-http-client";
const client = new create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export default {
  data() {
    return {
      imgHash: "",
      userName: "",
    };
  },
  computed: {
    // ...mapGetters(["CurrentAccount"]),
    // ...mapGetters(["ChainId"]),
  },
  methods: {
    async handelFile(file) {
      const added = await client.add(file);
      this.imgHash = added[0].hash;
      // console.log( this.imgHash)
    },
  },
  components: { Header },
};
</script>
<style lang="scss" scoped>
input {
  color: #000;
  outline: none;
  border: none;
  border-bottom: 2px solid #838383;
  background: #ffffff;
  max-width: 100%;
}
img {
  width: 200px;
  height: 140px;
}
</style>
