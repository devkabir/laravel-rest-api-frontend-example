<template>
  <div class="relative bg-white rounded shadow">
    <div
      class="overflow-hidden border border-gray-300 rounded-lg shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
      <label for="title" class="sr-only">Task Title</label>
      <input type="text" id="title"
        class="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
        placeholder="Task Name">
      <label for="description" class="sr-only">Description</label>
      <textarea rows="2" name="description" id="description"
        class="block w-full py-0 placeholder-gray-500 border-0 resize-none focus:ring-0 sm:text-sm"
        placeholder="Write task details..."></textarea>

      <!-- Spacer element to match the height of the toolbar -->
      <div aria-hidden="true">
        <div class="py-2">
          <div class="h-9"></div>
        </div>
        <div class="h-px"></div>
        <div class="py-2">
          <div class="py-px">
            <div class="h-9"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 inset-x-px">
      <!-- Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. -->
      <div class="flex justify-end px-2 py-2 space-x-2 flex-nowrap sm:px-3">



      </div>
      <div class="flex items-center justify-between px-2 py-2 space-x-3 border-t border-gray-200 sm:px-3">
        <div class="flex">
          <div class="flex-shrink-0">
            <label id="listbox-label" class="sr-only"> Assign </label>
            <div class="relative">
              <button type="button" @click="showUsers = !showUsers"
                class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 rounded-full whitespace-nowrap bg-gray-50 hover:bg-gray-100 sm:px-3"
                aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">

                <UserCircleIcon class="flex-shrink-0 w-5 h-5 text-gray-300 sm:-ml-1" />

                <!-- Selected user avatar, show/hide based on listbox state. -->
                <img
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="" class="flex-shrink-0 w-5 h-5 rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="" class="flex-shrink-0 w-5 h-5 rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="" class="flex-shrink-0 w-5 h-5 rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="" class="flex-shrink-0 w-5 h-5 rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="" class="flex-shrink-0 w-5 h-5 rounded-full">

                <!-- Selected: "text-gray-900" -->
                <span class="hidden truncate sm:ml-2 sm:block">Assign</span>
              </button>


              <transition enter-active-class="transition duration-100 ease-out" enter-from-class="opacity-0"
                enter-to-class="opacity-100" leave-active-class="transition duration-75 ease-in"
                leave-from-class="opacity-100" leave-to-class="opacity-0">
                <ul
                  class="absolute right-0 z-10 py-3 mt-1 overflow-auto text-base bg-white rounded-lg shadow max-h-56 w-52 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-0"
                  v-if="showUsers">

                  <li class="relative px-3 py-2 bg-white cursor-default select-none" id="listbox-option-0" role="option">
                    <div class="flex items-center">
                      <UserCircleIcon class="flex-shrink-0 w-5 h-5 text-gray-400" />
                      <span class="block ml-3 font-medium truncate">Unassigned</span>
                    </div>
                  </li>

                  <li class="relative px-3 py-2 bg-gray-100 cursor-default select-none" id="listbox-option-1"
                    role="option">
                    <div class="flex items-center">
                      <img
                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="" class="flex-shrink-0 w-5 h-5 rounded-full">
                      <span class="block ml-3 font-medium truncate">Wade Cooper</span>
                    </div>
                  </li>

                </ul>
              </transition>
            </div>
          </div>
        </div>
        <div class="flex flex-shrink-0 gap-x-5">
          <button type="button" class="secondary" @click="$router.back">Back</button>
          <button type="button" class="primary">Create</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TextInput from '../form/TextInput.vue';
const showUsers = ref(false)

</script>

<style scoped></style>