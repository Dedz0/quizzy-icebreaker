import { cn } from "@/lib/utils";

interface ThemeCardProps {
  theme: string;
  color: string;
  icon: React.ReactNode;
  onClick: () => void;
  selected?: boolean;
}

const ThemeCard = ({ theme, color, icon, onClick, selected }: ThemeCardProps) => {
  return (
    <div
      className={cn(
        "p-6 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105",
        color,
        selected && "ring-4 ring-offset-2"
      )}
      onClick={onClick}
    >
      <div className="text-white flex flex-col items-center gap-4">
        {icon}
        <h3 className="text-xl font-semibold">{theme}</h3>
      </div>
    </div>
  );
};

export default ThemeCard;