import { Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NewNote from "./NewNote";
import useLocalStorage from "./useLocalStorage";
import NoteList from "./NoteList";

export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((notes) => [
      ...notes,
      { ...data, id: crypto.randomUUID(), tagIds: tags.map((tag) => tag.id) },
    ]);
  };

  const onAddTag = (tag: Tag) => {
    setTags((tags) => [...tags, tag]);
  };

  return (
    <Routes>
      <Route path="/" element={<NoteList notes={notes} tags={tags} />} />
      <Route
        path="/new"
        element={
          <NewNote
            onSubmit={onCreateNote}
            availableTags={tags}
            onAddTag={onAddTag}
          />
        }
      />
      <Route path="/:id" element={<h1>Show</h1>} />
      <Route path="/:id/edit" element={<h1>Edit</h1>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
