import { useMutation } from "@tanstack/react-query";
import { api, type AnalyzeResponse } from "@shared/routes";
import { z } from "zod";

// We need to define the input type manually since we don't have the explicit type export from routes yet
// referencing the schema directly for input type inference
const analyzeRequestSchema = api.analysis.analyze.input;
type AnalyzeRequest = z.infer<typeof analyzeRequestSchema>;

export function useAnalyzeResume() {
  return useMutation({
    mutationFn: async (data: AnalyzeRequest) => {
      // Validate input before sending (client-side validation)
      const validated = analyzeRequestSchema.parse(data);
      
      const res = await fetch(api.analysis.analyze.path, {
        method: api.analysis.analyze.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to analyze resume");
      }

      const result = await res.json();
      // Validate response structure
      return api.analysis.analyze.responses[200].parse(result);
    },
  });
}
