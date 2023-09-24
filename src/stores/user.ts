import { defineStore, storeToRefs, type StoreDefinition } from "pinia";
import { ref, type Ref } from "vue";
import { useFetchStore } from "./fetch";
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}

export interface UserStore {
  user: Ref<User | undefined>;
  loginFrom: Ref<LoginForm>;
  login: () => Promise<void>;
  getUser: () => Promise<void>;
  resendEmailVerification: () => void;
}

interface LoginForm {
  email: string;
  password: string;
}

const setup = (): UserStore => {
  const user: Ref<User | undefined> = ref();
  const loginFrom: Ref<LoginForm> = ref({
    email: "jacky.veum@example.com",
    password: "password",
  });

  const { response, error, loading } = storeToRefs(useFetchStore());
  const { get, post } = useFetchStore();

  const getUser: UserStore["getUser"] = async () => {
    await get("/api/user");
    if (response.value) {
      user.value = response.value;
    }
  };

  const login = async () => {
    await get("/sanctum/csrf-cookie").then((response) => {
      console.log(response);
    });
  };

  const resendEmailVerification: UserStore["resendEmailVerification"] = () => {
    post("/email/resend-verification");
  };

  return {
    user,
    loginFrom,
    login,
    getUser,
    resendEmailVerification,
  };
};

export const useUserStore = defineStore("user", setup);
