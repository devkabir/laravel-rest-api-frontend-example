import { defineStore, storeToRefs, type StoreDefinition } from "pinia";
import { ref, type Ref } from "vue";
import { useFetchStore } from "./fetch";
import router from "@/router";
import { useUserStore, type User } from "./user";

interface Task {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  creator_id: number;
  creator: User;
  users: User[];
  users_count: number;
  comments: Comment[];
  comments_count: number;
}

interface Comment {
  id: number;
  description: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  task_id: number;
}

interface TaskStore {
  tasks: Task[];
  task: Task;
  getTasks: () => void;
  getTask: () => void;
  addComment: () => void;
  loadTasks: () => void;
  createTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: () => void;
}

const setup = () => {
  const tasks: Ref<Task[]> = ref([]);
  const task: Ref<Task | undefined> = ref();
  const nextPage: Ref<number | null> = ref(1);
  const comment = ref("");

  const { response, error, loading } = storeToRefs(useFetchStore());
  const { user } = storeToRefs(useUserStore());
  const { get, post } = useFetchStore();

  const getTasks: TaskStore["getTasks"] = async () => {
    await get("/api/tasks");
    if (response.value) {
      tasks.value = response.value.data;
      nextPage.value = response.value.meta.last_page;
    }
  };

  const getTask: TaskStore["getTask"] = async () => {
    const id = router.currentRoute.value.params.id;
    await get(`/api/tasks/${id}`);
    if (response.value) {
      task.value = response.value.data;
    }
  };

  const addComment: TaskStore["addComment"] = async () => {
    await post(`/api/tasks/${task.value?.id}/comments`, {
      task_id: task.value?.id,
      user_id: user.value?.id,
      comment: comment.value,
    });
    if (response.value) {
      task.value?.comments.push(response.value.data);
      comment.value = "";
    }
  };

  const loadTasks: TaskStore["loadTasks"] = async () => {
    if (nextPage.value) {
      await get(`/api/tasks?page=${nextPage.value}`);
      if (response.value) {
        tasks.value = tasks.value.concat(response.value.data);
        if (
          response.value.meta.last_page !== response.value.meta.current_page
        ) {
          nextPage.value++;
        } else {
          nextPage.value = null;
        }
      }
    }
  };

  const createTask: TaskStore["createTask"] = (task) => {
    tasks.value.push(task);
  };

  const updateTask: TaskStore["updateTask"] = (task) => {
    tasks.value = tasks.value.map((t) => (t.id === task.id ? task : t));
  };

  const deleteTask: TaskStore["deleteTask"] = () => {
    tasks.value = tasks.value.filter((t) => t.id !== task.value?.id);
    if (router.currentRoute.value.name === "TaskDetails") {
      router.push({ name: "Tasks" });
    }
  };

  return {
    tasks,
    task,
    comment,
    nextPage,
    getTasks,
    getTask,
    addComment,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};

export const useTaskStore = defineStore("tasks", setup);
