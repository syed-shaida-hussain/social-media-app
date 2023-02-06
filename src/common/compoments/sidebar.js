import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar-nav flex-c flex-end mr2">
      <NavLink
        to="/home"
        className={({ isActive }) =>
          isActive
            ? 'material-symbols-outlined logo font-large pr-clr link mb1'
            : 'material-symbols-outlined logo pr-clr link font-large mb1 '
        }>
        connect_without_contact
      </NavLink>
      <NavLink
        to="/home"
        className={({ isActive }) =>
          isActive ? 'material-icons  filled link mb1' : 'material-symbols-outlined link mb1'
        }>
        home
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive ? 'material-icons  filled link mb1' : 'material-symbols-outlined link mb1'
        }>
        account_circle
      </NavLink>
      <NavLink
        to="/bookmarks"
        className={({ isActive }) =>
          isActive ? 'material-icons  filled link' : 'material-symbols-outlined link '
        }>
        bookmark
      </NavLink>
    </aside>
  );
};

export { Sidebar };
{
  /* <aside className = "sidebar-container">
<ul className = "sidebar-nav">
   <NavLink to = "/" className={({ isActive }) => 
              (isActive ? "sidebar-link-active  " : " link ")}> <li className = "sidebar-link hover" ><span className="material-icons">home</span> Home </li>
   </NavLink>
   <NavLink to = "/videos" className={({ isActive }) => 
              (isActive ? "sidebar-link-active " : " link")}> <li className = "sidebar-link hover" ><span className="material-icons">explore</span> Explore </li>
   </NavLink>
   <NavLink to = "/library" className={({ isActive }) => 
              (isActive ? "sidebar-link-active " : " link")}> <li className = "sidebar-link hover" ><span className="material-icons">video_library</span> Library </li>
   </NavLink>
   <NavLink to = "/playlists" className={({ isActive }) => 
              (isActive ? "sidebar-link-active " : " link")}> <li className = "sidebar-link hover" ><span className="material-icons">playlist_play</span> Playlists</li>
   </NavLink>
   <NavLink to = "/history" className={({ isActive }) => 
              (isActive ? "sidebar-link-active " : " link")}> <li className = "sidebar-link hover" ><span className="material-icons">history</span> History </li>
   </NavLink>
</ul>
</aside> */
}
