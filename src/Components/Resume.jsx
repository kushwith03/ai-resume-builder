import { useState, useEffect, memo } from "react";
import "daisyui";
import { FaGithub, FaLinkedin, FaGlobe, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFilePdf } from "react-icons/fa";
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
    return url.startsWith("http") ? url : `https://${url}`;
  };

  const resumeContent = (
    <div
      className={`bg-white text-gray-900 transition-all ${  
        previewMode
          ? "w-full aspect-[1/1.414] p-[5%] h-fit"
          : "w-full max-w-[210mm] md:min-h-[297mm] min-h-0 mx-auto p-6 md:p-[15mm] mb-4 md:mb-0 border border-gray-200 shadow-sm"
      }`}
      style={{ fontFamily: "'Times New Roman', Times, serif", lineHeight: "1.2" }}
    >
      {/* Header - Inspired by resume.tex */}
      <div className="text-center">
        <h1 className={`${previewMode ? 'text-xl' : 'text-3xl'} font-bold uppercase tracking-tight mb-1`}>
          {data.personalInformation?.fullName || "Your Name"}
        </h1>
        <div className={`flex flex-wrap justify-center items-center gap-x-2 gap-y-0.5 ${previewMode ? 'text-[9px]' : 'text-sm'} text-gray-700`}>
          {data.personalInformation?.phoneNumber && (
             <span>{data.personalInformation.phoneNumber}</span>
          )}
          {data.personalInformation?.phoneNumber && (data.personalInformation?.email || data.personalInformation?.location) && <span className="opacity-50">|</span>}
          
          {data.personalInformation?.email && (
            <a href={`mailto:${data.personalInformation.email}`} className="hover:underline underline-offset-2">
              {data.personalInformation.email}
            </a>
          )}
          {data.personalInformation?.email && (data.personalInformation?.location || data.personalInformation?.linkedin) && <span className="opacity-50">|</span>}

          {data.personalInformation?.location && (
            <span>{data.personalInformation.location}</span>
          )}
          {data.personalInformation?.location && (data.personalInformation?.linkedin || data.personalInformation?.gitHub) && <span className="opacity-50">|</span>}
          
          {data.personalInformation?.linkedin && (
             <a href={formatUrl(data.personalInformation.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2">
               linkedin.com/in/{data.personalInformation.linkedin.split('/').pop()}
             </a>
          )}
          {data.personalInformation?.linkedin && (data.personalInformation?.gitHub || data.personalInformation?.portfolio) && <span className="opacity-50">|</span>}

          {data.personalInformation?.gitHub && (
             <a href={formatUrl(data.personalInformation.gitHub)} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2">
               github.com/{data.personalInformation.gitHub.split('/').pop()}
             </a>
          )}
          {data.personalInformation?.gitHub && data.personalInformation?.portfolio && <span className="opacity-50">|</span>}

          {data.personalInformation?.portfolio && (
             <a href={formatUrl(data.personalInformation.portfolio)} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2">
               {data.personalInformation.portfolio.replace(/^https?:\/\//, '')}
             </a>
          )}
        </div>
      </div>

      {/* Summary Section */}
      {data.summary && (
        <section className={`${previewMode ? 'mt-3' : 'mt-5'}`}>
          <h2 className={`${previewMode ? 'text-[10px]' : 'text-sm'} font-bold uppercase border-b border-black mb-1`}>Summary</h2>       
          <p className={`${previewMode ? 'text-[9px]' : 'text-xs'} text-justify leading-normal`}>{data.summary}</p>
        </section>
      )}

      {/* Education Section */}
      {data.education?.length > 0 && (
        <section className={`${previewMode ? 'mt-3' : 'mt-5'}`}>
          <h2 className={`${previewMode ? 'text-[10px]' : 'text-sm'} font-bold uppercase border-b border-black mb-1`}>Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className={`${previewMode ? 'mb-1' : 'mb-2'}`}>
              <div className="flex justify-between items-baseline">
                <span className={`${previewMode ? 'text-[10px]' : 'text-sm'} font-bold`}>{edu.university}</span>
                <span className={`${previewMode ? 'text-[9px]' : 'text-xs'}`}>{edu.location}</span>
              </div>
              <div className="flex justify-between items-baseline italic">
                <span className={`${previewMode ? 'text-[9px]' : 'text-xs'}`}>{edu.degree}</span>
                <span className={`${previewMode ? 'text-[9px]' : 'text-xs'}`}>{edu.graduationYear}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills Section */}
      {data.skills?.length > 0 && (
        <section className={`${previewMode ? 'mt-3' : 'mt-5'}`}>
          <h2 className={`${previewMode ? 'text-[10px]' : 'text-sm'} font-bold uppercase border-b border-black mb-1`}>Technical Skills</h2>        
          <div className="space-y-0.5">
            {data.skills.map((skillGroup, index) => (
              <div key={index} className={`${previewMode ? 'text-[9px]' : 'text-xs'}`}>
                <span className="font-bold">{skillGroup.category || skillGroup.title || "Skills"}: </span>
                <span>{skillGroup.skills || skillGroup.level || ""}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience Section */}
      {data.experience?.length > 0 && (
        <section className={`${previewMode ? 'mt-3' : 'mt-5'}`}>
          <h2 className={`${previewMode ? 'text-[10px]' : 'text-sm'} font-bold uppercase border-b border-black mb-1`}>Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className={`${previewMode ? 'mb-2' : 'mb-3'}`}>
              <div className="flex justify-between items-baseline">
                <span className={`${previewMode ? 'text-[10px]' : 'text-sm'} font-bold`}>{exp.jobTitle}</span>
                <span className={`${previewMode ? 'text-[9px]' : 'text-xs'}`}>{exp.duration}</span>
              </div>
              <div className="flex justify-between items-baseline italic mb-0.5">
                <span className={`${previewMode ? 'text-[9px]' : 'text-xs'}`}>{exp.company}</span>
                <span className={`${previewMode ? 'text-[9px]' : 'text-xs'}`}>{exp.location}</span>
              </div>
              <ul className={`list-disc list-inside ${previewMode ? 'text-[9px]' : 'text-xs'} leading-tight`}>
                {exp.responsibility.split('\n').map((line, i) => (
                  line.trim() && <li key={i} className="pl-1 -indent-4 ml-4 mb-0.5">{line.trim().replace(/^[-•]\s*/, '')}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Projects Section */}
      {data.projects?.length > 0 && (
        <section className={`${previewMode ? 'mt-3' : 'mt-5'}`}>
          <h2 className={`${previewMode ? 'text-[10px]' : 'text-sm'} font-bold uppercase border-b border-black mb-1`}>Projects</h2>
          {data.projects.map((proj, index) => (
            <div key={index} className={`${previewMode ? 'mb-2' : 'mb-3'}`}>
              <div className="flex justify-between items-baseline">
                <span className={`${previewMode ? 'text-[10px]' : 'text-sm'} font-bold`}>{proj.title}</span>
                <span className={`${previewMode ? 'text-[9px]' : 'text-xs'} italic`}>{proj.technologiesUsed}</span>
              </div>
              <ul className={`list-disc list-inside ${previewMode ? 'text-[9px]' : 'text-xs'} leading-tight mt-0.5`}>
                {proj.description.split('\n').map((line, i) => (
                  line.trim() && <li key={i} className="pl-1 -indent-4 ml-4 mb-0.5">{line.trim().replace(/^[-•]\s*/, '')}</li>
                ))}
              </ul>
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
