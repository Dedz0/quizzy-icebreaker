
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
  const [timeRemaining, setTimeRemaining] = useState(540); // 9 minutes in seconds
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [score, setScore] = useState(0);
  const quizState = location.state as QuizState;

  useEffect(() => {
    if (!quizState?.theme) {
      navigate("/");
      return;
    }

    console.log("Quiz state theme:", quizState.theme);
    let filteredQuestions: Question[];

    if (quizState.theme === "general") {
      filteredQuestions = predefinedQuestions.filter(q => q.theme === "general");
    } else {
      filteredQuestions = predefinedQuestions.filter(q => q.theme === quizState.theme);
    }

    console.log("Filtered questions count:", filteredQuestions.length);
    
    if (filteredQuestions.length === 0) {
      toast({
        title: "Erreur",
        description: "Aucune question disponible pour ce thème",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setQuestions(filteredQuestions);
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
    const isCorrect = selectedAnswerObj?.isCorrect || false;

    toast({
      title: isCorrect ? "Correct! 🎉" : "Incorrect",
      description: (
        <div className="mt-2">
          <p className="font-semibold mb-1">
            {isCorrect ? "Well done!" : "The correct answer was: " + 
              currentQuestion.answers.find(a => a.isCorrect)?.text}
          </p>
          <p className="text-sm text-gray-600">{currentQuestion.explanation}</p>
        </div>
      ),
      variant: isCorrect ? "default" : "destructive",
      duration: 5000,
    });
    
    if (isCorrect) {
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
          />

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
