<template>
    <div>
        <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
        <div class="relative mt-1 rounded-md shadow-sm">
            <input v-model="value" :id="id" :type="type" :class="{
                'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500': error,
                'border-gray-300 text-indigo-900 focus:ring-indigo-500 focus:border-indigo-500': !error
            }" class="block w-full pr-10 rounded-md focus:outline-none sm:text-sm" autocomplete="off">
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" v-if="error">
                <ExclamationCircleIcon class="w-5 h-5 text-red-500" aria-hidden="true" />
            </div>
        </div>
        <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/24/solid';
import { computed } from 'vue';
const props = defineProps(['modelValue', 'label', 'error', 'type']);
const emit = defineEmits(['update:modelValue'])
const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

</script>

<style scoped></style>