import { Sidebar, Menu, MenuItem, Logo } from 'react-mui-sidebar';
import Google from '@mui/icons-material/Google';
import Cached from '@mui/icons-material/Cached';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

export default function Menubar() {
  return (
    <Sidebar width={'270px'} showProfile={false}>
      <Logo
        component={Link}
        href="/"
        img="https://adminmart.com/wp-content/uploads/2024/03/logo-admin-mart-news.png"
      >
        AdminMart
      </Logo>
      <MenuItem icon={<Cached />} component={Link} link="/tes">
        Cycle Settings
      </MenuItem>
      <MenuItem icon={<Google />} component={Link} link="/test">
        Google Sync
      </MenuItem>
      <MenuItem icon={<NotificationsActiveIcon />} component={Link} link="/ana">
        Notifications
      </MenuItem>
      <MenuItem icon={<LogoutIcon />}>Sign Out</MenuItem>
    </Sidebar>
  );
}
