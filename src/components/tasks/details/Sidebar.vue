<template>
    <h2 class="sr-only">Details</h2>
    <div class="gap-4 sm:flex sm:flex-wrap">
        <div class="flex items-center space-x-2">
            <div class="inline-flex items-center gap-2">
                <LockOpenIcon class="w-5 h-5 text-green-500" />
                <span class="text-sm font-medium text-green-700">Open Issue</span>
            </div>
        </div>
        <div class="flex items-center space-x-2">
            <ChatBubbleLeftEllipsisIcon class="w-5 h-5 text-gray-400" />
            <span class="text-sm font-medium text-gray-900">4 comments</span>
        </div>
        <div class="flex items-center space-x-2">
            <ClockIcon class="w-5 h-5 text-gray-400" />
            <span class="text-sm font-medium text-gray-900">Created on <time datetime="2020-12-02">Dec 2, 2020</time></span>
        </div>
    </div>
    <div class="py-6 mt-6 space-y-8 border-t border-b border-gray-200">
        <div>
            <h2 class="text-sm font-medium text-gray-500">Assignees</h2>
            <ul role="list" class="mt-3 space-y-3">
                <li class="flex justify-start">
                    <a href="#" class="flex items-center space-x-3">
                        <div class="flex-shrink-0">
                            <img class="w-5 h-5 rounded-full"
                                src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                                alt="">
                        </div>
                        <div class="text-sm font-medium text-gray-900">Eduardo Benz</div>
                    </a>
                </li>
            </ul>
        </div>

    </div>
</template>
<script setup lang="ts">
import { ChatBubbleLeftEllipsisIcon, ClockIcon, LockOpenIcon } from '@heroicons/vue/24/solid';

</script>
