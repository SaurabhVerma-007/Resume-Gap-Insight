import "dotenv/config";
import type { Express } from "express";
import type { Server } from "http";
import { api } from "@shared/routes";
import { z } from "zod";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.analysis.analyze.path, async (req, res) => {
    try {
      const input = api.analysis.analyze.input.parse(req.body);

      const prompt = `
You are an expert career coach and technical recruiter. 
Analyze the following resume against the provided job description.
Identify missing skills, weak skills, and suggest improvements.
Also, create a 4-8 week structured learning roadmap to bridge the gap.

Resume:
${input.resume}

Job Description:
${input.jobDescription}

Respond strictly in JSON matching the following schema:
{
  "matchScore": number (0-100),
  "missingSkills": [string],
  "weakSkills": [string],
  "improvementSuggestions": [string],
  "learningRoadmap": [
    {
      "phase": string (e.g., "Beginner", "Weeks 1-2"),
      "topics": [string]
    }
  ]
}
`;

      const response = await groq.chat.completions.create({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [{ role: "user", content: prompt }],
        temperature: 1,
        max_completion_tokens: 4096, // ✅ increased for full JSON response
        top_p: 1,
        stream: false, // ✅ must be false for JSON parsing
        stop: null,
        response_format: { type: "json_object" }, // ✅ ensures valid JSON output
      });

      const resultText = response.choices[0].message.content;
      if (!resultText) {
        throw new Error("No response from AI");
      }

      const resultJson = JSON.parse(resultText);
      const parsedResult = api.analysis.analyze.responses[200].parse(resultJson);

      res.status(200).json(parsedResult);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0]?.message || "Validation Error",
          field: err.errors[0]?.path.join('.'),
        });
      }
      console.error("Analysis error:", err);
      res.status(500).json({ message: "Failed to analyze resume" });
    }
  });

  return httpServer;
}