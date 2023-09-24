<template>
    <div class="space-y-6">
        <p class="px-5 py-2 rounded danger" v-if="error"> {{ error }}</p>
        <div class="grid grid-cols-2 gap-6">
            <TextInput label="Name" type="text" v-model="registerForm.name" />
            <TextInput label="Email" type="email" v-model="registerForm.email" />
            <TextInput label="Password" type="password" v-model="registerForm.password" />
            <TextInput label="Confirm Password" type="password" v-model="registerForm.password_confirmation" />
        </div>
        <div class="flex items-center justify-between">
            <LoadingButton :loading="loading" @click="register" />
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
const { loading, error } = storeToRefs(useFetchStore());
const { registerForm } = storeToRefs(useUserStore());
const { register } = useUserStore();

</script>

<style scoped></style>