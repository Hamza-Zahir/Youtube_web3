<template>
  <div class="text-dark fw-600 p-2">
    <div class="form p-2 mx-auto">
      <form action="">
        <div class="my-3 d-sm-flex align-items-center">
          <label for="" class="col-sm-3">Your Account : </label>
          <div class="account text-dark px-1 px-sm-2 py-2 py-sm-1 col">
            {{ CurrentAccount }}
          </div>
        </div>
        <div class="my-3 d-sm-flex align-items-center">
          <label for="" class="col-sm-3">User Name : </label>
          <input
            type="text"
            name="userNume"
            id=""
            placeholder="User Name"
            class="userNume px-2 py-1 col"
            maxlength="25"
          />
        </div>
        <div class="my-3 d-sm-flex align-items-center">
          <label for=""
            >Profile Picture <small class="text-secondary">(optinal) </small> :
          </label>
          <input
            type="file"
            class="ml-3"
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

        <div class="text-right mt-4">
          <div class="btn btn-primary mx-4 mb-3">Sign Up</div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
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
    ...mapGetters(["CurrentAccount"]),
    ...mapGetters(["ChainId"]),
  },
  mounted() {
    // this.getLocation()
  },
  methods: {
    // ...mapActions(["connectMetamask"]),
    // ...mapActions(["checkWalletIsConnected"]),
    async handelFile(file) {
      const added = await client.add(file);
      this.imgHash = added[0].hash;
      // console.log( this.imgHash)
    },
    // getLocation(){
    //   console.log(window.location.href)
    // }
  },
};
</script>
<style lang="scss" scoped>
.form {
  background: #111e27;
  color: white;
  max-width: 600px;
  border-radius: 10px;
   margin-top: 50px;

  .account {
    font-size: 11px;
    background: #d3f3fd;
    border-bottom: 2px solid #838383;
  }
  input.userNume {
    outline: none;
    border: none;
    border-bottom: 2px solid #838383;
    background: #d3f3fd;
  }
  .profil-img {
    width: 250px;
    height: 250px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  @media (min-width: 576px) {
    .account {
      font-size: 1rem;
    }
  }
}
</style>
