export interface User {
  id: string;
  nationalId: string;
  firstName: string;
  lastName: string;
  firstNameArabic: string;
  lastNameArabic: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: "male" | "female";
  nationality: string;
  address: Address;
  avatar?: string;
  isVerified: boolean;
  registrationDate: string;
}

export interface Address {
  street: string;
  streetArabic: string;
  building: string;
  city: string;
  cityArabic: string;
  district: string;
  districtArabic: string;
  postalCode: string;
}

export interface Service {
  id: string;
  name: string;
  nameArabic: string;
  description: string;
  descriptionArabic: string;
  icon: string;
  category: ServiceCategory;
  status: ServiceStatus;
  estimatedTime: string;
  requiredDocuments: string[];
  fees: number;
  url: string;
  ministry: string;
  ministryArabic: string;
}

export type ServiceCategory =
  | "civil-registry"
  | "vehicle-registration"
  | "taxation"
  | "utilities"
  | "social-security"
  | "health"
  | "education"
  | "justice"
  | "interior"
  | "labor";

export type ServiceStatus = "online" | "offline" | "maintenance" | "limited";

export interface Application {
  id: string;
  serviceId: string;
  userId: string;
  status: ApplicationStatus;
  submissionDate: string;
  completionDate?: string;
  estimatedCompletionDate: string;
  documents: Document[];
  currentStep: number;
  totalSteps: number;
  fees: number;
  isPaid: boolean;
  trackingNumber: string;
  notes?: string;
}

export type ApplicationStatus =
  | "draft"
  | "submitted"
  | "under-review"
  | "additional-documents-required"
  | "approved"
  | "rejected"
  | "completed"
  | "expired";

export interface Document {
  id: string;
  name: string;
  nameArabic: string;
  type: DocumentType;
  size: number;
  uploadDate: string;
  isRequired: boolean;
  isVerified: boolean;
  url?: string;
}

export type DocumentType =
  | "national-id"
  | "passport"
  | "birth-certificate"
  | "marriage-certificate"
  | "divorce-certificate"
  | "death-certificate"
  | "residence-proof"
  | "income-proof"
  | "tax-clearance"
  | "medical-report"
  | "photo"
  | "other";

export interface Notification {
  id: string;
  userId: string;
  title: string;
  titleArabic: string;
  message: string;
  messageArabic: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  applicationId?: string;
}

export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "reminder";

export interface Payment {
  id: string;
  applicationId: string;
  userId: string;
  amount: number;
  currency: "USD" | "LBP";
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId: string;
  createdAt: string;
  completedAt?: string;
}

export type PaymentMethod =
  | "credit-card"
  | "debit-card"
  | "bank-transfer"
  | "cash"
  | "digital-wallet";
export type PaymentStatus =
  | "pending"
  | "completed"
  | "failed"
  | "refunded"
  | "cancelled";

export interface Ministry {
  id: string;
  name: string;
  nameArabic: string;
  description: string;
  descriptionArabic: string;
  logo: string;
  color: string;
  services: string[]; // service IDs
  contact: {
    phone: string;
    email: string;
    website: string;
    address: string;
    addressArabic: string;
  };
  status: ServiceStatus;
}

export interface DashboardStats {
  totalApplications: number;
  pendingApplications: number;
  completedApplications: number;
  totalPayments: number;
  unreadNotifications: number;
  servicesUsed: number;
}

export interface Language {
  code: "en" | "ar";
  name: string;
  direction: "ltr" | "rtl";
}

export interface AppState {
  user: User | null;
  language: Language;
  isAuthenticated: boolean;
  isLoading: boolean;
  notifications: Notification[];
  services: Service[];
  applications: Application[];
  ministries: Ministry[];
}
