import React from 'react';
import { FaUser, FaLink, FaAlignLeft, FaCode, FaBriefcase, FaGraduationCap, FaPaperPlane, FaCertificate, FaTrophy, FaUsers } from "react-icons/fa";

export const SECTIONS = [
  { id: 'identity', label: 'Identity', icon: React.createElement(FaUser) },
  { id: 'socialLinks', label: 'Links', icon: React.createElement(FaLink) },
  { id: 'summary', label: 'Summary', icon: React.createElement(FaAlignLeft) },
  { id: 'skills', label: 'Skills', icon: React.createElement(FaCode) },
  { id: 'experience', label: 'Experience', icon: React.createElement(FaBriefcase) },
  { id: 'education', label: 'Education', icon: React.createElement(FaGraduationCap) },
  { id: 'projects', label: 'Projects', icon: React.createElement(FaPaperPlane) },
  { id: 'certifications', label: 'Certs', icon: React.createElement(FaCertificate) },
  { id: 'achievements', label: 'Awards', icon: React.createElement(FaTrophy) },
  { id: 'positionsOfResponsibility', label: 'Leadership', icon: React.createElement(FaUsers) },
];
