import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
function Playlist() {
  const [isShowList, setIsShowList] = useState(false);

  const handleShowList = () => setIsShowList(true);

  return (
    <div>
      <Button variant="primary" className="mt-2 ms-1" onClick={handleShowList}>
        Danh Sách
      </Button>
      <Table striped bordered hover size="sm" className="mt-2">
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Image</th>
            <th>User</th>
            <th>Songs</th>
            <th>Action</th>
          </tr>
        </thead>
        {isShowList && (
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>
                <button className="ms-1">Delete</button>
              </td>
            </tr>
          </tbody>
        )}
      </Table>
    </div>
  );
}

export default Playlist;
