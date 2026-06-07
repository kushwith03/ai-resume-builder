import React from 'react';
import { FaPlusCircle, FaTrash, FaCopy, FaArrowUp, FaArrowDown, FaGripVertical } from "react-icons/fa";

const labelMap = {
  fullName: "Full Name *",
  email: "Email Address *",
  location: "City, Country *",
  phoneNumber: "Phone Number",
  linkedin: "LinkedIn URL",
  gitHub: "GitHub URL",
  summary: "Professional Summary *",
  title: "Title / Name *",
  category: "Skill Category (e.g. Languages) *",
  skills: "Skills (comma separated) *",
  jobTitle: "Job Title *",
  company: "Company / Organization *",
  duration: "Time Period (e.g. 2020 - Present) *",
  responsibility: "Responsibilities & Achievements (one per line) *",
  degree: "Degree / Certification *",
  university: "Institution / University *",
  graduationYear: "Graduation Year / Date *",
  description: "Description / Bullet Points (one per line) *",
  technologiesUsed: "Tech Stack / Tools",
  label: "Link Label (e.g. Portfolio, Behance) *",
  url: "Link URL *",
  issuer: "Issuing Organization",
  date: "Date Received",
  award: "Award / Achievement Name *",
  organization: "Organization",
};

const FormSection = React.memo(({ title, children, defaultExpanded = true }) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  return (
    <div className={`form-control w-full mb-4 md:mb-6 p-4 md:p-6 bg-base-200/50 rounded-2xl md:rounded-3xl border border-white/5 shadow-lg transition-all hover:border-white/10 ${!isExpanded ? 'pb-4 md:pb-6' : ''}`}>
      <div 
        className="flex items-center justify-between cursor-pointer group/header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-base md:text-lg font-black text-white flex items-center gap-3">
          <span className="w-1 h-5 bg-primary rounded-full shadow-lg shadow-primary/20 transition-all group-hover/header:h-6"></span> 
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 opacity-0 group-hover/header:opacity-100 transition-opacity">
            {isExpanded ? "Minimize" : "Expand"}
          </span>
          <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <FaArrowDown className="text-xs text-slate-500 group-hover/header:text-primary" />
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="space-y-4 mt-5 md:mt-6 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
});

export const RenderFieldArray = React.memo(({ fields, label, name, keys, register, watch }) => {
  const allValues = watch(name) || [];
  const lastIndexRef = React.useRef(-1);

  React.useEffect(() => {
    if (fields.fields.length > lastIndexRef.current && lastIndexRef.current !== -1) {
      setTimeout(() => {
        const firstInput = document.querySelector(`[name="${name}.${fields.fields.length - 1}.${keys[0]}"]`);
        if (firstInput) firstInput.focus();
      }, 50);
    }
    lastIndexRef.current = fields.fields.length;
  }, [fields.fields.length, name, keys]);

  const handleRemove = (index) => {
    const entry = allValues[index];
    const hasContent = Object.values(entry || {}).some(val => val && String(val).trim().length > 0);
    
    if (!hasContent || window.confirm(`Are you sure you want to remove this ${label.toLowerCase()} entry?`)) {
      fields.remove(index);
    }
  };

  const handleDuplicate = (index) => {
    const entry = allValues[index];
    const newEntry = { ...entry };
    delete newEntry.id;
    fields.insert(index + 1, newEntry);
  };

  return (
    <FormSection title={label}>
      {fields.fields.length === 0 ? (
        <div className="py-6 text-center border border-dashed border-white/10 rounded-2xl bg-base-100/20">
          <p className="text-slate-500 text-xs italic">No {label.toLowerCase()} added yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {fields.fields.map((field, index) => (
            <div key={field.id} className="p-4 md:p-5 bg-base-100/40 rounded-xl relative group border border-white/5 transition-all hover:border-primary/10">
              {/* Action Bar - Improved UI */}
              <div className="flex justify-end gap-1.5 mb-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200">
                <div className="flex items-center gap-1 bg-base-300/90 backdrop-blur px-2 py-1 rounded-lg border border-white/10 shadow-xl">
                  <div className="flex gap-0.5">
                    <button
                      type="button"
                      onClick={() => fields.move(index, index - 1)}
                      disabled={index === 0}
                      className="btn btn-ghost btn-xs h-6 w-6 p-0 rounded hover:bg-primary/20 hover:text-primary disabled:opacity-20"
                      title="Move Up"
                    >
                      <FaArrowUp className="text-[10px]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => fields.move(index, index + 1)}
                      disabled={index === fields.fields.length - 1}
                      className="btn btn-ghost btn-xs h-6 w-6 p-0 rounded hover:bg-primary/20 hover:text-primary disabled:opacity-20"
                      title="Move Down"
                    >
                      <FaArrowDown className="text-[10px]" />
                    </button>
                  </div>
                  <div className="w-px h-3 bg-white/10 mx-1"></div>
                  <button
                    type="button"
                    onClick={() => handleDuplicate(index)}
                    className="btn btn-ghost btn-xs h-6 w-6 p-0 rounded hover:bg-success/20 hover:text-success"
                    title="Duplicate Entry"
                  >
                    <FaCopy className="text-[10px]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="btn btn-ghost btn-xs h-6 w-6 p-0 rounded hover:bg-error/20 hover:text-error"
                    title="Remove Entry"
                  >
                    <FaTrash className="text-[10px]" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {keys.map(key => {
                  const isTextArea = ["responsibility", "description", "summary"].includes(key);    
                  const isFullWidth = ["responsibility", "description", "summary", "technologiesUsed", "skills", "url"].includes(key);

                  return (
                    <div key={key} className={`form-control ${isFullWidth ? 'md:col-span-2' : ''}`}>
                      <label className="label-text mb-1.5 text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                        {labelMap[key] || key}
                      </label>
                      {isTextArea ? (
                        <textarea
                          {...register(`${name}.${index}.${key}`)}
                          className="textarea textarea-bordered h-24 bg-base-100 border-white/5 focus:border-primary/50 focus:ring-2 focus:ring-primary/5 transition-all text-sm leading-relaxed placeholder:text-slate-600 text-slate-300"
                          placeholder={`Enter details for ${key}...`}
                        />
                      ) : (
                        <input
                          {...register(`${name}.${index}.${key}`)}
                          className="input input-bordered h-10 bg-base-100 border-white/5 focus:border-primary/50 focus:ring-2 focus:ring-primary/5 transition-all text-sm placeholder:text-slate-600 text-slate-300"
                          placeholder={`e.g. ${labelMap[key]?.replace(' *', '') || key}`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => fields.append(keys.reduce((acc, k) => ({...acc, [k]: ""}), {}))}
        className="btn btn-ghost btn-sm text-primary hover:bg-primary/5 w-full border-dashed border-2 border-white/5 rounded-xl transition-all mt-3 h-10"
      >
        <FaPlusCircle className="mr-2" /> Add {label.replace(/s$/, '')}
      </button>
    </FormSection>
  );
});

export default FormSection;
