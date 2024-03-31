import { NoteData, Tag } from "./App";
import NoteForm from "./NoteForm";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  availableTags: Tag[];
  onAddTag: (tag: Tag) => void;
};

const NewNote = ({ onSubmit, availableTags, onAddTag }: NewNoteProps) => {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        availableTags={availableTags}
        onAddTag={onAddTag}
      />
    </>
  );
};

export default NewNote;
