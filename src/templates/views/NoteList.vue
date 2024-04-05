<template>
  <div class="note-list">
    <h2 class="note-list__title">Note List</h2>
    <ul class="note-list__items">
      <li v-for="note in notes" :key="note.id" class="note-list__item">
        <NoteBlock :note="note" />
      </li>
    </ul>
    <CreateNote type="create" :text="newNoteContent" @save="createNote" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useNotesStore } from '@/store';
import { useUserStore } from '@/store/user';
import NoteBlock from '@/templates/components/Note.vue';
import CreateNote from '@/templates/components/Edit.vue';

const notesStores = useNotesStore();
const userStore = useUserStore();

const currentUser = computed(() => userStore.user);

const notes = computed(() => notesStores.visibleNotes());

const newNoteContent = ref('');

const createNote = (text: string) => {
  notesStores.addNote(text, currentUser.value);
}
</script>

<style scoped>
.note-list {
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
}

.note-list__title {
  font-size: 24px;
  margin-bottom: 16px;
  color: #000;
}

.note-list__items {
  list-style-type: none;
  padding: 0;
}

.note-list__item {
  margin-bottom: 12px;
  padding: 12px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}
</style>
