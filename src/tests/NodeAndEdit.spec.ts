import "@testing-library/jest-dom";

import { fireEvent, render } from "@testing-library/vue";
import { createPinia } from "pinia";

import {
  CANNOT_HAVE_IDENTICAL_TEXT,
  NOTE_TEXT_CANNOT_BE_EMPTY,
} from "@/constants/errors";
import { useNotesStore } from "@/store";
import { useUserStore } from "@/store/user";
import Edit from "@/templates/components/Edit.vue";
import NoteBlock from "@/templates/components/Note.vue";

const author = {
  id: "1",
  username: "John",
  picture: "path/to/picture",
  email: "admin@example.com",
  role: "ADMIN",
};

const note = {
  id: "1",
  content: "Test note content",
  createdAt: new Date().toISOString(),
  updatedAt: null,
  author,
};

describe("Note.vue", () => {
  beforeEach(() => {
    const pinia = createPinia();
    render(NoteBlock, {
      global: {
        plugins: [pinia],
      },
      props: { note },
    });

    const userStore = useUserStore();
    const notesStore = useNotesStore();
    userStore.setUser(author);
    notesStore.addNote("Existing note content", author);
  });

  it("renders note content when showEditForm is false", async () => {
    const { getByRole } = render(NoteBlock);

    const authorElement = getByRole("note__author");
    const dateElement = getByRole("note__date");
    const noteContent = getByRole("note__content");

    expect(authorElement).toHaveTextContent(author.username);
    expect(noteContent).toHaveTextContent(note.content);
    expect(dateElement).toHaveTextContent(
      new Date(note.createdAt).toLocaleString()
    );
  });

  it("renders EditNote component when showEditForm is true", async () => {
    const { getByRole, getByText } = render(NoteBlock);

    const editButton = getByText("Edit");
    await fireEvent.click(editButton);

    const editNoteComponent = getByRole("form-edit");

    expect(editNoteComponent).toBeInTheDocument();
  });

  it("displays error when trying to save empty note", async () => {
    const { getByRole, getByText } = render(Edit, {
      props: {
        text: "",
      },
    });
    const saveButton = getByRole("form-edit__save");
    await fireEvent.click(saveButton);

    const errorMessage = getByText(NOTE_TEXT_CANNOT_BE_EMPTY);
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays error when trying to save note with duplicate content", async () => {
    const { getByRole, getByText } = render(Edit, {
      props: {
        text: "Existing note content",
        type: "create",
      },
    });

    const saveButton = getByRole("form-create__save");
    await fireEvent.click(saveButton);

    const errorMessage = getByText(CANNOT_HAVE_IDENTICAL_TEXT);
    expect(errorMessage).toBeInTheDocument();
  });

  it('emits "save" event with trimmed note content when valid note is saved', async () => {
    const { getByRole, emitted } = render(Edit, {
      props: {
        text: "",
      },
    });

    const saveButton = getByRole("form-edit__save");
    const textarea = getByRole("form-edit__textarea");

    const noteContent = "   This is a test note   ";
    await fireEvent.update(textarea, noteContent);
    await fireEvent.click(saveButton);

    expect(emitted()).toHaveProperty("save");
    expect(emitted().save[0]).toEqual([noteContent.trim()]);
  });
});
