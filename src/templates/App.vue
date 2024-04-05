<template>
  <div v-if="isLoading" class="loading-screen">
    Loading...
  </div>
  <router-view v-else />
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import { useUserStore } from '@/store/user';
import { Auth0User } from '@/interfaces';
import { ROLES } from '@/constants';

const { user, isLoading } = useAuth0();
const userStore = useUserStore();

const userValue = computed(() => user.value);

// imitation role behavior
const determineUserRole = (email: string) => email.includes('admin') ? ROLES.ADMIN : ROLES.USER;

watch(userValue, (value) => {
  if (!value) {
    return;
  }
  const { sub, nickname, picture, email } = value as Auth0User;
  if (value.sub) {
    userStore.setUser({
      id: sub,
      role: determineUserRole(email),
      username: nickname,
      picture: picture,
      email: email,
    });
  }
});
</script>

<style scoped>
.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
}
</style>