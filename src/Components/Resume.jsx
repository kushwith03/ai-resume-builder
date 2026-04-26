import React from "react";
import "daisyui";
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFilePdf } from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "./ResumePDF";

const Resume = React.memo(({ data }) => {
  if (!data) return null;

  const formatUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full max-w-[210mm] min-h-[297mm] mx-auto shadow-2xl p-6 md:p-[20mm] space-y-6 bg-white text-gray-800 border border-gray-100"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            {data.personalInformation?.fullName}
          </h1>
          <div className="flex justify-center flex-wrap gap-4 text-sm font-medium text-gray-600">
            {data.personalInformation?.location && (
              <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-primary" /> {data.personalInformation.location}</span>
            )}
            {data.personalInformation?.email && (
              <a href={`mailto:${data.personalInformation.email}`} className="flex items-center gap-1 hover:text-primary transition-colors">
                <FaEnvelope className="text-primary" /> {data.personalInformation.email}
              </a>
            )}
            {data.personalInformation?.phoneNumber && (
              <span className="flex items-center gap-1"><FaPhone className="text-primary" /> {data.personalInformation.phoneNumber}</span>
            )}
          </div>
          <div className="flex justify-center gap-4 text-xs">
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

        <div className="h-px bg-gray-200"></div>

        {/* Summary */}
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-primary uppercase tracking-widest border-b-2 border-primary/20 inline-block">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </section>

        {/* Skills */}
        {data.skills?.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-primary uppercase tracking-widest border-b-2 border-primary/20 inline-block">Core Competencies</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold">
                  {skill.title} • {skill.level}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-primary uppercase tracking-widest border-b-2 border-primary/20 inline-block">Work Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-bold text-gray-900">{exp.jobTitle}</h3>
                  <span className="text-xs font-bold text-gray-500">{exp.duration}</span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-gray-600 italic">
                  <span>{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">{exp.responsibility}</p>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-primary uppercase tracking-widest border-b-2 border-primary/20 inline-block">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-bold text-gray-900">{edu.degree}</h3>
                  <span className="text-xs font-bold text-gray-500">{edu.graduationYear}</span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-gray-600 italic">
                  <span>{edu.university}</span>
                  <span>{edu.location}</span>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-primary uppercase tracking-widest border-b-2 border-primary/20 inline-block">Key Projects</h2>
            {data.projects.map((proj, index) => (
              <div key={index} className="space-y-1">
                <h3 className="text-md font-bold text-gray-900">{proj.title}</h3>
                <p className="text-sm text-gray-700">{proj.description}</p>
                {proj.technologiesUsed && (
                  <p className="text-xs font-medium text-gray-500 italic">
                    Tech: {proj.technologiesUsed}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}
      </div>

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
    </div>
  );
});

export default Resume;

export default Resume;
