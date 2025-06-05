import React, { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle Button (visible only on small screens) */}
      <button
        type="button"
        onClick={toggleSidebar}
        aria-controls="default-sidebar"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-gray-50 dark:bg-gray-800 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 mt-18 font-medium">
            {/* Sidebar links */}
            <SidebarLink icon="dashboard" label="Dashboard" />
            <SidebarLink icon="grid" label="Kanban" badge="Pro" />
            <SidebarLink icon="inbox" label="Inbox" badge="3" />
            <SidebarLink icon="users" label="Users" />
            <SidebarLink icon="products" label="Products" />
            <SidebarLink icon="signin" label="Sign In" />
            <SidebarLink icon="logout" label="Logout" />
          </ul>
        </div>
      </aside>
    </>
  );
};

const SidebarLink = ({ icon, label, badge }) => {
  const icons = {
    dashboard: (
      <svg
        className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        fill="currentColor"
        viewBox="0 0 22 21"
      >
        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
      </svg>
    ),
    grid: (
      <svg
        className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        fill="currentColor"
        viewBox="0 0 18 18"
      >
        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Z..." />
      </svg>
    ),
    inbox: (
      <svg
        className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="..." />
      </svg>
    ),
    users: (
      <svg
        className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        fill="currentColor"
        viewBox="0 0 20 18"
      >
        <path d="..." />
      </svg>
    ),
    products: (
      <svg
        className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        fill="currentColor"
        viewBox="0 0 18 20"
      >
        <path d="..." />
      </svg>
    ),
    signin: (
      <svg
        className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        fill="none"
        viewBox="0 0 18 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
        />
      </svg>
    ),
    logout: (
      <svg
        className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="..." />
      </svg>
    ),
  };

  return (
    <li>
      <a
        href="#"
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        {icons[icon]}
        <span className="ms-3 flex-1 whitespace-nowrap">{label}</span>
        {badge && (
          <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
            {badge}
          </span>
        )}
      </a>
    </li>
  );
};

export default Sidebar;
