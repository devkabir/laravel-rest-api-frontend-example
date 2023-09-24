import { defineStore, storeToRefs, type StoreDefinition } from "pinia";
import { ref, type Ref } from "vue";
import { useFetchStore } from "./fetch";
import router from "@/router";
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
  users: Ref<User[] | undefined>;
  loginForm: Ref<LoginForm>;
  registerForm: Ref<RegisterForm>;
  login: () => Promise<void>;
  register: () => Promise<void>;
  getUser: () => Promise<void>;
  getUsers: () => Promise<void>;
  resendEmailVerification: () => void;
  logout: () => void;
}

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
interface LoginForm {
  email: string;
  password: string;
}

const setup = (): UserStore => {
  const user: Ref<User | undefined> = ref();
  const users: Ref<[] | undefined> = ref([]);
  const loginForm: Ref<LoginForm> = ref({
    email: "admin@localhost.com",
    password: "password",
  });

  const registerForm: Ref<RegisterForm> = ref({
    name: "admin",
    email: "admin@localhost.com",
    password: "password",
    password_confirmation: "password",
  });

  const { response, status, loading } = storeToRefs(useFetchStore());
  const { get, post, csrf } = useFetchStore();

  const getUser: UserStore["getUser"] = async () => {
    await get("/api/user");
    user.value = response.value;
  };
  const getUsers: UserStore["getUsers"] = async () => {
    await get("/api/users");
    users.value = response.value;
  };

  const register = async () => {
    await csrf().then(async () => {
      await post("/register", registerForm.value);

      if (status.value === 409) {
        router.push({ name: "VerifyEmail" });
      }
    });
  };

  const login = async () => {
    await csrf().then(async () => {
      await post("/login", loginForm.value);
      if (!loading) {
        console.log(status.value);

        if (status.value === 204 || status.value === 200) {
          getUser();
          router.push({ name: "Dashboard" });
        } else alert("Invalid credentials");
      }
    });
  };

  const resendEmailVerification: UserStore["resendEmailVerification"] =
    async () => {
      await post("/email/verification-notification");
    };

  const logout = async () => {
    await post("/logout");
    user.value = undefined;
    router.push({ name: "Login" });
  };

  return {
    user,
    users,
    loginForm,
    registerForm,
    login,
    register,
    getUser,
    getUsers,
    resendEmailVerification,
    logout,
  };
};

export const useUserStore = defineStore("user", setup);
