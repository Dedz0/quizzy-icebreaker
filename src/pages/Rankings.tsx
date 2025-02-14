
import { useLocation } from "react-router-dom";
import { Trophy, ArrowBigDown, ArrowBigUp, Medal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RankingEntry {
  username: string;
  score: number;
  theme: string;
}

const Rankings = () => {
  const location = useLocation();
  const currentScore = location.state as RankingEntry;

  // For now, we'll use local storage to persist rankings
  const getRankings = (): RankingEntry[] => {
    const rankings = localStorage.getItem("quizRankings");
    return rankings ? JSON.parse(rankings) : [];
  };

  const saveRanking = (entry: RankingEntry) => {
    const rankings = getRankings();
    rankings.push(entry);
    rankings.sort((a, b) => b.score - a.score);
    localStorage.setItem("quizRankings", JSON.stringify(rankings));
  };

  // Save current score if it exists
  if (currentScore?.username && currentScore?.score !== undefined) {
    saveRanking(currentScore);
  }

  const rankings = getRankings();

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return position + 1;
    }
  };

  const getScoreChange = (score: number, index: number) => {
    const averageScore = rankings.reduce((acc, curr) => acc + curr.score, 0) / rankings.length;
    if (score > averageScore) {
      return <ArrowBigUp className="w-4 h-4 text-green-500" />;
    }
    return <ArrowBigDown className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Trophy className="w-8 h-8 text-yellow-500" />
          Quiz Rankings
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead>Theme</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="w-16 text-right">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankings.map((entry, index) => (
                <TableRow key={index} className={currentScore?.username === entry.username ? "bg-blue-50" : ""}>
                  <TableCell className="font-medium">{getMedalIcon(index)}</TableCell>
                  <TableCell>{entry.username}</TableCell>
                  <TableCell>{entry.theme}</TableCell>
                  <TableCell className="text-right">{entry.score}/10</TableCell>
                  <TableCell className="text-right">{getScoreChange(entry.score, index)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Rankings;
