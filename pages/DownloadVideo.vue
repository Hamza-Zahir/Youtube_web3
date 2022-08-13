<template>
  <div class="AddVideo text-dark fw-600 p-2">
    <div class="form p-2 mx-auto">
      <h4 class="p-2 border-bottom">Download videos</h4>
      <form action="">
        <div class="my-3 d-sm-flex align-items-center">
          <label for="" class="col-sm-3">video : </label>
          <input
            type="file"
            class="px-2 py-1 col fw-600"
            @change="
              (e) => {
                handelFile(e.target.files[0]);
              }
            "
          />
        </div>
        <div class="my-3 d-sm-flex align-items-center">
          <label for="" class="col-sm-3">Video Title : </label>
          <input
            type="text"
            name="VideoTitle"
            id=""
            placeholder="Video title"
            class="VideoTitle px-2 py-1 col fw-600"
            accept=".mp4, .mkv .ogg .wmv"
            @input="
              (e) => {
                videoTitle = e.target.value;
              }
            "
          />
        </div>

        <div class="my-3 d-sm-flex align-items-center">
          <label for="" class="col-sm-3">Video Type : </label>
          <select
            name=""
            id=""
            class="p-1 col fw-600"
            :class="!videoType ? 'text-secondary' : ''"
            @change="
              (e) => {
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
              value="Type"
            >
              {{ Type }}
            </option>
          </select>
        </div>
        <div class="mx-auto text-center" v-if="videoHash">
          <video
            :src="`https://ipfs.infura.io/ipfs/${videoHash}`"
            controls
            class="mx-auto "
          ></video>
        </div>

        <div class="text-right mt-4">
          <div class="btn btn-primary mx-4 mb-3">Add Video</div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import videosTypes from "~/json/videos_types.json";
import create from "ipfs-http-client";
const client = new create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});
export default {
  data() {
    return {
      videosTypes,
      videoHash: "",
      videoType: "",
      videoTitle: "",
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
    async handelFile(file) {
      const added = await client.add(file);
      this.videoHash = added[0].hash;
      console.log(this.videoHash);
    },
    // getLocation() {
    //   console.log(window.location.href);
    // },
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
  video{
    max-width: 100%;
  }
}
</style>
