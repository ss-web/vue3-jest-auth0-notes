import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed } from "vue";

import { ROLES } from "@/constants";
import { Admin, Note, User } from "@/interfaces";
import { useUserStore } from "@/store/user";

export const useNotesStore = defineStore({
  id: "notes",
  state: () => ({
    notes: useLocalStorage("notes", <Note[]>[]),
  }),
  actions: {
    addNote(content: string, author: User | Admin) {
      const newNote = <Note>{
        id: `${Date.now()}`,
        content,
        author,
        createdAt: new Date().toISOString(),
        updatedAt: null,
      };
      this.notes.push(newNote);
    },
    deleteNote(noteId: string) {
      this.notes = this.notes.filter((note) => note.id !== noteId);
    },
    editNote(node: Note) {
      const newNote = this.notes.find((v: Note) => v.id === node.id);
      if (newNote) {
        newNote.content = node.content;
        newNote.updatedAt = new Date().toISOString();
      }
    },
    visibleNotes() {
      const userStore = useUserStore();
      const currentUser = computed(() => userStore.user);
      if (!currentUser.value?.role) return [];
      if (currentUser.value?.role === ROLES.ADMIN) {
        return this.notes;
      }
      return this.notes.filter(
        (note: Note) => note.author.email === currentUser.value?.email
      );
    },
  },
});
