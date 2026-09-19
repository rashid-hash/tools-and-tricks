import { 
  Calculator, Smartphone, Image as ImageIcon, FileText, Coins, 
  MessageCircle, Plane, Type, AlignLeft, CreditCard 
} from "lucide-react";

export type Tool = {
  id: string;
  name: string;
  slug: string;
  category: "Mockups" | "Calculators" | "Image Tools" | "Social Media" | "Business" | "Developer" | "Fun Tools";
  description: string;
  icon: React.ElementType;
  url: string;
  isPopular?: boolean;
  isNew?: boolean;
};

// 1. Tools Data Array
export const toolsData: Tool[] = [
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
    isNew: true,
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
  {
    id: "bkash-mockup",
    name: "bKash Receipt",
    slug: "bkash-receipt",
    category: "Mockups",
    description: "Generate pixel-perfect bKash transaction receipts.",
    icon: CreditCard,
    url: "/bkash",
  },
  {
    id: "image-resizer",
    name: "Photo Resizer",
    slug: "image-resizer",
    category: "Image Tools",
    description: "Resize images perfectly for job applications.",
    icon: ImageIcon,
    url: "/image-resizer",
  }
]; // <-- toolsData অ্যারে এখানে শেষ হয়েছে

// 2. Categories Data Array
export const categoriesData = [
  { 
    name: "Mockups", 
    icon: Smartphone, 
    count: 3, 
    description: "Pixel-perfect social & app screens" 
  },
  { 
    name: "Business", 
    icon: FileText, 
    count: 1, 
    description: "Tools for daily operations & commerce" 
  },
  { 
    name: "Calculators", 
    icon: Calculator, 
    count: 2, 
    description: "Complex everyday math made easy" 
  },
  { 
    name: "Social Media", 
    icon: MessageCircle, 
    count: 2, 
    description: "Viral content & fake chat generators" 
  },
  { 
    name: "Image Tools", 
    icon: ImageIcon, 
    count: 1, 
    description: "Edit, compress and resize assets" 
  },
  { 
    name: "Developer", 
    icon: Type, 
    count: 2, 
    description: "Utilities for typing and coding" 
  }
]; // <-- categoriesData অ্যারে এখানে শেষ হয়েছে