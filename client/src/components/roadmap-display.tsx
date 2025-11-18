import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileDown, FileText, CheckCircle2, Lightbulb, Calendar, Code, BookOpen, Target, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface RoadmapDisplayProps {
  content: string;
  isGenerating: boolean;
}

export function RoadmapDisplay({ content, isGenerating }: RoadmapDisplayProps) {
  const [sections, setSections] = useState<{ title: string; content: string; icon: any }[]>([]);

  useEffect(() => {
    if (content) {
      // Parse the content into sections based on common headings
      const parsedSections = parseRoadmapSections(content);
      setSections(parsedSections);
    }
  }, [content]);

  const parseRoadmapSections = (text: string) => {
    const sections = [];
    
    // Define section patterns with their corresponding icons
    const sectionPatterns = [
      { pattern: /## ?Overview/i, title: "Overview", icon: Lightbulb },
      { pattern: /## ?Goal Breakdown/i, title: "Goal Breakdown", icon: Target },
      { pattern: /## ?Weekly Schedule/i, title: "Weekly Schedule", icon: Calendar },
      { pattern: /## ?Projects & Assessments/i, title: "Projects & Assessments", icon: Code },
      { pattern: /## ?Learning Resources/i, title: "Learning Resources", icon: BookOpen },
      { pattern: /## ?Interview Prep/i, title: "Interview Preparation", icon: CheckCircle2 },
      { pattern: /## ?Timeline/i, title: "Timeline", icon: Calendar },
    ];

    // Split by ## headers
    const parts = text.split(/(?=##)/);
    
    for (const part of parts) {
      for (const { pattern, title, icon } of sectionPatterns) {
        if (pattern.test(part)) {
          sections.push({
            title,
            content: part.replace(pattern, '').trim(),
            icon,
          });
          break;
        }
      }
    }

    // If no sections found, return the whole content as one section
    if (sections.length === 0) {
      sections.push({
        title: "Your Roadmap",
        content: text,
        icon: Lightbulb,
      });
    }

    return sections;
  };

  const handleExportMarkdown = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `career-roadmap-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportText = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `career-roadmap-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (isGenerating) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Generating Your Roadmap</CardTitle>
              <CardDescription>Our AI is crafting your personalized career plan...</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <div className="space-y-6" data-testid="roadmap-content">
      {/* Export Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Your Personalized Roadmap</CardTitle>
              <CardDescription>
                A comprehensive guide tailored to your career goals
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyToClipboard}
                data-testid="button-copy"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportText}
                data-testid="button-export-text"
              >
                <FileText className="w-4 h-4 mr-2" />
                Export TXT
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportMarkdown}
                data-testid="button-export-markdown"
              >
                <FileDown className="w-4 h-4 mr-2" />
                Export MD
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Roadmap Sections */}
      {sections.length > 0 ? (
        <Accordion type="multiple" defaultValue={sections.map((_, i) => `section-${i}`)} className="space-y-4">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <AccordionItem
                key={`section-${index}`}
                value={`section-${index}`}
                className="border rounded-lg bg-card"
                data-testid={`accordion-section-${index}`}
              >
                <AccordionTrigger className="px-6 py-4 hover-elevate" data-testid={`button-toggle-section-${index}`}>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-lg font-semibold">{section.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6" data-testid={`content-section-${index}`}>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown>{section.content}</ReactMarkdown>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <Card data-testid="card-roadmap-full">
          <CardContent className="py-8">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
