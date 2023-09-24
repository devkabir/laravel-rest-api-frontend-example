import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Dashboard.vue"),
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("@/components/DashCards.vue"),
      },
      {
        path: "/tasks",
        component: () => import("@/views/Tasks.vue"),
        children: [
          {
            path: "",
            name: "Tasks",
            component: () => import("@/components/tasks/TasksList.vue"),
          },
          {
            path: "create",
            name: "CreateTask",
            component: () => import("@/components/tasks/CreateTask.vue"),
          },
          {
            path: "details/:id",
            name: "TaskDetails",
            component: () => import("@/components/tasks/TaskDetails.vue"),
          },
          {
            path: "edit/:id",
            name: "EditTask",
            component: () => import("@/components/tasks/CreateTask.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("@/views/Auth.vue"),
    children: [
      {
        path: "",
        name: "LoginRedirect",
        redirect: "/auth/login",
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@/components/auth/Login.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () => import("@/components/auth/Register.vue"),
      },
      {
        path: "verify-email",
        name: "VerifyEmail",
        component: () => import("@/components/auth/VerifyEmail.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
