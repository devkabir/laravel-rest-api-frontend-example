<template>
    <div class="space-y-6">
        <TextInput label="Email" type="email" v-model="loginForm.email" :error="formError.email?.[0]" />
        <TextInput label="Password" type="password" v-model="loginForm.password" :error="formError.password?.[0]" />
        <div class="flex items-center justify-between">
            <LoadingButton :loading="loading" @click="login" :text="'Login'" />
            <a href="/auth/register">Need an account?</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import TextInput from '../form/TextInput.vue';
import LoadingButton from '../form/LoadingButton.vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useFetchStore } from '@/stores/fetch';
import router from '@/router';

const { loading, status, formError } = storeToRefs(useFetchStore());
const { loginForm } = storeToRefs(useUserStore());
const { login } = useUserStore();
if (status.value === 200) {
    router.push({ name: 'Dashboard' });
}
</script>

<style scoped></style>