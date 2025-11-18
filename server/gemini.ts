import { GoogleGenAI } from "@google/genai";

// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.0-flash"
//   - do not change this unless explicitly requested by the user

// This API key is from Gemini Developer API Key, not vertex AI API Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface RoadmapGenerationParams {
  company?: string;
  role: string;
  sector: string;
  salary?: string;
  timeframeMonths: number;
  hoursPerWeek: number;
}

export async function generateRoadmap(params: RoadmapGenerationParams): Promise<string> {
  const { company, role, sector, salary, timeframeMonths, hoursPerWeek } = params;
  
  const startDate = new Date().toISOString().split('T')[0];
  
  const prompt = `You are an experienced industrial AI/career mentor. Produce a clear, step-by-step, practical roadmap and learning guide tailored to the user's inputs. Provide both a human-friendly plan and a compact summary.

User inputs:
- target_company: '${company || 'Not specified'}'
- role: '${role}'
- sector: '${sector}'
- desired_salary: '${salary || 'Not specified'}'
- timeframe_months: ${timeframeMonths}
- hours_per_week: ${hoursPerWeek}
- start_date: ${startDate}

Deliverables (must include all):
1) Short Overview: 2-3 sentences about the suitability and prioritized skills.
2) Goal Breakdown: Specific milestones aligned to the timeframe (monthly & weekly milestones). Include dates relative to start_date.
3) Weekly Schedule: A repeatable weekly study plan (hours/day and tasks) customized to hours_per_week.
4) Projects & Assessments: 2-4 practical projects, with deliverables and evaluation criteria.
5) Learning Resources: For each milestone include high-quality, real-time resource links (articles, official docs, courses, YouTube, GitHub repos). Provide full URLs.
6) Interview Prep & Hiring Strategy: Company-targeted resume/LinkedIn checklist, technical and behavioral interview topics, sample questions, and a mock-interview schedule.
7) Salary & Role Strategy: Advice on targeting roles and negotiating salary for the given sector and company. Include realistic salary ranges and negotiation talking points where possible.
8) Timeline Table: Compact timeline listing milestone -> target date.

Formatting:
- Use clear markdown formatting with ## for main sections
- Use numbered lists and bullet points for readability
- Include tables where appropriate (use markdown table syntax)
- Prioritize actionable, measurable steps. Use short sentences and numbered lists.
- When timeframe is short (<=3 months), focus on high-impact skills, projects, and interview prep; when longer, include deeper study and certifications.

Return the output in English. Use up-to-date public links (official docs, major MOOC providers, GitHub, or reputable blogs).`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
    });

    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No response candidates from AI model");
    }

    const content = candidates[0].content;
    if (!content || !content.parts || content.parts.length === 0) {
      throw new Error("No content in AI response");
    }

    const text = content.parts[0].text;
    if (!text) {
      throw new Error("No text in AI response");
    }

    return text;
  } catch (error) {
    console.error("Error generating roadmap:", error);
    throw new Error(`Failed to generate roadmap: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
