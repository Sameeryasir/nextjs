"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  FileText,
  Database,
  Key,
  Package,
  Shield,
  MonitorDot,
  Banknote,
  MessagesSquare,
  Wallet,
  Layers,
  Ticket,
  ListOrdered,
  KeyIcon,
  House,
  HomeIcon,
  StoreIcon,
} from "lucide-react";

const SidebarSection = ({
  title,
  icon,
  items,
  activeMenu,
  onToggle,
  selectedOption,
  setSelectedOption,
}) => {
  return (
    <div>
      <div
        className="flex items-center px-5 py-3 cursor-pointer hover:bg-orange-500 transition-colors"
        onClick={onToggle}
      >
        {icon}
        <span className="ml-3 font-medium">{title}</span>
      </div>

      {activeMenu &&
        items.map((item) => (
          <Link href={item.route} key={item.id}>
            <div
              onClick={() => setSelectedOption(item.id)}
              className={`flex items-center px-6 py-2 gap-3 cursor-pointer transition-colors rounded-md ${
                selectedOption === item.id
                  ? "border-l-4 border-orange-500 bg-gray-800"
                  : "hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center gap-3 flex-grow">
                <div
                  className={`w-3 h-3 rounded-full border-2 ${
                    selectedOption === item.id
                      ? "bg-orange-500 border-orange-500"
                      : "border-gray-500"
                  }`}
                ></div>
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default function Sidebar() {
  const pathname = usePathname();

  const arrearProject = [
    {
      id: "project",
      name: "Project",
      icon: <FileText className="w-4 h-4" />,
      route: "/arrearproject",
    },
  ];

  const warehouseItems = [
    {
      id: "warehouse",
      name: "Warehouse",
      icon: <HomeIcon className="w-4 h-4" />,
      route: "/warehouse",
    },
    {
      id: "stockin",
      name: "Stock In",
      icon: <StoreIcon className="w-4 h-4" />,
      route: "/stockin",
    },
    {
      id: "stockout",
      name: "Stock Out",
      icon: <StoreIcon className="w-4 h-4" />,
      route: "/stockout",
    },
    {
      id: "stocktransfer",
      name: "Stock Transfer",
      icon: <StoreIcon className="w-4 h-4" />,
      route: "/stocktransfer",
    },
  ];

  const securityItems = [
    {
      id: "securitymodule",
      name: "Security Module",
      icon: <Shield className="w-4 h-4" />,
      route: "/security_module",
    },
    {
      id: "Balencermanagement",
      name: "Balancer Management",
      icon: <Layers className="w-4 h-4" />,
      route: "/balencer_management",
    },
    {
      id: "creditbalence",
      name: "Credit Balance",
      icon: <Wallet className="w-4 h-4" />,
      route: "/credit_balence",
    },
    {
      id: "tokenavailability",
      name: "Token Availability",
      icon: <Ticket className="w-4 h-4" />,
      route: "/token_availability",
    },
    {
      id: "transactionviewer",
      name: "Transaction Viewer",
      icon: <ListOrdered className="w-4 h-4" />,
      route: "/transaction_viewer",
    },
    {
      id: "specialtoken",
      name: "Special Token",
      icon: <KeyIcon className="w-4 h-4" />,
      route: "/specialtoken",
    },
  ];

  const financeItems = [
    {
      id: "venderaccount",
      name: "Vendor Account",
      icon: <FileText className="w-4 h-4" />,
      route: "/venderaccount",
    },
    {
      id: "vendersession",
      name: "Vendor Session",
      icon: <FileText className="w-4 h-4" />,
      route: "/vendorsession",
    },
  ];

  const menuItems = [
    {
      id: "contract",
      name: "Contract Management",
      icon: <FileText className="w-4 h-4" />,
      route: "/",
    },
    {
      id: "compensating",
      name: "Compensating",
      icon: <Database className="w-4 h-4" />,
      route: "/compensation",
    },
    {
      id: "vending",
      name: "Vending",
      icon: <Package className="w-4 h-4" />,
      route: "/vending",
    },
    {
      id: "maintenance",
      name: "Maintenance Token",
      icon: <Key className="w-4 h-4" />,
      route: "/tokenpage",
    },
    {
      id: "key-issue",
      name: "Key Issue Token",
      icon: <Shield className="w-4 h-4" />,
      route: "/Keytoken",
    },
    {
      id: "free-issue",
      name: "Free Issue Token",
      icon: <Key className="w-4 h-4" />,
      route: "/freetoken",
    },
  ];

  const allItems = [
    ...menuItems,
    ...financeItems,
    ...securityItems,
    ...warehouseItems,
    ...arrearProject,
  ];

  const getInitialOption = () => {
    const current = allItems.find((item) => item.route === pathname);
    return current?.id || "contract";
  };

  const getInitialMenu = () => {
    const id = getInitialOption();
    if (menuItems.some((i) => i.id === id)) return "business";
    if (financeItems.some((i) => i.id === id)) return "finance";
    if (securityItems.some((i) => i.id === id)) return "security";
    if (warehouseItems.some((i) => i.id === id)) return "warehouse";
    if (arrearProject.some((i) => i.id === id)) return "project";
    return "business";
  };

  const [selectedOption, setSelectedOption] = useState(getInitialOption);
  const [activeMenu, setActiveMenu] = useState(getInitialMenu);

  useEffect(() => {
    const current = allItems.find((item) => item.route === pathname);
    if (current) {
      setSelectedOption(current.id);
      if (menuItems.some((i) => i.id === current.id)) setActiveMenu("business");
      else if (financeItems.some((i) => i.id === current.id))
        setActiveMenu("finance");
      else if (securityItems.some((i) => i.id === current.id))
        setActiveMenu("security");
      else if (warehouseItems.some((i) => i.id === current.id))
        setActiveMenu("warehouse");
      else if (arrearProject.some((i) => i.id === current.id))
        setActiveMenu("project");
    }
  }, [pathname]);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <aside className="bg-gray-900 text-white shadow-lg overflow-y-auto top-0 left-0 w-72 min-w-72 shrink-0 h-screen">
      <div className="p-5 border-b border-gray-700">
        <h1 className="text-2xl font-bold tracking-wide text-white">SECDAIS</h1>
      </div>

      <nav className="mt-4">
        <SidebarSection
          title="Business"
          icon={<Building2 className="w-5 h-5" />}
          items={menuItems}
          activeMenu={activeMenu === "business"}
          onToggle={() => toggleMenu("business")}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <SidebarSection
          title="Finance"
          icon={<Banknote className="w-5 h-5" />}
          items={financeItems}
          activeMenu={activeMenu === "finance"}
          onToggle={() => toggleMenu("finance")}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <Link href="/messegesubscription">
          <div className="flex items-center px-5 py-3 hover:bg-orange-500 transition-colors cursor-pointer">
            <MessagesSquare className="w-5 h-5" />
            <span className="ml-3">Message Subscription</span>
          </div>
        </Link>
        <SidebarSection
          title="Security"
          icon={<Shield className="w-5 h-5" />}
          items={securityItems}
          activeMenu={activeMenu === "security"}
          onToggle={() => toggleMenu("security")}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <SidebarSection
          title="Meter Warehouse"
          icon={<House className="w-5 h-5" />}
          items={warehouseItems}
          activeMenu={activeMenu === "warehouse"}
          onToggle={() => toggleMenu("warehouse")}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <SidebarSection
          title="Arrear"
          icon={<MonitorDot className="w-5 h-5" />}
          items={arrearProject}
          activeMenu={activeMenu === "project"}
          onToggle={() => toggleMenu("project")}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </nav>
    </aside>
  );
}
