<template>
  <div class="py-8 xl:py-10">
    <div class="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8 xl:grid xl:max-w-5xl xl:grid-cols-3">
      <div class="xl:col-span-2 xl:border-r xl:border-gray-200 xl:pr-8">
        <div>
          <div>
            <div class="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
              <div>
                <h1 class="text-2xl font-bold text-gray-900">ARIA attribute misspelled</h1>
                <p class="mt-2 text-sm text-gray-500">
                  #400 created by
                  <a class="font-medium text-gray-900" href="#">Hilary Mahy</a>

                </p>
              </div>
              <div class="flex mt-4 space-x-3 md:mt-0">
                <router-link to="/tasks/edit/1"
                  class="inline-flex justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
                  <PencilIcon class="w-5 h-5 text-gray-400" />
                  <span>Edit</span>
                </router-link>
                <button
                  class="inline-flex justify-center gap-2 px-4 py-2 text-sm font-medium text-white border border-gray-300 rounded-md shadow-sm bg-rose-500 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                  type="button">
                  <TrashIcon class="w-5 h-5 text-white" />
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
                Description...
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
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";
</script>

