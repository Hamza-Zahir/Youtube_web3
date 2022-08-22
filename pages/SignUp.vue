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
          <label for="" class="col-sm-3">User Name :</label>
          <div class="col p-0 m-0">
            <small class="text-danger" v-if="userNameImpti"
              >! The userName cannot be empty</small
            >
            <input
              type="text"
              name="userNume"
              id=""
              placeholder="User Name"
              class="userNume px-2 py-1 col"
              maxlength="25"
              @change="
                (e) => {
                  userNameImpti = false;
                  userName = e.target.value;
                }
              "
            />
          </div>
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
                storeFiles(e.target.files);
              }
            "
          />
        </div>
        <div class="mx-auto profil-img" v-if="imgHash">
          <img
            :src="`https://ipfs.io/ipfs/${imgHash}`"
            alt=""
            class="rounded-circle"
          />
        </div>

        <div class="text-right mt-4">
          <div class="btn btn-primary mx-4 mb-3" @click="SignUp()">Sign Up</div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import plugins from "../plugins";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";
// import axios from 'axios'
//  axios.create({
//   apiToken: process.env.apiToken
// })
let apiToken = process.env.API_TOKEN;


export default {
  data() {
    return {
      imgHash: "",
      userName: "",
      userNameImpti: false,
    };
  },
  computed: {
    ...mapGetters(["CurrentAccount"]),
    ...mapGetters(["ChainId"]),
  },
  mounted() {},
  methods: {
    ...mapActions(["checkWalletIsConnected"]),

    async SignUp() {
      if (!this.userName) {
        this.userNameImpti = true;
      } else if (this.CurrentAccount && this.userName && this.ChainId !== 97) {
        alert("please switch to binance testnet network");
      } else if (this.CurrentAccount && this.userName && this.ChainId == 97) {
        plugins
          .signUp(this.userName, this.imgHash, this.CurrentAccount)
          .then(async () => {
            await this.checkWalletIsConnected();
            this.imgHash = "";
            this.userName = "";
            this.userNameImpti = false;
          });
      }
    },
    async makeStorageClient() {
      const client = new Web3Storage({ token: apiToken });
      return client;
    },

    async storeFiles(_file) {
      try {
        const client = await this.makeStorageClient();
        const cid = await client.put(_file);
        this.imgHash = `${cid}/${_file[0].name}`;
      } catch (error) {
        console.log(error);
      }
    },
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
