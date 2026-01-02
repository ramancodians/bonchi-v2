import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BonchiLogo } from '@bonchi/shared/assets';
import { authUtils, useLogoutMutation } from '@bonchi/shared';
import {
  TbHome,
  TbCalendar,
  TbHeadset,
  TbDots,
  TbLogout,
  TbWorld,
} from 'react-icons/tb';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const SidePanel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = authUtils.getUser();
  const logoutMutation = useLogoutMutation();

  const navItems: NavItem[] = [
    { label: 'Home', icon: <TbHome className="text-xl" />, path: '/' },
    {
      label: 'Appointments',
      icon: <TbCalendar className="text-xl" />,
      path: '/appointments',
    },
    {
      label: 'Support',
      icon: <TbHeadset className="text-xl" />,
      path: '/support',
    },
    {
      label: 'More',
      icon: <TbDots className="text-xl" />,
      path: '/more',
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        navigate('/login', { replace: true });
      },
    });
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside className="flex flex-col h-full bg-base-100 border-r border-base-300">
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b border-base-300">
        <Link to="/">
          <img src={BonchiLogo} alt="Bonchi Cares" className="h-12" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive(item.path)
                ? 'bg-primary text-primary-content'
                : 'hover:bg-base-200 text-base-content'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User Info & Actions */}
      <div className="p-4 border-t border-base-300 space-y-4">
        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content rounded-full w-10">
              <span className="text-sm">{getInitials(user?.name)}</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-base-content/60">User</p>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-2 px-2">
          <TbWorld className="text-lg text-base-content/60" />
          <LanguageSwitcher />
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="btn btn-ghost btn-sm w-full justify-start gap-2 text-error hover:bg-error/10"
        >
          <TbLogout className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default SidePanel;
