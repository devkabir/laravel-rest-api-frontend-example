<template>
  <li>
    <div class="relative pb-8">
      <span aria-hidden="true" class="absolute top-5 left-5 -ml-px h-full w-0.5 "></span>
      <div class="relative flex items-start space-x-3">
        <div class="relative">
          <img alt="" class="flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full"
            src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80">
        </div>
        <div class="flex-1 min-w-0">
          <div>
            <div class="text-sm">
              <a class="font-medium text-gray-900" href="#">{{ comment?.user?.name }}</a>
            </div>
            <p class="mt-0.5 text-sm text-gray-500">Commented on {{ comment?.created_at
            }}</p>
          </div>
          <div class="mt-2 text-sm text-gray-700">
            <p>{{ comment?.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
defineProps({
  comment: {
    type: Object,
    required: true
  }
})
</script>

<style scoped></style>