// useFetch.ts
import type { AxiosError } from "axios";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import Axios from "axios";
import router from "@/router";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

axios.interceptors.response.use(
  (resp) => {
    console.log("response from fetch.ts", resp);

    if (resp.status === 204) {
      router.push({ name: "Dashboard" });
      return resp;
    }

    return resp;
  },
  (error) => {
    console.log("error from fetch.ts", error.response.status);
    if (error.response.status === 401) {
      router.push({ name: "Login" });
    } else if (error.response.status === 409) {
      router.push({ name: "VerifyEmail" });
    }
    return Promise.reject(error);
  }
);
export interface FetchStore {
  response: Ref<any>;
  status: Ref<number>;
  error: Ref<string | null | undefined>;
  loading: Ref<boolean>;
  csrf: () => Promise<any>;
  get: (url: string) => Promise<void>;
  post: (url: string, data?: any) => Promise<void>;
}

export const useFetchStore = defineStore("fetch", (): FetchStore => {
  const response: Ref<any> = ref();
  const error: Ref<string | null | undefined> = ref();
  const status: Ref<number> = ref(0);
  const loading: Ref<boolean> = ref(false);

  const csrf = () => axios.get("/sanctum/csrf-cookie");
  const get = async (url: string): Promise<void> => {
    try {
      const res = await axios.get(url);
      status.value = res.status;
      response.value = res.data;
    } catch (err: AxiosError | any) {
      error.value = err.response.data.message;
    } finally {
      loading.value = false;
    }
  };

  const post = async (url: string, data: any): Promise<void> => {
    loading.value = true;

    try {
      const res = await axios.post(url, data);
      status.value = res.status;
      response.value = res.data;
    } catch (err: AxiosError | any) {
      error.value = err.response.data.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    response,
    status,
    error,
    loading,
    csrf,
    get,
    post,
  };
});
