<template>
  <div v-if="props.note" class="note">
    <div class="note__header">
      <div class="note__author" role="note__author">{{ props.note.author.username }}</div>
      <div class="note__date" role="note__date">{{ formattedDate }}</div>
    </div>
    <div v-if="props.note.updatedAt" class="note__last-modified">Last modified: {{ formattedLastModified }}</div>
    <div class="note__content" role="note__content">
      <p v-if="!showEditForm">{{ props.note.content }}</p>
      <EditNote v-if="showEditForm" :text="props.note.content" @save="save">
        <button class="note__content--button-close" @click.prevent="cancel">✕</button>
      </EditNote>
    </div>
    <div v-if="!showEditForm" class="note__footer">
      <button v-if="isOwner || isAdmin" @click="deleteNote" class="note__delete-button button">Delete</button>
      <button v-if="isOwner" @click="showEditForm = true" class="note__edit-button button">Edit</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';
import { useNotesStore } from '@/store';
import { useUserStore } from '@/store/user';
import { ROLES } from '@/constants';
import EditNote from '@/templates/components/Edit.vue';

const userStore = useUserStore();
const notesStores = useNotesStore();
const props = defineProps(['note']);
const showEditForm = ref(false);

const isOwner = computed(() => userStore.user.email === props.note.author.email);

const save = (text: string) => {
  props.note.content = text;
  notesStores.editNote(props.note);
  showEditForm.value = false;
}

const cancel = () => {
  showEditForm.value = false;
}

const deleteNote = () => {
  notesStores.deleteNote(props.note.id);
}

const isAdmin = computed(() => {
  return userStore.user.role === ROLES.ADMIN;
});

const formattedDate = computed(() => {
  return new Date(props.note.createdAt).toLocaleString();
});

const formattedLastModified = computed(() => {
  return props.note.updatedAt ? new Date(props.note.updatedAt).toLocaleString() : '';
});
</script>

<style scoped>
.note {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}

.note__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.note__author {
  color: #333;
  font-weight: bold;
}

.note__date {
  font-weight: bold;
  color: #333;
}

.note__content {
  color: #333;
  text-align: left;
  margin-bottom: 10px;
}

.note__content--button-close{
  width: 36px;
  margin-left: 10px;
}

.note__footer {
  display: flex;
  justify-content: space-between;
}

.note__delete-button,
.note__edit-button {
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.note__delete-button {
  background-color: #dc3545;
  color: #fff;
}

.note__edit-button {
  background-color: #28a745;
  color: #fff;
}

.note__delete:hover,
.note__edit:hover {
  opacity: 0.8;
}

.note__last-modified {
  color: #999;
}
</style>
