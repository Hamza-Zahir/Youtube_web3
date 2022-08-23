<template>
  <div class="">
    <Header />
    <div
      v-if="deployedSuccessfully"
      class="deployedSuccessfully m-2 rounded p-2"
    >
      {{ deployedSuccessfully }}
      <b-icon icon="x-lg" @click="deployedSuccessfully = ''"></b-icon>
    </div>
    <div v-if="deployedError" class="deployedError m-2 rounded p-2">
      {{ deployedError }}
      <b-icon icon="x-lg" @click="deployedError = ''"></b-icon>
    </div>
    <div class="d-flex flex-wrap mt-3">
      <div v-if="User.profileImag" class=" py-3 col-12 col-sm-8 col-lg-6 col-xl-5 mx-auto">
        <div class="box p-2 py-4 text-center border rounded h-100">
          <h3 class="text-center">Delete profile picture</h3>
          <div class="mt-5 mr-2">
            <div
              class="btn b-sh-l btn-primary"
              @click="
                () => {
                  deployedError = '';
                  deployedSuccessfully = '';
                  DeleteProfilePicture();
                }
              "
            >
              Delete profile picture
            </div>
          </div>
        </div>
      </div>
      <div class="py-3 col-12 col-sm-8 col-lg-6 col-xl-5 mx-auto">
        <div class="box p-2 py-4 text-center border rounded">
          <h3 class="text-center">Change Username</h3>
          <div class="my-3 fw-600">
            <input
              type="text"
              name=""
              id=""
              placeholder="User Name"
              class="fw-600 px-2 py-1 col my-3"
              maxlength="25"
              @input="
                (e) => {
                  deployedError = '';
                  deployedSuccessfully = '';
                  userName = e.target.value;
                }
              "
            />
            <div class="text-right mt-3 mr-2">
              <div
                v-if="userName"
                class="btn b-sh-l btn-primary"
                @click="changeName()"
              >
                Change Username
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="py-3 col-12 col-sm-8 col-lg-6 col-xl-5 mx-auto">
        <div class="box p-2 py-4 text-center border rounded">
          <h3 class="text-center">Change profile picture</h3>
          <div class="my-3 fw-600 py-1">
            <input
              type="file"
              class="fw-600 px-2 my-3"
              @change="
                (e) => {
                  imgHash = '';
                  deployedError = '';
                  deployedSuccessfully = '';
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
          <div v-if="Hashcreated" class="loading mx-auto my-2"></div>
          <div class="text-right mt-3 mr-2">
            <div
              v-if="imgHash"
              class="btn b-sh-l btn-primary"
              @click="changeProfileImag()"
            >
              Change profile picture
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Header from "~/components/UserProfil/Header.vue";
import plugins from "~/plugins";
const apiToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDc2MjZiNDgwMjk4RjYwRTJEREFmNjQwOEM0M2ExZUVkMjk2Qzg1RmIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjA5MjUyNzg4ODksIm5hbWUiOiJ5b3V0dWJlX3dlYjMifQ.slLeKvOZA6bY4jadot3YkzUdx9_Ki-HsknM3BJdHV28";

export default {
  data() {
    return {
      imgHash: "",
      userName: "",
      Hashcreated: false,
      deployedError: "",
      deployedSuccessfully: "",
    };
  },
  computed: {
    ...mapGetters(["CurrentAccount"]),
    ...mapGetters(["ChainId"]),
    ...mapGetters(["User"]),
  },

  methods: {
    ...mapActions(["checkWalletIsConnected"]),

    async changeName() {
      if (!this.CurrentAccount) {
        alert("please connect your wallet first");
      } else if (this.CurrentAccount && this.userName && this.ChainId !== 97) {
        alert("please switch to binance testnet network");
      } else if (this.CurrentAccount && this.userName && this.ChainId == 97) {
        plugins
          .changeName(this.userName, this.CurrentAccount)
          .then(async (ImagChenged) => {
            this.imgHash = "";
            if (ImagChenged) {
              this.deployedSuccessfully = "Name Chenged successfully";
              await this.checkWalletIsConnected();
            } else {
              this.deployedError =
                "(Name not Chenged) An error occurred, please try again";
            }
          });
      }
    },
    async changeProfileImag() {
      if (!this.CurrentAccount) {
        alert("please connect your wallet first");
      } else if (this.ChainId !== 97) {
        alert("please switch to binance testnet network");
      } else if (this.ChainId == 97) {
        plugins
          .changeProfileImag(this.imgHash, this.CurrentAccount)
          .then(async (ImagChenged) => {
            this.imgHash = "";
            if (ImagChenged) {
              this.deployedSuccessfully = "imag Chenged successfully";
              await this.checkWalletIsConnected();
            } else {
              this.deployedError =
                "(imag not Chenged) An error occurred, please try again";
            }
          });
      }
    },
    async DeleteProfilePicture() {
      if (!this.CurrentAccount) {
        alert("please connect your wallet first");
      } else if (this.ChainId !== 97) {
        alert("please switch to binance testnet network");
      } else if (this.ChainId == 97) {
        plugins
          .changeProfileImag("", this.CurrentAccount)
          .then(async (ImagChenged) => {
            this.imgHash = "";
            if (ImagChenged) {
              this.deployedSuccessfully = "Profile Picture Delete successfully";
              await this.checkWalletIsConnected();
            } else {
              this.deployedError =
                "(Profile Picture not Deleted) An error occurred, please try again";
            }
          });
      }
    },
    // DeleteProfilePicture
    async makeStorageClient() {
      const { Web3Storage } = require("web3.storage/dist/bundle.esm.min.js");

      const client = new Web3Storage({ token: apiToken });
      return client;
    },

    async storeFiles(_file) {
      try {
        this.Hashcreated = true;
        const client = await this.makeStorageClient();
        const cid = await client.put(_file);
        this.imgHash = `${cid}/${_file[0].name}`;
        this.Hashcreated = false;
      } catch (error) {
        console.log(error);
        this.Hashcreated = false;
      }
    },
  },

  components: { Header },
};
</script>
<style lang="scss" scoped>
.box {
  background: #111120;
}
input {
  color: #000;
  outline: none;
  border: none;
  border-bottom: 2px solid #838383;
  background: #ffffff;
  max-width: 100%;
}
img {
  width: 160px;
  height: 160px;
}
.loading {
  width: 120px;
  height: 120px;
}
.deployedSuccessfully {
  background: #17b346;
  color: white;
  max-width: 300px;
  display: flex;
  justify-content: space-between;
}
.deployedError {
  background: #d64f4f;
  color: white;
  max-width: 300px;
  display: flex;
  justify-content: space-between;
}
</style>
