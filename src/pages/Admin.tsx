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

    // TODO: Save question to database
    console.log("Saving question:", { question, theme, answers });
    
    toast({
      title: t("admin.success"),
      description: t("admin.questionAdded"),
    });

    // Reset form
    setQuestion("");
    setTheme("");
    setAnswers([
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{t("admin.title")}</h1>
        
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
            {t("admin.addQuestion")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Admin;