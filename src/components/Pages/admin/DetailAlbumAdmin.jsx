import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getSongs } from '../../../api/apisong';
import {
  getOneAlbum,
  insertSongToAlbumAxios,
  deleteSongToAlbumAxios,
} from '../../../api/apialbum';

function DetailAlbumAdmin() {
  const albumId = window.location.pathname.substring(13);
  const [songs, setSongs] = useState([]);
  const [songAlbum, setSongAlbum] = useState([]);

  console.log(albumId);

  console.log(songAlbum);

  useEffect(() => {
    getOneAlbum(albumId)
      .then(data => setSongAlbum(data.songs))
      .catch(err => alert(err));
  }, [albumId]);

  useEffect(() => {
    getSongs()
      .then(data => setSongs(data))
      .catch(err => alert(err));
  }, []);

  const handleDelete = async data => {
    await deleteSongToAlbumAxios(albumId, data);
    await getOneAlbum(albumId)
      .then(data => setSongAlbum(data.songs))
      .catch(err => alert(err));
  };

  const handleInsert = async data => {
    // const data = new FormData();
    // data.append('artist', songIdRef.current.value);
    // console.log(data);
    await insertSongToAlbumAxios(albumId, data);
    await getOneAlbum(albumId)
      .then(data => setSongAlbum(data.songs))
      .catch(err => alert(err));
  };

  return (
    <>
      <div>
        <Table striped bordered hover size="sm" className="mt-2">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Image</th>
              <th>Audio</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {songAlbum.map((song, i) => (
              <tr key={i}>
                <td>{song._id}</td>
                <td>{song.name}</td>
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
                <td>
                  <button
                    className="ms-1"
                    onClick={() => handleDelete({ _id: song._id })}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div>
        <Table striped>
          <thead>
            <tr>
              <th>Bài Hát</th>
              <th>Ca Sĩ</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {songs.map(song => (
              <tr key={song._id}>
                <td>{song.name}</td>
                <td>{song.artist?.name}</td>
                <td>
                  <Button
                    variant="primary"
                    className="mt-2"
                    onClick={() => {
                      handleInsert({ _id: song._id });
                    }}
                  >
                    Thêm
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default DetailAlbumAdmin;
