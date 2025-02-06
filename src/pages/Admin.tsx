
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

interface Question {
  id: number;
  theme: string;
  question: string;
  answers: { text: string; isCorrect: boolean }[];
}

const Admin = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [question, setQuestion] = useState("");
  const [theme, setTheme] = useState("");
  const [answers, setAnswers] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);
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

  const handleAnswerChange = (index: number, text: string) => {
    const newAnswers = [...answers];
    newAnswers[index].text = text;
    setAnswers(newAnswers);
  };

  const handleCorrectChange = (index: number, checked: boolean) => {
    const newAnswers = [...answers];
    newAnswers[index].isCorrect = checked;
    setAnswers(newAnswers);
  };

  const resetForm = () => {
    setQuestion("");
    setTheme("");
    setAnswers([
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ]);
    setEditingQuestion(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!question || !theme) {
      toast({
        title: t("admin.error"),
        description: t("admin.fillRequired"),
        variant: "destructive",
      });
      return;
    }

    const filledAnswers = answers.filter(a => a.text.trim() !== "");
    if (filledAnswers.length < 2) {
      toast({
        title: t("admin.error"),
        description: t("admin.minimumAnswers"),
        variant: "destructive",
      });
      return;
    }

    const correctAnswers = answers.filter(a => a.isCorrect);
    if (correctAnswers.length === 0) {
      toast({
        title: t("admin.error"),
        description: t("admin.selectCorrect"),
        variant: "destructive",
      });
      return;
    }

    if (editingQuestion) {
      // Mode édition
      const updatedQuestions = questions.map(q => 
        q.id === editingQuestion.id 
          ? { ...q, theme, question, answers }
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
        theme,
        question,
        answers,
      };
      setQuestions([...questions, newQuestion]);
      toast({
        title: t("admin.success"),
        description: t("admin.questionAdded"),
      });
    }

    resetForm();
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setQuestion(question.question);
    setTheme(question.theme);
    setAnswers(question.answers);
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
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">{t("admin.theme")}</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("admin.selectTheme")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agility">Agility</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="generalCulture">General Culture</SelectItem>
                    <SelectItem value="customerCare">Customer Care</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="question">{t("admin.question")}</Label>
                <Input
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={t("admin.enterQuestion")}
                />
              </div>

              <div className="space-y-4">
                <Label>{t("admin.answers")}</Label>
                {answers.map((answer, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Input
                      value={answer.text}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      placeholder={`${t("admin.answer")} ${index + 1}`}
                      className="flex-1"
                    />
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`correct-${index}`}
                        checked={answer.isCorrect}
                        onCheckedChange={(checked) => 
                          handleCorrectChange(index, checked as boolean)
                        }
                      />
                      <Label htmlFor={`correct-${index}`} className="text-sm">
                        {t("admin.correct")}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>

              <Button type="submit" className="w-full">
                {editingQuestion ? "Modifier la question" : t("admin.addQuestion")}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="manage">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Thème</TableHead>
                    <TableHead>Question</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {questions.map((q) => (
                    <TableRow key={q.id}>
                      <TableCell>{q.theme}</TableCell>
                      <TableCell>{q.question}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(q)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(q.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
