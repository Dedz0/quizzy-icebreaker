import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";

interface QuizState {
  username: string;
  theme: string;
}

const Quiz = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(540); // 9 minutes in seconds
  const quizState = location.state as QuizState;

  useEffect(() => {
    if (!quizState?.username || !quizState?.theme) {
      navigate("/");
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // TODO: Handle quiz completion
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, quizState]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">{quizState?.username}</h2>
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Timer className="w-6 h-6" />
            <span>
              {t("time.remaining")}: {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-center text-xl mb-8">Quiz content coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;