import router from "@/router";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref({});
  const getUser = async () => {
    await fetch("https://taskflow.dev/api/user")
      .then((res) => res.json())
      .then((data) => {
        user.value = data;
        if (data.email_verified_at === null) {
          router.push("/auth/verify-email");
        }
      });
  };

  return {
    user,
    getUser,
  };
});
