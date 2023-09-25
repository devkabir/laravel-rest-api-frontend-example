<template>
    <p class="px-4 py-2 bg-rose-500 my-2 rounded shadow text-sm text-white" v-if="error && !formError">{{ error }}</p>
    <div class="space-y-6">
        <div class="grid gap-6">
            <TextInput label="Name" type="text" v-model="registerForm.name" :error="formError.name?.[0]" />
            <TextInput label="Email" type="email" v-model="registerForm.email" :error="formError.email?.[0]" />
            <TextInput label="Password" type="password" v-model="registerForm.password" :error="formError.password?.[0]" />
            <TextInput label="Confirm Password" type="password" v-model="registerForm.password_confirmation" />
        </div>
        <div class="flex items-center justify-between">
            <LoadingButton :loading="loading" @click="register" :text="'Register'" />
            <a href="/auth/login">Already have an account?</a>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import LoadingButton from '../form/LoadingButton.vue';
import TextInput from '../form/TextInput.vue';
import { useFetchStore } from '@/stores/fetch';
const { loading, error, formError, status } = storeToRefs(useFetchStore());
const { registerForm } = storeToRefs(useUserStore());
const { register } = useUserStore();

</script>

<style scoped></style>