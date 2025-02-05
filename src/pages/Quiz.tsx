
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Timer, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface QuizState {
  username: string;
  theme: string;
}

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  theme: string;
  answers: Answer[];
}

const Quiz = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [timeRemaining, setTimeRemaining] = useState(540); // 9 minutes in seconds
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [score, setScore] = useState(0);
  const quizState = location.state as QuizState;

  // Mock questions (replace with actual data fetching)
  useEffect(() => {
    // TODO: Replace with actual API call
    const mockQuestions: Question[] = [
      {
        question: "What is Scrum?",
        theme: "agility",
        answers: [
          { text: "A rugby formation", isCorrect: false },
          { text: "An Agile framework", isCorrect: true },
          { text: "A project management software", isCorrect: false },
          { text: "A meeting room", isCorrect: false },
        ],
      },
      // Add more mock questions as needed
    ];
    setQuestions(mockQuestions.filter(q => q.theme === quizState?.theme));
  }, [quizState?.theme]);

  useEffect(() => {
    if (!quizState?.username || !quizState?.theme) {
      navigate("/");
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleQuizComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, quizState]);

  const handleQuizComplete = () => {
    toast({
      title: t("quiz.complete"),
      description: `${t("score")}: ${score}/${questions.length}`,
    });
    navigate("/");
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer) {
      toast({
        title: t("quiz.error"),
        description: t("quiz.selectAnswer"),
        variant: "destructive",
      });
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswerObj = currentQuestion.answers.find(a => a.text === selectedAnswer);
    
    if (selectedAnswerObj?.isCorrect) {
      setScore(prev => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer("");
    } else {
      handleQuizComplete();
    }
  };

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <p className="text-xl">{t("quiz.loading")}</p>
      </div>
    );
  }

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
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">
              {`${t("question")} ${currentQuestionIndex + 1}/${questions.length}`}
            </h3>
            <p className="text-lg">{currentQuestion.question}</p>
          </div>

          <RadioGroup
            value={selectedAnswer}
            onValueChange={setSelectedAnswer}
            className="space-y-4"
          >
            {currentQuestion.answers.map((answer, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={answer.text} id={`answer-${index}`} />
                <Label htmlFor={`answer-${index}`}>{answer.text}</Label>
              </div>
            ))}
          </RadioGroup>

          <Button
            onClick={handleNextQuestion}
            className="mt-8 w-full"
            size="lg"
          >
            {currentQuestionIndex < questions.length - 1 ? (
              <>
                {t("next")} <ArrowRight className="ml-2 w-4 h-4" />
              </>
            ) : (
              t("submit")
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
