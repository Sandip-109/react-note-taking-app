import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import ReactSelect from "react-select/creatable";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoteData, Tag } from "./App";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  availableTags: Tag[];
  onAddTag: (tag: Tag) => void;
};

const NoteForm = ({ onSubmit, availableTags, onAddTag }: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const navigate = useNavigate();
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate("..");
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} type="text" required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                options={availableTags.map((tag) => {
                  return { value: tag.id, label: tag.label };
                })}
                onCreateOption={(label: string) => {
                  const newTag = { id: crypto.randomUUID(), label };
                  onAddTag(newTag);
                  setSelectedTags((prevTags) => [...prevTags, newTag]);
                }}
                value={selectedTags?.map((tag) => {
                  return { value: tag.id, label: tag.label };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags?.map((tag) => {
                      return { id: tag.value, label: tag.label };
                    })
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control ref={markdownRef} as="textarea" rows={15} required />
        </Form.Group>
        <Stack
          direction="horizontal"
          gap={2}
          className="justify-content-end stify-end align-items-center"
        >
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Button
            type="button"
            variant="outline-secondary"
            onClick={() => navigate("..")}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;
