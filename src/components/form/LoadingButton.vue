<template>
    <button type="button" class="primary">
        <ArrowPathIcon v-if="loading" class="w-5 h-5 text-white stroke-2 animate-spin" />
        <span v-else>{{ text }}</span>
    </button>
</template>

<script setup lang="ts">
import { ArrowPathIcon } from '@heroicons/vue/24/outline';

defineProps({
    text: {
        type: String,
        default: 'Save'
    },
    loading: {
        type: Boolean,
        default: false
    }
})
</script>

<style scoped></style>