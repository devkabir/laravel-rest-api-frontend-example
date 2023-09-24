<template>
  <p class="pb-4 danger" v-if="error"> {{ error }}</p>
  <div class="p-4  bg-white rounded shadow space-y-6" v-if="!loading">

    <TextInput label="Title" type="text" v-model="taskForm.name" />
    <TextAreaInput label="Description" v-model="taskForm.description" />

    <ul v-if="Object.keys(users).length" class="grid sm:grid-cols-3 gap-3 md:grid-cols-6 w-full">
      <label v-for="(name, id) in users" :key="id" :class="{
        'bg-indigo-600 border-transparent  text-white hover:bg-indigo-700': taskForm.selectedUsers.includes(id),
      }"
        class="border  rounded-md py-3 px-3 flex flex-wrap items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none">
        <input type="checkbox" v-model="taskForm.selectedUsers" :value="id" class="sr-only">
        <span class="block ml-3 font-medium truncate">{{ name }}</span>
      </label>
    </ul>
    <LoadingButton class="primary" @click="createTask" :loading="loading" :text="'Save'" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onUnmounted, ref } from 'vue';
import { useTaskStore } from '@/stores/task';
import { storeToRefs } from 'pinia';
import { useFetchStore } from '@/stores/fetch';
import { useUserStore } from '@/stores/user';
import TextInput from '../form/TextInput.vue';
import TextAreaInput from '../form/TextAreaInput.vue';
import LoadingButton from '../form/LoadingButton.vue';
const { error, loading } = storeToRefs(useFetchStore())
const { taskForm } = storeToRefs(useTaskStore())
const { users } = storeToRefs(useUserStore())
const { getUsers } = useUserStore()
const { createTask, getTask } = useTaskStore()
onBeforeMount(() => {
  taskForm.value.name = ''
  taskForm.value.description = ''
  taskForm.value.selectedUsers = []
  getUsers()
})

</script>

<style scoped></style>