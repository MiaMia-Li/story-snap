// components/resume/KeywordOptimizer.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface KeywordOptimizerProps {
  skills: string[];
}

export function KeywordOptimizer({ skills }: KeywordOptimizerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([]);

  const handleAnalyze = async () => {
    // Implement keyword analysis logic here
    // This would typically call an API to get industry-relevant keywords
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Keywords</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keyword Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Enter job title or industry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleAnalyze}>Analyze</Button>
          </div>

          {suggestedKeywords.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Suggested Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {suggestedKeywords.map((keyword, index) => (
                  <Badge key={index} variant="outline">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
