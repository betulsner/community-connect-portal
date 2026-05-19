import type { DigitalHelpTopic } from "../types";

export const digitalHelpTopics: DigitalHelpTopic[] = [
  {
    id: "email",
    title: "Help with email",
    explanation: "Set up an email address, recover access, send attachments, and spot suspicious messages.",
    guideSteps: ["Choose a clear password.", "Add a recovery phone number.", "Practise sending one safe attachment."],
    relatedTags: ["digital-help"]
  },
  {
    id: "cv-jobs",
    title: "Help with CVs and job applications",
    explanation: "Create a CV, upload documents, search jobs, and send applications from a shared computer.",
    guideSteps: ["Bring work dates if you have them.", "Save your CV to email or USB.", "Ask for help before submitting."],
    relatedTags: ["digital-help"]
  },
  {
    id: "benefits-council",
    title: "Help with benefits and council services",
    explanation: "Get support with online forms, evidence uploads, appointments, and council account access.",
    guideSteps: ["Bring letters or reference numbers.", "Check what documents are needed.", "Keep a note of submitted forms."],
    relatedTags: ["digital-help"]
  },
  {
    id: "nhs-health",
    title: "Help with NHS and health services",
    explanation: "Use the NHS App, order prescriptions, manage appointments, and find trusted health information.",
    guideSteps: ["Bring ID if setting up the NHS App.", "Use official health websites.", "Ask for privacy if discussing health details."],
    relatedTags: ["digital-help"]
  },
  {
    id: "printing-scanning",
    title: "Printing, scanning, and uploading documents",
    explanation: "Print forms, scan evidence, photograph documents clearly, and upload files safely.",
    guideSteps: ["Check the file is readable.", "Use a clear file name.", "Delete private files from shared computers."],
    relatedTags: ["digital-help"]
  },
  {
    id: "online-safety",
    title: "Online safety",
    explanation: "Learn safer passwords, scam warning signs, privacy basics, and how to report problems.",
    guideSteps: ["Pause before clicking links.", "Use different passwords for important accounts.", "Ask a trusted support worker if unsure."],
    relatedTags: ["digital-help"]
  },
  {
    id: "video-calls",
    title: "Video calls",
    explanation: "Join family, health, job, and support calls with sound, camera, and link checks.",
    guideSteps: ["Test sound before the call.", "Find a quiet place.", "Keep meeting links private."],
    relatedTags: ["digital-help"]
  },
  {
    id: "passwords",
    title: "Passwords and account setup",
    explanation: "Create strong passwords, write recovery notes safely, and set up accounts without losing access.",
    guideSteps: ["Use a long memorable phrase.", "Add recovery options.", "Never share one-time codes."],
    relatedTags: ["digital-help"]
  }
];
