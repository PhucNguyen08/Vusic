import React, { useContext } from 'react';
import '../assets/scss/SideBar.scss';
import SideBarOptions from './SideBarOptions';
import { ThemeContext } from '../../api/Theme';
import {
  ExploreOutlined,
  HomeOutlined,
  PlaylistPlay,
  SearchOutlined,
} from '@material-ui/icons';

function SideBarAdmin() {
  const useStyle = useContext(ThemeContext);
  return (
    <aside style={useStyle.component} className={'aside-bar'}>
      <div className="aside-bar-container">
        <p className={'p1'}>
          <span>LIBRARY</span>
        </p>
        <SideBarOptions
          className={'lib-sub'}
          Icon={HomeOutlined}
          href={'/admin'}
          title={'Home'}
        />
        <SideBarOptions
          className={'lib-sub'}
          Icon={ExploreOutlined}
          href={'/admin/about'}
          title={'About'}
        />
        <SideBarOptions
          className={'lib-sub'}
          Icon={SearchOutlined}
          href={'/admin/search'}
          title={'Search'}
        />
        {/*<SideBarOptions className={"lib-sub"} Icon={AlbumIcon} href={"/home/album"}  title={"Album"}/>
                <SideBarOptions className={"lib-sub"} Icon={EmojiPeopleIcon} href={"/home/artist"}  title={"Artist"}/>*/}
      </div>
      <div className="aside-bar-container playlist">
        <div>
          <p className={'p1'}>
            <span>MY DATA</span>
          </p>
          <SideBarOptions
            className={'lib-sub'}
            Icon={PlaylistPlay}
            href={'/admin/account'}
            title={'Account'}
          />
          <SideBarOptions
            className={'lib-sub'}
            Icon={PlaylistPlay}
            href={'/admin/songs'}
            title={'Songs'}
          />
          <SideBarOptions
            className={'lib-sub'}
            Icon={PlaylistPlay}
            href={'/admin/artist'}
            title={'Artist'}
          />
          <SideBarOptions
            className={'lib-sub'}
            Icon={PlaylistPlay}
            href={'/admin/user'}
            title={'User'}
          />
          <SideBarOptions
            className={'lib-sub'}
            Icon={PlaylistPlay}
            href={'/admin/album'}
            title={'Album'}
          />
          <SideBarOptions
            className={'lib-sub'}
            Icon={PlaylistPlay}
            href={'/admin/playlist'}
            title={'Playlist'}
          />
        </div>
      </div>
    </aside>
  );
}

/*
 *
 * */
export default SideBarAdmin;
