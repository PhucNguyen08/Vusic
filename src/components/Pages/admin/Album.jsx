import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getArtists } from '../../../api/apiaritst';
import {
  insertAlbumAxios,
  getAlbums,
  deleteAlbum,
  updateAlbum,
} from '../../../api/apialbum';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import DetailAlbumAdmin from './DetailAlbumAdmin';

function Album() {
  const albumNameRef = useRef();
  const releaseDateRef = useRef();
  const artistIdRef = useRef();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  // const [show, setShow] = useState(false);
  const [isShowList, setIsShowList] = useState(false);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [idAlbum, setIdAlbum] = useState();

  const handleShowList = () => setIsShowList(true);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  console.log(idAlbum);

  const handleEdit = data => {
    const dateString = data.releaseDate;
    const date = new Date(dateString);
    const formattedDate = date.toISOString().slice(0, 10);
    setIdAlbum(data.id);
    setIsEdit(true);
    albumNameRef.current.value = data.name;
    artistIdRef.current.value = data.artist;
    releaseDateRef.current.value = formattedDate;
  };

  const handleClear = () => {
    albumNameRef.current.value = '';
    releaseDateRef.current.value = '';
    artistIdRef.current.value = '';
    setSelectedFile(undefined);
    setPreview(undefined);
  };

  const handleUpdate = async () => {
    const data = new FormData();
    data.append('name', albumNameRef.current.value);
    data.append('releaseDate', releaseDateRef.current.value);
    data.append('artist', artistIdRef.current.value);
    if (selectedFile) {
      data.append('image', selectedFile);
    }
    setIsEdit(false);
    await updateAlbum(data, idAlbum);
    await getAlbums()
      .then(res => setAlbums(res))
      .catch(err => alert(err));
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this album?')) {
      await deleteAlbum(id)
        .then(data => alert(data.message))
        .catch(err => console.log(err));
      await getAlbums()
        .then(data => setAlbums(data))
        .catch(err => alert(err));
    } else {
      alert('Bạn k xóa');
    }
  };

  const handleInsert = async () => {
    const data = new FormData();
    data.append('name', albumNameRef.current.value);
    data.append('image', selectedFile);
    data.append('releaseDate', releaseDateRef.current.value);
    data.append('artist', artistIdRef.current.value);
    await insertAlbumAxios(data);
    await getAlbums()
      .then(data => setAlbums(data))
      .catch(err => alert(err));
  };

  useEffect(() => {
    getArtists()
      .then(data => setArtists(data))
      .catch(err => alert(err));
  }, []);

  useEffect(() => {
    getAlbums()
      .then(data => setAlbums(data))
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
    <div className="ms-3">
      <Form>
        <Form.Group className="mb-3 w-50" controlId="formBasicAlbum">
          <Form.Label>Album Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Album Name"
            ref={albumNameRef}
          />
        </Form.Group>
        <Form.Group className="mb-3 w-50" controlId="formBasicImage">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={onSelectFile}
            accept=".jpg,.png"
          />
          {selectedFile && (
            <img src={preview} alt="ảnh" className="w-100 h-100 mt-2" />
          )}
        </Form.Group>
        <Form.Group className="mb-3 w-50" controlId="formBasicreleaseDate">
          <Form.Label>releaseDate</Form.Label>
          <Form.Control
            type="date"
            placeholder="releaseDate"
            ref={releaseDateRef}
          />
        </Form.Group>
        <Form.Group className="mb-3 w-50" controlId="formBasicRole">
          <Form.Label>Artist</Form.Label>
          <Form.Control
            type="text"
            placeholder="Artist"
            list="browsers"
            ref={artistIdRef}
          />
          <datalist id="browsers">
            {artists.map(artist => (
              <option key={artist._id} value={artist._id}>
                {artist.name}
              </option>
            ))}
          </datalist>
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
        disabled={!isEdit}
        onClick={() => {
          handleUpdate();
          handleClear();
        }}
        className="mt-2 ms-1"
        variant="primary"
      >
        Sửa
      </Button>
      <Button variant="primary" className="mt-2 ms-1" onClick={handleShowList}>
        Danh Sách
      </Button>
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Insert Album</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicAlbum">
              <Form.Label>Album Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Album Name"
                ref={albumNameRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={onSelectFile} />
              {selectedFile && (
                <img src={preview} alt="ảnh" className="w-100 h-100 mt-2" />
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicreleaseDate">
              <Form.Label>releaseDate</Form.Label>
              <Form.Control
                type="date"
                placeholder="releaseDate"
                ref={releaseDateRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRole">
              <Form.Label>Artist</Form.Label>
              <Form.Control
                type="text"
                placeholder="Artist"
                list="browsers"
                ref={artistIdRef}
              />
              <datalist id="browsers">
                {artists.map(artist => (
                  <option key={artist._id} value={artist._id}>
                    {artist.name}
                  </option>
                ))}
              </datalist>
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
            <th>ID</th>
            <th>Album Name</th>
            <th>Image</th>
            <th>Release Date</th>
            <th>Artist</th>
            <th>Action</th>
          </tr>
        </thead>
        {isShowList && (
          <tbody>
            {albums.map(album => (
              <tr key={album._id}>
                <td>
                  <Link to={`/admin/album/${album._id}`}>{album._id}</Link>
                </td>
                <td>{album.name}</td>
                <td>
                  <img
                    src={album.image}
                    alt={album.name}
                    className="mt-2"
                    width={100}
                    height={100}
                  />
                </td>
                <td>{album.releaseDate}</td>
                <td>{album.artist?.name}</td>
                <td>
                  <button
                    onClick={() => {
                      handleEdit({
                        id: album._id,
                        releaseDate: album.releaseDate,
                        name: album.name,
                        image: album.image,
                        artist: album?.artist._id,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="ms-1"
                    onClick={() => handleDelete(album._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
      <Switch>
        <Route path=":albumAdminId" component={DetailAlbumAdmin} />
      </Switch>
    </div>
  );
}

export default Album;
