// components/resume/AIRewrite.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface WorkExperience {
  company: string;
  position: string;
  period: string;
  description: string[];
  achievements?: string[];
}

interface AIRewriteProps {
  workExperience: WorkExperience[];
}

export function AIRewrite({ workExperience }: AIRewriteProps) {
  const [selectedExp, setSelectedExp] = useState<WorkExperience | null>(null);
  const [rewrittenContent, setRewrittenContent] = useState<string>("");

  const handleRewrite = async () => {
    // Implement AI rewrite logic here
    // This is where you'd call your AI service
  };

  return (
    <div className="space-y-6">
      <ScrollArea className="h-[calc(100vh-16rem)]">
        {workExperience.map((exp, index) => (
          <Card
            key={index}
            className={`mb-4 cursor-pointer ${
              selectedExp === exp ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setSelectedExp(exp)}>
            <CardHeader>
              <CardTitle className="text-lg">{exp.position}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {exp.company} | {exp.period}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {exp.description.map((desc, idx) => (
                  <p key={idx} className="text-sm">
                    {desc}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>

      {selectedExp && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>AI Rewrite</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={rewrittenContent}
              onChange={(e) => setRewrittenContent(e.target.value)}
              placeholder="AI rewritten content will appear here..."
              className="min-h-[200px]"
            />
            <div className="flex justify-end mt-4">
              <Button onClick={handleRewrite}>Rewrite with AI</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
