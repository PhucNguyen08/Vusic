import { useContext, useState, useRef } from 'react';
import SideBarOptions from './SideBarOptions';
import { ThemeContext } from '../../api/Theme';
import {
  Album,
  HomeOutlined,
  PlaylistPlay,
  SearchOutlined,
  Add,
} from '@material-ui/icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../assets/scss/SideBar.scss';

function SideBar() {
  const inputCreateRef = useRef();
  const useStyle = useContext(ThemeContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreate = () => {
    console.log(inputCreateRef.current.value);
  };

  return (
    <>
      <aside style={useStyle.component} className={'aside-bar'}>
        <div className="aside-bar-container">
          <p className={'p1'}>
            <span>LIBRARY</span>
          </p>
          <SideBarOptions
            className={'lib-sub'}
            Icon={HomeOutlined}
            href={'/home'}
            title={'Home'}
          />
          <SideBarOptions
            className={'lib-sub'}
            Icon={Album}
            href={'/home/album'}
            title={'Album'}
          />
          <SideBarOptions
            className={'lib-sub'}
            Icon={SearchOutlined}
            href={'/home/search'}
            title={'Search'}
          />
          {/*<SideBarOptions className={"lib-sub"} Icon={AlbumIcon} href={"/home/album"}  title={"Album"}/>
                <SideBarOptions className={"lib-sub"} Icon={EmojiPeopleIcon} href={"/home/artist"}  title={"Artist"}/>*/}
        </div>
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
              Icon={PlaylistPlay}
              href={'/home/playlist/instrumental'}
              title={'Instrumental'}
            />
            <SideBarOptions
              className={'lib-sub'}
              Icon={PlaylistPlay}
              href={'/home/playlist/electronic'}
              title={'Electronic'}
            />
          </div>
        </div>
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
          <Button variant="primary" onClick={handleCreate}>
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
