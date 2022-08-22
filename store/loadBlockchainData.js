import Web3 from "web3";
import dataContract from "../build/contracts/Youtube.json";
const AbiCcontract = dataContract.abi;
const contractAddres = dataContract.networks[97].address;
import plugins from "../plugins";
const state = {
  AllVideos: [],
  MusicVideos: [],
  EducationalVideos: [],
  TouristDestinationsVideos: [],
  AnimalsVideos: [],
  NatureVideos: [],
};

const getters = {
  AllVideos: (state) => state.AllVideos,
  MusicVideos: (state) => state.MusicVideos,
  EducationalVideos: (state) => state.EducationalVideos,
  TouristDestinationsVideos: (state) => state.TouristDestinationsVideos,
  AnimalsVideos: (state) => state.AnimalsVideos,
  NatureVideos: (state) => state.NatureVideos,
};
const actions = {
  async getAllVideos({ commit }) {
    try {
      await commit("setdeleteAllVideos", []);
      const ethereum = await window.ethereum;
      const web3 = new Web3(Web3.givenProvider || ethereum);
      const YoutubeContract = new web3.eth.Contract(
        AbiCcontract,
        contractAddres
      );

      if (ethereum) {
        const _videosCount = await YoutubeContract.methods.videosCount().call();

        for (let i = 1; i <= Number(_videosCount); i++) {
          const _video = await plugins.getVideo(i);

          if (Number(_video.id) > 0) {
            commit("setAllVideos", _video);
            _video.videoTayp == "Music"
              ? commit("setMusicVideos", _video)
              : _video.videoTayp == "Educational"
              ? commit("setEducationalVideos", _video)
              : _video.videoTayp == "Tourist Destinations"
              ? commit("setTouristDestinationsVideos", _video)
              : _video.videoTayp == "Animals"
              ? commit("setAnimalsVideos", _video)
              : _video.videoTayp == "Nature"
              ? commit("setNatureVideos", _video)
              : undefined;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};
const mutations = {
  setAllVideos: (state, allVideos) => state.AllVideos.push(allVideos),
  setMusicVideos: (state, MusicVideo) => state.MusicVideos.push(MusicVideo),
  setEducationalVideos: (state, EducationalVideo) =>
    state.EducationalVideos.push(EducationalVideo),
  setTouristDestinationsVideos: (state, TouristDestinationsVideo) =>
    state.TouristDestinationsVideos.push(TouristDestinationsVideo),
  setAnimalsVideos: (state, AnimalsVideo) =>
    state.AnimalsVideos.push(AnimalsVideo),
  setNatureVideos: (state, NatureVideo) => state.NatureVideos.push(NatureVideo),
  setdeleteAllVideos: (state, emptyArray) => (state.AllVideos = emptyArray),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
