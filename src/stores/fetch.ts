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

interface RegistrationFormError {
  name: string[];
  email: string[];
  password: string[];
}

interface TaskFormError {
  name: string[];
  description: string[];
  creator_id: string[];
  selectedUsers: string[];
}

export interface FetchStore {
  response: Ref<any>;
  status: Ref<number>;
  error: Ref<string | null | undefined>;
  formError: Ref<RegistrationFormError | TaskFormError | any>;
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
  const formError: Ref<RegistrationFormError | TaskFormError | any> = ref([]);
  const status: Ref<number> = ref(0);
  const loading: Ref<boolean> = ref(false);
  axios.interceptors.request.use(
    (config) => {
      loading.value = true;
      status.value = 0;
      formError.value = [];
      error.value = null;
      response.value = null;
      return config;
    }
  )
  axios.interceptors.response.use(
    (resp) => {
      response.value = resp.data;
      status.value = resp.status;
      loading.value = false;
      if (resp.status === 200 && resp.request.responseURL === import.meta.env.VITE_API_URL) {
        router.push({ name: "Dashboard" });
      }
      if (resp.status === 204 && resp.request.responseURL === import.meta.env.VITE_API_URL + 'login') {
        router.push({ name: "Dashboard" });
      }
      if (resp.status === 401) {
        router.push({ name: "Login" });
      }
      return resp;
    },
    (error) => {
      if (error.response.status === 401) {
        router.push({ name: "Login" });
      } else if (error.response.status === 409) {
        router.push({ name: "VerifyEmail" });
      } else if (error.response.status === 422) {
        formError.value = error.response.data.errors;
        status.value = error.response.status;
      } else if (error.response.status === 403) {
        error.value = error.response.data.message;
        status.value = error.response.status;
      }
      loading.value = false;
      return Promise.reject(error);
    },
  );


  const makeRequest = async (
    method: "get" | "post" | "put" | "patch" | "delete",
    url: string,
    data?: any
  ): Promise<void> => {

    let res;
    if (data) {
      res = await axios[method](url, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
    } else {
      res = await axios[method](url);
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
    formError,
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
