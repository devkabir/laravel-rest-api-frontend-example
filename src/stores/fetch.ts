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

    // if (resp.status === 204) {
    //   router.push({ name: "Dashboard" });
    //   return resp;
    // }

    return resp;
  },
  (error) => {
    if (error.response.status === 401) {
      router.push({ name: "Login" });
    } else if (error.response.status === 409) {
      router.push({ name: "VerifyEmail" });
    } else if (error.response.status === 422) {
      throw error;
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
  put: (url: string, data?: any) => Promise<void>;
  patch: (url: string, data?: any) => Promise<void>;
  deleteItem: (url: string) => Promise<void>;
}



const createFetchStore = (): FetchStore => {
  const response: Ref<any> = ref();
  const error: Ref<string | null | undefined> = ref();
  const status: Ref<number> = ref(0);
  const loading: Ref<boolean> = ref(false);

  const makeRequest = async (
    method: "get" | "post" | "put" | "patch" | "delete",
    url: string,
    data?: any
  ): Promise<void> => {
    loading.value = true;

    try {
      let res;
      if (data) {
        res = await axios[method](url, data, {
          headers: { "Content-Type": "application/json" },
        });
      } else {
        res = await axios[method](url);
      }
      status.value = res.status;
      response.value = res.data;
    } catch (err: AxiosError | any) {
      error.value = err.response.data.message;
    } finally {
      loading.value = false;
    }
  };

  const csrf = () => makeRequest("get", "/sanctum/csrf-cookie");

  const get = async (url: string): Promise<void> => {
    await makeRequest("get", url);
  };

  const post = async (url: string, data?: any): Promise<void> => {
    await makeRequest("post", url, data);
  };

  const put = async (url: string, data?: any): Promise<void> => {
    await makeRequest("put", url, data);
  };

  const patch = async (url: string, data?: any): Promise<void> => {
    await makeRequest("patch", url, data);
  };

  const deleteItem = async (url: string): Promise<void> => {
    await makeRequest("delete", url);
  }

  return {
    response,
    error,
    status,
    loading,
    csrf,
    get,
    post,
    put,
    patch,
    deleteItem
  };
};

export const useFetchStore = defineStore("fetch", createFetchStore);
