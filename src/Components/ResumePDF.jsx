import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textTransform: "uppercase",
  },
  contact: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    color: "#4b5563",
    marginBottom: 10,
    fontSize: 9,
    width: "100%",
  },
  contactItem: {
    paddingHorizontal: 8,
  },
  contactSeparator: {
    color: "#9ca3af",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2563eb",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemSubHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontStyle: "italic",
    color: "#4b5563",
    marginBottom: 4,
  },
  bold: {
    fontWeight: "bold",
  },
  bulletPoint: {
    marginLeft: 10,
    marginBottom: 2,
  },
  summary: {
    marginBottom: 10,
  },
  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: "#f3f4f6",
    borderRadius: 3,
    marginRight: 6,
    marginBottom: 4,
  },
});

const ResumePDF = ({ data }) => {
  if (!data) return null;

  // Destructure with safe defaults
  const {
    personalInformation = {},
    summary = "",
    experience = [],
    education = [],
    skills = [],
    projects = [],
  } = data;

  // Helper to safely render text
  const safeText = (text) => {
    if (text === undefined || text === null) return "";
    return String(text);
  };

  return (
    <Document
      title={`${safeText(personalInformation?.fullName) || "Resume"} - ATS Optimized`}
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.contact}>
          {personalInformation?.email && (
            <Text style={styles.contactItem}>
              {safeText(personalInformation.email)}
            </Text>
          )}

          {personalInformation?.email &&
            (personalInformation?.location ||
              personalInformation?.phoneNumber) && (
              <Text style={styles.contactSeparator}>|</Text>
            )}

          {personalInformation?.location && (
            <Text style={styles.contactItem}>
              {safeText(personalInformation.location)}
            </Text>
          )}

          {personalInformation?.location &&
            personalInformation?.phoneNumber && (
              <Text style={styles.contactSeparator}>|</Text>
            )}

          {personalInformation?.phoneNumber && (
            <Text style={styles.contactItem}>
              {safeText(personalInformation.phoneNumber)}
            </Text>
          )}
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summary}>{safeText(summary)}</Text>
        </View>

        {/* Experience */}
        {experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={{ marginBottom: 10 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.bold}>{safeText(exp?.jobTitle)}</Text>
                  <Text>{safeText(exp?.duration)}</Text>
                </View>
                <View style={styles.itemSubHeader}>
                  <Text>{safeText(exp?.company)}</Text>
                  <Text>{safeText(exp?.location)}</Text>
                </View>
                <Text style={styles.bulletPoint}>
                  {safeText(exp?.responsibility)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 5 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.bold}>{safeText(edu?.degree)}</Text>
                  <Text>{safeText(edu?.graduationYear)}</Text>
                </View>
                <View style={styles.itemSubHeader}>
                  <Text>{safeText(edu?.university)}</Text>
                  <Text>{safeText(edu?.location)}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills & Competencies</Text>
            {skills.map((skillGroup, i) => (
              <View key={i} style={{ flexDirection: "row", marginBottom: 5 }}>
                <Text style={[styles.bold, { width: 100 }]}>
                  {safeText(
                    skillGroup?.category || skillGroup?.title || "Skills",
                  )}
                  :
                </Text>
                <View style={styles.skills}>
                  {safeText(skillGroup?.skills || skillGroup?.level || "")
                    .split(",")
                    .map(
                      (skill, si) =>
                        skill.trim() && (
                          <Text key={si} style={styles.skillBadge}>
                            {safeText(skill.trim())}
                          </Text>
                        ),
                    )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <Text style={styles.bold}>{safeText(proj?.title)}</Text>
                <Text>{safeText(proj?.description)}</Text>
                {proj?.technologiesUsed && (
                  <Text style={{ fontSize: 9, color: "#6b7280", marginTop: 2 }}>
                    Tech: {safeText(proj.technologiesUsed)}
                  </Text>
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
