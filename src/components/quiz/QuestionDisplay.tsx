
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question } from "@/types/quiz";
import RunnerAnimation from "./RunnerAnimation";

interface QuestionDisplayProps {
  question: Question;
  selectedAnswer: string;
  onAnswerSelect: (value: string) => void;
  isAnswered?: boolean;
  isCorrect?: boolean | null;
}

const QuestionDisplay = ({ 
  question, 
  selectedAnswer, 
  onAnswerSelect,
  isAnswered = false,
  isCorrect = null
}: QuestionDisplayProps) => {
  return (
    <div className="mb-8">
      <RunnerAnimation 
        isCorrect={isCorrect} 
        isAnimating={isAnswered}
      />
      
      <h3 className="text-xl font-semibold mb-4">
        {question.question}
      </h3>
      <RadioGroup
        value={selectedAnswer}
        onValueChange={onAnswerSelect}
        className="space-y-4"
      >
        {question.answers.map((answer, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={answer.text} id={`answer-${index}`} />
            <Label htmlFor={`answer-${index}`}>{answer.text}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default QuestionDisplay;
