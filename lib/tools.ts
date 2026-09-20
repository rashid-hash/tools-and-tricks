// lib/tools.ts
import { 
  Calculator, Smartphone, Image as ImageIcon, FileText, Coins, 
  MessageCircle, Plane, Type, AlignLeft, CreditCard, 
  Banknote, Map, CalendarDays, Zap, Wifi, Fuel, Bus, 
  Gem, PiggyBank, Home, ShoppingCart, 
  Clock
} from "lucide-react";

// ক্যাটাগরির লিস্টে "Bangladesh Utility Tools" যুক্ত করা হলো
export type Tool = {
  id: string;
  name: string;
  slug: string;
  category: "Mockups" | "Calculators" | "Image Tools" | "Social Media" | "Business" | "Developer" | "Fun Tools" | "Bangladesh Utility Tools";
  description: string;
  icon: React.ElementType;
  url: string;
  isPopular?: boolean;
  isNew?: boolean;
};

// 1. Tools Data Array (আপনার দেওয়া নতুন টুলগুলো এখানে যুক্ত করা হয়েছে)
export const toolsData: Tool[] = [
  // --- Existing Popular Tools ---
  {
    id: "emi-calculator",
    name: "EMI Calculator",
    slug: "emi-calculator",
    category: "Calculators",
    description: "Calculate loan EMIs and total interest instantly.",
    icon: Coins,
    url: "/emi-calculator",
    isPopular: true,
  },
  {
    id: "invoice-generator",
    name: "Invoice Generator",
    slug: "invoice-generator",
    category: "Business",
    description: "Instant cash memo generator for F-commerce.",
    icon: FileText,
    url: "/invoice-generator",
    isPopular: true,
  },
  {
    id: "fb-post",
    name: "FB Fake Post",
    slug: "fb-fake-post",
    category: "Social Media",
    description: "Create realistic Facebook post screenshots.",
    icon: Smartphone,
    url: "/facebook-post",
    isPopular: true,
  },

  // --- NEW: Bangladesh Utility Tools ---
  {
    id: "bdt-currency",
    name: "BDT Currency Converter",
    slug: "bdt-currency-converter",
    category: "Bangladesh Utility Tools",
    description: "Live exchange rates and BDT to USD conversion.",
    icon: Banknote,
    url: "/tools/bdt-currency",
    isNew: true,
    isPopular: true,
  },
  {
    id: "bd-land-area",
    name: "BD Land Area Calculator",
    slug: "bd-land-area-calculator",
    category: "Bangladesh Utility Tools",
    description: "Convert Katha, Bigha, Shotok, and Ojutangsho effortlessly.",
    icon: Map,
    url: "/tools/land-calculator",
    isPopular: true,
  },
  {
    id: "bangla-age",
    name: "বাংলা বয়স Calculator",
    slug: "bangla-age-calculator",
    category: "Bangladesh Utility Tools",
    description: "Calculate accurate age in Bengali format.",
    icon: CalendarDays,
    url: "/tools/bangla-age",
  },
  {
    id: "bangla-date",
    name: "বাংলা Date Converter",
    slug: "bangla-date-converter",
    category: "Bangladesh Utility Tools",
    description: "Convert English dates to accurate Bangla calendar dates.",
    icon: CalendarDays,
    url: "/tools/bangla-date",
  },
  {
    id: "bangla-number-words",
    name: "Number → Bangla Words",
    slug: "number-to-bangla-words",
    category: "Bangladesh Utility Tools",
    description: "Convert numeric digits to Bengali words instantly.",
    icon: Type,
    url: "/tools/number-to-words",
    isNew: true,
  },
  {
    id: "vat-calculator",
    name: "VAT Calculator BD",
    slug: "vat-calculator",
    category: "Bangladesh Utility Tools",
    description: "Calculate VAT easily for Bangladeshi businesses.",
    icon: Calculator,
    url: "/tools/vat-calculator",
  },
  {
    id: "salary-calculator",
    name: "Salary Calculator",
    slug: "salary-calculator",
    category: "Bangladesh Utility Tools",
    description: "Calculate net salary, gross, and basic structure.",
    icon: Banknote,
    url: "/tools/salary-calculator",
  },
  {
    id: "electricity-bill",
    name: "Electricity Bill Estimator",
    slug: "electricity-bill-estimator",
    category: "Bangladesh Utility Tools",
    description: "Estimate monthly bill based on BD unit rates.",
    icon: Zap,
    url: "/tools/electricity-bill",
  },
  {
    id: "internet-cost",
    name: "Internet Package Cost",
    slug: "internet-package-cost",
    category: "Bangladesh Utility Tools",
    description: "Calculate broadband and mobile data pack costs.",
    icon: Wifi,
    url: "/tools/internet-cost",
  },
  {
    id: "fuel-cost",
    name: "Fuel Cost Calculator",
    slug: "fuel-cost-calculator",
    category: "Bangladesh Utility Tools",
    description: "Calculate fuel costs for bikes and cars in BD.",
    icon: Fuel,
    url: "/tools/fuel-cost",
  },
  {
    id: "bus-fare",
    name: "Bus/Travel Fare Calculator",
    slug: "bus-travel-fare",
    category: "Bangladesh Utility Tools",
    description: "Estimate inter-district travel costs.",
    icon: Bus,
    url: "/tools/bus-fare",
  },
  {
    id: "remittance",
    name: "Remittance Calculator",
    slug: "remittance-calculator",
    category: "Bangladesh Utility Tools",
    description: "Calculate remittance with govt 2.5% incentive.",
    icon: Banknote,
    url: "/tools/remittance",
    isPopular: true,
  },
  {
    id: "gold-price",
    name: "Gold Price Calculator",
    slug: "gold-price-calculator",
    category: "Bangladesh Utility Tools",
    description: "Calculate gold price based on Bhori and Ana.",
    icon: Gem,
    url: "/tools/gold-price",
  },
  {
    id: "dps-calculator",
    name: "DPS Calculator",
    slug: "dps-calculator",
    category: "Bangladesh Utility Tools",
    description: "Calculate monthly DPS maturity amount in BD banks.",
    icon: PiggyBank,
    url: "/tools/dps-calculator",
  },
  {
    id: "house-rent",
    name: "House Rent Splitter",
    slug: "house-rent-split",
    category: "Bangladesh Utility Tools",
    description: "Split bachelor house rent, bills, and meals easily.",
    icon: Home,
    url: "/tools/house-rent",
  },
  {
    id: "grocery-budget",
    name: "Grocery Budget Calculator",
    slug: "grocery-budget",
    category: "Bangladesh Utility Tools",
    description: "Manage and estimate monthly grocery lists.",
    icon: ShoppingCart,
    url: "/tools/grocery-budget",
  },
  {
    id: "overtime",
    name: "Overtime Calculator",
    slug: "বাংলাদেশ শ্রম আইন অনুযায়ী আপনার ওভারটাইম (OT) বিল হিসাব করুন।",
    category: "Bangladesh Utility Tools",
    description: "Calculate your overtime pay according to Bangladesh labor law.",
    icon: Clock,
    url: "/tools/overtime-calculator",
  },
  {
    id: "savings-calculator",
    name: "Savings Calculator",
    slug: "savings-calculator",
    category: "Bangladesh Utility Tools",
    description: "Calculate your monthly savings and compound interest.",
    icon: PiggyBank, // ফাইলের উপরে `import { PiggyBank } from "lucide-react";` ইমপোর্ট করতে ভুলবেন না
    url: "/tools/savings-calculator"
  }
];

// 2. Categories Data Array
export const categoriesData = [
  { 
    name: "Bangladesh Utility Tools", 
    icon: Map, 
    count: 16, 
    description: "Calculators and converters made specifically for BD" 
  },
  { 
    name: "Mockups", 
    icon: Smartphone, 
    count: 3, 
    description: "Pixel-perfect social & app screens" 
  },
  { 
    name: "Calculators", 
    icon: Calculator, 
    count: 2, 
    description: "Complex everyday math made easy" 
  },
  { 
    name: "Business", 
    icon: FileText, 
    count: 1, 
    description: "Tools for daily operations & commerce" 
  },
  { 
    name: "Social Media", 
    icon: MessageCircle, 
    count: 2, 
    description: "Viral content & fake chat generators" 
  },
  { 
    name: "Developer", 
    icon: Type, 
    count: 2, 
    description: "Utilities for typing and coding" 
  }
];