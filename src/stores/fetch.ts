// useFetch.ts
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export interface FetchStore {
  response: Ref<any>;
  error: Ref<string | null | undefined>;
  loading: Ref<boolean>;
  get: (url: string, options?: RequestInit) => Promise<void>;
  post: (url: string, body?: any, options?: RequestInit) => Promise<void>;
}

export const useFetchStore = defineStore("fetch", (): FetchStore => {
  const response: Ref<any> = ref();
  const error: Ref<string | null | undefined> = ref();
  const status: Ref<number> = ref(0);
  const loading: Ref<boolean> = ref(false);

  const handleResponse = async (res: Response): Promise<any> => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  };

  const get = async (url: string, options: RequestInit = {}): Promise<void> => {
    loading.value = true;
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + url, {
        ...options,
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
        mode: "cors",
      });
      response.value = await handleResponse(res);
      status.value = res.status;
      error.value = null;
    } catch (err: Response | any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const post = async (
    url: string,
    body?: any,
    options: RequestInit = {}
  ): Promise<void> => {
    loading.value = true;
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        mode: "cors",
        ...options,
      });
      response.value = await handleResponse(res);
      status.value = res.status;
      error.value = null;
    } catch (err: Response | any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Add other HTTP methods as needed: put, patch, delete, etc.

  return {
    response,
    error,
    loading,
    get,
    post,
  };
});
