import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { roadmapRequestSchema, type RoadmapRequest } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sparkles, Building2, Briefcase, TrendingUp, DollarSign, Clock, Calendar, Loader2 } from "lucide-react";
import { RoadmapDisplay } from "@/components/roadmap-display";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [generatedRoadmap, setGeneratedRoadmap] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const form = useForm<RoadmapRequest>({
    resolver: zodResolver(roadmapRequestSchema),
    defaultValues: {
      company: "",
      role: "",
      sector: "",
      salary: "",
      timeframeMonths: 3,
      hoursPerWeek: 10,
    },
  });

  const onSubmit = async (data: RoadmapRequest) => {
    setIsGenerating(true);
    setGeneratedRoadmap("");

    try {
      const response = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate roadmap");
      }

      const result = await response.json();
      setGeneratedRoadmap(result.content);
      
      toast({
        title: "Roadmap Generated Successfully!",
        description: "Your personalized career roadmap is ready. Scroll down to view it.",
      });

      // Scroll to roadmap section
      setTimeout(() => {
        const roadmapElement = document.querySelector('[data-testid="roadmap-content"]');
        if (roadmapElement) {
          roadmapElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (error) {
      console.error("Error generating roadmap:", error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate roadmap. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Career Planning</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            Your Personalized Career Roadmap
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get a detailed, AI-generated learning path tailored to your career goals. Complete with timelines, resources, projects, and interview preparation.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="px-6 pb-12">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Tell Us About Your Goals</CardTitle>
              <CardDescription>
                Fill in your career aspirations and we'll create a comprehensive roadmap just for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                            Target Company (Optional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Google, Microsoft"
                              {...field}
                              data-testid="input-company"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-muted-foreground" />
                            Desired Role *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Software Engineer, Data Scientist"
                              {...field}
                              data-testid="input-role"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sector"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-muted-foreground" />
                            Sector *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Technology, Finance, Healthcare"
                              {...field}
                              data-testid="input-sector"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="salary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            Desired Salary (Optional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., $120,000"
                              {...field}
                              data-testid="input-salary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="timeframeMonths"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            Timeframe (Months) *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              max="60"
                              placeholder="3"
                              value={field.value || ""}
                              onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number(e.target.value))}
                              onBlur={field.onBlur}
                              name={field.name}
                              data-testid="input-timeframe"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hoursPerWeek"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            Weekly Study Hours *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              max="168"
                              placeholder="10"
                              value={field.value || ""}
                              onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number(e.target.value))}
                              onBlur={field.onBlur}
                              name={field.name}
                              data-testid="input-hours"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isGenerating}
                    data-testid="button-generate"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating Your Roadmap...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Generate Roadmap
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Roadmap Display Section */}
      {(isGenerating || generatedRoadmap) && (
        <section className="px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            <RoadmapDisplay content={generatedRoadmap} isGenerating={isGenerating} />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t">
        <p>Powered by Google Gemini AI • Your personalized career development companion</p>
      </footer>
    </div>
  );
}
