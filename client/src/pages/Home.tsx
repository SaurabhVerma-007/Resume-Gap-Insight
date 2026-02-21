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
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-200 blur-[100px]" />
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-200 blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-100 shadow-sm text-blue-600 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Career Assistant</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
            Bridge the Gap to Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Dream Job</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Paste your resume and the job description below. Our AI will analyze the gap, 
            score your match, and generate a personalized learning roadmap.
          </p>
        </motion.div>
      </section>

      {/* Input Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!analyzeMutation.isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Resume Input */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        <FileText className="w-5 h-5" />
                      </div>
                      Your Resume
                    </label>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Text Content</span>
                  </div>
                  <Card className="border-2 border-slate-100 shadow-lg focus-within:border-blue-500/50 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                    <CardContent className="p-0">
                      <Textarea 
                        placeholder="Paste your resume content here..." 
                        className="min-h-[300px] border-0 focus-visible:ring-0 rounded-2xl resize-none text-base p-6 leading-relaxed"
                        value={resume}
                        onChange={(e) => setResume(e.target.value)}
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Job Description Input */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                      <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      Job Description
                    </label>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Requirements</span>
                  </div>
                  <Card className="border-2 border-slate-100 shadow-lg focus-within:border-indigo-500/50 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
                    <CardContent className="p-0">
                      <Textarea 
                        placeholder="Paste the job description here..." 
                        className="min-h-[300px] border-0 focus-visible:ring-0 rounded-2xl resize-none text-base p-6 leading-relaxed"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button 
                  onClick={handleAnalyze} 
                  size="lg" 
                  disabled={analyzeMutation.isPending}
                  className="w-full sm:w-auto min-w-[200px] text-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                >
                  {analyzeMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5 mr-2" />
                      Analyze Match
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="ghost" 
                  onClick={handleDemo}
                  className="text-muted-foreground hover:text-foreground"
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
