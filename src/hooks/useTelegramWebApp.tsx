import { useEffect, useState } from "react";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
  allows_write_to_pm?: boolean;
  added_to_attachment_menu?: boolean;
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: TelegramUser;
    start_param?: string;
  };
  version: string;
  platform: string;
  colorScheme: "light" | "dark";
  themeParams: Record<string, string>;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  isClosingConfirmationEnabled: boolean;
  ready: () => void;
  expand: () => void;
  close: () => void;
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isProgressVisible: boolean;
    isActive: boolean;
    setText: (text: string) => void;
    onClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
  };
  HapticFeedback: {
    impactOccurred: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void;
    notificationOccurred: (type: "error" | "success" | "warning") => void;
    selectionChanged: () => void;
  };
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export function useTelegramWebApp() {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we're running inside Telegram
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      
      // Initialize the Web App
      tg.ready();
      tg.expand();
      
      setWebApp(tg);
      
      // Get user data
      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user);
      }
      
      setIsLoading(false);
    } else {
      // For development - simulate user data
      if (process.env.NODE_ENV === "development") {
        setTimeout(() => {
          setUser({
            id: 123456789,
            first_name: "Demo",
            last_name: "User",
            username: "demo_user",
            language_code: "id",
            is_premium: true,
            allows_write_to_pm: true,
            added_to_attachment_menu: false,
          });
          setIsLoading(false);
        }, 1000);
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  const showAlert = (message: string) => {
    if (webApp) {
      // Use Telegram's native alert
      window.alert(message);
    } else {
      window.alert(message);
    }
  };

  const hapticFeedback = {
    impact: (style: "light" | "medium" | "heavy" | "rigid" | "soft" = "medium") => {
      webApp?.HapticFeedback.impactOccurred(style);
    },
    notification: (type: "error" | "success" | "warning") => {
      webApp?.HapticFeedback.notificationOccurred(type);
    },
    selection: () => {
      webApp?.HapticFeedback.selectionChanged();
    }
  };

  return {
    webApp,
    user,
    isLoading,
    showAlert,
    hapticFeedback,
    isInTelegram: !!webApp
  };
}