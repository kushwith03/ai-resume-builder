import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register a professional font if needed, or use defaults
// Font.register({ family: 'Inter', src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2' });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  contact: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    color: '#4b5563',
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2563eb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'between',
    fontWeight: 'bold',
  },
  itemSubHeader: {
    flexDirection: 'row',
    justifyContent: 'between',
    fontStyle: 'italic',
    color: '#4b5563',
    marginBottom: 4,
  },
  bulletPoint: {
    marginLeft: 10,
    marginBottom: 2,
  },
  summary: {
    marginBottom: 10,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skillBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: '#f3f4f6',
    borderRadius: 3,
  }
});

const ResumePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInformation?.fullName}</Text>
        <View style={styles.contact}>
          <Text>{data.personalInformation?.email}</Text>
          <Text>{data.personalInformation?.location}</Text>
          <Text>{data.personalInformation?.phoneNumber}</Text>
        </View>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.summary}>{data.summary}</Text>
      </View>

      {/* Experience */}
      {data.experience?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <View style={styles.itemHeader}>
                <Text style={{ fontWeight: 'bold' }}>{exp.jobTitle}</Text>
                <Text>{exp.duration}</Text>
              </View>
              <View style={styles.itemSubHeader}>
                <Text>{exp.company}</Text>
                <Text>{exp.location}</Text>
              </View>
              <Text style={styles.bulletPoint}>{exp.responsibility}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={{ marginBottom: 5 }}>
              <View style={styles.itemHeader}>
                <Text style={{ fontWeight: 'bold' }}>{edu.degree}</Text>
                <Text>{edu.graduationYear}</Text>
              </View>
              <View style={styles.itemSubHeader}>
                <Text>{edu.university}</Text>
                <Text>{edu.location}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skills}>
            {data.skills.map((skill, i) => (
              <Text key={i} style={styles.skillBadge}>{skill.title} ({skill.level})</Text>
            ))}
          </View>
        </View>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {data.projects.map((proj, i) => (
            <View key={i} style={{ marginBottom: 8 }}>
              <Text style={{ fontWeight: 'bold' }}>{proj.title}</Text>
              <Text>{proj.description}</Text>
              <Text style={{ fontSize: 9, color: '#6b7280' }}>Tech: {proj.technologiesUsed}</Text>
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default ResumePDF;
