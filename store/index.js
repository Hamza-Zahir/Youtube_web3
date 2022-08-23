import Web3 from "web3";
import plugins from "../plugins";

const state = {
  CurrentAccount: "",
  ChainId: "",
  User: "",
};

const getters = {
  CurrentAccount: (state) => state.CurrentAccount,
  ChainId: (state) => state.ChainId,
  User: (state) => state.User,
};
const actions = {
  async connectMetamask({ commit }) {
    const ethereum = window.ethereum;
    if (!ethereum) {
      window.open("https://metamask.io", "blank");
    } else {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      commit("setCurrentAccount", accounts[0]);

      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${Number(97).toString(16)}` }],
        });
        await ethereum.request({ method: "eth_chainId" }).then((resalt) => {
          commit("setChainId", Number(resalt));
        });
        // window.location.reload();
      } catch (switchError) {
        console.log(switchError);
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: `0x${Number(97).toString(16)}`,
                  chainName: "Binance Smart Chain Testnet",
                  nativeCurrency: {
                    name: "Binance Chain Native Token",
                    symbol: "BNB",
                    decimals: 18,
                  },
                  rpcUrls: [
                    "https://data-seed-prebsc-1-s1.binance.org:8545",
                    "https://data-seed-prebsc-2-s1.binance.org:8545",
                    "https://data-seed-prebsc-1-s2.binance.org:8545",
                    "https://data-seed-prebsc-2-s2.binance.org:8545",
                    "https://data-seed-prebsc-1-s3.binance.org:8545",
                    "https://data-seed-prebsc-2-s3.binance.org:8545",
                  ],
                  blockExplorerUrls: ["https://testnet.bscscan.com"],
                },
              ],
            });

            await ethereum.request({ method: "eth_chainId" }).then((resalt) => {
              commit("setChainId", Number(resalt));
            });
          } catch (error) {
            console.log(error);
          }
        }
      }
      if (this.state.CurrentAccount) {
        const _user = await plugins.getUserByAddress(this.state.CurrentAccount);
        if(Number(_user.id)){
          commit("setUser", _user);
        }

      }
    }
  },
  async checkWalletIsConnected({ commit }) {
    const ethereum = await window.ethereum;
    if (!ethereum) {
      commit("setChainId", "no ethereum");
    } else {
      let web3 = new Web3(Web3.givenProvider || ethereum);
      let accounts = await web3.eth.getAccounts();
      if (accounts.length) {
        commit("setCurrentAccount", accounts[0]);
      }
      await ethereum.request({ method: "eth_chainId" }).then((resalt) => {
        commit("setChainId", Number(resalt));
      });
      if (this.state.CurrentAccount) {
        const _user = await plugins.getUserByAddress(this.state.CurrentAccount);
        if(Number(_user.id)){
          commit("setUser", _user);
        }
      }
    }
    function handleAccountsChanged(accounts) {
      commit("setCurrentAccount", accounts[0]);
    }
    function handleChainChanged(_chainId) {
      commit("setChainId", Number(_chainId));
    }
    const handleDisconnect = () => {
      disconnect();
    };
    // ......................................

    ethereum.on("accountsChanged", handleAccountsChanged);
    ethereum.on("chainChanged", handleChainChanged);
    ethereum.on("disconnect", handleDisconnect);
  },


};
const mutations = {
  setCurrentAccount: (state, addres) => (state.CurrentAccount = addres),
  setChainId: (state, chainId) => (state.ChainId = chainId),
  setUser: (state, _user) => (state.User = _user),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
