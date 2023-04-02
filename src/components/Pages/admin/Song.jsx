import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

function Song() {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [songs, setSongs] = useState([]);

  console.log(songs);

  useEffect(() => {
    const getSongs = async () => {
      const response = await fetch('http://localhost:5000/songs');
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Could not Songs');
      }

      return data;
    };

    getSongs()
      .then(data => setSongs(data))
      .catch(err => alert(err));
  }, []);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile.name);
  };
  return (
    <div>
      <Form>
        <Form.Group className="mb-3 w-25" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" />
        </Form.Group>
        <Form.Group className="mb-3 w-25" controlId="formBasicGenre">
          <Form.Label>Genre</Form.Label>
          <Form.Control type="text" placeholder="Enter Genre" />
        </Form.Group>
        <Form.Group className="mb-3 w-25" controlId="formBasicImage">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={onSelectFile} />
          {selectedFile && (
            <img src={preview} alt="ảnh" className="w-100 h-100 mt-2" />
          )}
        </Form.Group>
        <Form.Group className="mb-3 w-25" controlId="formBasicAudio">
          <Form.Label>Audio</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Form.Group className="mb-3 w-25" controlId="formBasicLyrics">
          <Form.Label>Lyrics</Form.Label>
          <Form.Control type="text" placeholder="Enter Lyrics" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Thêm
        </Button>
      </Form>
      <Table striped bordered hover size="sm" className="mt-2">
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Genre</th>
            <th>Image</th>
            <th>Audio</th>
            <th>Lyrics</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <img
                src={preview}
                alt="ảnh"
                className="mt-2"
                width={100}
                height={100}
              />
            </td>
            <td>@mdo</td>
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

export default Song;
