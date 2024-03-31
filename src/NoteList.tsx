import { Badge, Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { RawNote, Tag } from "./App";
import ReactSelect from "react-select";
import { useState } from "react";
import styles from "./notelist.module.css";

type NoteListProps = {
  notes: RawNote[];
  tags: Tag[];
};

type SimplifiedNote = {
  id: string;
  title: string;
  tags: string[];
};

const NoteList = ({ notes, tags }: NoteListProps) => {
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const simplifiedNotes: SimplifiedNote[] = notes.map(
    ({ id, title, tagIds }) => {
      return {
        id,
        title,
        tags: tags.reduce((acc: string[], tag: Tag) => {
          if (tagIds.includes(tag.id)) acc.push(tag.label);
          return acc;
        }, []),
      };
    }
  );

  const filteredNotes = simplifiedNotes.filter((note) => {});

  return (
    <div>
      <Row className="flex align-items-center ">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Button variant="primary">Create</Button>
            <Button variant="outline-secondary">Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                options={tags.map((tag) => {
                  return { value: tag.id, label: tag.label };
                })}
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
        <Row xs={1} sm={2} lg={3} xl={4} className="d-flex flex-wrap h-100 g-3">
          <Col>
            <Card className={styles.card}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Stack direction="horizontal" gap={1} className="flex-wrap">
                  <Badge bg="primary">New</Badge>
                </Stack>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Stack>
    </div>
  );
};

export default NoteList;
