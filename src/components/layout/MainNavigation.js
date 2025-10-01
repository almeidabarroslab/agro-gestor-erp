import React from 'react';
import LucideIcon from '../ui/LucideIcon';

const VIEW_PLANTACOES = "plantacoes";
const VIEW_RECURSOS = "recursos";
const VIEW_FINANCEIRO = "financeiro";
const VIEW_RH = "rh";
const VIEW_CRM = "crm";
const VIEW_DASHBOARD = "dashboard";

const MainNavigation = ({ currentView, setView }) => {
  const navItems = [
    { id: VIEW_PLANTACOES, label: "Plantações", icon: "Leaf" },
    { id: VIEW_RECURSOS, label: "Insumos / Estoque", icon: "Package" },
    { id: VIEW_FINANCEIRO, label: "Finanças / Vendas", icon: "Receipt" },
    { id: VIEW_CRM, label: "Clientes / Fornecedores", icon: "Briefcase" },
    { id: VIEW_RH, label: "Mão de Obra / RH", icon: "Users" },
    { id: VIEW_DASHBOARD, label: "Dashboard ERP", icon: "PieChart" },
  ];

  return (
    <nav className="bg-gray-700 shadow-lg sticky top-14 z-10">
      <div className="container mx-auto flex justify-start space-x-2 sm:space-x-4 p-2 sm:p-3 overflow-x-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex items-center px-3 sm:px-4 py-2 text-sm font-medium rounded-xl transition whitespace-nowrap
                            ${
                              currentView === item.id
                                ? "bg-white text-teal-600 shadow-md transform scale-105"
                                : "text-white hover:bg-gray-600 hover:text-white"
                            }`}
          >
            <LucideIcon
              name={item.icon}
              className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2"
            />
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MainNavigation;