import { useContext } from 'react';
import { ThemeContext } from '../../api/Theme';
import SideBarOptions from './SideBarOptions';
import '../assets/scss/SideBar.scss';

function SideBarAdmin() {
  const useStyle = useContext(ThemeContext);
  return (
    <aside style={useStyle.component} className={'aside-bar'}>
      <div className="aside-bar-container">
        <p className={'p1'}>
          <span>LIBRARY</span>
        </p>
        <SideBarOptions className={'lib-sub'} href={'/admin'} title={'Home'} />
        <SideBarOptions
          className={'lib-sub'}
          href={'/admin/songs'}
          title={'Songs'}
        />
        <SideBarOptions
          className={'lib-sub'}
          href={'/admin/artist'}
          title={'Artist'}
        />
        <SideBarOptions
          className={'lib-sub'}
          href={'/admin/album'}
          title={'Album'}
        />
        {/*<SideBarOptions className={"lib-sub"} Icon={AlbumIcon} href={"/home/album"}  title={"Album"}/>
                <SideBarOptions className={"lib-sub"} Icon={EmojiPeopleIcon} href={"/home/artist"}  title={"Artist"}/>*/}
      </div>
    </aside>
  );
}

/*
 *
 * */
export default SideBarAdmin;
