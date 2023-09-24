<template>
  <section aria-labelledby="activity-title" class="mt-8 xl:mt-10" v-if="task">
    <div>
      <div class="divide-y divide-gray-200">
        <div class="pb-4">
          <h2 id="activity-title" class="text-lg font-medium text-gray-900">Comments</h2>
        </div>
        <div class="pt-6">
          <div class="flow-root">
            <ul class="-mb-8" role="list" v-if="task?.comments.length">
              <Comment v-for="comment in task?.comments" :key="comment.id" />
            </ul>
            <p v-else>No comments yet</p>
          </div>
          <div class="mt-6">
            <div class="flex space-x-3">
              <div class="flex-shrink-0">
                <div class="relative">
                  <img alt="" class="flex items-center justify-center w-10 h-10 rounded-full "
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80">
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div>
                  <label class="sr-only" for="comment">Comment</label>
                  <textarea id="comment"
                    class="block w-full border-gray-300 rounded-md shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                    v-model="comment" placeholder="Leave a comment" rows="3"></textarea>
                </div>
                <div class="flex items-center justify-end mt-6 space-x-4">
                  <LoadingButton class="primary" @click="addComment" :loading="loading" :text="'Add comment'" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import LoadingButton from "@/components/form/LoadingButton.vue";
import Comment from "@/components/tasks/details/Comment.vue";
import { useFetchStore } from "@/stores/fetch";
import { useTaskStore } from "@/stores/task";
import { storeToRefs } from "pinia";

const { task, comment } = storeToRefs(useTaskStore());
const { loading } = storeToRefs(useFetchStore());
const { addComment } = useTaskStore();
</script>