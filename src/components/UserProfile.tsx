import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Globe, Star, Crown, MessageSquare, Settings } from "lucide-react";

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

interface UserProfileProps {
  user: TelegramUser | null;
  isLoading?: boolean;
}

export function UserProfile({ user, isLoading }: UserProfileProps) {
  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto p-8 bg-gradient-card border-0 shadow-card animate-pulse">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-muted"></div>
          <div className="space-y-2">
            <div className="h-6 bg-muted rounded mx-auto w-3/4"></div>
            <div className="h-4 bg-muted rounded mx-auto w-1/2"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="w-full max-w-md mx-auto p-8 bg-gradient-card border-0 shadow-card">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Tidak dapat memuat profil
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Aplikasi ini harus dibuka di dalam Telegram
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Main Profile Card */}
      <Card className="p-8 bg-gradient-card border-0 shadow-card hover:shadow-glow transition-all duration-500">
        <div className="text-center space-y-6">
          {/* Profile Picture */}
          <div className="relative">
            {user.photo_url ? (
              <img
                src={user.photo_url}
                alt={`${user.first_name} profile`}
                className="w-24 h-24 mx-auto rounded-full border-4 border-primary/20 shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-full flex items-center justify-center shadow-lg">
                <User className="w-10 h-10 text-primary-foreground" />
              </div>
            )}
            {user.is_premium && (
              <div className="absolute -top-1 -right-1 bg-gradient-primary rounded-full p-1.5 shadow-lg">
                <Crown className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="space-y-3">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {user.first_name} {user.last_name || ""}
              </h1>
              {user.username && (
                <p className="text-primary font-medium">@{user.username}</p>
              )}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-2">
              {user.is_premium && (
                <Badge className="bg-gradient-primary text-primary-foreground border-0 shadow-sm">
                  <Star className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              )}
              {user.language_code && (
                <Badge variant="secondary" className="shadow-sm">
                  <Globe className="w-3 h-3 mr-1" />
                  {user.language_code.toUpperCase()}
                </Badge>
              )}
              {user.allows_write_to_pm && (
                <Badge variant="outline" className="shadow-sm">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  PM Terbuka
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Extended Info Cards */}
      <div className="grid gap-3">
        {/* Contact Info */}
        <Card className="p-4 bg-gradient-card border-0 shadow-card">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Informasi Pengguna
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">User ID</span>
              <span className="text-sm font-mono font-semibold text-foreground">{user.id}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}