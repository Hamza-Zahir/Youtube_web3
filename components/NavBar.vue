<template>

  <div class="NavBar py-2 mx-auto justify-content-lg-center">
    <nuxt-link to="/" class="link"> All Content </nuxt-link>
    <nuxt-link to="/Music" class="link">Music</nuxt-link>
    <nuxt-link to="/Educational" class="link">Educational</nuxt-link>
    <nuxt-link to="/TouristDestinations" class="link">Tourist Destinations</nuxt-link>
    <nuxt-link to="/Animals" class="link">Animals</nuxt-link>
    <nuxt-link to="/Nature" class="link">Nature</nuxt-link>
  </div>

</template>

<style lang="scss" scoped>
.NavBar {
  border-bottom: 1px solid #505050;
  color: #f5efef;
  padding: 6px 10px;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  overflow: scroll;
  font-size: 14px;

  @media (min-width: 576px) {
    font-size: 1rem;
  }
  &::-webkit-scrollbar {
    display: none;
  }

  .link {
    text-decoration: none;
    color: #d3d0d0;
    padding: 6px 15px;
    font-weight: 600;
    margin: 0 5px;
    min-width: fit-content;
    border: 1px solid #505050;
    border-radius: 30px;

    &:hover {
      color: white;
      background: #5e5e5e;
    }
  }
  a.nuxt-link-exact-active {
    color: white;
    background: #5e5e5e;
    border: 1px solid #adadad;
  }
}
</style>
