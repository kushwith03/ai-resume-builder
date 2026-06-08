import { StyleSheet } from "@react-pdf/renderer";

export const pdfStyles = StyleSheet.create({
  page: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 24,
    paddingRight: 24,
    fontSize: 10,
    fontFamily: "Times-Roman",
    lineHeight: 1.15,
    color: "#000",
  },
  header: {
    marginBottom: 12,
    width: "100%",
    textAlign: "center",
  },
  name: {
    fontSize: 22,
    fontFamily: "Times-Bold",
    marginBottom: 14,
    textTransform: "uppercase",
  },
  contact: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    fontSize: 9,
    marginBottom: 2,
  },
  social: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    fontSize: 9,
    marginTop: 0,
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
    lineHeight: 1.15,
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
