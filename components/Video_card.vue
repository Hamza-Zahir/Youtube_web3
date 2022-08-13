<template>
  <div class="text-light video_card">
    <nuxt-link to="/WtchVideo/1" class="text-light">
      <iframe
        class="video"
        src="https://www.youtube.com/embed/x5WNBPWZ21w"
      ></iframe>


    <div class="ml-2 mb-2 d-flex align-items- fw-bold">
      <div class="">
        <span
          class="userProfil rounded-circle d-flex justify-content-center align-items-center mr-1 mt-1"
        >
          H
        </span>
      </div>
      <div class="">
        <span class="title"
          >tetle of video elit. Unde, excepturi Lorem ipsum dolor sit amet.
        </span>
        <small class="text-secondary">user Name</small>
      </div>
      <b-icon icon="three-dots-vertical" class="cp mt-1 h5"></b-icon>
    </div>
    </nuxt-link>
  </div>
</template>
<style lang="scss" scoped>
.video_card {
  .userProfil {
    background: #41fac2;
    width: 25px;
    height: 25px;
  }
  .video {
    width: 100%;
    z-index: -1;
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
}
</style>
