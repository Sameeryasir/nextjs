"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Info as InfoIcon,
  Book,
  Locate as LocateIcon,
  Stamp,
  PlusCircle,
  Search,
  Terminal,
  ChevronDown,
  ChevronRight,
  Gauge,
  Settings,
  Building,
  Computer,
  FileText,
  PanelTop,
  GitBranch,
  Store,
  Wrench,
  FileCog,
  BarChart,
} from "lucide-react";

// This component is designed to render a collapsible section of the sidebar.
// It handles the display of parent items and their nested sub-items.
const SidebarSection = ({
  title,
  icon,
  items,
  activeMenu,
  onToggle,
  selectedOption,
  setSelectedOption,
  selectedSubOption,
  setSelectedSubOption,
}) => {
  const router = useRouter();

  return (
    <div className="mb-1">
      {/* Section Header (e.g., "Base Information", "Branch") */}
      <div
        className="flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-orange-500/90 transition-colors rounded-md mx-2"
        onClick={onToggle}
      >
        <div className="flex items-center">
          {icon && <span className="text-orange-400">{icon}</span>}
          <span className={`font-medium text-gray-100 ${icon ? "ml-3" : ""}`}>
            {title}
          </span>
        </div>
        {activeMenu ? (
          <ChevronDown className="w-4 h-4 text-gray-300" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-300" />
        )}
      </div>

      {/* Collapsible Content with Sub-Items */}
      {activeMenu && (
        <div className="mt-1 mb-3 ml-4 pl-2 border-l border-gray-700">
          {items.map((item) => (
            <div key={item.id}>
              <Link href={item.route} passHref legacyBehavior>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    // If it has sub-items, toggle it. If not, navigate.
                    if (!item.subItems) {
                      setSelectedOption(item.id);
                      setSelectedSubOption(null);
                      router.push(item.route);
                    } else {
                      setSelectedOption(
                        selectedOption === item.id ? null : item.id
                      );
                      setSelectedSubOption(null);
                    }
                  }}
                  className={`flex items-center px-4 py-2 gap-3 cursor-pointer transition-colors rounded-md mx-2 ${
                    selectedOption === item.id || selectedSubOption === item.id
                      ? "border-l-2 border-orange-500 bg-gray-800/80"
                      : "hover:bg-gray-700/60"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-grow">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        selectedOption === item.id ||
                        selectedSubOption === item.id
                          ? "bg-orange-500"
                          : "bg-gray-500"
                      }`}
                    ></div>
                    {item.icon && (
                      <span className="text-gray-300">{item.icon}</span>
                    )}
                    <span
                      className={`text-sm text-gray-200 ${
                        item.icon ? "" : "ml-6"
                      }`}
                    >
                      {item.name}
                    </span>
                    {/* Arrow for nested sub-menus */}
                    {item.subItems && (
                      <div className="ml-auto">
                        {selectedOption === item.id ? (
                          <ChevronDown className="w-4 h-4 text-gray-300" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-300" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>

              {/* Renders the nested sub-items if the parent is selected */}
              {item.subItems && selectedOption === item.id && (
                <div className="ml-4 pl-2 border-l border-gray-600">
                  {item.subItems.map((subItem) => (
                    <Link
                      href={subItem.route}
                      key={subItem.id}
                      passHref
                      legacyBehavior
                    >
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          // Set both parent and child as active and navigate
                          setSelectedOption(item.id);
                          setSelectedSubOption(subItem.id);
                          router.push(subItem.route);
                        }}
                        className={`flex items-center px-4 py-2 gap-3 cursor-pointer transition-colors rounded-md mx-2 ${
                          selectedSubOption === subItem.id
                            ? "border-l-2 border-orange-400 bg-gray-800/60"
                            : "hover:bg-gray-700/40"
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-grow">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              selectedSubOption === subItem.id
                                ? "bg-orange-400"
                                : "bg-gray-400"
                            }`}
                          ></div>
                          {subItem.icon && (
                            <span className="text-gray-300">
                              {subItem.icon}
                            </span>
                          )}
                          <span
                            className={`text-sm text-gray-200 ${
                              subItem.icon ? "" : "ml-6"
                            }`}
                          >
                            {subItem.name}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState("tpm");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSubOption, setSelectedSubOption] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  // --- Base Category Items ---
  const dashboardItem = {
    id: "dashboard",
    name: "Dashboard",
    icon: <Gauge className="w-4 h-4 text-white" />,
    route: "/solution2/seconddashboard",
  };

  const baseInformationItems = [
    {
      id: "parameters",
      name: "Parameters",
      icon: <InfoIcon className="w-4 h-4 text-white" />,
      route: "/baseinformationparameters",
    },
    {
      id: "dictionary",
      name: "Dictionary",
      icon: <Book className="w-4 h-4 text-white" />,
      route: "/baseinformationdictionary",
    },
    {
      id: "region",
      name: "Region",
      icon: <LocateIcon className="w-4 h-4 text-white" />,
      route: "/baseinformationregion",
    },
    {
      id: "stamptax",
      name: "Stamp Tax",
      icon: <Stamp className="w-4 h-4 text-white" />,
      route: "/baseInformationstamptax",
    },
  ];

  const systemInformationItems = [
    {
      id: "organization",
      name: "Organization",
      icon: <Building className="w-4 h-4 text-white" />,
      route: "#",
      subItems: [
        {
          id: "registerinfo",
          name: "Register Information",
          route: "/systemregisterinformation",
        },
        { id: "department", name: "Department", route: "/systemdepartment" },
        {
          id: "roles",
          name: "Roles/Permission",
          route: "/systemrolepermissions",
        },
        { id: "operator", name: "Operator", route: "/systemoperator" },
      ],
    },
    {
      id: "interface",
      name: "Interface",
      icon: <Computer className="w-4 h-4 text-white" />,
      route: "#",
      subItems: [
        { id: "screen", name: "Screen", route: "/interfacescreen" },
        { id: "language", name: "Language", route: "/interfacelanguage" },
        {
          id: "languagepackage",
          name: "Language Package",
          route: "/interfacepackage",
        },
        { id: "importfile", name: "Import File", route: "/interfaceimport" },
      ],
    },
    {
      id: "systemlog",
      name: "System Log",
      icon: <FileText className="w-4 h-4 text-white" />,
      route: "/systemlog",
    },
    {
      id: "systeminfo",
      name: "System Information",
      icon: <PanelTop className="w-4 h-4 text-white" />,
      route: "/systeminformation",
    },
    {
      id: "systemtasks",
      name: "System Tasks",
      icon: <PanelTop className="w-4 h-4 text-white" />,
      route: "/systemtasks",
    },
    {
      id: "controlpanel",
      name: "Control Panel",
      icon: <PanelTop className="w-4 h-4 text-white" />,
      route: "/controlpanel",
    },
  ];

  // --- TPM Category Items ---
  const tpmDashboardItem = {
    id: "tpm-dashboard",
    name: "Dashboard",
    icon: <Gauge className="w-5 h-5" />,
    route: "/tpm-dashboard",
  };

  const tpmNavigationItems = [
    // **CHANGED**: "Branch" is now structured like "Organization" to be a collapsible menu.
    {
      id: "branch",
      name: "Branch",
      icon: <GitBranch className="w-4 h-4" />,
      route: "#", // Parent is a trigger, not a link
      subItems: [
        // **FIXED**: Using absolute paths for sub-menu routes.
        {
          id: "add-branch",
          name: "Add Branch",
          icon: <PlusCircle size={12} />,
          route: "/addbranch",
        },
        {
          id: "browse-branch",
          name: "Browse Branch",
          icon: <Search size={12} />,
          route: "/browsebranch",
        },
        {
          id: "branch-terminals",
          name: "Branch Terminals",
          icon: <Terminal size={12} />,
          route: "/branchterminal",
        },
         {
          id: "pos-terminals",
          name: "POS Terminals",
          icon: <Terminal size={12} />,
          route: "/posterminals",
        },
        {
          id: "recharge",
          name: "Recharge",
          icon: <Terminal size={12} />,
          route: "/branchrecharge",
        },
         {
          id: "cancelation",
          name: "Cancellation",
          icon: <Terminal size={12} />,
          route: "/branchcancellation",
        },
      ],
    },
    {
      id: "vending-agency",
      name: "Vending Agency",
      icon: <Store className="w-4 h-4" />,
      route: "/tpm/vending-agency",
      subItems: [
        // **FIXED**: Using absolute paths for sub-menu routes.
        {
          id: "vending-server",
          name: "Vending Server",
          icon: <PlusCircle size={12} />,
          route: "/vendingserver",
        },
          {
          id: "meter-viewer",
          name: "Meter Viewer",
          icon: <PlusCircle size={12} />,
          route: "/meterviewer",
        },
          {
          id: "transaction-viewer",
          name: "Transaction Viewer",
          icon: <PlusCircle size={12} />,
          route: "/transactionviewer",
        },
         {
          id: "transaction-duration",
          name: "Transaction Duration",
          icon: <PlusCircle size={12} />,
          route: "/transactionduration",
        },
        {
          id: "transaction-failed",
          name: "Transaction Failed",
          icon: <PlusCircle size={12} />,
          route: "/transactionfailed",
        },
         {
          id: "payarrrear-viewer",
          name: "PayArrear Viewer",
          icon: <PlusCircle size={12} />,
          route: "/payarrearviewer",
        },
        
      ],
    },
    {
      id: "Switch",
      name: "Switch",
      icon: <Wrench className="w-4 h-4" />,
      route: "/tpm/switch",
      subItems:[
         {
          id: "sever-list",
          name: "Server List",
          icon: <PlusCircle size={12} />,
          route: "/switchserverlist",
        },

      ]
    },
    {
      id: "sc-management",
      name: "SC Management",
      icon: <Wrench className="w-4 h-4" />,
      route: "/tpm/sc-management",
    },
    {
      id: "sc-generation",
      name: "SC Generation",
      icon: <FileCog className="w-4 h-4" />,
      route: "/tpm/sc-generation",
    },
    {
      id: "tp-reports",
      name: "TP Reports",
      icon: <BarChart className="w-4 h-4" />,
      route: "/tpm/tp-reports",
    },
    {
      id: "sc-reports",
      name: "SC Reports",
      icon: <FileText className="w-4 h-4" />,
      route: "/tpm/sc-reports",
    },
  ];

  // **REFACTORED**: This useEffect now handles all routing logic for both categories
  // in a more maintainable way. It checks the current URL against all possible menu items
  // and sub-items to set the correct active state.
  useEffect(() => {
    let found = false;

    const findAndSetState = (item, parent = null) => {
        if (item.route === pathname) {
            setActiveCategory(parent ? parent.category : item.category);
            setSelectedOption(parent ? parent.id : item.id);
            setSelectedSubOption(parent ? item.id : null);
            setActiveMenu(parent ? parent.menuId : item.menuId);
            found = true;
        }
    };
    
    // Check Base Items
    const allBaseMenus = [
        { ...dashboardItem, category: 'base', menuId: null },
        ...baseInformationItems.map(i => ({ ...i, category: 'base', menuId: 'baseinformation' })),
        ...systemInformationItems
    ];
    for (const item of allBaseMenus) {
        if (item.subItems) {
            for (const subItem of item.subItems) {
                findAndSetState(subItem, { ...item, category: 'base', menuId: 'systeminformation' });
                if (found) break;
            }
        } else {
            findAndSetState(item);
        }
        if (found) break;
    }

    // Check TPM Items
    if (!found) {
        const allTpmMenus = [
            {...tpmDashboardItem, category: 'tpm', menuId: null},
            ...tpmNavigationItems
        ];
        for (const item of allTpmMenus) {
            if (item.subItems) {
                for (const subItem of item.subItems) {
                    findAndSetState(subItem, { ...item, category: 'tpm', menuId: item.id });
                    if (found) break;
                }
            } else {
                findAndSetState(item);
            }
            if (found) break;
        }
    }
  }, [pathname]);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === "base") {
      router.push("/");
    } else {
      router.push("/tpm-dashboard");
    }
  };

  return (
    <aside className="bg-gray-900 text-white shadow-lg overflow-y-auto top-0 shrink-0 left-0 w-80 h-full border-r border-gray-800 flex flex-col">
      <div className="p-5 border-b border-gray-800">
        <h1 className="text-2xl font-bold tracking-wide text-white">
          <span className="text-orange-400">SEC</span>
          <span>DAIS</span>
        </h1>
      </div>

      <div className="p-4 flex items-center gap-2 border-b border-gray-800">
        <button
          onClick={() => handleCategoryChange("base")}
          className={`flex-1 text-center py-2 rounded-md transition-colors ${
            activeCategory === "base"
              ? "bg-gray-700 font-semibold"
              : "bg-gray-800 hover:bg-gray-700/50"
          }`}
        >
          Base
        </button>
        <button
          onClick={() => handleCategoryChange("tpm")}
          className={`flex-1 text-center py-2 rounded-md transition-colors ${
            activeCategory === "tpm"
              ? "bg-orange-500 font-semibold"
              : "bg-gray-800 hover:bg-gray-700/50"
          }`}
        >
          TPM
        </button>
      </div>

      <nav className="mt-4 pb-6 flex-1">
        {/* CONDITIONAL RENDER: Base Menu */}
        {activeCategory === "base" && (
          <>
            <Link href="/" passHref legacyBehavior>
              <div
                onClick={() => setSelectedOption("dashboard")}
                className={`flex items-center px-5 py-3 gap-3 cursor-pointer transition-colors rounded-md mx-2 mb-2 ${
                  selectedOption === "dashboard"
                    ? "bg-gray-800/80 border-l-2 border-orange-500"
                    : "hover:bg-orange-500/90"
                }`}
              >
                <Gauge className="w-5 h-5 text-orange-400" />
                <span className="font-medium text-gray-100">Dashboard</span>
              </div>
            </Link>
            <SidebarSection
              title="Base Information"
              icon={<InfoIcon className="w-5 h-5" />}
              items={baseInformationItems}
              activeMenu={activeMenu === "baseinformation"}
              onToggle={() => toggleMenu("baseinformation")}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              selectedSubOption={selectedSubOption}
              setSelectedSubOption={setSelectedSubOption}
            />
            <SidebarSection
              title="System Information"
              icon={<Settings className="w-5 h-5" />}
              items={systemInformationItems}
              activeMenu={activeMenu === "systeminformation"}
              onToggle={() => toggleMenu("systeminformation")}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              selectedSubOption={selectedSubOption}
              setSelectedSubOption={setSelectedSubOption}
            />
          </>
        )}

        {/* **CHANGED**: CONDITIONAL RENDER: TPM Menu */}
        {/* This section now correctly uses the SidebarSection component for items with sub-menus. */}
        {activeCategory === "tpm" && (
          <>
            {/* TPM Dashboard Link */}
            <Link href={tpmDashboardItem.route} passHref legacyBehavior>
              <div
                onClick={() => {
                  setSelectedOption(tpmDashboardItem.id);
                  setSelectedSubOption(null);
                  router.push(tpmDashboardItem.route);
                }}
                className={`flex items-center px-5 py-3 gap-3 cursor-pointer transition-colors rounded-md mx-2 mb-2 ${
                  selectedOption === tpmDashboardItem.id
                    ? "bg-orange-500 border-l-2 border-orange-500"
                    : "hover:bg-orange-500/90"
                }`}
              >
                <span className="text-white">{tpmDashboardItem.icon}</span>
                <span className="font-medium text-gray-100">
                  {tpmDashboardItem.name}
                </span>
              </div>
            </Link>

            {/* Other TPM Navigation Items */}
            {tpmNavigationItems.map((item) =>
              item.subItems ? (
                // If the item has sub-items, render it as a collapsible section.
                <SidebarSection
                  key={item.id}
                  title={item.name}
                  icon={item.icon}
                  items={item.subItems}
                  activeMenu={activeMenu === item.id}
                  onToggle={() => toggleMenu(item.id)}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  selectedSubOption={selectedSubOption}
                  setSelectedSubOption={setSelectedSubOption}
                />
              ) : (
                // Otherwise, render it as a simple link.
                <Link href={item.route} key={item.id} passHref legacyBehavior>
                  <div
                     onClick={(e) => {
                        e.preventDefault();
                        setSelectedOption(item.id);
                        setSelectedSubOption(null);
                        setActiveMenu(null);
                        router.push(item.route);
                      }}
                    className={`flex items-center px-5 py-3 gap-3 cursor-pointer transition-colors rounded-md mx-2 mb-1 ${
                      selectedOption === item.id
                        ? "bg-gray-800/80 border-l-2 border-orange-500"
                        : "hover:bg-orange-500/90"
                    }`}
                  >
                    <span className="text-orange-400">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </div>
                </Link>
              )
            )}
          </>
        )}
      </nav>
    </aside>
  );
}