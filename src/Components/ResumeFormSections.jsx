import React from 'react';
import { FaPlusCircle } from "react-icons/fa";

const labelMap = {
  fullName: "Full Name",
  email: "Email Address",
  location: "City, Country",
  phoneNumber: "Phone Number",
  linkedin: "LinkedIn URL",
  gitHub: "GitHub URL",
  summary: "Professional Summary",
  title: "Category / Title",
  category: "Skill Category",
  skills: "Skills (comma separated)",
  jobTitle: "Job Title",
  company: "Company",
  duration: "Time Period",
  responsibility: "Key Responsibilities & Achievements",
  degree: "Degree / Certification",
  university: "Institution / University",
  graduationYear: "Graduation Year",
  description: "Project Description",
  technologiesUsed: "Tech Stack"
};

const FormSection = React.memo(({ title, children }) => (
  <div className="form-control w-full mb-6 md:mb-10 p-5 md:p-8 bg-base-200 rounded-2xl md:rounded-3xl border border-white/5 shadow-xl transition-all hover:shadow-2xl hover:border-white/10">
    <h3 className="text-lg md:text-xl font-black mb-6 md:mb-8 text-white flex items-center gap-3">
      <span className="w-1.5 h-6 bg-primary rounded-full shadow-lg shadow-primary/20"></span> 
      {title}
    </h3>
    <div className="space-y-6">
      {children}
    </div>
  </div>
));

export const RenderFieldArray = React.memo(({ fields, label, name, keys, register }) => (     
  <FormSection title={label}>
    {fields.fields.map((field, index) => (
      <div key={field.id} className="p-4 md:p-6 mb-4 md:mb-6 bg-base-100/50 rounded-2xl relative group border border-white/5 transition-all hover:border-primary/20">
        <button
          type="button"
          onClick={() => fields.remove(index)}
          className="absolute -top-2 -right-2 btn btn-circle btn-xs btn-error shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
        >
          ✕
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {keys.map(key => {
            const isTextArea = ["responsibility", "description", "summary"].includes(key);    
            const isFullWidth = ["responsibility", "description", "summary", "technologiesUsed", "skills"].includes(key);

            return (
              <div key={key} className={`form-control ${isFullWidth ? 'md:col-span-2' : ''}`}>
                <label className="label-text mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                  {labelMap[key] || key}
                </label>
                {isTextArea ? (
                  <textarea
                    {...register(`${name}.${index}.${key}`)}
                    className="textarea textarea-bordered h-32 bg-base-100 border-white/5 focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-sm leading-relaxed placeholder:text-slate-600 text-slate-300"
                    placeholder={`Describe your ${key}...`}
                  />
                ) : (
                  <input
                    {...register(`${name}.${index}.${key}`)}
                    className="input input-bordered bg-base-100 border-white/5 focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-sm placeholder:text-slate-600 text-slate-300"
                    placeholder={`e.g. ${labelMap[key] || key}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    ))}
    <button
      type="button"
      onClick={() => fields.append(keys.reduce((acc, k) => ({...acc, [k]: ""}), {}))}
      className="btn btn-ghost btn-md text-primary hover:bg-primary/5 w-full border-dashed border-2 border-white/5 rounded-2xl transition-all"
    >
      <FaPlusCircle className="mr-2" /> Add {label}
    </button>
  </FormSection>
));

export default FormSection;
