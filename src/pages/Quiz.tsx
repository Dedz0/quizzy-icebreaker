import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { predefinedQuestions } from "@/data/quizQuestions";
import { QuizState, Question } from "@/types/quiz";
import QuizHeader from "@/components/quiz/QuizHeader";
import QuestionDisplay from "@/components/quiz/QuestionDisplay";

const Quiz = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [timeRemaining, setTimeRemaining] = useState(540);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const quizState = location.state as QuizState;

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    if (!quizState?.theme) {
      navigate("/");
      return;
    }

    console.log("Quiz state theme:", quizState.theme);
    let filteredQuestions = predefinedQuestions.filter(q => 
      q.theme.toLowerCase() === quizState.theme.toLowerCase()
    );

    const shuffledQuestions = filteredQuestions.map(q => ({
      ...q,
      answers: shuffleArray(q.answers)
    }));
    
    const finalQuestions = shuffleArray(shuffledQuestions);

    console.log("Filtered and shuffled questions:", finalQuestions);
    
    if (finalQuestions.length === 0) {
      toast({
        title: "Erreur",
        description: "Aucune question disponible pour ce thème",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setQuestions(finalQuestions);
  }, [quizState?.theme, navigate, toast]);

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
    navigate("/rankings", {
      state: {
        username: quizState?.username,
        score: score,
        theme: quizState?.theme,
      },
    });
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
    const correct = selectedAnswerObj?.isCorrect || false;
    
    setIsCorrect(correct);
    setIsAnswered(true);

    setTimeout(() => {
      if (correct) {
        setScore(prev => prev + 1);
      }

      toast({
        title: correct ? "Correct! 🎉" : "Incorrect",
        description: (
          <div className="mt-2">
            <p className="font-semibold mb-1">
              {correct ? "Well done!" : "The correct answer was: " + 
                currentQuestion.answers.find(a => a.isCorrect)?.text}
            </p>
            <p className="text-sm text-gray-600">{currentQuestion.explanation}</p>
          </div>
        ),
        variant: correct ? "default" : "destructive",
        duration: 5000,
      });

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer("");
        setIsAnswered(false);
        setIsCorrect(null);
      } else {
        handleQuizComplete();
      }
    }, 2500);
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
        <QuizHeader 
          username={quizState?.username} 
          minutes={minutes} 
          seconds={seconds}
        />

        <div className="bg-white rounded-lg shadow-lg p-8">
          <QuestionDisplay
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={setSelectedAnswer}
            isAnswered={isAnswered}
            isCorrect={isCorrect}
          />

          <Button
            onClick={handleNextQuestion}
            className="mt-8 w-full"
            size="lg"
            disabled={isAnswered}
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
