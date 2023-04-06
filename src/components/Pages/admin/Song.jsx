import { useState, useEffect, useRef } from "react";
import { getSongs, insertSong } from "../../../api/apisong";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

function Song() {
  const inputName = useRef();

  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [songs, setSongs] = useState([]);
  const [isShowList, setIsShowList] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  // console.log(file, fileName);

  const handleShowList = () => setIsShowList(true);

  // console.log( selectedFile);
  // console.log(songs);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInsert = (dataSong) => {
    insertSong(dataSong)
      .then((data) => console.log(data))
      .catch((err) => console.log(dataSong));
  };

  useEffect(() => {
    getSongs()
      .then((data) => setSongs(data))
      .catch((err) => alert(err));
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

  const onSelectFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };
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
          <Modal.Title>Thêm Bài Hát</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                ref={inputName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control type="text" placeholder="Enter Genre" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" onChange={onSelectFile} />
              {selectedFile && (
                <img src={preview} alt="ảnh" className="w-100 h-100 mt-2" />
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAudio">
              <Form.Label>Audio</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLyrics">
              <Form.Label>Lyrics</Form.Label>
              <Form.Control type="text" placeholder="Enter Lyrics" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicArtist">
              <Form.Label>Artist</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Artist"
                list="browsers"
              />
              <datalist id="browsers">
                <option value="Edge" />
                <option value="Firefox" />
                <option value="Chrome" />
                <option value="Opera" />
                <option value="Safari" />
              </datalist>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              handleInsert({
                name: inputName.current.value,
                image: selectedFile,
              });
              // console.log(selectedFile);
            }}
          >
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
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
        {isShowList && (
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
        )}
      </Table>
    </div>
  );
}

export default Song;
