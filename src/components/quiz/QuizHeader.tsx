
import { Timer } from "lucide-react";

interface QuizHeaderProps {
  username: string;
  minutes: number;
  seconds: number;
}

const QuizHeader = ({ username, minutes, seconds }: QuizHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold">{username}</h2>
      <div className="flex items-center gap-2 text-lg font-semibold">
        <Timer className="w-6 h-6" />
        <span>
          Temps restant: {minutes}:{seconds.toString().padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

export default QuizHeader;
