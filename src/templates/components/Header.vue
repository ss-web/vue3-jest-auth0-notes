<template>
	<header class="header">
		<h2 class="header__title">{{ text }}</h2>
		<form class="header__form">
			<slot />
		</form>
	</header>
</template>

<script setup lang="ts">
defineProps(['text']);
</script>

<style scoped>
.header {
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.header__title {
  align-items: center;
  font-size: 1.5rem;
  display: inline-flex;
  color: #333;
}

.header__form {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>