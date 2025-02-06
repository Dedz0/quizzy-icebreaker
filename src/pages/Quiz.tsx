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

const predefinedQuestions: Question[] = [
  // Agility Questions (10)
  {
    question: "What is Scrum?",
    theme: "agility",
    answers: [
      { text: "An Agile framework for project management", isCorrect: true },
      { text: "A rugby formation", isCorrect: false },
      { text: "A type of software bug", isCorrect: false },
      { text: "A database management system", isCorrect: false },
    ],
  },
  {
    question: "What is a Sprint in Agile?",
    theme: "agility",
    answers: [
      { text: "A short race between team members", isCorrect: false },
      { text: "A fixed time period for completing work", isCorrect: true },
      { text: "A type of emergency meeting", isCorrect: false },
      { text: "A software testing phase", isCorrect: false },
    ],
  },
  {
    question: "What is the role of a Scrum Master?",
    theme: "agility",
    answers: [
      { text: "The team's direct manager", isCorrect: false },
      { text: "The project owner", isCorrect: false },
      { text: "A servant-leader who facilitates Scrum practices", isCorrect: true },
      { text: "The lead developer", isCorrect: false },
    ],
  },
  {
    question: "What is a Daily Standup?",
    theme: "agility",
    answers: [
      { text: "A morning exercise routine", isCorrect: false },
      { text: "A brief daily team meeting to sync up", isCorrect: true },
      { text: "A performance evaluation", isCorrect: false },
      { text: "A client presentation", isCorrect: false },
    ],
  },
  {
    question: "What is a Product Backlog?",
    theme: "agility",
    answers: [
      { text: "A list of all desired features and improvements", isCorrect: true },
      { text: "A list of bugs in the product", isCorrect: false },
      { text: "A backup of the product", isCorrect: false },
      { text: "A product review document", isCorrect: false },
    ],
  },
  {
    question: "What is Velocity in Agile?",
    theme: "agility",
    answers: [
      { text: "The speed of software deployment", isCorrect: false },
      { text: "The measure of work completed in a sprint", isCorrect: true },
      { text: "The speed of the development server", isCorrect: false },
      { text: "The number of team members", isCorrect: false },
    ],
  },
  {
    question: "What is a Sprint Review?",
    theme: "agility",
    answers: [
      { text: "A performance review of team members", isCorrect: false },
      { text: "A meeting to demonstrate completed work", isCorrect: true },
      { text: "A code review session", isCorrect: false },
      { text: "A planning meeting", isCorrect: false },
    ],
  },
  {
    question: "What is the purpose of Sprint Planning?",
    theme: "agility",
    answers: [
      { text: "To assign annual goals", isCorrect: false },
      { text: "To plan the team's vacation schedule", isCorrect: false },
      { text: "To select and plan work for the upcoming sprint", isCorrect: true },
      { text: "To review past performance", isCorrect: false },
    ],
  },
  {
    question: "What is a User Story?",
    theme: "agility",
    answers: [
      { text: "A fictional tale about users", isCorrect: false },
      { text: "A description of a feature from the user's perspective", isCorrect: true },
      { text: "A user complaint", isCorrect: false },
      { text: "A user manual", isCorrect: false },
    ],
  },
  {
    question: "What is the Agile Manifesto?",
    theme: "agility",
    answers: [
      { text: "A legal document", isCorrect: false },
      { text: "A software license", isCorrect: false },
      { text: "A set of core values and principles for Agile development", isCorrect: true },
      { text: "A project management tool", isCorrect: false },
    ],
  },

  // Sports Questions (10)
  {
    question: "Which sport is known as 'The Beautiful Game'?",
    theme: "sports",
    answers: [
      { text: "Basketball", isCorrect: false },
      { text: "Football (Soccer)", isCorrect: true },
      { text: "Tennis", isCorrect: false },
      { text: "Rugby", isCorrect: false },
    ],
  },
  {
    question: "How many players are on a standard basketball team on court?",
    theme: "sports",
    answers: [
      { text: "5", isCorrect: true },
      { text: "6", isCorrect: false },
      { text: "7", isCorrect: false },
      { text: "4", isCorrect: false },
    ],
  },
  {
    question: "In which sport would you perform a 'slam dunk'?",
    theme: "sports",
    answers: [
      { text: "Volleyball", isCorrect: false },
      { text: "Tennis", isCorrect: false },
      { text: "Basketball", isCorrect: true },
      { text: "Football", isCorrect: false },
    ],
  },
  {
    question: "How many points is a try worth in rugby union?",
    theme: "sports",
    answers: [
      { text: "3", isCorrect: false },
      { text: "4", isCorrect: false },
      { text: "5", isCorrect: true },
      { text: "6", isCorrect: false },
    ],
  },
  {
    question: "What is the duration of a professional football (soccer) match?",
    theme: "sports",
    answers: [
      { text: "80 minutes", isCorrect: false },
      { text: "85 minutes", isCorrect: false },
      { text: "90 minutes", isCorrect: true },
      { text: "100 minutes", isCorrect: false },
    ],
  },
  {
    question: "In tennis, what is a 'Grand Slam'?",
    theme: "sports",
    answers: [
      { text: "Winning all four major tournaments in a calendar year", isCorrect: true },
      { text: "Scoring four points in a row", isCorrect: false },
      { text: "Winning a match without losing a game", isCorrect: false },
      { text: "A powerful serve", isCorrect: false },
    ],
  },
  {
    question: "Which country invented table tennis?",
    theme: "sports",
    answers: [
      { text: "China", isCorrect: false },
      { text: "Japan", isCorrect: false },
      { text: "England", isCorrect: true },
      { text: "USA", isCorrect: false },
    ],
  },
  {
    question: "How many players are there in a volleyball team on court?",
    theme: "sports",
    answers: [
      { text: "5", isCorrect: false },
      { text: "6", isCorrect: true },
      { text: "7", isCorrect: false },
      { text: "8", isCorrect: false },
    ],
  },
  {
    question: "What is the maximum number of clubs allowed in a golf bag during a round?",
    theme: "sports",
    answers: [
      { text: "12", isCorrect: false },
      { text: "14", isCorrect: true },
      { text: "16", isCorrect: false },
      { text: "18", isCorrect: false },
    ],
  },
  {
    question: "In which sport would you use a 'shuttlecock'?",
    theme: "sports",
    answers: [
      { text: "Table Tennis", isCorrect: false },
      { text: "Tennis", isCorrect: false },
      { text: "Badminton", isCorrect: true },
      { text: "Squash", isCorrect: false },
    ],
  },

  // General Culture Questions (10)
  {
    question: "Who painted the Mona Lisa?",
    theme: "generalCulture",
    answers: [
      { text: "Vincent van Gogh", isCorrect: false },
      { text: "Leonardo da Vinci", isCorrect: true },
      { text: "Pablo Picasso", isCorrect: false },
      { text: "Michelangelo", isCorrect: false },
    ],
  },
  {
    question: "What is the capital of Japan?",
    theme: "generalCulture",
    answers: [
      { text: "Seoul", isCorrect: false },
      { text: "Beijing", isCorrect: false },
      { text: "Tokyo", isCorrect: true },
      { text: "Bangkok", isCorrect: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    theme: "generalCulture",
    answers: [
      { text: "Venus", isCorrect: false },
      { text: "Jupiter", isCorrect: false },
      { text: "Mars", isCorrect: true },
      { text: "Saturn", isCorrect: false },
    ],
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    theme: "generalCulture",
    answers: [
      { text: "Charles Dickens", isCorrect: false },
      { text: "William Shakespeare", isCorrect: true },
      { text: "Jane Austen", isCorrect: false },
      { text: "Mark Twain", isCorrect: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    theme: "generalCulture",
    answers: [
      { text: "Atlantic Ocean", isCorrect: false },
      { text: "Indian Ocean", isCorrect: false },
      { text: "Pacific Ocean", isCorrect: true },
      { text: "Arctic Ocean", isCorrect: false },
    ],
  },
  {
    question: "In which year did World War II end?",
    theme: "generalCulture",
    answers: [
      { text: "1943", isCorrect: false },
      { text: "1944", isCorrect: false },
      { text: "1945", isCorrect: true },
      { text: "1946", isCorrect: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    theme: "generalCulture",
    answers: [
      { text: "Ag", isCorrect: false },
      { text: "Fe", isCorrect: false },
      { text: "Au", isCorrect: true },
      { text: "Cu", isCorrect: false },
    ],
  },
  {
    question: "Which famous scientist developed the theory of relativity?",
    theme: "generalCulture",
    answers: [
      { text: "Isaac Newton", isCorrect: false },
      { text: "Albert Einstein", isCorrect: true },
      { text: "Marie Curie", isCorrect: false },
      { text: "Charles Darwin", isCorrect: false },
    ],
  },
  {
    question: "What is the largest mammal in the world?",
    theme: "generalCulture",
    answers: [
      { text: "African Elephant", isCorrect: false },
      { text: "Blue Whale", isCorrect: true },
      { text: "Giraffe", isCorrect: false },
      { text: "Polar Bear", isCorrect: false },
    ],
  },
  {
    question: "Who was the first person to walk on the moon?",
    theme: "generalCulture",
    answers: [
      { text: "Buzz Aldrin", isCorrect: false },
      { text: "Neil Armstrong", isCorrect: true },
      { text: "Yuri Gagarin", isCorrect: false },
      { text: "John Glenn", isCorrect: false },
    ],
  },

  // Customer Care Questions (10)
  {
    question: "What is the first step in handling a customer complaint?",
    theme: "customerCare",
    answers: [
      { text: "Solve the problem immediately", isCorrect: false },
      { text: "Listen actively to the customer", isCorrect: true },
      { text: "Transfer to a supervisor", isCorrect: false },
      { text: "Offer a refund", isCorrect: false },
    ],
  },
  {
    question: "What does 'CRM' stand for in customer service?",
    theme: "customerCare",
    answers: [
      { text: "Customer Return Management", isCorrect: false },
      { text: "Customer Relationship Management", isCorrect: true },
      { text: "Customer Response Method", isCorrect: false },
      { text: "Customer Review Monitor", isCorrect: false },
    ],
  },
  {
    question: "What is empathy in customer service?",
    theme: "customerCare",
    answers: [
      { text: "Agreeing with everything the customer says", isCorrect: false },
      { text: "Understanding and sharing the customer's feelings", isCorrect: true },
      { text: "Following company policy strictly", isCorrect: false },
      { text: "Offering immediate solutions", isCorrect: false },
    ],
  },
  {
    question: "What is the best way to handle an angry customer?",
    theme: "customerCare",
    answers: [
      { text: "Interrupt them to correct their misconceptions", isCorrect: false },
      { text: "Remain calm and listen patiently", isCorrect: true },
      { text: "Transfer them immediately", isCorrect: false },
      { text: "End the conversation quickly", isCorrect: false },
    ],
  },
  {
    question: "What is a service level agreement (SLA)?",
    theme: "customerCare",
    answers: [
      { text: "A customer complaint form", isCorrect: false },
      { text: "A contract defining service expectations", isCorrect: true },
      { text: "A customer satisfaction survey", isCorrect: false },
      { text: "A training manual", isCorrect: false },
    ],
  },
  {
    question: "What is the purpose of customer feedback?",
    theme: "customerCare",
    answers: [
      { text: "To evaluate employee performance only", isCorrect: false },
      { text: "To improve products and services", isCorrect: true },
      { text: "To create marketing materials", isCorrect: false },
      { text: "To set prices", isCorrect: false },
    ],
  },
  {
    question: "What is a key component of good customer service?",
    theme: "customerCare",
    answers: [
      { text: "Speaking quickly", isCorrect: false },
      { text: "Clear communication", isCorrect: true },
      { text: "Short conversations", isCorrect: false },
      { text: "Using technical terms", isCorrect: false },
    ],
  },
  {
    question: "What is the purpose of customer segmentation?",
    theme: "customerCare",
    answers: [
      { text: "To discriminate against customers", isCorrect: false },
      { text: "To provide targeted, relevant service", isCorrect: true },
      { text: "To reduce service costs", isCorrect: false },
      { text: "To simplify reporting", isCorrect: false },
    ],
  },
  {
    question: "What is First Contact Resolution (FCR)?",
    theme: "customerCare",
    answers: [
      { text: "The first time a customer calls", isCorrect: false },
      { text: "Resolving issues in the first interaction", isCorrect: true },
      { text: "The first response to an email", isCorrect: false },
      { text: "First level support", isCorrect: false },
    ],
  },
  {
    question: "What is the importance of follow-up in customer service?",
    theme: "customerCare",
    answers: [
      { text: "To increase sales", isCorrect: false },
      { text: "To ensure customer satisfaction and resolution", isCorrect: true },
      { text: "To meet call quotas", isCorrect: false },
      { text: "To collect data", isCorrect: false },
    ],
  },
];

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
    // Replace mock questions with predefined questions
    setQuestions(predefinedQuestions.filter(q => q.theme === quizState?.theme));
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
