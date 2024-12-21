import { ref, onMounted, watch } from "vue";

export const useDarkMode = () => {
  const isDarkMode = ref(false);

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem("darkMode", isDarkMode.value);
    updateDarkMode();
  };

  const updateDarkMode = () => {
    if (isDarkMode.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  onMounted(() => {
    isDarkMode.value = localStorage.getItem("darkMode") === "true";
    updateDarkMode();
  });

  return {
    isDarkMode,
    toggleDarkMode,
  };
};
