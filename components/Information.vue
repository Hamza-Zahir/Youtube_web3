<template>
  <div class="informaition text-center">
    <div v-if="ChainId === 'no ethereum'" class="px-2 py-3 content">
      <b-icon icon="info-circle" class="mr-2"></b-icon> Please
      <span class="conect" @click="connectMetamask">download</span> the Metamask
      wallet
    </div>
    <div v-if="ChainId !== 97 && ChainId !== 'no ethereum'" class="px-2 py-3  content">
      <b-icon icon="info-circle" class="mr-2"></b-icon> Please
      <span class="conect" @click="connectMetamask">switch network</span> to
      Binance Smart Chain Testnet to watch videos
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["CurrentAccount"]),
    ...mapGetters(["ChainId"]),
  },
  methods: {
    ...mapActions(["connectMetamask"]),
    ...mapActions(["checkWalletIsConnected"]),
  },
   mounted() {
    this.checkWalletIsConnected();
  },
};
</script>
<style lang="scss" scoped>
.informaition {
  font-weight: bold;
  background: #056c9c60;

  .content{
  border: 1px solid blue;
  }
  .conect {
    color: #b5edfc;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
