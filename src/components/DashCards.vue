<template>
    <div class="p-8" v-if="user">
        Welcome, {{ user?.name }}
    </div>
</template>

<script setup lang="ts">
import { useFetchStore } from '@/stores/fetch';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const { loading } = storeToRefs(useFetchStore())
const { user } = storeToRefs(useUserStore())
</script>

<style scoped></style>