import { useContext, useState, useRef, useEffect } from 'react';
import SideBarOptions from './SideBarOptions';
import { ThemeContext } from '../../api/Theme';
import { Add } from '@material-ui/icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Cookies from 'js-cookie';
import { insertPlaylistAxios, getAllPlaylists } from '../../api/apiplayist';
import jwt_decode from 'jwt-decode';
import '../assets/scss/SideBar.scss';

function SideBar() {
  const inputCreateRef = useRef();
  const useStyle = useContext(ThemeContext);
  const [show, setShow] = useState(false);
  const [lists, setLists] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let decoded;

  if (Cookies?.get('token') === undefined) {
  } else {
    decoded = jwt_decode(Cookies?.get('token'));
    console.log(decoded);
  }

  useEffect(() => {
    !(Cookies?.get('token') === undefined) &&
      getAllPlaylists(decoded?._id)
        .then(data => setLists(data))
        .catch(err => console.log(err));
  }, [decoded?._id]);

  console.log(lists);

  const handleCreate = async () => {
    const data = new FormData();
    data.append('name', inputCreateRef.current.value);
    await insertPlaylistAxios(data, decoded._id);
    await getAllPlaylists(decoded?._id)
      .then(data => setLists(data))
      .catch(err => console.log(err));
  };

  return (
    <>
      <aside style={useStyle.component} className={'aside-bar'}>
        <div className="aside-bar-container">
          <p className={'p1'}>
            <span>LIBRARY</span>
          </p>
          <SideBarOptions className={'lib-sub'} href={'/home'} title={'Home'} />
          <SideBarOptions
            className={'lib-sub'}
            href={'/home/album'}
            title={'Album'}
          />
          <SideBarOptions
            className={'lib-sub'}
            href={'/home/search'}
            title={'Search'}
          />
          {/*<SideBarOptions className={"lib-sub"} Icon={AlbumIcon} href={"/home/album"}  title={"Album"}/>
                <SideBarOptions className={"lib-sub"} Icon={EmojiPeopleIcon} href={"/home/artist"}  title={"Artist"}/>*/}
        </div>
        {!(Cookies.get('token') === undefined) && (
          <div className="aside-bar-container playlist">
            <div>
              <p className={'p1'}>
                <span>MY PLAYLIST</span>
                <Button variant="light" onClick={handleShow}>
                  <span>
                    <Add />
                  </span>
                </Button>
              </p>
              {lists.map(list => (
                <SideBarOptions
                  className={'lib-sub'}
                  href={`/home/playlists/${list._id}`}
                  title={list.name}
                />
              ))}
              {/* <SideBarOptions
                className={'lib-sub'}
                href={'/home/playlists/642b70a67134ddb1a057f08a'}
                title={'Playlist1'}
              /> */}
            </div>
          </div>
        )}
      </aside>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nhập tên playList</Form.Label>
              <Form.Control
                id="text"
                placeholder="Nhập tên playList"
                ref={inputCreateRef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleCreate()}>
            Tạo
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

/*
 *
 * */
export default SideBar;
