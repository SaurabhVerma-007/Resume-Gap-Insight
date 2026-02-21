import { z } from "zod";

export const analyzeRequestSchema = z.object({
  resume: z.string().min(10, "Resume is too short.").max(50000, "Resume is too long."),
  jobDescription: z.string().min(10, "Job description is too short.").max(50000, "Job description is too long."),
});

export const learningRoadmapPhaseSchema = z.object({
  phase: z.string(),
  topics: z.array(z.string()),
});

export const analyzeResponseSchema = z.object({
  matchScore: z.number(),
  missingSkills: z.array(z.string()),
  weakSkills: z.array(z.string()),
  improvementSuggestions: z.array(z.string()),
  learningRoadmap: z.array(learningRoadmapPhaseSchema),
});

export type AnalyzeRequest = z.infer<typeof analyzeRequestSchema>;
export type AnalyzeResponse = z.infer<typeof analyzeResponseSchema>;