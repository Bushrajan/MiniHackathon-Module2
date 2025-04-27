import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const TaskBoard = () => {
  return (
    <Container className="mt-4 text-center ">
      <Row className="mb-4 border p-lg-5 p-2 rounded-lg shadow-lg bg-black text-white">
        {["To Do", "In Progress", "Done"].map((status) => (
          <Col key={status} md={4}>
            <h3 className="text-center">{status}</h3>
            <Card className="p-3 shadow-sm pt-5 bg-black">
              <Form>
                <Form.Group className="mb-2">
                  <Form.Control type="text" placeholder="Task Title" />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control type="text" placeholder="Assigned To" />
                </Form.Group>
                <Button   className="btn mt-2 btn-light">Add Task</Button>
              </Form>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TaskBoard;
