<template>
    <div class="space-y-6">
        <TextInput label="Email" type="email" v-model="loginFrom.email" />
        <TextInput label="Password" type="password" v-model="loginFrom.password" />
        <div class="flex items-center justify-between">
            <LoadingButton :loading="false" @click="login" />
            <a href="/auth/register">Need an account?</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import TextInput from '../form/TextInput.vue';
import LoadingButton from '../form/LoadingButton.vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const { loginFrom } = storeToRefs(useUserStore());
const { login } = useUserStore();
</script>

<style scoped></style>