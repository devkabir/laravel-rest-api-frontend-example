<template>
    <div class="space-y-6">
        <TextInput label="Email" type="email" />
        <TextInput label="Password" type="password" />
        <div class="flex items-center justify-between">
            <LoadingButton :loading="false" />
            <a href="/auth/register">Need an account?</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import TextInput from '../form/TextInput.vue';
import LoadingButton from '../form/LoadingButton.vue';
</script>

<style scoped></style>