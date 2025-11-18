import { z } from "zod";

// Roadmap generation request schema
export const roadmapRequestSchema = z.object({
  company: z.string().optional(),
  role: z.string().min(1, "Role is required"),
  sector: z.string().min(1, "Sector is required"),
  salary: z.string().optional(),
  timeframeMonths: z.number().min(1).max(60),
  hoursPerWeek: z.number().min(1).max(168),
});

export type RoadmapRequest = z.infer<typeof roadmapRequestSchema>;

// Roadmap response structure
export interface RoadmapResponse {
  content: string;
  timestamp: string;
}
