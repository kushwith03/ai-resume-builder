import React from "react";
import { View, Text, Link } from "@react-pdf/renderer";
import { pdfStyles as styles } from "./pdfStyles";
import { formatUrl, getInferredLabel, normalizeUrl } from "../../utils/resumeHelpers";

const PDFHeader = ({ personalInformation, socialLinks }) => {
  const renderText = (text, fallback = "") => {
    if (!text || String(text).trim() === "") return fallback;
    return String(text);
  };

  return (
    <View style={styles.header}>
      <Text style={styles.name}>{renderText(personalInformation?.fullName, "Your Name")}</Text>
      
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
        {personalInformation?.email && personalInformation?.location && (
          <Text style={styles.contactSeparator}>|</Text>
        )}

        {personalInformation?.location && (
          <Text style={styles.contactItem}>{renderText(personalInformation.location)}</Text>
        )}
      </View>

      {socialLinks?.length > 0 && (
        <View style={styles.social}>
          {socialLinks.map((link, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Link src={normalizeUrl(link.url)} style={{ color: '#000', textDecoration: 'none' }}>
                <Text style={styles.contactItem}>
                  {formatUrl(link.url)}
                </Text>
              </Link>
              {i < socialLinks.length - 1 && <Text style={styles.contactSeparator}>|</Text>}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default PDFHeader;
