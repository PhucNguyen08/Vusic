import { useState, useEffect, useRef } from 'react';
import {
  getSongs,
  insertSongAxios,
  deleteSong,
  updateSong,
} from '../../../api/apisong';
import { getArtists } from '../../../api/apiaritst';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Song.scss';

function Song() {
  const inputName = useRef();
  const genreRef = useRef();
  const inputLyricsRef = useRef();
  const artistRef = useRef();
  const [selectedFile, setSelectedFile] = useState();
  const [selectedSong, setSelectedSong] = useState();
  const [preview, setPreview] = useState();
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isShowList, setIsShowList] = useState(false);
  const [IdSongs, setIdSongs] = useState();

  const handleShowList = () => setIsShowList(true);

  const handleEdit = data => {
    setIsEdit(true);
    inputName.current.value = data.name;
    genreRef.current.value = data.genre;
    inputLyricsRef.current.value = data.lyrics;
    artistRef.current.value = data.artist;
  };

  // console.log(IdSongs);

  const handleDelete = async id => {
    await deleteSong(id)
      .then(data => {
        // console.log(data);
        alert(data.message);
      })
      .catch(err => alert(err));
    await getSongs()
      .then(data => setSongs(data))
      .catch(err => alert(err));
  };

  useEffect(() => {
    getArtists()
      .then(data => setArtists(data))
      .catch(err => alert(err));
  }, []);

  // const handleClose = () => setShow(false);
  // const handleShow = () => {
  //   setShow(true);
  // };

  const handleUpdate = async () => {
    const data = new FormData();
    data.append('name', inputName.current.value);
    if (selectedFile) {
      data.append('image', selectedFile);
    }
    data.append('lyrics', inputLyricsRef.current.value);
    if (selectedSong) {
      data.append('audio', selectedSong);
    }
    data.append('artist', artistRef.current.value);
    data.append('genre', genreRef.current.value);
    setIsEdit(false);
    await updateSong(data, IdSongs);
    await getSongs()
      .then(data => setSongs(data))
      .catch(err => alert(err));
  };

  const handleClear = () => {
    inputName.current.value = '';
    genreRef.current.value = '';
    inputLyricsRef.current.value = '';
    artistRef.current.value = '';
    setPreview(undefined);
    setSelectedFile(undefined);
    setSelectedSong(undefined);
  };

  const handleInsert = async () => {
    const data = new FormData();
    data.append('name', inputName.current.value);
    data.append('image', selectedFile);
    data.append('lyrics', inputLyricsRef.current.value);
    data.append('audio', selectedSong);
    data.append('artist', artistRef.current.value);
    data.append('genre', genreRef.current.value);
    await insertSongAxios(data);
    await getSongs()
      .then(data => setSongs(data))
      .catch(err => alert(err));
  };

  useEffect(() => {
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
  };
  const onSelectAudio = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedSong(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedSong(e.target.files[0]);
  };

  return (
    <div className="ms-3">
      <Form>
        <Form.Group className="mb-3 w-50" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" ref={inputName} />
        </Form.Group>
        <Form.Group className="mb-3 w-50" controlId="formBasicGenre">
          <Form.Label>Genre</Form.Label>
          <Form.Control type="text" placeholder="Enter Genre" ref={genreRef} />
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
        <Form.Group className="mb-3 w-50" controlId="formBasicAudio">
          <Form.Label>Audio</Form.Label>
          <Form.Control type="file" accept=".mp3" onChange={onSelectAudio} />
        </Form.Group>
        <Form.Group className="mb-3 w-50" controlId="formBasicLyrics">
          <Form.Label>Lyrics</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Lyrics"
            ref={inputLyricsRef}
          />
        </Form.Group>
        <Form.Group className="mb-3 w-50" controlId="formBasicArtist">
          <Form.Label>Artist</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Artist"
            list="browsers"
            ref={artistRef}
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
        disabled={isEdit}
        variant="primary"
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
        className="mt-2 ms-1"
        variant="primary"
        onClick={() => {
          handleUpdate();
          handleClear();
        }}
      >
        Sửa
      </Button>

      <Button variant="primary" className="mt-2 ms-1" onClick={handleShowList}>
        Danh Sách
      </Button>
      <Table striped bordered hover size="sm" className="mt-2">
        <thead>
          <tr>
            <th>Name</th>
            <th>Genre</th>
            <th>Image</th>
            <th>Audio</th>
            <th>Lyrics</th>
            <th>Artist</th>
            <th>Action</th>
          </tr>
        </thead>
        {isShowList && (
          <tbody>
            {songs.map(song => (
              <tr key={song._id}>
                <td>{song.name}</td>
                <td>{song.genre}</td>
                <td>
                  <img
                    src={song.image}
                    alt={song.name}
                    className="mt-2"
                    width={100}
                    height={100}
                  />
                </td>
                <td>
                  <audio controls>
                    <source src={song.audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </td>
                <td className="lyrics">{song.lyrics}</td>
                <td>{song?.artist?.name}</td>
                <td>
                  <button
                    onClick={() => {
                      setIdSongs(song._id);
                      handleEdit({
                        id: song._id,
                        name: song.name,
                        image: song.image,
                        audio: song.audio,
                        lyrics: song.lyrics,
                        artist: song?.artist._id,
                        genre: song.genre,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="ms-1"
                    onClick={() => {
                      handleDelete(song._id);
                      // handleReload();
                    }}
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

export default Song;
