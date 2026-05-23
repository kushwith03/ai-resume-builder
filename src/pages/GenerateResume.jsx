import React, { useState, useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import { FaPaperPlane, FaSave, FaChartBar } from "react-icons/fa";
import { generateResume, trackAnalytics, saveResumeToDB } from "../api/ResumeService";
import { useForm, useFieldArray } from "react-hook-form";
import Resume from "../Components/Resume";
import { performanceTracker } from "../utils/performanceTracker";
import { calculateATSScore } from "../services/atsService";
import { useDebounce } from "../hooks/useDebounce";
import FormSection, { RenderFieldArray } from "../Components/ResumeFormSections";

const GenerateResume = () => {
  const [data, setData] = useState({
    personalInformation: { fullName: "" },
    summary: "",
    skills: [],
    experience: [],
    education: [],
    projects: [],
  });

  const { register, handleSubmit, control, reset, watch } = useForm({
    defaultValues: data,
  });

  const formData = watch();

  const [showFormUI, setShowFormUI] = useState(false);
  const [showResumeUI, setShowResumeUI] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(true);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [currentMetrics, setCurrentMetrics] = useState(performanceTracker.getAverageMetrics());

  const debouncedJD = useDebounce(jobDescription, 800);

  const fieldArrays = {
    skills: useFieldArray({ control, name: "skills" }),
    experience: useFieldArray({ control, name: "experience" }),
    education: useFieldArray({ control, name: "education" }),
    projects: useFieldArray({ control, name: "projects" }),
  };

  const onSubmit = useCallback((formData) => {
    setData(formData);
    setShowFormUI(false);
    setShowResumeUI(true);
    setCurrentMetrics(performanceTracker.getAverageMetrics());
    trackAnalytics("form_submit_preview");
  }, []);

  const handleGenerate = async () => {
    if (!description.trim()) return toast.error("Prompt cannot be empty");
    
    performanceTracker.startMeasure();
    setLoading(true);
    try {
      const response = await generateResume(description);
      reset(response.data);
      setShowFormUI(true);
      setShowPromptInput(false);
      trackAnalytics("generate_resume");
      toast.success("AI draft created successfully");
    } catch (error) {
      toast.error(error.response?.data?.error || "AI service unavailable");
    } finally {
      setLoading(false);
      performanceTracker.endMeasure("AI_Generation");
      setCurrentMetrics(performanceTracker.getAverageMetrics());
    }
  };

  const atsResult = useMemo(() => {
    if (!debouncedJD) return null;
    return calculateATSScore(showFormUI ? formData : data, debouncedJD);
  }, [formData, data, debouncedJD, showFormUI]);

  const resetGenerator = () => {
    setShowPromptInput(true);
    setShowFormUI(false);
    setShowResumeUI(false);
    setJobDescription("");
    setDescription("");
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-10 min-h-[90vh] pb-32">
      {showPromptInput && (
        <div className="flex flex-col items-center justify-center py-20 gap-8">
          <div className="text-center space-y-3">
            <h1 className="text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">AI Engine</h1>
            <p className="text-gray-500 text-lg">Tell us about your career and let AI do the heavy lifting.</p>
          </div>
          <div className="w-full max-w-3xl space-y-4">
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full h-52 text-lg shadow-inner focus:border-primary transition-all p-6"
              placeholder="e.g. I am a software engineer with 5 years of experience in React..."
            />
            <button onClick={handleGenerate} disabled={loading} className="btn btn-primary btn-lg w-full group shadow-lg">
              {loading ? <span className="loading loading-spinner"></span> : <FaPaperPlane className="mr-2 group-hover:translate-x-1 transition-transform" />}
              Generate AI Draft
            </button>
          </div>
        </div>
      )}

      {showFormUI && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-fadeIn">
          {atsResult && (
            <div className="sticky top-0 z-20 bg-base-100/90 backdrop-blur-md p-4 rounded-xl border border-base-300 shadow-sm flex items-center justify-between">
              <span className="text-sm font-bold opacity-60 uppercase tracking-widest">Live Optimization Score</span>
              <div className={`badge badge-lg gap-2 p-4 font-bold ${atsResult.score >= 70 ? 'badge-success' : atsResult.score >= 40 ? 'badge-warning' : 'badge-error'}`}>
                {atsResult.score}% Match
              </div>
            </div>
          )}
          <FormSection title="Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input {...register("personalInformation.fullName")} placeholder="Full Name" className="input input-bordered w-full" />
              <input {...register("personalInformation.email")} placeholder="Email" className="input input-bordered w-full" />
              <input {...register("personalInformation.location")} placeholder="Location" className="input input-bordered w-full" />
            </div>
          </FormSection>
          
          <FormSection title="Professional Summary">
            <textarea {...register("summary")} className="textarea textarea-bordered w-full h-40 p-4 leading-relaxed" />
          </FormSection>

          <RenderFieldArray fields={fieldArrays.skills} label="Skills" name="skills" keys={["title", "level"]} register={register} />
          <RenderFieldArray fields={fieldArrays.experience} label="Experience" name="experience" keys={["jobTitle", "company", "duration", "responsibility"]} register={register} />
          <RenderFieldArray fields={fieldArrays.education} label="Education" name="education" keys={["degree", "university", "location", "graduationYear"]} register={register} />
          <RenderFieldArray fields={fieldArrays.projects} label="Projects" name="projects" keys={["title", "description", "technologiesUsed"]} register={register} />

          <div className="flex justify-end gap-4 sticky bottom-6 bg-base-100/80 backdrop-blur p-4 rounded-2xl shadow-xl border border-base-200 z-10">
            <button type="submit" className="btn btn-primary btn-lg px-20">Preview Final Resume</button>
          </div>
        </form>
      )}

      {showResumeUI && (
        <div className="space-y-10 animate-fadeIn pb-20">
          <div className="bg-base-200 p-8 rounded-3xl border border-base-300 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">ATS Optimizer</h3>
              {atsResult && (
                <div className={`badge badge-lg gap-2 p-4 font-bold ${atsResult.score >= 70 ? 'badge-success' : atsResult.score >= 40 ? 'badge-warning' : 'badge-error'}`}>
                   Score: {atsResult.score}%
                </div>
              )}
            </div>
            <textarea 
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the target Job Description to see your real-time matching score..."
              className="textarea textarea-bordered w-full h-32 focus:border-primary"
            />
            {atsResult && (
               <div className="mt-4 animate-fadeIn">
                  <p className="text-sm font-semibold opacity-70 mb-2 uppercase tracking-wider">Missing Technical Keywords:</p>
                  <div className="flex flex-wrap gap-2">
                    {atsResult.missingKeywords.slice(0, 10).map(kw => (
                      <span key={kw} className="badge badge-outline border-base-300">{kw}</span>
                    ))}
                  </div>
               </div>
            )}
          </div>
          
          <Resume data={data} />
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <button onClick={() => { setShowResumeUI(false); setShowFormUI(true); }} className="btn btn-outline btn-lg px-12">Return to Editor</button>
            <button onClick={resetGenerator} className="btn btn-accent btn-lg px-12">Generate Another</button>
            <button 
              onClick={async () => {
                try {
                  await saveResumeToDB(data, atsResult?.score || 0);
                  toast.success("Sync complete: Saved to cloud");
                } catch (e) {
                  toast.error("Database connection failure");
                }
              }} 
              className="btn btn-success btn-lg px-12"
            >
              <FaSave className="mr-2" /> Save to Cloud
            </button>
          </div>
        </div>
      )}

      {/* Floating System Health / Performance Metrics */}
      <div className="fixed bottom-4 left-4 z-50">
        <div className="dropdown dropdown-top dropdown-hover">
          <div tabIndex={0} role="button" className="btn btn-circle btn-ghost bg-base-200 shadow-lg border border-base-300">
            <FaChartBar className="text-primary" />
          </div>
          <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-4 shadow-xl bg-base-100 border border-base-300 mb-2">
            <h3 className="font-bold text-sm border-b pb-2 mb-2">System Performance</h3>
            <div className="space-y-2">
               <div className="flex justify-between text-xs">
                 <span>UI Fluidity:</span>
                 <span className="font-mono text-success">{currentMetrics.smoothnessScore}</span>
               </div>
               <div className="flex justify-between text-xs">
                 <span>Avg. Input Latency:</span>
                 <span className="font-mono">{currentMetrics.avgInputLatency}ms</span>
               </div>
               <div className="flex justify-between text-xs">
                 <span>Render Efficiency:</span>
                 <span className="font-mono">{currentMetrics.avgRenderTime}ms</span>
               </div>
               <p className="text-[10px] opacity-50 mt-2 italic">Metrics measured via PerformanceObserver API</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateResume;
