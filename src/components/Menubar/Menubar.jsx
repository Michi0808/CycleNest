import { Sidebar, Menu, MenuItem, Logo } from 'react-mui-sidebar';
import Google from '@mui/icons-material/Google';
import Cached from '@mui/icons-material/Cached';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

export default function Menubar() {
  return (
    <Sidebar width={'270px'} showProfile={false}>
      <Logo component={Link} href="/" img="./../../public/logo-cycle-nest.png">
        AdminMart
      </Logo>
      <Menu>
        <MenuItem icon={<Cached />} component={Link} link="/cycle">
          Cycle Settings
        </MenuItem>
        <MenuItem icon={<Google />} component={Link} link="/google-sync">
          Google Sync
        </MenuItem>
        {/* <MenuItem
          icon={<NotificationsActiveIcon />}
          component={Link}
          link="/ana"
        >
          Notifications
        </MenuItem> */}
        <MenuItem icon={<LogoutIcon />}>Sign Out</MenuItem>
      </Menu>
    </Sidebar>
  );
}
