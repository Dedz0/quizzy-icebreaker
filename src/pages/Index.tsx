
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeCard from "@/components/ThemeCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Brain, Trophy, HeartHandshake, User, ShoppingCart, HelpCircle } from "lucide-react";

const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const themes = [
    { id: "agility", color: "bg-[#0082C3]", icon: <Brain className="w-8 h-8" /> },
    { id: "sports", color: "bg-[#0082C3]", icon: <Trophy className="w-8 h-8" /> },
    { id: "customer", color: "bg-[#0082C3]", icon: <HeartHandshake className="w-8 h-8" /> },
  ];

  const handleStart = () => {
    if (username && selectedTheme) {
      navigate("/quiz", { state: { username, theme: selectedTheme } });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-[#0082C3] font-bold text-2xl">Quiz App</div>
            <div className="flex items-center gap-6">
              <HelpCircle className="w-6 h-6 text-gray-600" />
              <User className="w-6 h-6 text-gray-600" />
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-12 gap-8">
            {themes.map(theme => (
              <button 
                key={theme.id}
                className="text-gray-700 hover:text-[#0082C3] font-medium"
                onClick={() => setSelectedTheme(theme.id)}
              >
                {t(theme.id)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <h1 className="text-3xl font-bold text-center mb-8">{t("welcome")}</h1>
            
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                {t("enter.username")}
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border-gray-300 focus:border-[#0082C3] focus:ring-[#0082C3]"
                placeholder="Username"
              />
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{t("select.theme")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              className="w-full bg-[#0082C3] hover:bg-[#006699] text-white font-bold py-3"
              size="lg"
              disabled={!username || !selectedTheme}
              onClick={handleStart}
            >
              {t("start")}
            </Button>
          </div>

          {/* Promotion Banner */}
          <div className="bg-[#0082C3] text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Découvrez nos quiz thématiques</h2>
            <p className="mb-4">Testez vos connaissances et comparez vos scores avec d'autres joueurs</p>
            <button className="bg-white text-[#0082C3] px-6 py-2 rounded-full font-bold hover:bg-gray-100">
              En savoir plus
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
