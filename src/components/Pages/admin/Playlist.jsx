import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Playlist() {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3 w-25" controlId="formBasicEmail">
          <Form.Label>UserName</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3 w-25" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3 w-25" controlId="formBasicRole">
          <Form.Label>Role</Form.Label>
          <Form.Control type="text" placeholder="Role" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Thêm
        </Button>
      </Form>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>STT</th>
            <th>UserName</th>
            <th>Password</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>
              <button>Edit</button>
              <button className="ms-1">Delete</button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Playlist;
