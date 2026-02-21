import { motion } from "framer-motion";
import { type AnalyzeResponse } from "@shared/routes";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2, Lightbulb, Map, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AnalysisResultProps {
  data: AnalyzeResponse;
}

export function AnalysisResult({ data }: AnalysisResultProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Determine score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 w-full max-w-4xl mx-auto py-8"
    >
      {/* Score Section */}
      <motion.div variants={item}>
        <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-white to-secondary/30">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-bold">Analysis Results</CardTitle>
            <CardDescription>Based on your resume and the provided job description</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="relative flex items-center justify-center w-40 h-40">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  className="text-muted"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * data.matchScore) / 100}
                  className={getScoreColor(data.matchScore)}
                  style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-5xl font-bold ${getScoreColor(data.matchScore)}`}>
                  {data.matchScore}%
                </span>
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mt-1">Match</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Missing Skills */}
        <motion.div variants={item}>
          <Card className="h-full border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <AlertCircle className="w-5 h-5 text-red-500" />
                Missing Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.missingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {data.missingSkills.map((skill, i) => (
                    <Badge key={i} variant="outline" className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground italic">Great job! No critical skills missing.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Weak Skills */}
        <motion.div variants={item}>
          <Card className="h-full border-l-4 border-l-yellow-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="w-5 h-5 text-yellow-500" />
                Areas to Improve
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.weakSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {data.weakSkills.map((skill, i) => (
                    <Badge key={i} variant="outline" className="border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground italic">Your listed skills seem strong for this role.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Improvement Suggestions */}
      <motion.div variants={item}>
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-primary">
              <Lightbulb className="w-5 h-5" />
              Strategic Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {data.improvementSuggestions.map((suggestion, i) => (
                <li key={i} className="flex gap-3 text-foreground/80">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Learning Roadmap */}
      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Map className="w-5 h-5 text-indigo-500" />
              Your Personalized Learning Roadmap
            </CardTitle>
            <CardDescription>A step-by-step guide to bridging your skill gaps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-muted">
              {data.learningRoadmap.map((phase, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-8 w-6 h-6 rounded-full border-4 border-background bg-indigo-500 shadow-sm z-10" />
                  <h4 className="font-bold text-lg text-indigo-900 mb-2">{phase.phase}</h4>
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {phase.topics.map((topic, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                          <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
