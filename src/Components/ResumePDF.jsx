import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textTransform: "uppercase",
    color: "#111827",
  },
  contact: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  contactItem: {
    fontSize: 9,
    color: "#4b5563",
    paddingHorizontal: 10,
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
    fontWeight: "bold",
    color: "#2563eb",
    borderBottomWidth: 1,
    borderBottomColor: "#bfdbfe",
    marginBottom: 10,
    paddingBottom: 2,
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
    fontStyle: "italic",
    color: "#4b5563",
    marginBottom: 4,
    fontSize: 9,
  },
  bold: {
    fontWeight: "bold",
    color: "#1f2937",
  },
  responsibility: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.5,
    marginTop: 2,
  },
  summary: {
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
    marginBottom: 8,
  },
  skillLabel: {
    width: 120,
    fontWeight: "bold",
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
  projectItem: {
    marginBottom: 12,
  },
  projectTech: {
    fontSize: 9,
    color: "#6b7280",
    marginTop: 3,
    fontStyle: "italic",
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

  const safeText = (text) => (text === undefined || text === null ? "" : String(text));

  return (
    <Document title={`${safeText(personalInformation?.fullName) || "Resume"} - Professional Output`}>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{safeText(personalInformation?.fullName) || "Your Name"}</Text>
          <View style={styles.contact}>
            {personalInformation?.email && (
              <Text style={styles.contactItem}>{safeText(personalInformation.email)}</Text>
            )}
            {personalInformation?.email && (personalInformation?.location || personalInformation?.phoneNumber) && (
              <Text style={styles.contactSeparator}>|</Text>
            )}
            {personalInformation?.location && (
              <Text style={styles.contactItem}>{safeText(personalInformation.location)}</Text>
            )}
            {personalInformation?.location && personalInformation?.phoneNumber && (
              <Text style={styles.contactSeparator}>|</Text>
            )}
            {personalInformation?.phoneNumber && (
              <Text style={styles.contactItem}>{safeText(personalInformation.phoneNumber)}</Text>
            )}
          </View>
        </View>

        {/* Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summary}>{safeText(summary)}</Text>
        </View>

        {/* Experience Section */}
        {experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={{ marginBottom: 12 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.bold}>{safeText(exp?.jobTitle)}</Text>
                  <Text style={{ fontSize: 9, color: "#6b7280" }}>{safeText(exp?.duration)}</Text>
                </View>
                <View style={styles.itemSubHeader}>
                  <Text>{safeText(exp?.company)}</Text>
                  <Text>{safeText(exp?.location)}</Text>
                </View>
                <Text style={styles.responsibility}>{safeText(exp?.responsibility)}</Text>
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
                  <Text style={styles.bold}>{safeText(edu?.degree)}</Text>
                  <Text style={{ fontSize: 9, color: "#6b7280" }}>{safeText(edu?.graduationYear)}</Text>
                </View>
                <View style={styles.itemSubHeader}>
                  <Text>{safeText(edu?.university)}</Text>
                  <Text>{safeText(edu?.location)}</Text>
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
                  {safeText(group?.category || group?.title || "Skills")}:
                </Text>
                <View style={styles.skills}>
                  {safeText(group?.skills || group?.level || "")
                    .split(",")
                    .map((skill, si) => skill.trim() && (
                      <View key={si} style={styles.skillBadgeContainer}>
                        <Text style={styles.skillText}>{safeText(skill.trim())}</Text>
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
              <View key={i} style={styles.projectItem}>
                <Text style={styles.bold}>{safeText(proj?.title)}</Text>
                <Text style={styles.summary}>{safeText(proj?.description)}</Text>
                {proj?.technologiesUsed && (
                  <Text style={styles.projectTech}>Technologies: {safeText(proj.technologiesUsed)}</Text>
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
