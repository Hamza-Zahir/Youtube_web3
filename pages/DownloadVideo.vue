<template>
  <div class="AddVideo text-dark fw-600 p-2">
    <div class="form p-2 mx-auto">
      <h4 class="p-2 border-bottom">Download videos</h4>
      <form action="">
        <div class="my-3 d-sm-flex align-items-center">
          <label for="" class="col-sm-3">video : </label>
          <div class="col p-0 m-0">
            <small class="text-danger" v-if="videoHashError"
              >! {{ videoHashError }}</small
            >
            <div class="d-flex">
              <input
                type="file"
                class="px-2 py-1 col fw-600"
                @change="
                  (e) => {
                    videoHashError = '';
                    storeFiles(e.target.files);
                  }
                "
              />
              <span class="text-light">{{ Hashcreated }}</span>
            </div>
          </div>
        </div>
        <div class="my-3 d-sm-flex align-items-center">
          <label for="" class="col-sm-3">Video Title : </label>
          <div class="col p-0 m-0">
            <small class="text-danger" v-if="videoTitleError"
              >! {{ videoTitleError }}</small
            >
            <input
              type="text"
              name="VideoTitle"
              id=""
              :value="videoTitle"
              placeholder="Video title"
              class="VideoTitle px-2 py-1 col fw-600"
              accept=".mp4, .mkv .ogg .wmv"
              @input="
                (e) => {
                  videoTitleError = '';
                  videoTitle = e.target.value;
                }
              "
            />
          </div>
        </div>

        <div class="my-3 d-sm-flex align-items-center">
          <label for="" class="col-sm-3">Video Type : </label>
          <div class="col p-0 m-0">
            <small class="text-danger" v-if="videoTypeError"
              >! {{ videoTypeError }}</small
            >
            <select
              name=""
              id=""
              class="p-1 col fw-600"
              :class="!videoType ? 'text-secondary' : ''"
              @change="
                (e) => {
                  videoTypeError = '';
                  videoType = e.target.value;
                }
              "
            >
              <option value="" class="fw-600 text-secondary">
                Choose your video type
              </option>
              <option
                v-for="Type in videosTypes"
                :key="Type"
                class="fw-600 text-dark"
                :value="Type"
              >
                {{ Type }}
              </option>
            </select>
          </div>
        </div>
        <div class="mx-auto text-center" v-if="videoHash">
          <video
            :src="`https://ipfs.io/ipfs/${videoHash}`"
            controls
            class="mx-auto"
          ></video>
        </div>

        <div class="text-right mt-4">
          <div
            class="btn btn-primary mx-4 mb-3"
            @click="
              () => {
                downlodVideo();
              }
            "
          >
            Add Video
          </div>
        </div>
      </form>
      <!-- <img src="../assets/images/youtube.png" alt=""> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import videosTypes from "~/json/videos_types.json";
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
      videosTypes,
      videoHash: "",
      Hashcreated: false,
      videoType: "",
      videoTitle: "",
      videoTitleError: "",
      videoHashError: "",
      videoTypeError: "",
    };
  },
  computed: {
    ...mapGetters(["CurrentAccount"]),
    ...mapGetters(["ChainId"]),
  },
  mounted() {
    // this.downlodVideo()
  },
  methods: {
    // -------------------------------------
    async makeStorageClient() {
      const client = new Web3Storage({ token: apiToken });
      return client;
    },
    // ..........................................

    async storeFiles (_file) {
      try {
        this.Hashcreated = true;
        // const client = new Web3Storage({ token: apiToken });
        const client = await this.makeStorageClient();
        const cid = await client.put(_file);
        this.videoHash = `${cid}/${_file[0].name}`;
        this.Hashcreated = false;
        // ....................................................................
      } catch (error) {
        console.log(error);
        this.Hashcreated = false;
      }
    },
    async downlodVideo() {
      try {

        if (
          this.videoHash &&
          this.videoTitle &&
          this.videoType &&
          this.CurrentAccount &&
          this.ChainId == 97
        ) {
          await plugins.downlodVideo(
            this.videoHash,
            this.videoType,
            this.videoTitle,
            this.CurrentAccount
          ).then(()=>{
             videosTypes,
      this.videoHash= ""
      this.Hashcreated=false
      this.videoType= ""
      this.videoTitle= ""
      this.videoTitleError= ""
      this.videoHashError= ""
      this.videoTypeError= ""
          })
        } else {
          if (!this.videoHash) {
            this.videoHashError = "Please upload the video file first";
          }
          if (!this.videoTitle) {
            this.videoTitleError = "Please give title to video";
          }
          if (!this.videoType) {
            this.videoTypeError = "Please select a video type";
          } else if (!this.CurrentAccount) {
            alert("please connect your wallet first");
          } else if (this.ChainId !== 97) {
            alert("please switch to binance testnet network");
          }
        }
      } catch (error) {
        console.log(error);
           videosTypes,
      this.videoHash= ""
      this.Hashcreated=false
      this.videoType= ""
      this.videoTitle= ""
      this.videoTitleError= ""
      this.videoHashError= ""
      this.videoTypeError= ""
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.form {
  background: #17222b;
  color: white;
  max-width: 600px;
  border-radius: 10px;
  margin-top: 50px;

  input.VideoTitle,
  select {
    outline: none;
    border: none;
    border-bottom: 2px solid #838383;
    background: #d3f3fd;
  }
  video {
    max-width: 100%;
  }
}
</style>
