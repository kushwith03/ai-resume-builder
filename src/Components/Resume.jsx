import React, { useState, useEffect } from "react";
import "daisyui";
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFilePdf } from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "./ResumePDF";

const Resume = React.memo(({ data, hideDownload = false, previewMode = false }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!data) return null;

  const formatUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  const resumeContent = (
    <div
      className={`bg-white text-gray-800 shadow-2xl border border-gray-100 transition-all ${  
        previewMode
          ? "w-full aspect-[1/1.414] p-[9%] h-fit"
          : "w-full max-w-[210mm] md:min-h-[297mm] min-h-0 mx-auto p-6 md:p-[20mm] mb-4 md:mb-0"
      }`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header */}
      <div className={`text-center ${previewMode ? 'space-y-1' : 'space-y-3'}`}>
        <h1 className={`${previewMode ? 'text-2xl' : 'text-3xl md:text-5xl'} font-black text-gray-900 tracking-tight`}>
          {data.personalInformation?.fullName || "Your Name"}
        </h1>
        <div className={`flex justify-center flex-wrap gap-x-4 gap-y-1 ${previewMode ? 'text-[10px]' : 'text-xs md:text-sm'} font-medium text-gray-600`}>
          {data.personalInformation?.location && (
            <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-primary" /> {data.personalInformation.location}</span>
          )}
          {data.personalInformation?.email && (
            <a href={`mailto:${data.personalInformation.email}`} className="flex items-center gap-1 hover:text-primary transition-colors text-wrap break-all">
              <FaEnvelope className="text-primary flex-shrink-0" /> {data.personalInformation.email}
            </a>
          )}
          {data.personalInformation?.phoneNumber && (
            <span className="flex items-center gap-1"><FaPhone className="text-primary" /> {data.personalInformation.phoneNumber}</span>
          )}
        </div>
        <div className={`flex justify-center gap-4 ${previewMode ? 'text-[9px]' : 'text-xs'} mt-1`}>
           {data.personalInformation?.linkedin && (
              <a href={formatUrl(data.personalInformation.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 font-bold hover:underline"> 
                <FaLinkedin /> LinkedIn
              </a>
           )}
           {data.personalInformation?.gitHub && (
              <a href={formatUrl(data.personalInformation.gitHub)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-900 font-bold hover:underline">   
                <FaGithub /> GitHub
              </a>
           )}
        </div>
      </div>

      <div className={`h-px bg-gray-200 ${previewMode ? 'my-4' : 'my-6'}`}></div>

      {/* Summary */}
      <section className={`${previewMode ? 'space-y-1' : 'space-y-2'}`}>
        <h2 className={`${previewMode ? 'text-xs' : 'text-lg'} font-bold text-primary uppercase tracking-widest border-b-2 border-primary/20 inline-block`}>Professional Summary</h2>       
        <p className={`${previewMode ? 'text-[10px]' : 'text-sm'} leading-relaxed text-gray-700`}>{data.summary}</p>
      </section>

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section className={`${previewMode ? 'space-y-2 mt-4' : 'space-y-4 mt-8'}`}>
          <h2 className={`${previewMode ? 'text-xs' : 'text-lg'} font-bold text-primary uppercase tracking-widest border-b-2 border-primary/20 inline-block`}>Core Competencies</h2>        
          <div className={`flex flex-col ${previewMode ? 'gap-2' : 'gap-3'}`}>
            {data.skills.map((skillGroup, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <span className={`${previewMode ? 'text-[10px]' : 'text-sm'} font-bold text-gray-800 sm:min-w-[140px]`}>
                  {skillGroup.category || skillGroup.title || "Skills"}:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(skillGroup.skills || skillGroup.level || "").split(",").map((skill, sIndex) => (
                    skill.trim() && (
                      <span key={sIndex} className={`px-2 py-0.5 bg-gray-50 text-gray-600 border border-gray-200 rounded-md ${previewMode ? 'text-[9px]' : 'text-xs'} font-medium`}>        
                        {skill.trim()}
                      </span>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className={`${previewMode ? 'space-y-2 mt-3' : 'space-y-4 mt-6'}`}>
          <h2 className={`${previewMode ? 'text-xs' : 'text-lg'} font-bold text-primary uppercase tracking-widest border-b-2 border-primary/20 inline-block`}>Work Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="space-y-0.5">
              <div className="flex justify-between items-baseline">
                <h3 className={`${previewMode ? 'text-[11px]' : 'text-sm md:text-md'} font-bold text-gray-900`}>{exp.jobTitle}</h3>
                <span className={`${previewMode ? 'text-[9px]' : 'text-xs'} font-bold text-gray-500`}>{exp.duration}</span>
              </div>
              <div className={`flex justify-between items-baseline ${previewMode ? 'text-[9px]' : 'text-xs'} text-gray-600 italic`}>
                <span>{exp.company}</span>
                <span>{exp.location}</span>
              </div>
              <p className={`${previewMode ? 'text-[10px]' : 'text-sm'} text-gray-700 mt-1 whitespace-pre-line`}>{exp.responsibility}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className={`${previewMode ? 'space-y-2 mt-3' : 'space-y-4 mt-6'}`}>
          <h2 className={`${previewMode ? 'text-xs' : 'text-lg'} font-bold text-primary uppercase tracking-widest border-b-2 border-primary/20 inline-block`}>Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="space-y-0.5">
              <div className="flex justify-between items-baseline">
                <h3 className={`${previewMode ? 'text-[11px]' : 'text-sm md:text-md'} font-bold text-gray-900`}>{edu.degree}</h3>
                <span className={`${previewMode ? 'text-[9px]' : 'text-xs'} font-bold text-gray-500`}>{edu.graduationYear}</span>
              </div>
              <div className={`flex justify-between items-baseline ${previewMode ? 'text-[9px]' : 'text-xs'} text-gray-600 italic`}>
                <span>{edu.university}</span>
                <span>{edu.location}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <section className={`${previewMode ? 'space-y-2 mt-3' : 'space-y-4 mt-6'}`}>
          <h2 className={`${previewMode ? 'text-xs' : 'text-lg'} font-bold text-primary uppercase tracking-widest border-b-2 border-primary/20 inline-block`}>Key Projects</h2>
          {data.projects.map((proj, index) => (
            <div key={index} className="space-y-0.5">
              <h3 className={`${previewMode ? 'text-[11px]' : 'text-sm md:text-md'} font-bold text-gray-900`}>{proj.title}</h3>
              <p className={`${previewMode ? 'text-[10px]' : 'text-sm'} text-gray-700`}>{proj.description}</p>
              {proj.technologiesUsed && (
                <p className={`${previewMode ? 'text-[9px]' : 'text-xs'} font-medium text-gray-500 italic`}>
                  Tech: {proj.technologiesUsed}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );

  if (previewMode) return resumeContent;

  const downloadKey = isClient ? JSON.stringify({
    name: data.personalInformation?.fullName,
    skillCount: data.skills?.length,
    expCount: data.experience?.length,
    eduCount: data.education?.length,
    projCount: data.projects?.length,
    summaryLen: data.summary?.length
  }) : "loading";

  return (
    <div className="flex flex-col items-center w-full px-4">
      {resumeContent}
      {!hideDownload && (
        <div className="mt-8 mb-16 w-full flex justify-center relative z-[60]">
          {isClient ? (
            <PDFDownloadLink
              key={downloadKey}
              document={<ResumePDF data={data} />}
              fileName={`${data.personalInformation?.fullName || 'Resume'}.pdf`}
              className="btn btn-primary btn-wide shadow-xl relative z-[70]"
            >
              {({ blob, url, loading, error }) => {
                if (error) {
                  console.error("PDF generation error:", error);
                  return (
                    <div className="flex items-center gap-2 text-error font-bold">
                      <FaFilePdf />
                      <span>Export Failed</span>
                    </div>
                  );
                }
                return (
                  <>
                    <FaFilePdf className={loading ? "animate-pulse" : ""} />
                    {loading ? "Generating PDF..." : "Download ATS-Friendly PDF"}
                  </>
                );
              }}
            </PDFDownloadLink>
          ) : (
            <button className="btn btn-primary btn-wide opacity-50 cursor-not-allowed">       
               <FaFilePdf className="animate-pulse" />
               Initializing...
            </button>
          )}
        </div>
      )}
    </div>
  );
});

export default Resume;
