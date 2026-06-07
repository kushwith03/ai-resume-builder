import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

// Explicitly define styles for maximum compatibility across PDF engines
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
    color: "#374151",
  },
  header: {
    marginBottom: 20,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  name: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    marginBottom: 12,
    textTransform: "uppercase",
    color: "#111827",
    textAlign: "center",
  },
  contact: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    marginTop: 4,
  },
  contactItem: {
    fontSize: 9,
    color: "#4b5563",
    paddingHorizontal: 8,
  },
  contactSeparator: {
    fontSize: 9,
    color: "#9ca3af",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#2563eb",
    borderBottomWidth: 1,
    borderBottomColor: "#bfdbfe",
    marginBottom: 10,
    paddingBottom: 3,
    textTransform: "uppercase",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  itemSubHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "Helvetica-Oblique",
    color: "#4b5563",
    marginBottom: 4,
    fontSize: 9,
  },
  bold: {
    fontFamily: "Helvetica-Bold",
    color: "#1f2937",
  },
  text: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.5,
  },
  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  skillGroup: {
    flexDirection: "row",
    marginBottom: 6,
  },
  skillLabel: {
    width: 120,
    fontFamily: "Helvetica-Bold",
    color: "#1f2937",
    fontSize: 10,
  },
  skillBadgeContainer: {
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  skillText: {
    fontSize: 8.5,
    color: "#4b5563",
  },
  projectTech: {
    fontSize: 9,
    color: "#6b7280",
    marginTop: 2,
    fontFamily: "Helvetica-Oblique",
  }
});

const ResumePDF = ({ data }) => {
  if (!data) return null;

  const {
    personalInformation = {},
    summary = "",
    experience = [],
    education = [],
    skills = [],
    projects = [],
  } = data;

  // Extremely robust text handling
  const renderText = (text, fallback = "") => {
    if (!text || String(text).trim() === "") return fallback;
    return String(text);
  };

  const fullName = renderText(personalInformation?.fullName, "Your Name");

  return (
    <Document title={`${fullName} - Professional Resume`}>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{fullName}</Text>
          <View style={styles.contact}>
            {personalInformation?.email && (
              <Text style={styles.contactItem}>{renderText(personalInformation.email)}</Text>
            )}
            {personalInformation?.email && (personalInformation?.location || personalInformation?.phoneNumber) && (
              <Text style={styles.contactSeparator}>|</Text>
            )}
            {personalInformation?.location && (
              <Text style={styles.contactItem}>{renderText(personalInformation.location)}</Text>
            )}
            {personalInformation?.location && personalInformation?.phoneNumber && (
              <Text style={styles.contactSeparator}>|</Text>
            )}
            {personalInformation?.phoneNumber && (
              <Text style={styles.contactItem}>{renderText(personalInformation.phoneNumber)}</Text>
            )}
          </View>
        </View>

        {/* Summary Section */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.text}>{renderText(summary)}</Text>
          </View>
        )}

        {/* Experience Section */}
        {experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={{ marginBottom: 12 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.bold}>{renderText(exp?.jobTitle)}</Text>
                  <Text style={{ fontSize: 9, color: "#6b7280" }}>{renderText(exp?.duration)}</Text>
                </View>
                <View style={styles.itemSubHeader}>
                  <Text>{renderText(exp?.company)}</Text>
                  <Text>{renderText(exp?.location)}</Text>
                </View>
                <Text style={styles.text}>{renderText(exp?.responsibility)}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Education Section */}
        {education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.bold}>{renderText(edu?.degree)}</Text>
                  <Text style={{ fontSize: 9, color: "#6b7280" }}>{renderText(edu?.graduationYear)}</Text>
                </View>
                <View style={styles.itemSubHeader}>
                  <Text>{renderText(edu?.university)}</Text>
                  <Text>{renderText(edu?.location)}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Skills Section */}
        {skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills & Competencies</Text>
            {skills.map((group, i) => (
              <View key={i} style={styles.skillGroup}>
                <Text style={styles.skillLabel}>
                  {renderText(group?.category || group?.title, "Skills")}:
                </Text>
                <View style={styles.skills}>
                  {renderText(group?.skills || group?.level, "")
                    .split(",")
                    .map((skill, si) => skill.trim() && (
                      <View key={si} style={styles.skillBadgeContainer}>
                        <Text style={styles.skillText}>{renderText(skill.trim())}</Text>
                      </View>
                    ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Projects Section */}
        {projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Projects</Text>
            {projects.map((proj, i) => (
              <View key={i} style={{ marginBottom: 10 }}>
                <Text style={styles.bold}>{renderText(proj?.title)}</Text>
                <Text style={styles.text}>{renderText(proj?.description)}</Text>
                {proj?.technologiesUsed && (
                  <Text style={styles.projectTech}>Technologies: {renderText(proj.technologiesUsed)}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF;
