import { StyleSheet } from "@react-pdf/renderer";

export const pdfStyles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 36,
    paddingRight: 36,
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
    fontSize: 17,
    fontFamily: "Times-Bold",
    marginBottom: 3,
    textTransform: "none",
  },
  contact: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    fontSize: 10,
    marginBottom: 2,
  },
  social: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    fontSize: 10,
    marginTop: 0,
  },
  contactItem: {
    paddingHorizontal: 4,
  },
  contactSeparator: {
    color: "#000",
  },
  section: {
    marginTop: 7,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Times-Bold",
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
    marginBottom: 3,
    paddingBottom: 0,
    textTransform: "uppercase",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
  },
  itemSubHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "Times-Italic",
    marginBottom: 2,
    fontSize: 10,
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
    paddingLeft: 14,
    marginTop: 2,
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
    fontSize: 10,
  },
  skillLabel: {
    fontFamily: "Times-Bold",
    marginRight: 4,
  }
});
