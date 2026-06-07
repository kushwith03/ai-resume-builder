import { useState, useEffect, memo } from "react";
import "daisyui";
import { FaFilePdf } from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "./ResumePDF";

const Resume = memo(({ data, hideDownload = false, previewMode = false }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!data) return null;

  const formatUrl = (url) => {
    if (!url) return "";
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  };

  const resumeContent = (
    <div
      className={`bg-white text-black transition-all ${  
        previewMode
          ? "w-full min-h-[297mm] p-[10mm] shadow-none"
          : "w-full max-w-[210mm] min-h-[297mm] mx-auto p-[15mm] border border-gray-200 shadow-sm"
      }`}
      style={{ fontFamily: "'Times New Roman', Times, serif", lineHeight: "1.2" }}
    >
      {/* Header - Optimized Two-Line Layout */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-tight mb-2 text-black">
          {data.personalInformation?.fullName || "Your Name"}
        </h1>
        
        {/* Line 1: Basic Contact */}
        <div className="flex flex-wrap justify-center items-center gap-x-2 text-[10px] text-gray-800">
           {data.personalInformation?.phoneNumber && (
             <span>{data.personalInformation.phoneNumber}</span>
           )}
           {data.personalInformation?.phoneNumber && (data.personalInformation?.email || data.personalInformation?.location) && <span className="text-gray-400">|</span>}
           
           {data.personalInformation?.email && (
             <span className="font-medium">{data.personalInformation.email}</span>
           )}
           {data.personalInformation?.email && data.personalInformation?.location && <span className="text-gray-400">|</span>}

           {data.personalInformation?.location && (
             <span>{data.personalInformation.location}</span>
           )}
        </div>

        {/* Line 2: Flexible Professional Links */}
        {data.socialLinks?.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-x-2 text-[10px] text-gray-800 mt-0.5">
            {data.socialLinks.map((link, i) => (
              <span key={i} className="flex items-center gap-x-2">
                <span className="font-medium">
                  {link.label}: <span className="font-normal">{formatUrl(link.url)}</span>
                </span>
                {i < data.socialLinks.length - 1 && <span className="text-gray-400">|</span>}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Summary Section */}
      {data.summary && (
        <section className="mt-3">
          <h2 className="text-[10px] font-bold uppercase border-b border-black mb-1">Summary</h2>       
          <p className="text-[10px] text-justify leading-snug">{data.summary}</p>
        </section>
      )}

      {/* Technical Skills Section */}
      {data.skills?.length > 0 && (
        <section className="mt-4">
          <h2 className="text-[10px] font-bold uppercase border-b border-black mb-1">Technical Skills</h2>        
          <div className="space-y-0.5">
            {data.skills.map((skillGroup, index) => (
              <div key={index} className="text-[10px]">
                <span className="font-bold">{skillGroup.category || skillGroup.title || "Skills"}: </span>
                <span>{skillGroup.skills || skillGroup.level || ""}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience Section */}
      {data.experience?.length > 0 && (
        <section className="mt-4">
          <h2 className="text-[10px] font-bold uppercase border-b border-black mb-1">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-bold">{exp.jobTitle}</span>
                <span className="text-[9px]">{exp.duration}</span>
              </div>
              <div className="flex justify-between items-baseline italic mb-0.5">
                <span className="text-[9px]">{exp.company}</span>
                <span className="text-[9px]">{exp.location}</span>
              </div>
              <ul className="list-disc list-outside ml-4 text-[10px] leading-tight">
                {exp.responsibility.split('\n').map((line, i) => (
                  line.trim() && <li key={i} className="mb-0.5">{line.trim().replace(/^[-•]\s*/, '')}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education Section */}
      {data.education?.length > 0 && (
        <section className="mt-4">
          <h2 className="text-[10px] font-bold uppercase border-b border-black mb-1">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-bold">{edu.university}</span>
                <span className="text-[9px]">{edu.graduationYear}</span>
              </div>
              <div className="flex justify-between items-baseline italic">
                <span className="text-[9px]">{edu.degree}</span>
                <span className="text-[9px]">{edu.location}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Projects Section */}
      {data.projects?.length > 0 && (
        <section className="mt-4">
          <h2 className="text-[10px] font-bold uppercase border-b border-black mb-1">Projects</h2>
          {data.projects.map((proj, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-bold">{proj.title}</span>
                <span className="text-[9px] italic">{proj.technologiesUsed}</span>
              </div>
              <ul className="list-disc list-outside ml-4 text-[10px] leading-tight mt-0.5">
                {proj.description.split('\n').map((line, i) => (
                  line.trim() && <li key={i} className="mb-0.5">{line.trim().replace(/^[-•]\s*/, '')}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Certifications Section */}
      {data.certifications?.length > 0 && (
        <section className="mt-4">
          <h2 className="text-[10px] font-bold uppercase border-b border-black mb-1">Certifications</h2>
          <div className="space-y-0.5">
            {data.certifications.map((cert, index) => (
              <div key={index} className="flex gap-2 text-[10px]">
                <span>•</span>
                <span>
                  <span className="font-bold">{cert.title}</span>, {cert.issuer} ({cert.date})
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements Section */}
      {data.achievements?.length > 0 && (
        <section className="mt-4">
          <h2 className="text-[10px] font-bold uppercase border-b border-black mb-1">Awards & Achievements</h2>
          <div className="space-y-0.5">
            {data.achievements.map((award, index) => (
              <div key={index} className="flex gap-2 text-[10px]">
                <span>•</span>
                <span>
                  <span className="font-bold">{award.award}</span>, {award.organization} ({award.date})
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Leadership Section */}
      {data.positionsOfResponsibility?.length > 0 && (
        <section className="mt-4">
          <h2 className="text-[10px] font-bold uppercase border-b border-black mb-1">Leadership & Responsibility</h2>
          {data.positionsOfResponsibility.map((pos, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-bold">{pos.title}</span>
                <span className="text-[9px]">{pos.duration}</span>
              </div>
              <div className="text-[9px] italic mb-0.5">{pos.organization}</div>
              <div className="flex gap-2 text-[10px]">
                <span>•</span>
                <p className="text-[10px] leading-tight flex-1 text-justify">{pos.description}</p>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );

  if (previewMode) return resumeContent;

  return (
    <div className="flex flex-col items-center w-full px-4">
      {resumeContent}
      {!hideDownload && (
        <div className="mt-8 mb-16 w-full flex justify-center relative z-[60]">
          {isClient ? (
            <PDFDownloadLink
              key={JSON.stringify(data)}
              document={<ResumePDF data={data} />}
              fileName={`${data.personalInformation?.fullName || 'Resume'}.pdf`}
              className="btn btn-primary btn-wide shadow-xl relative z-[70]"
            >
              {({ loading, error }) => (
                <>
                  <FaFilePdf className={loading ? "animate-pulse" : ""} />
                  {loading ? "Generating PDF..." : "Download Professional PDF"}
                </>
              )}
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
