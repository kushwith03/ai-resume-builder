import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: "0.5in",
    fontSize: 10,
    fontFamily: "Times-Roman",
    lineHeight: 1.2,
    color: "#000",
  },
  header: {
    marginBottom: 10,
    width: "100%",
    textAlign: "center",
  },
  name: {
    fontSize: 20,
    fontFamily: "Times-Bold",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  contact: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    fontSize: 9,
  },
  contactItem: {
    paddingHorizontal: 4,
  },
  contactSeparator: {
    color: "#666",
  },
  section: {
    marginTop: 8,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Times-Bold",
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
    marginBottom: 4,
    paddingBottom: 1,
    textTransform: "uppercase",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  itemSubHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "Times-Italic",
    marginBottom: 2,
  },
  bold: {
    fontFamily: "Times-Bold",
  },
  italic: {
    fontFamily: "Times-Italic",
  },
  text: {
    fontSize: 10,
    lineHeight: 1.2,
    textAlign: "justify",
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 1,
    paddingLeft: 10,
  },
  bullet: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
  },
  skillRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  skillLabel: {
    fontFamily: "Times-Bold",
    marginRight: 4,
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

  const renderText = (text, fallback = "") => {
    if (!text || String(text).trim() === "") return fallback;
    return String(text);
  };

  const formatUrl = (url) => {
    if (!url) return "";
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  };

  const fullName = renderText(personalInformation?.fullName, "Your Name");

  return (
    <Document title={`${fullName} - Professional Resume`}>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{fullName}</Text>
          <View style={styles.contact}>
            {personalInformation?.phoneNumber && (
              <Text style={styles.contactItem}>{renderText(personalInformation.phoneNumber)}</Text>
            )}
            {personalInformation?.phoneNumber && (personalInformation?.email || personalInformation?.location) && (
              <Text style={styles.contactSeparator}>|</Text>
            )}
            
            {personalInformation?.email && (
              <Text style={styles.contactItem}>{renderText(personalInformation.email)}</Text>
            )}
            {personalInformation?.email && (personalInformation?.location || personalInformation?.linkedin) && (
              <Text style={styles.contactSeparator}>|</Text>
            )}

            {personalInformation?.location && (
              <Text style={styles.contactItem}>{renderText(personalInformation.location)}</Text>
            )}
            {personalInformation?.location && (personalInformation?.linkedin || personalInformation?.gitHub) && (
              <Text style={styles.contactSeparator}>|</Text>
            )}

            {personalInformation?.linkedin && (
              <Text style={styles.contactItem}>linkedin.com/in/{personalInformation.linkedin.split('/').pop()}</Text>
            )}
            {personalInformation?.linkedin && (personalInformation?.gitHub || personalInformation?.portfolio) && (
              <Text style={styles.contactSeparator}>|</Text>
            )}

            {personalInformation?.gitHub && (
              <Text style={styles.contactItem}>github.com/{personalInformation.gitHub.split('/').pop()}</Text>
            )}
            {personalInformation?.gitHub && personalInformation?.portfolio && (
              <Text style={styles.contactSeparator}>|</Text>
            )}

            {personalInformation?.portfolio && (
              <Text style={styles.contactItem}>{formatUrl(personalInformation.portfolio)}</Text>
            )}
          </View>
        </View>

        {/* Summary Section */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.text}>{renderText(summary)}</Text>
          </View>
        )}

        {/* Education Section */}
        {education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.bold}>{renderText(edu?.university)}</Text>
                  <Text>{renderText(edu?.location)}</Text>
                </View>
                <View style={styles.itemSubHeader}>
                  <Text>{renderText(edu?.degree)}</Text>
                  <Text>{renderText(edu?.graduationYear)}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Skills Section */}
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

        {/* Experience Section */}
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

        {/* Projects Section */}
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
      </Page>
    </Document>
  );
};

export default ResumePDF;
