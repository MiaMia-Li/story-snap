// components/resume/BestPractices.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ScoreCategory {
  name: string;
  score: number;
}

interface BestPracticesProps {
  scoreCategories: ScoreCategory[];
}

export function BestPractices({ scoreCategories }: BestPracticesProps) {
  return (
    <div className="space-y-6">
      {scoreCategories.map((category, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{category.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Progress value={category.score} className="flex-1" />
              <span className="text-lg font-semibold">{category.score}%</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
