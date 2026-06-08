import React, { useState } from 'react';
import { FaPlusCircle, FaTrash, FaCopy, FaArrowUp, FaArrowDown } from "react-icons/fa";
import ConfirmModal from './ConfirmModal';

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
  label: "Link Label (Optional - e.g. Portfolio)",
  url: "Link URL *",
  issuer: "Issuing Organization",
  date: "Date Received",
  award: "Award / Achievement Name *",
  organization: "Organization",
};

const FormSection = React.memo(({ title, children, defaultExpanded = true, id }) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  return (
    <div id={id} className={`form-control w-full mb-3 md:mb-4 p-4 md:p-5 bg-base-200/50 rounded-2xl md:rounded-3xl border border-white/5 shadow-lg transition-all hover:border-white/10 ${!isExpanded ? 'pb-4 md:pb-5' : ''} scroll-mt-24 target:ring-2 target:ring-primary/40 target:border-primary/40 transition-shadow duration-500`}>
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

export const RenderFieldArray = React.memo(({ fields, label, name, keys, register, watch, errors, id }) => {
  const allValues = watch(name) || [];
  const lastIndexRef = React.useRef(-1);
  const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, index: null });

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
    if (!hasContent) {
      fields.remove(index);
    } else {
      setConfirmDelete({ isOpen: true, index });
    }
  };

  const confirmRemove = () => {
    if (confirmDelete.index !== null) fields.remove(confirmDelete.index);
    setConfirmDelete({ isOpen: false, index: null });
  };

  const handleDuplicate = (index) => {
    const entry = allValues[index];
    const newEntry = { ...entry };
    delete newEntry.id;
    fields.insert(index + 1, newEntry);
  };

  return (
    <>
      <ConfirmModal 
        isOpen={confirmDelete.isOpen}
        title={`Remove ${label.replace(/s$/, '')}`}
        message={`Are you sure? This action cannot be undone.`}
        onConfirm={confirmRemove}
        onCancel={() => setConfirmDelete({ isOpen: false, index: null })}
        confirmText="Remove"
      />
      <FormSection id={id} title={label}>
      {fields.fields.length === 0 ? (
        <div className="py-6 text-center border border-dashed border-white/10 rounded-2xl bg-base-100/20">
          <p className="text-slate-500 text-xs italic">No {label.toLowerCase()} added yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {fields.fields.map((field, index) => (
            <div key={field.id} className="p-4 md:p-5 bg-base-100/40 rounded-xl relative group border border-white/5 transition-all hover:border-primary/10">
              <div className="flex justify-end gap-1.5 mb-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200">
                <div className="flex items-center gap-1 bg-base-300/90 backdrop-blur px-2 py-1 rounded-lg border border-white/10 shadow-xl">
                  <button type="button" onClick={() => fields.move(index, index - 1)} disabled={index === 0} className="btn btn-ghost btn-xs h-6 w-6 p-0 rounded disabled:opacity-20"><FaArrowUp className="text-[10px]" /></button>
                  <button type="button" onClick={() => fields.move(index, index + 1)} disabled={index === fields.fields.length - 1} className="btn btn-ghost btn-xs h-6 w-6 p-0 rounded disabled:opacity-20"><FaArrowDown className="text-[10px]" /></button>
                  <div className="w-px h-3 bg-white/10 mx-1"></div>
                  <button type="button" onClick={() => handleDuplicate(index)} className="btn btn-ghost btn-xs h-6 w-6 p-0 rounded hover:text-success"><FaCopy className="text-[10px]" /></button>
                  <button type="button" onClick={() => handleRemove(index)} className="btn btn-ghost btn-xs h-6 w-6 p-0 rounded hover:text-error"><FaTrash className="text-[10px]" /></button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {keys.map(key => {
                  const isTextArea = ["responsibility", "description", "summary"].includes(key);    
                  const isFullWidth = ["responsibility", "description", "summary", "technologiesUsed", "skills", "url"].includes(key);
                  const isRequired = labelMap[key]?.includes('*');
                  const error = errors?.[name]?.[index]?.[key];
                  return (
                    <div key={key} className={`form-control ${isFullWidth ? 'md:col-span-2' : ''}`}>
                      <label className={`label-text mb-1.5 text-[9px] font-bold uppercase tracking-widest ml-1 ${error ? 'text-error' : 'text-slate-500'}`}>{labelMap[key] || key}</label>
                      {isTextArea ? (
                        <textarea {...register(`${name}.${index}.${key}`, { required: isRequired ? `${labelMap[key].replace(' *', '')} is required` : false })} className={`textarea textarea-bordered h-24 min-h-[100px] bg-base-100 text-sm leading-relaxed transition-all ${error ? 'border-error ring-1 ring-error/20' : 'border-white/5 focus:border-primary/50'}`} placeholder={`Enter details for ${key}...`} />
                      ) : (
                        <input {...register(`${name}.${index}.${key}`, { required: isRequired ? `${labelMap[key].replace(' *', '')} is required` : false })} className={`input input-bordered h-10 bg-base-100 text-sm transition-all ${error ? 'border-error ring-1 ring-error/20' : 'border-white/5 focus:border-primary/50'}`} placeholder={`e.g. ${labelMap[key]?.replace(' *', '') || key}`} />
                      )}
                      {error && <span className="text-error text-[10px] mt-1 ml-1 font-bold">{error.message}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
      <button type="button" onClick={() => fields.append(keys.reduce((acc, k) => ({...acc, [k]: ""}), {}))} className="btn btn-ghost btn-sm text-primary hover:bg-primary/5 w-full border-dashed border-2 border-white/5 rounded-xl transition-all mt-3 h-10"><FaPlusCircle className="mr-2" /> Add {label.replace(/s$/, '')}</button>
    </FormSection>
  </>
  );
});

export default FormSection;
