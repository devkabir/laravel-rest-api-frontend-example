<template>
    <div class="space-y-6">
        <div class="grid grid-cols-2 gap-6">
            <TextInput label="Name" type="text" />
            <TextInput label="Email" type="email" />
            <TextInput label="Password" type="password" />
            <TextInput label="Confirm Password" type="password" />
        </div>
        <div class="flex items-center justify-between">
            <LoadingButton :loading="false" />
            <a href="/auth/login">Already have an account?</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import LoadingButton from '../form/LoadingButton.vue';
import TextInput from '../form/TextInput.vue';


</script>

<style scoped></style>