import React, { useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
export default function Documents() {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [inputs, setInputs] = useState({
    label: '',
    filename: ''
  });
  const [errors, setErrors] = useState({});
  const [documents, setDocuments] = useState(JSON.parse(localStorage.getItem('documents')) || []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };


  const handleDelete = (index) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${documents[index].label}?`);
    if (!confirmDelete) return;
    const updatedDocuments = [...documents];
    updatedDocuments.splice(index, 1);
    setDocuments(updatedDocuments);
    localStorage.setItem('documents', JSON.stringify(updatedDocuments));
  };

  const handleEdit = (index) => {
    const document = documents[index];
    setEditMode(true);
    setEditIndex(index);
    setInputs({
      label: document.label,
      filename: document.filename
    });
    handleModalShow();
  };

  const handleAddEdit = (event) => {
    event.preventDefault();
    const error = {};
    if (!inputs.label) {
      error.label = 'Label is required';
    }
    if (!inputs.filename) {
      error.filename = 'Filename is required';
    }
    if (Object.keys(error).length > 0) {
      setErrors(error);
      return;
    }
    if (editMode) {
      const updatedDocuments = [...documents];
      updatedDocuments[editIndex] = {
        ...inputs
      };
      setDocuments(updatedDocuments);
      localStorage.setItem('documents', JSON.stringify(updatedDocuments));
      setEditMode(false);
      setEditIndex(null);
    } else {
      const newDocument = {
        ...inputs
      };
      setDocuments([...documents, newDocument]);
      localStorage.setItem('documents', JSON.stringify([...documents, newDocument]));
    }
    handleModalClose();
    setInputs({
      label: '',
      filename: ''
    });
  };

  return (
    <div>
      <h2>Documents</h2>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handleModalShow} className='mb-2 '>Add Document</Button>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Document' : 'Add Document'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="label">
              <Form.Label>Label</Form.Label>
              <Form.Control type="text" name="label" value={inputs.label} onChange={handleInputChange} isInvalid={!!errors.label} />
              <Form.Control.Feedback type="invalid">{errors.label}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="filename">
              <Form.Label>Filename</Form.Label>
              <Form.Control type="text" name="filename" value={inputs.filename} onChange={handleInputChange} isInvalid={!!errors.filename} />
              <Form.Control.Feedback type="invalid">{errors.filename}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddEdit}>
            {editMode ? 'Save Changes' : 'Add Document'}
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Label</th>
            <th>Filename</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document, index) => (
            <tr key={index}>
              <td>{document.label}</td>
              <td>{document.filename}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(index)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(index)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
