import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AppState,
  User,
  Language,
  Notification,
  Service,
  Application,
  Ministry,
} from "@/types";

interface AppStore extends AppState {
  // Actions
  setUser: (user: User | null) => void;
  setLanguage: (language: Language) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (notificationId: string) => void;
  setServices: (services: Service[]) => void;
  setApplications: (applications: Application[]) => void;
  setMinistries: (ministries: Ministry[]) => void;
  addApplication: (application: Application) => void;
  updateApplication: (
    applicationId: string,
    updates: Partial<Application>
  ) => void;
  login: (userData: User) => void;
  logout: () => void;
}

const defaultLanguage: Language = {
  code: "en",
  name: "English",
  direction: "ltr",
};

const arabicLanguage: Language = {
  code: "ar",
  name: "العربية",
  direction: "rtl",
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      language: defaultLanguage,
      isAuthenticated: false,
      isLoading: false,
      notifications: [],
      services: [],
      applications: [],
      ministries: [],

      // Actions
      setUser: (user) => set({ user }),

      setLanguage: (language) => {
        set({ language });
        // Update document direction
        if (typeof document !== "undefined") {
          document.documentElement.dir = language.direction;
          document.documentElement.lang = language.code;
        }
      },

      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

      setLoading: (isLoading) => set({ isLoading }),

      addNotification: (notification) => {
        const { notifications } = get();
        set({ notifications: [notification, ...notifications] });
      },

      markNotificationAsRead: (notificationId) => {
        const { notifications } = get();
        const updatedNotifications = notifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        );
        set({ notifications: updatedNotifications });
      },

      setServices: (services) => set({ services }),

      setApplications: (applications) => set({ applications }),

      setMinistries: (ministries) => set({ ministries }),

      addApplication: (application) => {
        const { applications } = get();
        set({ applications: [application, ...applications] });
      },

      updateApplication: (applicationId, updates) => {
        const { applications } = get();
        const updatedApplications = applications.map((app) =>
          app.id === applicationId ? { ...app, ...updates } : app
        );
        set({ applications: updatedApplications });
      },

      login: (userData) => {
        set({
          user: userData,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          notifications: [],
          applications: [],
        });
      },
    }),
    {
      name: "digital-lebanon-store",
      partialize: (state) => ({
        user: state.user,
        language: state.language,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Helper hooks
export const useUser = () => useAppStore((state) => state.user);
export const useLanguage = () => useAppStore((state) => state.language);
export const useIsAuthenticated = () =>
  useAppStore((state) => state.isAuthenticated);
export const useNotifications = () =>
  useAppStore((state) => state.notifications);
export const useServices = () => useAppStore((state) => state.services);
export const useApplications = () => useAppStore((state) => state.applications);
export const useMinistries = () => useAppStore((state) => state.ministries);

// Language toggle hook
export const useLanguageToggle = () => {
  const { language, setLanguage } = useAppStore();

  const toggleLanguage = () => {
    const newLanguage =
      language.code === "en" ? arabicLanguage : defaultLanguage;
    setLanguage(newLanguage);
  };

  return { language, toggleLanguage };
};
