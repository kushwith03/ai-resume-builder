import { useState, useEffect, memo } from "react";
import "daisyui";
import { FaFilePdf } from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "./ResumePDF";

/**
 * Resume Component - Canonical rendering for Web Preview.
 * Matches ResumePDF.jsx exactly in dimensions, spacing, and typography.
 */
import { formatUrl, getInferredLabel } from "../utils/resumeHelpers";

const Resume = memo(({ data, hideDownload = false, previewMode = false }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!data) return null;

  // PDF-to-Web Style Mapping (1pt = 1.333px at 96dpi)
  const styles = {
    page: {
      width: "210mm",
      minHeight: "297mm",
      padding: "0.33in", // Exact match to PDF (24pt)
      backgroundColor: "#fff",
      color: "#000",
      fontFamily: "'Times New Roman', Times, serif",
      fontSize: "10pt",
      lineHeight: "1.15",
    },
    h1: { fontSize: "22pt", fontWeight: "bold", marginBottom: "8pt", textAlign: "center", textTransform: "uppercase" },
    contact: { fontSize: "9pt", marginBottom: "4pt", textAlign: "center", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8pt" },
    social: { fontSize: "9pt", marginTop: "2pt", marginBottom: "4pt", textAlign: "center", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8pt" },
    section: { marginTop: "8pt", marginBottom: "4pt" },
    sectionTitle: { fontSize: "10pt", fontWeight: "bold", textTransform: "uppercase", borderBottom: "0.5pt solid #000", marginBottom: "4pt", paddingBottom: "1pt" },
    itemHeader: { display: "flex", justifyContent: "space-between", fontWeight: "bold", marginBottom: "1pt" },
    itemSubHeader: { display: "flex", justifyContent: "space-between", fontStyle: "italic", marginBottom: "2pt", fontSize: "9pt" },
    bulletList: { paddingLeft: "10pt", listStyleType: "none", margin: 0 },
    bulletItem: { display: "flex", marginBottom: "1pt", fontSize: "10pt" },
    bulletIcon: { width: "10pt", flexShrink: 0 },
    text: { fontSize: "10pt", textAlign: "justify", lineHeight: "1.15" },
    skillRow: { display: "flex", marginBottom: "2pt", fontSize: "10pt" },
    skillLabel: { fontWeight: "bold", marginRight: "4pt" }
  };

  const resumeContent = (
    <div style={styles.page} className="shadow-2xl mx-auto origin-top transition-transform duration-300">
      {/* Header */}
      <div style={{ textAlign: "center" }}>
        <h1 style={styles.h1}>{data.personalInformation?.fullName || "Your Name"}</h1>
        
        <div style={styles.contact}>
          {data.personalInformation?.phoneNumber && <span>{data.personalInformation.phoneNumber}</span>}
          {data.personalInformation?.phoneNumber && (data.personalInformation?.email || data.personalInformation?.location) && <span style={{ color: "#666" }}>|</span>}
          {data.personalInformation?.email && <span style={{ fontWeight: "bold" }}>{data.personalInformation.email}</span>}
          {data.personalInformation?.email && data.personalInformation?.location && <span style={{ color: "#666" }}>|</span>}
          {data.personalInformation?.location && <span>{data.personalInformation.location}</span>}
        </div>

        {data.socialLinks?.length > 0 && (
          <div style={styles.social}>
            {data.socialLinks.map((link, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "4pt" }}>
                <span style={{ fontWeight: "bold" }}>{getInferredLabel(link.url, link.label)}:</span>
                <span>{formatUrl(link.url)}</span>
                {i < data.socialLinks.length - 1 && <span style={{ color: "#666", marginLeft: "4pt" }}>|</span>}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Summary Section */}
      {data.summary && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Summary</h2>
          <p style={styles.text}>{data.summary}</p>
        </section>
      )}

      {/* Technical Skills Section */}
      {data.skills?.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Technical Skills</h2>
          {data.skills.map((group, i) => (
            <div key={i} style={styles.skillRow}>
              <span style={styles.skillLabel}>{group.category || group.title || "Skills"}:</span>
              <span>{group.skills || group.level || ""}</span>
            </div>
          ))}
        </section>
      )}

      {/* Experience Section */}
      {data.experience?.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "6pt" }}>
              <div style={styles.itemHeader}>
                <span>{exp.jobTitle}</span>
                <span style={{ fontWeight: "normal", fontSize: "9pt" }}>{exp.duration}</span>
              </div>
              <div style={styles.itemSubHeader}>
                <span>{exp.company}</span>
                <span>{exp.location}</span>
              </div>
              <ul style={styles.bulletList}>
                {exp.responsibility.split('\n').map((line, li) => (
                  line.trim() && (
                    <li key={li} style={styles.bulletItem}>
                      <span style={styles.bulletIcon}>•</span>
                      <span>{line.trim().replace(/^[-•]\s*/, '')}</span>
                    </li>
                  )
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education Section */}
      {data.education?.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "4pt" }}>
              <div style={styles.itemHeader}>
                <span>{edu.university}</span>
                <span style={{ fontWeight: "normal", fontSize: "9pt" }}>{edu.graduationYear}</span>
              </div>
              <div style={styles.itemSubHeader}>
                <span>{edu.degree}</span>
                <span>{edu.location}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Projects Section */}
      {data.projects?.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Projects</h2>
          {data.projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: "6pt" }}>
              <div style={styles.itemHeader}>
                <span>{proj.title}</span>
                <span style={{ fontWeight: "normal", fontStyle: "italic", fontSize: "9pt" }}>{proj.technologiesUsed}</span>
              </div>
              <ul style={styles.bulletList}>
                {proj.description.split('\n').map((line, li) => (
                  line.trim() && (
                    <li key={li} style={styles.bulletItem}>
                      <span style={styles.bulletIcon}>•</span>
                      <span>{line.trim().replace(/^[-•]\s*/, '')}</span>
                    </li>
                  )
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Certifications Section */}
      {data.certifications?.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Certifications</h2>
          {data.certifications.map((cert, i) => (
            <div key={i} style={styles.bulletItem}>
              <span style={styles.bulletIcon}>•</span>
              <span>
                <span style={{ fontWeight: "bold" }}>{cert.title}</span>, {cert.issuer} ({cert.date})
              </span>
            </div>
          ))}
        </section>
      )}

      {/* Achievements Section */}
      {data.achievements?.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Awards & Achievements</h2>
          {data.achievements.map((award, i) => (
            <div key={i} style={styles.bulletItem}>
              <span style={styles.bulletIcon}>•</span>
              <span>
                <span style={{ fontWeight: "bold" }}>{award.award}</span>, {award.organization} ({award.date})
              </span>
            </div>
          ))}
        </section>
      )}

      {/* Leadership Section */}
      {data.positionsOfResponsibility?.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Leadership & Responsibility</h2>
          {data.positionsOfResponsibility.map((pos, i) => (
            <div key={i} style={{ marginBottom: "6pt" }}>
              <div style={styles.itemHeader}>
                <span>{pos.title}</span>
                <span style={{ fontWeight: "normal", fontSize: "9pt" }}>{pos.duration}</span>
              </div>
              <div style={{ fontStyle: "italic", fontSize: "9pt", marginBottom: "2pt" }}>{pos.organization}</div>
              <div style={styles.bulletItem}>
                <span style={styles.bulletIcon}>•</span>
                <span>{pos.description}</span>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full overflow-hidden">
      {resumeContent}
      {!hideDownload && (
        <div className="mt-12 mb-20 w-full flex justify-center relative z-[60]">
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
