import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LucideIcon from "../ui/LucideIcon";

const navLinks = [
  { to: "/", text: "Dashboard", icon: "LayoutDashboard" },
  { to: "/plantacoes", text: "Plantações", icon: "Leaf" },
  { to: "/recursos", text: "Recursos", icon: "Package" },
  { to: "/vendas", text: "Vendas", icon: "ShoppingCart" },
  { to: "/crm", text: "CRM", icon: "Users" },
  { to: "/rh", text: "RH", icon: "UserCog" },
  { to: "/maquinario", text: "Maquinário", icon: "Tractor" },
  { to: "/receituarios", text: "Receituários", icon: "FileText" },
  { to: "/mapa", text: "Mapa", icon: "Map" },
  { to: "/analise-custos", text: "Análise de Custos", icon: "BarChart3" },
  { to: "/produtor-rural", text: "Produtor Rural", icon: "Info" },
  { to: "/tasks", text: "Tarefas", icon: "CheckSquare" }, // Added TaskView link
];

const MainNavigation = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const activeLinkClass = "bg-gray-900 text-white";
  const inactiveLinkClass = "text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <LucideIcon
                name={isMenuOpen ? "X" : "Menu"}
                className="block h-6 w-6"
              />
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <NavLink to="/">
                <img
                  src="https://i.imgur.com/4a8RBx6.png"
                  alt="GG AGRO Logo"
                  className="h-10"
                />
              </NavLink>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `${
                        isActive ? activeLinkClass : inactiveLinkClass
                      } rounded-md px-3 py-2 text-sm font-medium flex items-center`
                    }
                  >
                    <LucideIcon name={link.icon} className="mr-2 h-5 w-5" />
                    {link.text}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
              <LucideIcon name="Bell" className="h-6 w-6" />
            </button>

            {/* Profile dropdown */}
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={isProfileMenuOpen}
                  aria-haspopup="true"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
                    {user?.email ? user.email.charAt(0).toUpperCase() : "?"}
                  </div>
                </button>
              </div>
              {isProfileMenuOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-0"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Seu Perfil
                  </NavLink>
                  <NavLink
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-1"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Configurações
                  </NavLink>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsProfileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-2"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `${
                    isActive ? activeLinkClass : inactiveLinkClass
                  } block rounded-md px-3 py-2 text-base font-medium flex items-center`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <LucideIcon name={link.icon} className="mr-2 h-5 w-5" />
                {link.text}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainNavigation;
