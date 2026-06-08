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

  const getInferredLabel = (url, customLabel) => {
    if (customLabel && customLabel.trim()) return customLabel;
    if (!url) return "Link";
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('linkedin.com')) return 'LinkedIn';
    if (lowerUrl.includes('github.com')) return 'GitHub';
    if (lowerUrl.includes('portfolio') || lowerUrl.includes('personal') || lowerUrl.includes('website')) return 'Portfolio';
    return 'Link';
  };

  const resumeContent = (
    <div
      className={`bg-white text-black transition-all ${  
        previewMode
          ? "w-full aspect-[1/1.4142] p-[8mm] shadow-none"
          : "w-full max-w-[210mm] min-h-[297mm] mx-auto p-[12mm] border border-gray-200 shadow-sm"
      }`}
      style={{ fontFamily: "'Times New Roman', Times, serif", lineHeight: "1.15" }}
    >
      {/* Header - Compact ATS Style */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold uppercase tracking-tight mb-1 text-black">
          {data.personalInformation?.fullName || "Your Name"}
        </h1>
        
        <div className="flex flex-wrap justify-center items-center gap-x-1.5 text-[9px] text-gray-800">
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

        {data.socialLinks?.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-x-1.5 text-[9px] text-gray-800 mt-0.5">
            {data.socialLinks.map((link, i) => (
              <span key={i} className="flex items-center gap-x-1.5">
                <span className="font-medium">
                  {getInferredLabel(link.url, link.label)}: <span className="font-normal">{formatUrl(link.url)}</span>
                </span>
                {i < data.socialLinks.length - 1 && <span className="text-gray-400">|</span>}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Summary Section */}
      {data.summary && (
        <section className="mt-2">
          <h2 className="text-[9px] font-bold uppercase border-b border-black mb-0.5">Summary</h2>       
          <p className="text-[9px] text-justify leading-tight">{data.summary}</p>
        </section>
      )}

      {/* Technical Skills Section */}
      {data.skills?.length > 0 && (
        <section className="mt-3">
          <h2 className="text-[9px] font-bold uppercase border-b border-black mb-0.5">Technical Skills</h2>        
          <div className="space-y-0">
            {data.skills.map((skillGroup, index) => (
              <div key={index} className="text-[9px]">
                <span className="font-bold">{skillGroup.category || skillGroup.title || "Skills"}: </span>
                <span>{skillGroup.skills || skillGroup.level || ""}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience Section */}
      {data.experience?.length > 0 && (
        <section className="mt-3">
          <h2 className="text-[9px] font-bold uppercase border-b border-black mb-0.5">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[9px] font-bold">{exp.jobTitle}</span>
                <span className="text-[8px]">{exp.duration}</span>
              </div>
              <div className="flex justify-between items-baseline italic mb-0">
                <span className="text-[8px]">{exp.company}</span>
                <span className="text-[8px]">{exp.location}</span>
              </div>
              <ul className="list-disc list-outside ml-3 text-[9px] leading-tight">
                {exp.responsibility.split('\n').map((line, i) => (
                  line.trim() && <li key={i} className="mb-0">{line.trim().replace(/^[-•]\s*/, '')}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education Section */}
      {data.education?.length > 0 && (
        <section className="mt-3">
          <h2 className="text-[9px] font-bold uppercase border-b border-black mb-0.5">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-1.5">
              <div className="flex justify-between items-baseline">
                <span className="text-[9px] font-bold">{edu.university}</span>
                <span className="text-[8px]">{edu.graduationYear}</span>
              </div>
              <div className="flex justify-between items-baseline italic">
                <span className="text-[8px]">{edu.degree}</span>
                <span className="text-[8px]">{edu.location}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Projects Section */}
      {data.projects?.length > 0 && (
        <section className="mt-3">
          <h2 className="text-[9px] font-bold uppercase border-b border-black mb-0.5">Projects</h2>
          {data.projects.map((proj, index) => (
            <div key={index} className="mb-1.5">
              <div className="flex justify-between items-baseline">
                <span className="text-[9px] font-bold">{proj.title}</span>
                <span className="text-[8px] italic">{proj.technologiesUsed}</span>
              </div>
              <ul className="list-disc list-outside ml-3 text-[9px] leading-tight mt-0">
                {proj.description.split('\n').map((line, i) => (
                  line.trim() && <li key={i} className="mb-0">{line.trim().replace(/^[-•]\s*/, '')}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Certifications Section */}
      {data.certifications?.length > 0 && (
        <section className="mt-3">
          <h2 className="text-[9px] font-bold uppercase border-b border-black mb-0.5">Certifications</h2>
          <div className="space-y-0">
            {data.certifications.map((cert, index) => (
              <div key={index} className="flex gap-1 text-[9px]">
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
        <section className="mt-3">
          <h2 className="text-[9px] font-bold uppercase border-b border-black mb-0.5">Awards & Achievements</h2>
          <div className="space-y-0">
            {data.achievements.map((award, index) => (
              <div key={index} className="flex gap-1 text-[9px]">
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
        <section className="mt-3">
          <h2 className="text-[9px] font-bold uppercase border-b border-black mb-0.5">Leadership & Responsibility</h2>
          {data.positionsOfResponsibility.map((pos, index) => (
            <div key={index} className="mb-1.5">
              <div className="flex justify-between items-baseline">
                <span className="text-[9px] font-bold">{pos.title}</span>
                <span className="text-[8px]">{pos.duration}</span>
              </div>
              <div className="text-[8px] italic mb-0">{pos.organization}</div>
              <div className="flex gap-1 text-[9px]">
                <span>•</span>
                <p className="text-[9px] leading-tight flex-1 text-justify">{pos.description}</p>
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
