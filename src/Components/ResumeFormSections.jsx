import React from 'react';
import { FaPlusCircle, FaTrash, FaCopy, FaArrowUp, FaArrowDown, FaGripVertical } from "react-icons/fa";

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

const FormSection = React.memo(({ title, children, defaultExpanded = true }) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  return (
    <div className={`form-control w-full mb-6 md:mb-10 p-5 md:p-8 bg-base-200 rounded-2xl md:rounded-3xl border border-white/5 shadow-xl transition-all hover:shadow-2xl hover:border-white/10 ${!isExpanded ? 'pb-5 md:pb-8' : ''}`}>
      <div 
        className="flex items-center justify-between cursor-pointer group/header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg md:text-xl font-black text-white flex items-center gap-3">
          <span className="w-1.5 h-6 bg-primary rounded-full shadow-lg shadow-primary/20"></span> 
          {title}
        </h3>
        <button 
          type="button" 
          className="btn btn-ghost btn-xs text-slate-500 group-hover/header:text-primary transition-colors"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>
      {isExpanded && (
        <div className="space-y-6 mt-6 md:mt-8 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
});

export const RenderFieldArray = React.memo(({ fields, label, name, keys, register, watch }) => {
  const allValues = watch(name);
  const lastIndexRef = React.useRef(-1);

  React.useEffect(() => {
    if (fields.fields.length > lastIndexRef.current && lastIndexRef.current !== -1) {
      // Small delay to ensure DOM is ready
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
    // Create a new object without the id to avoid RHF conflicts
    const newEntry = { ...entry };
    delete newEntry.id;
    fields.insert(index + 1, newEntry);
  };

  return (
    <FormSection title={label}>
      {fields.fields.length === 0 ? (
        <div className="py-10 text-center border-2 border-dashed border-white/5 rounded-2xl bg-base-100/30">
          <p className="text-slate-500 text-sm italic">No {label.toLowerCase()} added yet.</p>
        </div>
      ) : (
        fields.fields.map((field, index) => (
          <div key={field.id} className="p-4 md:p-6 mb-4 md:mb-6 bg-base-100/50 rounded-2xl relative group border border-white/5 transition-all hover:border-primary/20">
            {/* Action Bar */}
            <div className="flex justify-end gap-2 mb-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200">
              <div className="flex gap-1 bg-base-200/80 backdrop-blur p-1 rounded-xl border border-white/5 shadow-lg">
                <button
                  type="button"
                  onClick={() => fields.move(index, index - 1)}
                  disabled={index === 0}
                  className="btn btn-ghost btn-xs rounded-lg hover:text-primary disabled:opacity-30"
                  title="Move Up"
                >
                  <FaArrowUp />
                </button>
                <button
                  type="button"
                  onClick={() => fields.move(index, index + 1)}
                  disabled={index === fields.fields.length - 1}
                  className="btn btn-ghost btn-xs rounded-lg hover:text-primary disabled:opacity-30"
                  title="Move Down"
                >
                  <FaArrowDown />
                </button>
                <div className="w-px h-4 bg-white/10 self-center mx-1"></div>
                <button
                  type="button"
                  onClick={() => handleDuplicate(index)}
                  className="btn btn-ghost btn-xs rounded-lg hover:text-success"
                  title="Duplicate"
                >
                  <FaCopy />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="btn btn-ghost btn-xs rounded-lg hover:text-error"
                  title="Remove"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

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
        ))
      )}
      <button
        type="button"
        onClick={() => fields.append(keys.reduce((acc, k) => ({...acc, [k]: ""}), {}))}
        className="btn btn-ghost btn-md text-primary hover:bg-primary/5 w-full border-dashed border-2 border-white/5 rounded-2xl transition-all mt-2"
      >
        <FaPlusCircle className="mr-2" /> Add {label}
      </button>
    </FormSection>
  );
});

export default FormSection;
