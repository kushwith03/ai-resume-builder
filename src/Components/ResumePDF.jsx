import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { pdfStyles as styles } from "./PDF/pdfStyles";
import PDFHeader from "./PDF/PDFHeader";
import { renderText } from "./PDF/pdfHelpers";

const ResumePDF = ({ data }) => {
  if (!data) return null;

  const {
    personalInformation = {},
    socialLinks = [],
    summary = "",
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    achievements = [],
    positionsOfResponsibility = [],
  } = data;

  const fullName = renderText(personalInformation?.fullName, "Your Name");

  return (
    <Document title={`${fullName} - Professional Resume`}>
      <Page size="A4" style={styles.page}>
        <PDFHeader personalInformation={personalInformation} socialLinks={socialLinks} />

        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.text}>{renderText(summary)}</Text>
          </View>
        )}

        {skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            {skills.map((group, i) => (
              <View key={i} style={styles.skillRow}>
                <Text style={styles.skillLabel}>{renderText(group?.category || group?.title, "Skills")}:</Text>
                <Text style={styles.text}>{renderText(group?.skills || group?.level, "")}</Text>
              </View>
            ))}
          </View>
        )}

        {experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.bold}>{renderText(exp?.jobTitle)}</Text>
                  <Text>{renderText(exp?.duration)}</Text>
                </View>
                <View style={styles.itemSubHeader}>
                  <Text>{renderText(exp?.company)}</Text>
                  <Text>{renderText(exp?.location)}</Text>
                </View>
                <View>
                  {renderText(exp?.responsibility).split('\n').map((line, li) => (
                    line.trim() && (
                      <View key={li} style={styles.bulletRow}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>{line.trim().replace(/^[-•]\s*/, '')}</Text>
                      </View>
                    )
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.bold}>{renderText(edu?.university)}</Text>
                  <Text>{renderText(edu?.graduationYear)}</Text>
                </View>
                <View style={styles.itemSubHeader}>
                  <Text>{renderText(edu?.degree)}</Text>
                  <Text>{renderText(edu?.location)}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.bold}>{renderText(proj?.title)}</Text>
                  <Text style={styles.italic}>{renderText(proj?.technologiesUsed)}</Text>
                </View>
                <View>
                  {renderText(proj?.description).split('\n').map((line, li) => (
                    line.trim() && (
                      <View key={li} style={styles.bulletRow}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>{line.trim().replace(/^[-•]\s*/, '')}</Text>
                      </View>
                    )
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {certifications?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.map((cert, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                  <Text style={styles.bold}>{renderText(cert.title)}</Text>, {renderText(cert.issuer)}
                  {cert.date && String(cert.date).trim() ? ` (${String(cert.date).trim()})` : ""}
                </Text>
              </View>
            ))}
          </View>
        )}

        {achievements?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Awards & Achievements</Text>
            {achievements.map((award, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                  <Text style={styles.bold}>{renderText(award.award)}</Text>, {renderText(award.organization)}
                  {award.date && String(award.date).trim() ? ` (${String(award.date).trim()})` : ""}
                </Text>
              </View>
            ))}
          </View>
        )}

        {positionsOfResponsibility?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Leadership & Responsibility</Text>
            {positionsOfResponsibility.map((pos, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.bold}>{renderText(pos?.title)}</Text>
                  <Text>{renderText(pos?.duration)}</Text>
                </View>
                <Text style={styles.italic}>{renderText(pos?.organization)}</Text>
                <View style={styles.bulletRow}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{renderText(pos?.description)}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF;
