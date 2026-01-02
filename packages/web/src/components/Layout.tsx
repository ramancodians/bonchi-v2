import { useState, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BonchiLogo } from '@bonchi/shared/assets';
import { authUtils, useLogoutMutation } from '@bonchi/shared';
import {
  TbHome,
  TbCalendar,
  TbHeadset,
  TbDots,
  TbLogout,
  TbMenu2,
  TbX,
  TbWorld,
} from 'react-icons/tb';
import { LanguageSwitcher } from './LanguageSwitcher';

interface LayoutProps {
  children: ReactNode;
}

interface NavItem {
  label: string;
  icon: ReactNode;
  path: string;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const logoutMutation = useLogoutMutation();

  const user = authUtils.getUser();

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
    <div className="min-h-screen bg-base-200">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-base-100 border-r border-base-300">
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

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-base-100 border-b border-base-300">
        <div className="flex items-center justify-between h-16 px-4">
          <Link to="/">
            <img src={BonchiLogo} alt="Bonchi Cares" className="h-8" />
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <TbWorld className="text-lg text-base-content/60" />
              <LanguageSwitcher />
            </div>

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="btn btn-ghost btn-sm btn-square"
              aria-label="Open menu"
            >
              <TbMenu2 className="text-xl" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Sidebar */}
        <aside
          className={`absolute top-0 right-0 h-full w-72 bg-base-100 shadow-xl transform transition-transform ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-base-300">
            <span className="font-semibold">Menu</span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="btn btn-ghost btn-sm btn-square"
              aria-label="Close menu"
            >
              <TbX className="text-xl" />
            </button>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-base-300">
            <div className="flex items-center gap-3">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-12">
                  <span>{getInitials(user?.name)}</span>
                </div>
              </div>
              <div>
                <p className="font-semibold">{user?.name || 'User'}</p>
                <p className="text-sm text-base-content/60">User</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
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

          {/* Logout */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-base-300">
            <button
              onClick={handleLogout}
              className="btn btn-ghost w-full justify-start gap-2 text-error hover:bg-error/10"
            >
              <TbLogout className="text-xl" />
              <span>Logout</span>
            </button>
          </div>
        </aside>
      </div>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 pb-20 lg:pt-0 lg:pb-0">
        <div className="p-4 lg:p-8">{children}</div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-300 z-40">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                isActive(item.path)
                  ? 'text-primary'
                  : 'text-base-content/60 hover:text-base-content'
              }`}
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Floating Call Button */}
      <a
        href="tel:+911234567890"
        className="fixed bottom-20 right-4 lg:bottom-8 lg:right-8 btn btn-circle btn-lg btn-success shadow-lg z-30"
        aria-label="Call support"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      </a>
    </div>
  );
};

export default Layout;
