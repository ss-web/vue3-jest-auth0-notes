<template>
  <form :role="`form-${type}`" class="create-note">
    <div v-if="validationError" class="create-note__error">{{ validationError }}</div>
    <textarea :role="`form-${type}__textarea`" class="create-note__textarea" v-model="newNoteContent" rows="4"></textarea>
    <div class="create-note__buttons">
      <button :role="`form-${type}__save`" class="create-note__buttons--button" type="submit" @click.prevent="saveNote">Save</button>
      <slot />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';
import { useNotesStore } from '@/store';
import { Note } from '@/interfaces';

const newNoteContent = ref('');
const notesStores = useNotesStore();

const props = defineProps<{
  text: string;
  type?: string;
}>();

const notes = computed(() => notesStores.visibleNotes());
newNoteContent.value = props.text;

const type = computed(() => props.type || 'edit')
const validationError = ref('');

const emit = defineEmits();

const saveNote = () => {
  if (!newNoteContent.value.trim()) {
    validationError.value = 'Note text cannot be empty';
    return;
  }

  const duplicateNote = notes.value.find((note: Note) => note.content === newNoteContent.value.trim());

  if (duplicateNote) {
    validationError.value = 'You cannot have two notes with identical text';
    return;
  }

  validationError.value = '';

  emit('save', newNoteContent.value.trim());

  newNoteContent.value = '';
}
</script>

<style scoped>
.create-note {
  width: 100%;
}

.create-note__textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.create-note__buttons{
  display: flex;
  justify-content: end;
  flex-wrap: wrap;
}

.create-note__buttons--button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.create-note__buttons--button:hover {
  background-color: #0056b3;
}

.create-note__error {
  color: red;
  margin-top: 8px;
}
</style>
