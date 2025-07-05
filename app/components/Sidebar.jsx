"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Calculator,
  UserCheck,
  ListChecks,
  ClipboardList,
  ShoppingCart,
  AlertCircle,
  ClipboardCheck,
  User,
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
  Key as KeyIcon,
  Home as HomeIcon,
  Store as StoreIcon,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Glasses as GlassesIcon,
  Search,
  Eye,
  Info as InfoIcon,
  Book,
  Locate as LocateIcon,
  ParkingMeter,
  Gauge,
  Feather,
  CreditCard as CreditCardIcon,
  IndentIncrease as IndentIncreaseIcon,
  Scale,
  LineChart,
  PersonStanding,
  Stamp,
  Settings,
  Server,
  Network,
  Cpu,
  HardDrive,
  Terminal,
  Users,
  Bell,
  Calendar,
  File,
  Monitor,
} from "lucide-react";

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
            <div key={item.id}>
              <Link href={item.route} passHref legacyBehavior>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
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
                    <span className="text-gray-300">{item.icon}</span>
                    <span className="text-sm text-gray-200">{item.name}</span>
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
                          <span className="text-gray-300">{subItem.icon}</span>
                          <span className="text-sm text-gray-200">
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

  // Dashboard item
  const dashboardItem = {
    id: "dashboard",
    name: "Dashboard",
    icon: <Gauge className="w-4 h-4 text-white" />,
    route: "/",
  };

  const baseInformationItems = [
    {
      id: "parameters",
      name: "Parameters",
      icon: <InfoIcon className="w-4 h-4 text-white" />,
      route: "/base_information/parameter",
    },
    {
      id: "dictionary",
      name: "Dictionary",
      icon: <Book className="w-4 h-4 text-white" />,
      route: "/base_information/dictionary",
    },
    {
      id: "region",
      name: "Region",
      icon: <LocateIcon className="w-4 h-4 text-white" />,
      route: "/base_information/region",
    },
    {
      id: "metermodel",
      name: "Meter Model",
      icon: <Gauge className="w-4 h-4 text-white" />,
      route: "/base_information/metermodel",
    },
    {
      id: "definefee",
      name: "Define Fee",
      icon: <CreditCardIcon className="w-4 h-4 text-white" />,
      route: "/base_information/definefee",
    },
    {
      id: "tariff",
      name: "Tariff Index",
      icon: <LineChart className="w-4 h-4 text-white" />,
      route: "/base_information/tariff",
    },
    {
      id: "customertype",
      name: "Customer Type",
      icon: <PersonStanding className="w-4 h-4 text-white" />,
      route: "/base_information/customertype",
    },
    {
      id: "stamptax",
      name: "Stamp Tax",
      icon: <Stamp className="w-4 h-4 text-white" />,
      route: "/base_information/stamptax",
    },
  ];

  const systemInformationItems = [
    {
      id: "organization",
      name: "Organization",
      icon: <Users className="w-4 h-4 text-white" />,
      route: "/system_information/organization",
      subItems: [
        {
          id: "registration",
          name: "Registration",
          icon: <FileText className="w-4 h-4 text-white" />,
          route: "/system_information/registration",
        },
        {
          id: "department",
          name: "Department",
          icon: <Building2 className="w-4 h-4 text-white" />,
          route: "/system_information/department",
        },
        {
          id: "roles-permissions",
          name: "Roles/Permissions",
          icon: <Key className="w-4 h-4 text-white" />,
          route: "/system_information/role_permission",
        },
        {
          id: "operation",
          name: "Operation",
          icon: <Settings className="w-4 h-4 text-white" />,
          route: "/system_information/operation",
        },
      ],
    },
    {
      id: "interface-definition",
      name: "Interface Definition",
      icon: <MonitorDot className="w-4 h-4 text-white" />,
      route: "/system_information/interface_definition",
      subItems: [
        {
          id: "screen",
          name: "Screen",
          icon: <MonitorDot className="w-4 h-4 text-white" />,
          route: "/system_information/screen",
        },
        {
          id: "language",
          name: "Language",
          icon: <MessageCircle className="w-4 h-4 text-white" />,
          route: "/system_information/language",
        },
        {
          id: "languagepackage",
          name: "Language Package",
          icon: <MessageCircle className="w-4 h-4 text-white" />,
          route: "/system_information/language_package",
        },
        {
          id: "importfile",
          name: "Import File",
          icon: <File className="w-4 h-4 text-white" />,
          route: "/system_information/import_file",
        },
      ],
    },
    {
      id: "system",
      name: "System Log",
      icon: <FileText className="w-4 h-4 text-white" />,
      route: "/system_information/system_log",
    },
    {
      id: "systeminformation",
      name: "System Information",
      icon: <Monitor className="w-4 h-4 text-white" />,
      route: "/system_information/systeminformation",
    },
  ];

  const arrearItems = [
    {
      id: "project",
      name: "Project",
      icon: <FileText className="w-4 h-4" />,
      route: "/arrearproject",
    },
    {
      id: "customercontract",
      name: "Customer Contract",
      icon: <FileText className="w-4 h-4" />,
      route: "/arrearcustomercontract",
    },
    {
      id: "payarrear",
      name: "Pay Arrear",
      icon: <FileText className="w-4 h-4" />,
      route: "/arrearpayarrear",
    },
    {
      id: "adjustments",
      name: "Adjustments",
      icon: <FileText className="w-4 h-4" />,
      route: "/arrearpayadjustments",
    },
  ];

  const reportItems = [
    {
      id: "orientee-client",
      name: "Orientee Client BCHTS",
      icon: <Users className="w-4 h-4 text-gray-300" />,
      route: "/reports/orientee-client",
    },
    {
      id: "daily-cash-report",
      name: "Daily Cash Report",
      icon: <Banknote className="w-4 h-4 text-gray-300" />,
      route: "/reports/daily-cash",
      subItems: [
        {
          id: "vs-sales-summary",
          name: "VS Sales Summary",
          icon: <FileText className="w-4 h-4 text-gray-300" />,
          route: "/reports/dailycashreport",
        },
        {
          id: "vs-cash-kwh-total",
          name: "VS Cash & kWh Total",
          icon: <Calculator className="w-4 h-4 text-gray-300" />,
          route: "/reports/dailycashreport/cash-kwh-total",
        },
        {
          id: "operator-trans-count",
          name: "Operator Trans Count",
          icon: <UserCheck className="w-4 h-4 text-gray-300" />,
          route: "/reports/dailycashreport/operator-trans-count",
        },
        {
          id: "unit-costs-by-tariff",
          name: "Unit Costs By Tariff",
          icon: <ListChecks className="w-4 h-4 text-gray-300" />,
          route: "/reports/dailycashreport/unit-costs-by-tariff",
        },
        {
          id: "account-details",
          name: "Account & Details",
          icon: <ClipboardList className="w-4 h-4 text-gray-300" />,
          route: "/reports/dailycashreport/account-details",
        },
      ],
    },
    {
      id: "vending-reports", // Changed from "vending" to avoid confusion
      name: "Vending Reports",
      icon: <ClipboardList className="w-4 h-4 text-gray-300" />, // Different icon from business vending
      route: "/reports/Vending",
      subItems: [
        {
          id: "purchase-by-zone",
          name: "Purchase(Kwh) By Zone",
          icon: <GlassesIcon className="w-4 h-4 text-gray-300" />,
          route: "/reports/Vending/purchase-by-zone",
        },
        {
          id: "operator-vending-report",
          name: "Operator Vending Report",
          icon: <UserCheck className="w-4 h-4 text-gray-300" />,
          route: "/reports/Vending/operator-vending-report",
        },
        {
          id: "fee-report",
          name: "Fee Report",
          icon: <CreditCardIcon className="w-4 h-4 text-gray-300" />,
          route: "/reports/Vending/fee-report",
        },
        {
          id: "daily-subaccount-by-project",
          name: "Daily SubAccount By Project",
          icon: <Database className="w-4 h-4 text-gray-300" />,
          route: "/reports/vending/daily-subaccount-by-project",
        },
        {
          id: "purchase-chart",
          name: "Purchase Chart",
          icon: <LineChart className="w-4 h-4 text-gray-300" />,
          route: "/reports/vending/purchase-chart",
        },
      ],
    },
    {
      id: "arrear-report",
      name: "Arrear Report",
      icon: <AlertCircle className="w-4 h-4 text-gray-300" />,
      route: "/reports/arrear",
    },
    {
      id: "needs-report",
      name: "Needs Report",
      icon: <ClipboardCheck className="w-4 h-4 text-gray-300" />,
      route: "/reports/needs",
    },
    {
      id: "customer-report",
      name: "Customer Report",
      icon: <User className="w-4 h-4 text-gray-300" />,
      route: "/reports/customer",
    },
  ];

  const warehouseItems = [
    {
      id: "warehouse",
      name: "Warehouse",
      icon: <HomeIcon className="w-4 h-4" />,
      route: "/meterwarehouse/warehouse",
    },
    {
      id: "stockin",
      name: "Stock In",
      icon: <StoreIcon className="w-4 h-4" />,
      route: "/meterwarehouse/stockin",
    },
    {
      id: "stockout",
      name: "Stock Out",
      icon: <StoreIcon className="w-4 h-4" />,
      route: "/meterwarehouse/stockout",
    },
    {
      id: "stocktransfer",
      name: "Stock Transfer",
      icon: <StoreIcon className="w-4 h-4" />,
      route: "/meterwarehouse/stocktransfer",
    },
    {
      id: "meterviewer",
      name: "Meter Viewer",
      icon: <Eye className="w-4 h-4" />,
      route: "/meterwarehouse/meterviewer",
    },
    {
      id: "warhouseviewer",
      name: "Warehouse Viewer",
      icon: <Eye className="w-4 h-4" />,
      route: "/meterwarehouse/warehouseviewer",
    },
  ];

  const securityItems = [
    {
      id: "securitymodule",
      name: "Security Module",
      icon: <Shield className="w-4 h-4" />,
      route: "/security/security_module",
    },
    {
      id: "balencermanagement",
      name: "Balancer Management",
      icon: <Layers className="w-4 h-4" />,
      route: "/security/balencer_management",
    },
    {
      id: "creditbalence",
      name: "Credit Balance",
      icon: <Wallet className="w-4 h-4" />,
      route: "/security/credit_balence",
    },
    {
      id: "tokenavailability",
      name: "Token Availability",
      icon: <Ticket className="w-4 h-4" />,
      route: "/security/token_availability",
    },
    {
      id: "transactionviewer",
      name: "Transaction Viewer",
      icon: <ListOrdered className="w-4 h-4" />,
      route: "/security/transaction_viewer",
    },
    {
      id: "specialtoken",
      name: "Special Token",
      icon: <KeyIcon className="w-4 h-4" />,
      route: "/security/specialtoken",
    },
  ];

  const financeItems = [
    {
      id: "venderaccount",
      name: "Vendor Account",
      icon: <FileText className="w-4 h-4" />,
      route: "/finance/venderaccount",
    },
    {
      id: "vendersession",
      name: "Vendor Session",
      icon: <FileText className="w-4 h-4" />,
      route: "/finance/vendorsession",
    },
  ];

  const messageItems = [
    {
      id: "messegesubscription",
      name: "Message Subscription",
      icon: <MessageCircle className="w-4 h-4" />,
      route: "/message/messagesubscription",
    },
  ];

  const menuItems = [
    dashboardItem,
    {
      id: "contract",
      name: "Contract Management",
      icon: <FileText className="w-4 h-4" />,
      route: "/business/contract", // Fixed typo from "bussiness" to "business"
    },
    {
      id: "compensating",
      name: "Compensating",
      icon: <Database className="w-4 h-4" />,
      route: "/business/compensation",
    },
    {
      id: "vending-operations", // Changed from "vending" to avoid confusion
      name: "Vending Operations", // Changed from just "Vending"
      icon: <ShoppingCart className="w-4 h-4" />, // Different icon from reports
      route: "/business/vending", // Fixed typo in path
    },
    {
      id: "maintenance",
      name: "Maintenance Token",
      icon: <Key className="w-4 h-4" />,
      route: "/business/maintenancetoken",
    },
    {
      id: "key-issue",
      name: "Key Issue Token",
      icon: <Shield className="w-4 h-4" />,
      route: "/business/keytoken",
    },
    {
      id: "free-issue",
      name: "Free Issue Token",
      icon: <Key className="w-4 h-4" />,
      route: "/business/freetoken",
    },
  ];

  const [selectedOption, setSelectedOption] = useState("dashboard");
  const [selectedSubOption, setSelectedSubOption] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    if (pathname === "/") {
      setSelectedOption("dashboard");
      setSelectedSubOption(null);
      return;
    }

    let currentItem = null;
    let currentSubItem = null;

    const allItems = [
      ...menuItems,
      ...financeItems,
      ...securityItems,
      ...warehouseItems,
      ...arrearItems,
      ...messageItems,
      ...baseInformationItems,
      ...systemInformationItems,
      ...reportItems,
    ];

    for (const item of allItems) {
      if (item.route === pathname) {
        currentItem = item;
        break;
      }
      if (item.subItems) {
        for (const subItem of item.subItems) {
          if (subItem.route === pathname) {
            currentItem = item;
            currentSubItem = subItem;
            break;
          }
        }
        if (currentItem) break;
      }
    }

    if (currentItem) {
      setSelectedOption(currentItem.id);
      if (currentSubItem) {
        setSelectedSubOption(currentSubItem.id);
      } else {
        setSelectedSubOption(null);
      }

      if (menuItems.some((i) => i.id === currentItem.id))
        setActiveMenu("business");
      else if (financeItems.some((i) => i.id === currentItem.id))
        setActiveMenu("finance");
      else if (securityItems.some((i) => i.id === currentItem.id))
        setActiveMenu("security");
      else if (warehouseItems.some((i) => i.id === currentItem.id))
        setActiveMenu("warehouse");
      else if (arrearItems.some((i) => i.id === currentItem.id))
        setActiveMenu("arrear");
      else if (messageItems.some((i) => i.id === currentItem.id))
        setActiveMenu("message");
      else if (baseInformationItems.some((i) => i.id === currentItem.id))
        setActiveMenu("baseinformation");
      else if (systemInformationItems.some((i) => i.id === currentItem.id))
        setActiveMenu("systeminformation");
      else if (reportItems.some((i) => i.id === currentItem.id))
        setActiveMenu("reports");
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
        <Link href="/" passHref legacyBehavior>
          <div
            onClick={() => {
              setSelectedOption("dashboard");
              setSelectedSubOption(null);
              setActiveMenu(null);
            }}
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
          title="Business"
          icon={<Building2 className="w-5 h-5" />}
          items={menuItems.filter((item) => item.id !== "dashboard")}
          activeMenu={activeMenu === "business"}
          onToggle={() => toggleMenu("business")}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          selectedSubOption={selectedSubOption}
          setSelectedSubOption={setSelectedSubOption}
        />

        <SidebarSection
          title="Finance"
          icon={<Banknote className="w-5 h-5" />}
          items={financeItems}
          activeMenu={activeMenu === "finance"}
          onToggle={() => toggleMenu("finance")}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          selectedSubOption={selectedSubOption}
          setSelectedSubOption={setSelectedSubOption}
        />

        <SidebarSection
          title="Messages"
          icon={<MessagesSquare className="w-5 h-5" />}
          items={messageItems}
          activeMenu={activeMenu === "message"}
          onToggle={() => toggleMenu("message")}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          selectedSubOption={selectedSubOption}
          setSelectedSubOption={setSelectedSubOption}
        />

        <SidebarSection
          title="Security"
          icon={<Shield className="w-5 h-5" />}
          items={securityItems}
          activeMenu={activeMenu === "security"}
          onToggle={() => toggleMenu("security")}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          selectedSubOption={selectedSubOption}
          setSelectedSubOption={setSelectedSubOption}
        />

        <SidebarSection
          title="Meter Warehouse"
          icon={<HomeIcon className="w-5 h-5" />}
          items={warehouseItems}
          activeMenu={activeMenu === "warehouse"}
          onToggle={() => toggleMenu("warehouse")}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          selectedSubOption={selectedSubOption}
          setSelectedSubOption={setSelectedSubOption}
        />

        <SidebarSection
          title="Arrear"
          icon={<MonitorDot className="w-5 h-5" />}
          items={arrearItems}
          activeMenu={activeMenu === "arrear"}
          onToggle={() => toggleMenu("arrear")}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          selectedSubOption={selectedSubOption}
          setSelectedSubOption={setSelectedSubOption}
        />

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

        <SidebarSection
          title="Reports"
          icon={<FileText className="w-5 h-5" />}
          items={reportItems}
          activeMenu={activeMenu === "reports"}
          onToggle={() => toggleMenu("reports")}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          selectedSubOption={selectedSubOption}
          setSelectedSubOption={setSelectedSubOption}
        />
      </nav>
    </aside>
  );
}
