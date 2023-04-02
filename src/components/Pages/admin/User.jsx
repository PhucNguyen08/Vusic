import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

function User() {
  const [show, setShow] = useState(false);
  const [isShowList, setIsShowList] = useState(false);

  const handleShowList = () => setIsShowList(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button variant="primary" onClick={handleShow} className="mt-2 ms-1">
        Thêm
      </Button>
      <Button variant="primary" className="mt-2 ms-1" onClick={handleShowList}>
        Danh Sách
      </Button>
      <Button variant="primary" className="mt-2 ms-1">
        Đã Xóa
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Insert User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUserName">
              <Form.Label>UserName</Form.Label>
              <Form.Control type="text" placeholder="Enter User Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRole">
              <Form.Label>Sex</Form.Label>
              <Form.Control type="text" placeholder="Role" list="sex" />
              <datalist id="sex">
                <option value="Female" />
                <option value="Male" />
              </datalist>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover size="sm" className="mt-2">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>UserName</th>
            <th>Password</th>
            <th>Sex</th>
            <th>Birthday</th>
            <th>Action</th>
          </tr>
        </thead>
        {isShowList && (
          <tbody>
            <tr>
              <td>6425b6b19c24d86883b30d44</td>
              <td>Mark</td>
              <td>mark123@gmail.com</td>
              <td>123</td>
              <td>Male</td>
              <td>14-04-2002</td>
              <td>
                <button>Edit</button>
                <button className="ms-1">Delete</button>
              </td>
            </tr>
          </tbody>
        )}
      </Table>
    </div>
  );
}

export default User;
