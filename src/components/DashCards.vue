<template>
    <div class="p-8">
        Welcome, {{ user.name }}
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const { user } = storeToRefs(useUserStore())
</script>

<style scoped></style>