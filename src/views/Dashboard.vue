<template>
    <header>
        <nav class="bg-white border-b border-gray-300">
            <!-- Primary Navigation Menu -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <!-- Logo -->
                        <div class="shrink-0 flex items-center">
                            <router-link to="/">
                                <Logo class="block h-9 w-auto" />
                            </router-link>
                        </div>

                        <!-- Navigation Links -->
                        <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <router-link to="/"
                                class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
                                Dashboard
                            </router-link>
                            <router-link to="/tasks"
                                class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
                                Tasks
                            </router-link>
                        </div>
                    </div>


                </div>
            </div>
        </nav>
    </header>

    <!-- Page Content -->
    <main>
        <RouterView />
    </main>
</template>

<script setup lang="ts">
import Logo from '@/components/Logo.vue';
import { RouterView } from 'vue-router';

</script>

<style scoped></style>