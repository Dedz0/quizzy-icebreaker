
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface RunnerAnimationProps {
  isCorrect: boolean | null;
  isAnimating: boolean;
}

const RunnerAnimation = ({ isCorrect, isAnimating }: RunnerAnimationProps) => {
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      setShowResult(false);
      const timer = setTimeout(() => {
        setShowResult(true);
      }, 1500); // Temps de course avant le résultat
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div className="h-20 relative overflow-hidden mb-4 border-b-2 border-gray-300">
      {/* Piste d'athlétisme */}
      <div className="absolute bottom-0 w-full h-1 bg-red-500" />
      
      {/* Ligne d'arrivée */}
      <div className="absolute right-4 h-full w-0.5 bg-white border-l border-r border-gray-400" />
      
      {/* Coureur */}
      <div
        className={cn(
          "absolute bottom-1 left-4 transform-gpu",
          isAnimating && "animate-run",
          showResult && isCorrect && "animate-win",
          showResult && !isCorrect && "animate-fall",
          !isAnimating && "left-4"
        )}
      >
        <div className="w-6 h-8 relative">
          {/* Corps du coureur */}
          <div className="absolute w-4 h-6 bg-blue-500 rounded-t-full" />
          {/* Tête */}
          <div className="absolute w-2 h-2 bg-blue-500 rounded-full top-0 right-1" />
          {/* Jambes */}
          <div className={cn(
            "absolute w-1 h-3 bg-blue-500 bottom-0 right-2",
            isAnimating && "animate-legs"
          )} />
        </div>
      </div>
    </div>
  );
};

export default RunnerAnimation;
