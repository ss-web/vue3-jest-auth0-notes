<template>
	<Header text="Authenticated User Header">
		<button class="button" @click.prevent="handlerLogout">logout</button>
	</Header>
	<main class="container">
		<router-view />
	</main>
</template>

<script setup lang="ts">
import Header from '@/templates/components/Header.vue';
import { useAuth0 } from '@auth0/auth0-vue';

const { logout } = useAuth0();

const handlerLogout = () => {
	logout({
		logoutParams: {
			returnTo: window.location.origin,
		}
	})
}
</script>