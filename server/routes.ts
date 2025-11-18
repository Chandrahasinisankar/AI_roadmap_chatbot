import type { Express } from "express";
import { createServer, type Server } from "http";
import { roadmapRequestSchema } from "@shared/schema";
import { generateRoadmap } from "./gemini";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for roadmap generation
  app.post("/api/generate-roadmap", async (req, res) => {
    try {
      // Validate request body
      const validationResult = roadmapRequestSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          error: "Validation failed",
          details: validationResult.error.errors,
        });
      }

      const params = validationResult.data;

      // Generate roadmap using Gemini AI
      const content = await generateRoadmap(params);

      return res.json({
        content,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error in /api/generate-roadmap:", error);
      return res.status(500).json({
        error: "Failed to generate roadmap",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
