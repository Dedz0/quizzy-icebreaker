import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeCard from "@/components/ThemeCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Brain, Trophy, Globe2, HeartHandshake } from "lucide-react";

const Index = () => {
  const { t } = useLanguage();
  const [username, setUsername] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const themes = [
    { id: "agility", color: "bg-agility", icon: <Brain className="w-8 h-8" /> },
    { id: "sports", color: "bg-sports", icon: <Trophy className="w-8 h-8" /> },
    { id: "culture", color: "bg-culture", icon: <Globe2 className="w-8 h-8" /> },
    { id: "customer", color: "bg-customer", icon: <HeartHandshake className="w-8 h-8" /> },
  ];

  const handleStart = () => {
    if (username && selectedTheme) {
      console.log("Starting quiz with:", { username, selectedTheme });
      // TODO: Implement quiz start logic
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">{t("welcome")}</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2">
                {t("enter.username")}
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
                placeholder="Username"
              />
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{t("select.theme")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {themes.map((theme) => (
                  <ThemeCard
                    key={theme.id}
                    theme={t(theme.id)}
                    color={theme.color}
                    icon={theme.icon}
                    onClick={() => setSelectedTheme(theme.id)}
                    selected={selectedTheme === theme.id}
                  />
                ))}
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              disabled={!username || !selectedTheme}
              onClick={handleStart}
            >
              {t("start")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;