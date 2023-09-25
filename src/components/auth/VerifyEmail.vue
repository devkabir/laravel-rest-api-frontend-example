<template>
    <div>
        <div class="mb-4 text-gray-600">
            Thanks for signing up! Before getting started, could you verify your
            email address by clicking on the link we just emailed to you?
            <p class="my-2 font-semibold">Please check your spam folder in case it's been sent there.</p>
            If you didn't receive the email, we will gladly send you another.
        </div>

        <div class="mb-4 font-medium text-green-600" v-if="status === 200">
            A new verification link has been sent to the email address you
            provided during registration.
        </div>

        <div class="flex items-center justify-between mt-4">
            <LoadingButtonVue :loading="loading" class="primary" :text="'Resend Verification Email'"
                @click="resendEmailVerification" />
            <LoadingButtonVue :loading="loading" class="secondary" :text="'Log Out'" @click="logout" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import LoadingButtonVue from '../form/LoadingButton.vue';
import { storeToRefs } from 'pinia';
import { useFetchStore } from '@/stores/fetch';
const { loading, status } = storeToRefs(useFetchStore());
console.log(status.value);

const { resendEmailVerification, logout } = useUserStore()
</script>

<style scoped></style>