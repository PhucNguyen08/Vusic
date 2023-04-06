import { useContext, useState, useRef } from 'react';
import SideBarOptions from './SideBarOptions';
import { ThemeContext } from '../../api/Theme';
import { Add } from '@material-ui/icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Cookies from 'js-cookie';
import { insertPlaylist } from '../../api/apiplayist';
import jwt_decode from 'jwt-decode';
import '../assets/scss/SideBar.scss';

function SideBar() {
  const inputCreateRef = useRef();
  const useStyle = useContext(ThemeContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let decoded;

  if (Cookies?.get('token') === undefined) {
  } else {
    decoded = jwt_decode(Cookies?.get('token'));
    console.log(decoded);
  }

  const handleCreate = () => {
    // console.log(datalist);
    const data = new FormData();
    data.append('name', inputCreateRef.current.value);
    insertPlaylist(data)
      .then(data => console.log(data))
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
              <SideBarOptions
                className={'lib-sub'}
                href={'/home/playlists/642b70a67134ddb1a057f08a'}
                title={'Playlist1'}
              />
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
