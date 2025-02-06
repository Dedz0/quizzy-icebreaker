import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionForm from "@/components/admin/QuestionForm";
import QuestionList from "@/components/admin/QuestionList";

interface Question {
  id: number;
  theme: string;
  question: string;
  answers: { text: string; isCorrect: boolean }[];
}

const Admin = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      theme: "agility",
      question: "Qu'est-ce que le Scrum ?",
      answers: [
        { text: "Une méthodologie agile", isCorrect: true },
        { text: "Un sport de combat", isCorrect: false },
        { text: "Un outil de développement", isCorrect: false },
        { text: "Un langage de programmation", isCorrect: false },
      ],
    },
    {
      id: 2,
      theme: "agility",
      question: "Quel est le rôle du Scrum Master ?",
      answers: [
        { text: "Faciliter le processus Scrum", isCorrect: true },
        { text: "Coder l'application", isCorrect: false },
        { text: "Gérer le budget", isCorrect: false },
        { text: "Diriger l'équipe", isCorrect: false },
      ],
    },
    {
      id: 3,
      theme: "customerCare",
      question: "Quelle est la première étape pour gérer un client mécontent ?",
      answers: [
        { text: "Écouter activement", isCorrect: true },
        { text: "Proposer un remboursement", isCorrect: false },
        { text: "Transférer à un supérieur", isCorrect: false },
        { text: "Ignorer la plainte", isCorrect: false },
      ],
    },
    {
      id: 4,
      theme: "customerCare",
      question: "Comment gérer un client agressif ?",
      answers: [
        { text: "Rester calme et professionnel", isCorrect: true },
        { text: "Répondre sur le même ton", isCorrect: false },
        { text: "Raccrocher", isCorrect: false },
        { text: "Hausser la voix", isCorrect: false },
      ],
    },
    {
      id: 5,
      theme: "generalCulture",
      question: "Quelle est la capitale de la France ?",
      answers: [
        { text: "Paris", isCorrect: true },
        { text: "Londres", isCorrect: false },
        { text: "Berlin", isCorrect: false },
        { text: "Madrid", isCorrect: false },
      ],
    },
  ]);

  const handleSubmit = (questionData: Omit<Question, "id">) => {
    if (editingQuestion) {
      // Mode édition
      const updatedQuestions = questions.map(q => 
        q.id === editingQuestion.id 
          ? { ...q, ...questionData }
          : q
      );
      setQuestions(updatedQuestions);
      toast({
        title: t("admin.success"),
        description: t("admin.questionUpdated"),
      });
    } else {
      // Mode création
      const newQuestion: Question = {
        id: questions.length + 1,
        ...questionData,
      };
      setQuestions([...questions, newQuestion]);
      toast({
        title: t("admin.success"),
        description: t("admin.questionAdded"),
      });
    }
    setEditingQuestion(null);
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
  };

  const handleDelete = (id: number) => {
    const updatedQuestions = questions.filter(q => q.id !== id);
    setQuestions(updatedQuestions);
    toast({
      title: t("admin.success"),
      description: t("admin.questionDeleted"),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{t("admin.title")}</h1>
        
        <Tabs defaultValue="add" className="space-y-6">
          <TabsList>
            <TabsTrigger value="add">Ajouter une question</TabsTrigger>
            <TabsTrigger value="manage">Gérer les questions</TabsTrigger>
          </TabsList>

          <TabsContent value="add">
            <QuestionForm onSubmit={handleSubmit} editingQuestion={editingQuestion} />
          </TabsContent>

          <TabsContent value="manage">
            <QuestionList 
              questions={questions}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
