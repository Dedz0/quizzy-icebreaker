
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface Question {
  id: number;
  theme: string;
  question: string;
  answers: { text: string; isCorrect: boolean }[];
}

interface QuestionListProps {
  questions: Question[];
  onEdit: (question: Question) => void;
  onDelete: (id: number) => void;
}

const QuestionList = ({ questions, onEdit, onDelete }: QuestionListProps) => {
  return (
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
                    onClick={() => onEdit(q)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onDelete(q.id)}
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
  );
};

export default QuestionList;
