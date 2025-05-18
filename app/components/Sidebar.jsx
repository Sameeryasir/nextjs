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
  MessageCircle,
  ChevronDown,
  ChevronRight,
  GlassesIcon,
  Search,
  Eye,
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
    <div className="mb-1">
      <div
        className="flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-orange-500/90 transition-colors rounded-md mx-2"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <span className="text-orange-400">{icon}</span>
          <span className="ml-3 font-medium text-gray-100">{title}</span>
        </div>
        {activeMenu ? (
          <ChevronDown className="w-4 h-4 text-gray-300" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-300" />
        )}
      </div>

      {activeMenu && (
        <div className="mt-1 mb-3 ml-4 pl-2 border-l border-gray-700">
          {items.map((item) => (
            <Link href={item.route} key={item.id}>
              <div
                onClick={() => setSelectedOption(item.id)}
                className={`flex items-center px-4 py-2 gap-3 cursor-pointer transition-colors rounded-md mx-2 ${
                  selectedOption === item.id
                    ? "border-l-2 border-orange-500 bg-gray-800/80"
                    : "hover:bg-gray-700/60"
                }`}
              >
                <div className="flex items-center gap-3 flex-grow">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      selectedOption === item.id
                        ? "bg-orange-500"
                        : "bg-gray-500"
                    }`}
                  ></div>
                  <span className="text-gray-300">{item.icon}</span>
                  <span className="text-sm text-gray-200">{item.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
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
    {
      id:"meterviewer",
      name:"Meter Viewer",
      icon:<Eye className="w-4 h-4"/>,
      route:"/meterviewer"
    },
    {
      id:"warhouseviewer",
      name:"Warehouse Viewer",
      icon:<Eye className="w-4 h-4 "/>,
      route:"/warehouseviewer"
    }
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

  const messageItems = [
    {
      id: "messegesubscription",
      name: "Message Subscription",
      icon: <MessageCircle className="w-4 h-4" />,
      route: "/messegesubscription",
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
      route: "/keytoken",
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
    ...messageItems,
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
    if (messageItems.some((i) => i.id === id)) return "message";
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
      else if (messageItems.some((i) => i.id === current.id))
        setActiveMenu("message");
    }
  }, [pathname]);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <aside className="bg-gray-900 text-white shadow-lg overflow-y-auto top-0 shrink-0 left-0 w-72 h-full border-r border-gray-800">
      <div className="p-5 border-b border-gray-800">
        <h1 className="text-2xl font-bold tracking-wide text-white">
          <span className="text-orange-400">SEC</span>
          <span>DAIS</span>
        </h1>
      </div>

      <nav className="mt-4 pb-6">
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

        <SidebarSection
          title="Messages"
          icon={<MessagesSquare className="w-5 h-5" />}
          items={messageItems}
          activeMenu={activeMenu === "message"}
          onToggle={() => toggleMenu("message")}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

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
