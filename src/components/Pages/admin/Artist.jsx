import { useState, useEffect, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  insertArtistAxios,
  getArtists,
  deleteArtist,
  updateArtist,
} from '../../../api/apiaritst';
function Artist() {
  const inputNameRef = useRef();
  const inputRealNameRef = useRef();
  const inputIntroductionRef = useRef();
  const inputSexRef = useRef();
  const inputBirthdayRef = useRef();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  // const [show, setShow] = useState(false);
  const [isShowList, setIsShowList] = useState(false);
  const [artists, setArtists] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [idArtist, setIdArtist] = useState();

  const handleShowList = () => setIsShowList(true);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // console.log(idArtist);

  const handleClear = () => {
    inputNameRef.current.value = '';
    inputRealNameRef.current.value = '';
    inputIntroductionRef.current.value = '';
    inputSexRef.current.value = '';
    inputBirthdayRef.current.value = '';
    setPreview(undefined);
  };

  const handleEdit = data => {
    const dateString = data.birthday;
    const date = new Date(dateString);
    const formattedDate = date.toISOString().slice(0, 10);
    setIdArtist(data._id);
    setIsEdit(true);
    inputNameRef.current.value = data.name;
    inputRealNameRef.current.value = data.realName;
    inputIntroductionRef.current.value = data.introduction;
    inputSexRef.current.value = data.sex;
    inputBirthdayRef.current.value = formattedDate;
  };

  const handleUpdate = async () => {
    const data = new FormData();
    data.append('name', inputNameRef.current.value);
    data.append('realName', inputRealNameRef.current.value);
    data.append('introduction', inputIntroductionRef.current.value);
    if (selectedFile) {
      data.append('image', selectedFile);
    }
    data.append('sex', inputSexRef.current.value);
    data.append('birthday', inputBirthdayRef.current.value);
    setIsEdit(false);
    await updateArtist(data, idArtist);
    await getArtists()
      .then(data => setArtists(data))
      .catch(err => alert(err));
  };

  const handleDelete = async id => {
    await deleteArtist(id)
      .then(data => {
        alert('Bạn đã xóa thành công');
        console.log(data);
      })
      .catch(err => alert(err));
    await getArtists()
      .then(data => setArtists(data))
      .catch(err => alert(err));
  };

  useEffect(() => {
    getArtists()
      .then(data => setArtists(data))
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

  const handleInsert = async () => {
    const data = new FormData();
    data.append('name', inputNameRef.current.value);
    data.append('realName', inputRealNameRef.current.value);
    data.append('introduction', inputIntroductionRef.current.value);
    data.append('image', selectedFile);
    data.append('sex', inputSexRef.current.value);
    data.append('birthday', inputBirthdayRef.current.value);

    await insertArtistAxios(data);
    await getArtists()
      .then(res => setArtists(res))
      .catch(err => alert(err));
  };

  return (
    <div className="ms-3">
      <Form>
        <Form.Group className="mb-3 w-50" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            ref={inputNameRef}
          />
        </Form.Group>
        <Form.Group className="mb-3 w-50" controlId="formBasicRealName">
          <Form.Label>RealName</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter RealName"
            ref={inputRealNameRef}
          />
        </Form.Group>
        <Form.Group className="mb-3 w-50" controlId="formBasicIntroduction">
          <Form.Label>Introduction</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Introduction"
            ref={inputIntroductionRef}
          />
        </Form.Group>
        <Form.Group className="mb-3 w-50" controlId="formBasicImage">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={onSelectFile} />
          {selectedFile && (
            <img src={preview} alt="ảnh" className="w-100 h-100 mt-2" />
          )}
        </Form.Group>
        <Form.Group className="mb-3 w-50" controlId="formBasicRole">
          <Form.Label>Sex</Form.Label>
          <Form.Control
            type="text"
            placeholder="Sex"
            list="sex"
            ref={inputSexRef}
          />
          <datalist id="sex">
            <option value="Nam" />
            <option value="Nữ" />
          </datalist>
        </Form.Group>
        <Form.Group className="mb-3 w-50" controlId="formBasicBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter Birthday"
            ref={inputBirthdayRef}
          />
        </Form.Group>
      </Form>
      <Button
        variant="primary"
        disabled={isEdit}
        onClick={() => {
          handleInsert();
          handleClear();
        }}
        className="mt-2 ms-1"
      >
        Thêm
      </Button>
      <Button
        variant="primary"
        disabled={!isEdit}
        onClick={() => {
          handleUpdate();
          handleClear();
        }}
        className="mt-2 ms-1"
      >
        Sửa
      </Button>
      <Button variant="primary" className="mt-2 ms-1" onClick={handleShowList}>
        Danh Sách
      </Button>
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Insert User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                ref={inputNameRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRealName">
              <Form.Label>RealName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter RealName"
                ref={inputRealNameRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicIntroduction">
              <Form.Label>Introduction</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Introduction"
                ref={inputIntroductionRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={onSelectFile} />
              {selectedFile && (
                <img src={preview} alt="ảnh" className="w-100 h-100 mt-2" />
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRole">
              <Form.Label>Sex</Form.Label>
              <Form.Control
                type="text"
                placeholder="Role"
                list="sex"
                ref={inputSexRef}
              />
              <datalist id="sex">
                <option value="Nam" />
                <option value="Nữ" />
              </datalist>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Birthday"
                ref={inputBirthdayRef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              handleInsert();
            }}
          >
            Lưu
          </Button>
        </Modal.Footer>
      </Modal> */}
      <Table striped bordered hover size="sm" className="mt-2">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>RealName</th>
            <th>Introduction</th>
            <th>Image</th>
            <th>Sex</th>
            <th>Birthday</th>
            <th>Action</th>
          </tr>
        </thead>
        {isShowList && (
          <tbody>
            {artists.map(artist => (
              <tr key={artist._id}>
                <td>{artist._id}</td>
                <td>{artist.name}</td>
                <td>{artist.realName}</td>
                <td>{artist.introduction}</td>
                <td>
                  <img
                    src={artist.image}
                    alt={artist.name}
                    width={100}
                    height={100}
                  />
                </td>
                <td>{artist.sex}</td>
                <td>{artist.birthday}</td>
                <td>
                  <button onClick={() => handleEdit(artist)}>Edit</button>
                  <button
                    className="ms-1"
                    onClick={() => handleDelete(artist._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </div>
  );
}

export default Artist;
