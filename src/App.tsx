import { Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NewNote from "./NewNote";
import useLocalStorage from "./useLocalStorage";

export type Note = {
  id: string;
} & NoteData;

type RawNote = {
  id: string;
} & RawNoteData;

type RawNoteData = {
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
    const newNotes = [
      ...notes,
      { ...data, id: crypto.randomUUID(), tagIds: tags.map((tag) => tag.id) },
    ];
    setNotes(newNotes);
  };

  const onAddTag = (tag: Tag) => {
    setTags((tags) => [...tags, tag]);
  };

  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
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
