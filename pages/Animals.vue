<template>
  <div class="px-2 px-sm-4 px-md-5">
    <NavBar />
    <div class="d-flex flex-wrap mt-3">
      <div
        class="py-2 col-12 col-sm-6 col-lg-4 col-xl-3"
        v-for="i in 20"
        :key="i"
      >
        <videoCard />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
