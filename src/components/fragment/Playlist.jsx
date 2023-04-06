import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getSongs } from '../../api/apisong';
import Container from './Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddMusicPlaylist from './AddMusicPlaylist';
import '../assets/scss/Playlist.scss';

const Playlist = props => {
  const [songs, setSongs] = useState([]);
  const typeOfPlaylist = window.location.pathname.substring(16);
  console.log(typeOfPlaylist);
  const { playlists } = useSelector(state => state.musicReducer);
  // console.log(playlists);
  const list = playlists.find(item => item._id === typeOfPlaylist);
  console.log(list);

  const handleDelete = () => {
    alert('Bạn có muốn xóa k');
  };

  useEffect(() => {
    getSongs()
      .then(data => setSongs(data))
      .catch(err => alert(err));
  }, []);

  return (
    <Container>
      <div className={'Playlist'}>
        <h3>Your {typeOfPlaylist} playlist</h3>
        <div className="wrapper">
          {/* <img src={list.image} alt="hinhanh" width={100} height={100} /> */}
          <h2 className="name">{list.name}</h2>
        </div>
        <Button variant="primary" className="mt-2">
          Delete
        </Button>
        <Table striped className="mt-2">
          <thead>
            <tr>
              <th>#</th>
              <th>Bài Hát</th>
              <th>Thời Gian</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr onDoubleClick={handleDelete}>
              <td>1</td>
              <td>
                <AddMusicPlaylist
                  music={{
                    id: 1,
                    name: 'Games Worldbeat',
                    author_name: 'Bernardo R.',
                    img: 'notAvailable.jpg',
                    lang: null,
                    timesPlayed: 0,
                    type: 'instrumental',
                    musicName: 'mixkit-games-worldbeat-466.mp3',
                  }}
                />
              </td>
              <td>03:49</td>
              <td>
                <Button variant="primary">Xóa</Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <h3>Hãy cùng tìm bài hát dành cho bạn</h3>
        <div>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Bài Hát</th>
                <th>Thời Gian</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {songs.map(song => (
                <tr onDoubleClick={handleDelete}>
                  <td>{song._id}</td>
                  <td>{song.name}</td>
                  <td>03:49</td>
                  <td>
                    <Button variant="primary" className="mt-2">
                      Thêm
                    </Button>
                  </td>
                </tr>
              ))}
              {/* <tr onDoubleClick={handleDelete}>
                <td>1</td>
                <td>
                  <AddMusicPlaylist
                    music={{
                      id: 1,
                      name: 'Games Worldbeat',
                      author_name: 'Bernardo R.',
                      img: 'notAvailable.jpg',
                      lang: null,
                      timesPlayed: 0,
                      type: 'instrumental',
                      musicName: 'mixkit-games-worldbeat-466.mp3',
                    }}
                  />
                </td>
                <td>03:49</td>
                <td>
                  <Button variant="primary" className="mt-2">
                    Thêm
                  </Button>
                </td>
              </tr>
              <tr onDoubleClick={handleDelete}>
                <td>1</td>
                <td>
                  <AddMusicPlaylist
                    music={{
                      id: 1,
                      name: 'Games Worldbeat',
                      author_name: 'Bernardo R.',
                      img: 'notAvailable.jpg',
                      lang: null,
                      timesPlayed: 0,
                      type: 'instrumental',
                      musicName: 'mixkit-games-worldbeat-466.mp3',
                    }}
                  />
                </td>
                <td>03:49</td>

                <td>
                  <Button variant="primary">Thêm</Button>
                </td>
              </tr>
              <tr onDoubleClick={handleDelete}>
                <td>1</td>
                <td>
                  <AddMusicPlaylist
                    music={{
                      id: 1,
                      name: 'Games Worldbeat',
                      author_name: 'Bernardo R.',
                      img: 'notAvailable.jpg',
                      lang: null,
                      timesPlayed: 0,
                      type: 'instrumental',
                      musicName: 'mixkit-games-worldbeat-466.mp3',
                    }}
                  />
                </td>
                <td>03:49</td>

                <td>
                  <Button variant="primary">Thêm</Button>
                </td>
              </tr>
              <tr onDoubleClick={handleDelete}>
                <td>1</td>
                <td>
                  <AddMusicPlaylist
                    music={{
                      id: 1,
                      name: 'Games Worldbeat',
                      author_name: 'Bernardo R.',
                      img: 'notAvailable.jpg',
                      lang: null,
                      timesPlayed: 0,
                      type: 'instrumental',
                      musicName: 'mixkit-games-worldbeat-466.mp3',
                    }}
                  />
                </td>
                <td>03:49</td>

                <td>
                  <Button variant="primary">Thêm</Button>
                </td>
              </tr>
              <tr onDoubleClick={handleDelete}>
                <td>1</td>
                <td>03:49</td>

                <td>
                  <Button variant="primary">Thêm</Button>
                </td>
              </tr> */}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default Playlist;
