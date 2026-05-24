import React from "react";
import "daisyui";
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFilePdf } from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "./ResumePDF";

const Resume = React.memo(({ data, hideDownload = false, previewMode = false }) => {
  if (!data) return null;

  const formatUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  const resumeContent = (
    <div
      className={`bg-white text-gray-800 shadow-lg border border-gray-200 transition-all ${
        previewMode 
          ? "w-full aspect-[1/1.414] p-[8%] h-fit" 
          : "w-full max-w-[210mm] min-h-[297mm] mx-auto p-6 md:p-[20mm]"
      }`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header */}
      <div className={`text-center ${previewMode ? 'space-y-1' : 'space-y-3'}`}>
        <h1 className={`${previewMode ? 'text-2xl' : 'text-4xl md:text-5xl'} font-black text-gray-900 tracking-tight`}>
          {data.personalInformation?.fullName}
        </h1>
        <div className={`flex justify-center flex-wrap gap-x-4 gap-y-1 ${previewMode ? 'text-[10px]' : 'text-sm'} font-medium text-gray-600`}>
          {data.personalInformation?.location && (
            <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-primary" /> {data.personalInformation.location}</span>
          )}
          {data.personalInformation?.email && (
            <span className="flex items-center gap-1"><FaEnvelope className="text-primary" /> {data.personalInformation.email}</span>
          )}
          {data.personalInformation?.phoneNumber && (
            <span className="flex items-center gap-1"><FaPhone className="text-primary" /> {data.personalInformation.phoneNumber}</span>
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
        <section className={`${previewMode ? 'space-y-1 mt-3' : 'space-y-3 mt-6'}`}>
          <h2 className={`${previewMode ? 'text-xs' : 'text-lg'} font-bold text-primary uppercase tracking-widest border-b-2 border-primary/20 inline-block`}>Core Competencies</h2>
          <div className="flex flex-wrap gap-1">
            {data.skills.map((skill, index) => (
              <span key={index} className={`px-2 py-0.5 bg-gray-100 text-gray-700 rounded ${previewMode ? 'text-[9px]' : 'text-xs'} font-semibold`}>
                {skill.title} • {skill.level}
              </span>
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
                <h3 className={`${previewMode ? 'text-[11px]' : 'text-md'} font-bold text-gray-900`}>{exp.jobTitle}</h3>
                <span className={`${previewMode ? 'text-[9px]' : 'text-xs'} font-bold text-gray-500`}>{exp.duration}</span>
              </div>
              <div className={`flex justify-between items-baseline ${previewMode ? 'text-[9px]' : 'text-xs'} text-gray-600 italic`}>
                <span>{exp.company}</span>
                <span>{exp.location}</span>
              </div>
              <p className={`${previewMode ? 'text-[10px]' : 'text-sm'} text-gray-700 mt-0.5 whitespace-pre-line`}>{exp.responsibility}</p>
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
                <h3 className={`${previewMode ? 'text-[11px]' : 'text-md'} font-bold text-gray-900`}>{edu.degree}</h3>
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
              <h3 className={`${previewMode ? 'text-[11px]' : 'text-md'} font-bold text-gray-900`}>{proj.title}</h3>
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

  return (
    <div className="flex flex-col items-center">
      {resumeContent}
      {!hideDownload && (
        <div className="mt-8 mb-12">
          <PDFDownloadLink
            document={<ResumePDF data={data} />}
            fileName={`${data.personalInformation?.fullName || 'Resume'}.pdf`}
            className="btn btn-primary btn-wide shadow-xl"
          >
            {({ loading }) => (
              <>
                <FaFilePdf className="mr-2" />
                {loading ? "Preparing PDF..." : "Download ATS-Friendly PDF"}
              </>
            )}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
});

export default Resume;
