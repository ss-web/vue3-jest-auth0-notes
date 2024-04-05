<template>
	<Header text="Unauthenticated User Header">
		<button class="button" @click.prevent="toLogin">Sing in</button>
	</Header>
	<main class="container">
		<router-view />
	</main>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';
import { ROLES } from '@/constants';
import Header from '@/templates/components/Header.vue';

const { loginWithRedirect } = useAuth0();
const toLogin = async () => {
	await loginWithRedirect({
		appState: {
			role: ROLES.ADMIN,
			target: '/notes'
		}
	});
};
</script>