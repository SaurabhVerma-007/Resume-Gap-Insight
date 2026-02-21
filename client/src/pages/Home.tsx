import { useState } from "react";
import { useAnalyzeResume } from "@/hooks/use-analysis";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { AnalysisResult } from "@/components/AnalysisResult";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, FileText, Briefcase, Loader2, ArrowRight, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const { toast } = useToast();
  
  const analyzeMutation = useAnalyzeResume();

  const handleAnalyze = () => {
    if (!resume.trim() || !jobDescription.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both your resume and the job description.",
        variant: "destructive",
      });
      return;
    }

    if (resume.length < 50 || jobDescription.length < 50) {
      toast({
        title: "Content Too Short",
        description: "Please provide more detailed content for better analysis.",
        variant: "destructive",
      });
      return;
    }

    analyzeMutation.mutate({ resume, jobDescription });
  };

  const handleClear = () => {
    setResume("");
    setJobDescription("");
    analyzeMutation.reset();
  };

  // Prefill for demo purposes
  const handleDemo = () => {
    setResume(`
John Doe
Software Engineer with 3 years of experience in React and Node.js.
Passionate about building scalable web applications.
Skills: JavaScript, TypeScript, React, Express, MongoDB.
Experience:
- Frontend Developer at Tech Corp: Built dashboard using React.
- Junior Dev at Startup Inc: Maintained legacy code.
    `.trim());
    setJobDescription(`
Senior Full Stack Engineer
We are looking for an experienced engineer to join our team.
Requirements:
- 5+ years of experience.
- Expert in React, Node.js, and Python.
- Experience with AWS and Docker is a must.
- Knowledge of GraphQL and Redis.
- Strong communication skills and leadership ability.
    `.trim());
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header Section */}
      <header className="max-w-7xl mx-auto px-6 pt-12 pb-8 flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Resume Gap Analyzer
          </h1>
          <p className="text-slate-500 text-lg">
            Compare your resume against any job description using AI.
          </p>
        </div>
      </header>

      {/* Input Section */}
      <section className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {!analyzeMutation.isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Resume Input */}
                <Card className="border border-slate-100 shadow-sm rounded-3xl overflow-hidden bg-white p-8 space-y-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-indigo-600">
                      <FileText className="w-5 h-5" />
                      <h3 className="font-bold text-xl">Your Resume</h3>
                    </div>
                    <p className="text-slate-400 text-sm">Paste your professional experience here.</p>
                  </div>
                  <div className="relative group">
                    <Textarea 
                      placeholder="Paste your resume content here..." 
                      className="min-h-[400px] bg-slate-50/30 border-slate-100 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500/30 rounded-2xl resize-none text-slate-600 p-6 transition-all"
                      value={resume}
                      onChange={(e) => setResume(e.target.value)}
                    />
                  </div>
                </Card>

                {/* Job Description Input */}
                <Card className="border border-slate-100 shadow-sm rounded-3xl overflow-hidden bg-white p-8 space-y-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-indigo-600">
                      <Briefcase className="w-5 h-5" />
                      <h3 className="font-bold text-xl">Job Description</h3>
                    </div>
                    <p className="text-slate-400 text-sm">Paste the requirements for the role.</p>
                  </div>
                  <div className="relative group">
                    <Textarea 
                      placeholder="Paste the job description here..." 
                      className="min-h-[400px] bg-slate-50/30 border-slate-100 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500/30 rounded-2xl resize-none text-slate-600 p-6 transition-all"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col items-center gap-6">
                <Button 
                  onClick={handleAnalyze} 
                  size="lg" 
                  disabled={analyzeMutation.isPending}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-7 text-lg font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
                >
                  {analyzeMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Generate Gap Analysis"
                  )}
                </Button>
                
                <Button 
                  variant="ghost" 
                  onClick={handleDemo}
                  className="text-slate-400 hover:text-slate-600 hover:bg-transparent"
                >
                  Try with Example Data
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-8">
              <div className="flex justify-between items-center max-w-4xl mx-auto">
                <Button variant="outline" onClick={handleClear} className="group">
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  Analyze Another Role
                </Button>
                <div className="text-sm text-muted-foreground">
                  Analysis complete
                </div>
              </div>
              
              <AnalysisResult data={analyzeMutation.data} />
            </div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
