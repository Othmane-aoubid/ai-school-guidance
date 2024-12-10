import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDataStore = defineStore('data', () => {
  const profilePic = ref(null); // For storing the profile picture

  const setProfilePic = (url) => {
    profilePic.value = url;
  };

  const clearData = () => {
    profilePic.value = null;
  };

  return {
    profilePic,
    setProfilePic,
    clearData,
  };
});
