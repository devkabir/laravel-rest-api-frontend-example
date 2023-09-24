import { defineStore, storeToRefs, type StoreDefinition } from "pinia";
import { reactive, ref, type Ref } from "vue";
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
  comments_count: number | null;
}

interface Comment {
  id: number;
  description: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  task_id: number;
}

interface TaskForm {
  name: string | undefined;
  description: string | undefined;
  creator_id: number | undefined;
  selectedUsers: string[] | undefined;
}

interface TaskStore {
  tasks: Task[];
  task: Task;
  taskForm: Ref<TaskForm>;
  getTasks: () => void;
  getTask: () => void;
  addComment: () => void;
  loadTasks: () => void;
  createTask: () => void;
  // updateTask: () => void;
  deleteTask: (id: number) => void;
}

const setup = () => {
  const tasks: Ref<Task[]> = ref([]);
  const task: Ref<Task | undefined> = ref();

  const nextPage: Ref<number> = ref(0);
  const comment = ref("");

  const { response, error, loading } = storeToRefs(useFetchStore());
  const { user } = storeToRefs(useUserStore());
  const { get, post, patch, deleteItem } = useFetchStore();
  const taskForm: TaskForm = reactive({
    name: "",
    description: "",
    creator_id: user.value?.id,
    selectedUsers: [],
  });

  const selectedUsers = ref([]);


  const getTasks: TaskStore["getTasks"] = async () => {
    tasks.value = [];
    await get("/api/tasks");
    if (response.value) {
      tasks.value = response.value.data;
      nextPage.value = response.value.meta.last_page;
    }
  };

  const getTask: TaskStore["getTask"] = async () => {
    task.value = undefined;
    taskForm.name = "";
    taskForm.description = "";
    taskForm.creator_id = undefined;
    taskForm.selectedUsers = [];
    const id = router.currentRoute.value.params.id;
    if (!id) return;
    await get(`/api/tasks/${id}`);
    if (response.value) {
      task.value = response.value.data;
      taskForm.name = task.value?.name;
      taskForm.description = task.value?.description;
      taskForm.creator_id = task.value?.creator_id;
      taskForm.selectedUsers = task.value?.users.map((u) => u.id.toString());
    }
  };

  const addComment: TaskStore["addComment"] = async () => {
    await post(`/api/tasks/${task.value?.id}/comments`, {
      task_id: task.value?.id,
      user_id: user.value?.id,
      comment: comment.value,
    });
    if (response.value) {
      if (task.value) {
        task.value.comments.data.push(response.value.data);
        task.value.comments_count = task.value.comments.length;
      }
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

  const createTask: TaskStore["createTask"] = async () => {
    if (task.value) {
      await patch(`/api/tasks/${task.value.id}`, taskForm);
    } else {
      taskForm.creator_id = user.value?.id;
      await post("/api/tasks", taskForm);
    }

    if (response.value) {
      tasks.value.push(response.value.data);
      task.value = response.value.data;
      router.push({
        name: "TaskDetails",
        params: { id: response.value.data.id },
      });
    }
  };

  // const updateTask: TaskStore["updateTask"] = () => {
  //   tasks.value = tasks.value.map((t) => (t.id === task.id ? task : t));
  // };

  const deleteTask: TaskStore["deleteTask"] = async (id) => {
    task.value = undefined;
    comment.value = "";
    await deleteItem(`/api/tasks/${id}`);
    if (response.value) {
      tasks.value = tasks.value.filter((t) => t.id !== id);
      if (router.currentRoute.value.name === "TaskDetails") {
        router.push({ name: "Tasks" });
      }
    }
  };

  return {
    tasks,
    task,
    taskForm,
    comment,
    nextPage,
    getTasks,
    getTask,
    addComment,
    loadTasks,
    createTask,
    // updateTask,
    deleteTask,
  };
};

export const useTaskStore = defineStore("tasks", setup);
