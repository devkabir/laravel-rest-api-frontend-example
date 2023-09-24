<template>
  <div v-if="loading"></div>
  <div v-else class="py-8 xl:py-10">
    <div class="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8 xl:grid xl:max-w-5xl xl:grid-cols-3">
      <div class="xl:col-span-2 xl:border-r xl:border-gray-200 xl:pr-8">
        <div>
          <div>
            <div class="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
              <div>
                <h1 class="text-2xl font-bold text-gray-900">{{ task?.name }}</h1>
                <p class="mt-2 text-sm text-gray-500">
                  #{{ task?.id }} created by
                  <a class="font-medium text-gray-900" href="#">{{ task?.creator.name }}</a>
                </p>
              </div>
              <div class="flex mt-4 space-x-3 md:mt-0">
                <button class="tertiary" @click="$router.push({ name: 'EditTask', params: { id: task?.id } })">
                  <PencilIcon />
                  <span>Edit</span>
                </button>
                <button class="danger" @click="performDelete">
                  <TrashIcon />
                  <span>Delete</span>
                </button>
              </div>
            </div>
            <aside class="mt-8 xl:hidden">
              <Sidebar />
            </aside>
            <div class="py-3 xl:pt-6 xl:pb-0">
              <h2 class="sr-only">Description</h2>
              <div class="prose max-w-none">
                {{ task?.description }}
              </div>
            </div>
          </div>
        </div>
        <Comments />
      </div>
      <aside class="hidden xl:block xl:pl-8">
        <Sidebar />
      </aside>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Comments from "@/components/tasks/details/Comments.vue";
import Sidebar from "@/components/tasks/details/Sidebar.vue";
import { useFetchStore } from "@/stores/fetch";
import { useTaskStore } from "@/stores/task";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import { onBeforeMount, onMounted } from "vue";

const { task } = storeToRefs(useTaskStore());
const { getTask, deleteTask } = useTaskStore();
const { loading, error } = storeToRefs(useFetchStore());
const performDelete = () => {
  if (!task.value) return;
  if (confirm("Are you sure you want to delete this task?")) {
    deleteTask();
  }
}
onBeforeMount(getTask);
</script>

