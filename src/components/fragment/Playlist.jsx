import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { getSongs } from '../../api/apisong';
import MusicCardPlaylist from './MusicCardPlaylist';
import Container from './Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
// import AddMusicPlaylist from './AddMusicPlaylist';
import '../assets/scss/Playlist.scss';
import {
  getOnePlaylist,
  insertSongToPlaylistAxios,
  deleteSongToPlaylistAxios,
  deletePlaylist,
} from '../../api/apiplayist';
import { useHistory } from 'react-router-dom';

const Playlist = props => {
  const [songs, setSongs] = useState([]);
  const [lists, setLists] = useState({});
  const [songsPlaylist, setSongsPlaylist] = useState([]);

  const history = useHistory();

  const typeOfPlaylist = window.location.pathname.substring(16);
  console.log(typeOfPlaylist);

  const handleDelete = async id => {
    await deleteSongToPlaylistAxios(typeOfPlaylist, id);
    await getOnePlaylist(typeOfPlaylist)
      .then(data => setSongsPlaylist(data.songs))
      .catch(err => console.log(err));
  };

  const handleDeleteAll = async () => {
    await deletePlaylist(typeOfPlaylist)
      .then(res => {
        console.log(res);
        alert('Bạn đã xóa thành công');
      })
      .catch(err => console.log(err));
    history.push('/home');
    window.location.reload();
  };

  const handleInsert = async id => {
    await insertSongToPlaylistAxios(typeOfPlaylist, id);
    await getOnePlaylist(typeOfPlaylist)
      .then(data => setSongsPlaylist(data.songs))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getSongs()
      .then(data => setSongs(data))
      .catch(err => alert(err));
  }, []);

  useEffect(() => {
    getOnePlaylist(typeOfPlaylist)
      .then(data => setLists(data))
      .catch(err => console.log(err));
  }, [typeOfPlaylist]);

  useEffect(() => {
    getOnePlaylist(typeOfPlaylist)
      .then(data => setSongsPlaylist(data.songs))
      .catch(err => console.log(err));
  }, [typeOfPlaylist]);

  console.log(songsPlaylist);

  return (
    <Container>
      <div className={'Playlist'}>
        <h3>Your {lists.name} playlist</h3>
        {/* <div className="wrapper">
          <img src={lists.image} alt="hinhanh" width={100} height={100} />
          <h2 className="name">{lists.name}</h2>
        </div> */}
        <Button variant="primary" className="mt-2" onClick={handleDeleteAll}>
          Delete
        </Button>
        <MusicCardPlaylist songs={songsPlaylist} />
        <Table striped className="mt-2">
          <thead>
            <tr>
              <th>Bài Hát</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {songsPlaylist.map(song => (
              <tr>
                <td>{song.name}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleDelete({ _id: song._id })}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h3>Hãy cùng tìm bài hát dành cho bạn</h3>
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
                      onClick={() => handleInsert({ _id: song._id })}
                    >
                      Thêm
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default Playlist;
