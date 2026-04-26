import React from 'react';
import { FaPlusCircle } from "react-icons/fa";

const FormSection = React.memo(({ title, children }) => (
  <div className="form-control w-full mb-8 p-6 bg-base-100 rounded-2xl border border-base-300 shadow-sm transition-all hover:shadow-md">
    <h3 className="text-xl font-bold mb-6 text-primary flex items-center gap-2 border-b border-base-200 pb-3">
      {title}
    </h3>
    {children}
  </div>
));

export const RenderFieldArray = React.memo(({ fields, label, name, keys, register }) => (
  <FormSection title={label}>
    {fields.fields.map((field, index) => (
      <div key={field.id} className="p-5 mb-5 bg-base-200 rounded-xl relative group border border-base-300">
        <button 
          type="button" 
          onClick={() => fields.remove(index)}
          className="absolute top-3 right-3 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100 transition-all duration-200"
        >
          ✕
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {keys.map(key => (
            <div key={key} className="form-control">
              <label className="label-text mb-2 text-xs font-semibold uppercase opacity-70">{key}</label>
              <input 
                {...register(`${name}.${index}.${key}`)} 
                className="input input-bordered input-md bg-base-100 focus:ring-2 focus:ring-primary/20" 
              />
            </div>
          ))}
        </div>
      </div>
    ))}
    <button 
      type="button" 
      onClick={() => fields.append(keys.reduce((acc, k) => ({...acc, [k]: ""}), {}))}
      className="btn btn-ghost btn-md text-primary hover:bg-primary/5 w-full border-dashed border-2 border-base-300"
    >
      <FaPlusCircle className="mr-2" /> Add {label}
    </button>
  </FormSection>
));

export default FormSection;
