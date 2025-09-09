import { UserProfile } from "@/components/UserProfile";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Sparkles, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

const Index = () => {
  const { user, isLoading, hapticFeedback, isInTelegram } = useTelegramWebApp();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    hapticFeedback.impact("light");
    setRefreshKey(prev => prev + 1);
    window.location.reload();
  };

  const handlePremiumClick = () => {
    hapticFeedback.notification("success");
    if (isInTelegram) {
      // In a real app, you might open Premium subscription page
      alert("Fitur Premium akan segera hadir!");
    }
  };

  useEffect(() => {
    // Add some entrance animation delay
    document.body.style.background = "var(--gradient-bg)";
    
    return () => {
      document.body.style.background = "";
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-bg p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
              <MessageCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Profil Telegram
            </h1>
          </div>
          <p className="text-muted-foreground">
            Lihat informasi profil Telegram Anda
          </p>
        </div>

        {/* User Profile Card */}
        <UserProfile user={user} isLoading={isLoading} key={refreshKey} />

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 max-w-md mx-auto">
          <Button 
            onClick={handleRefresh}
            variant="outline"
            className="w-full transition-smooth hover:shadow-card"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Profil
          </Button>

          {user?.is_premium && (
            <Button 
              onClick={handlePremiumClick}
              className="w-full bg-gradient-primary hover:bg-gradient-primary/90 transition-smooth shadow-card hover:shadow-glow"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Fitur Premium
            </Button>
          )}
        </div>

        {/* Info Card */}
        <Card className="max-w-md mx-auto p-6 bg-gradient-card border-0 shadow-card">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-foreground">
              Tentang Aplikasi
            </h3>
            <p className="text-sm text-muted-foreground">
              Mini app Telegram untuk menampilkan informasi profil pengguna. 
              Aplikasi ini menggunakan Telegram Web Apps API.
            </p>
            {!isInTelegram && (
              <p className="text-xs text-destructive mt-3">
                ⚠️ Untuk pengalaman terbaik, buka aplikasi ini di dalam Telegram
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;