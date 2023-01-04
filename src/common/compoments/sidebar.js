const Sidebar = () => {
  return (
    <aside className="sidebar-nav flex-c flex-end mr2">
      <span className="material-symbols-outlined mb1 logo font-large">connect_without_contact</span>
      <div className="nav-item mb1">
        <span className="material-icons btn">home</span>
      </div>
      <div className="nav-item mb1">
        <span className="material-icons btn">account_circle</span>
      </div>
    </aside>
  );
};

export { Sidebar };
