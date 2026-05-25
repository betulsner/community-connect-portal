import { ExternalLink } from "lucide-react";
import { useI18n } from "../i18n";
import type { PageId } from "../types";

interface DigitalHelpProps {
  onNavigate: (page: PageId) => void;
}

const resourceGroups = [
  {
    heading: "People who need everyday digital support",
    links: [
      { name: "Getting started with emails", url: "https://www.learnmyway.com/subjects/email", note: "Learn how to create and use an email account." },
      { name: "Getting to know your smartphone or tablet", url: "https://www.learnmyway.com/subjects/using-a-smartphone-or-tablet", note: "Find out how to use your phone or tablet." },
      { name: "Introduction to laptops and computers", url: "https://www.learnmyway.com/subjects/using-a-computer", note: "Learn the basics of using laptops and computers." },
      { name: "Using online banking", url: "https://www.learnmyway.com/subjects/online-banking", note: "Learn how to use online banking services safely." },
      { name: "Learning to shop online", url: "https://www.learnmyway.com/subjects/shopping-online", note: "Get tips on shopping online." },
      { name: "Accessing public services online", url: "https://www.learnmyway.com/subjects/public-services", note: "Find out how to use council, healthcare, benefits, and other public services online." },
      { name: "Using the NHS App", url: "https://www.nhs.uk/nhs-app/", note: "Learn how to use the NHS app to book appointments and order prescriptions." },
      { name: "Online GP services", url: "https://www.nhs.uk/nhs-services/gps/using-online-services/", note: "Get tips on using online GP services." },
      { name: "Staying connected with others", url: "https://www.learnmyway.com/subjects/keeping-in-touch", note: "Learn how to use video calls, messaging apps, and online community spaces." }
    ]
  },
  {
    heading: "Older people",
    links: [
      { name: "Age UK Digital Instruction Guides", url: "https://www.ageuk.org.uk/information-advice/work-learning/technology-internet/digital-instruction-guides/", note: "Tips for all ages on using devices and social media." },
      { name: "Listening to audiobooks", url: "https://www.digitalunite.com/technology-guides/reading-entertainment/ebooks-and-audiobooks", note: "Learn how to listen to books online or on your device." },
      { name: "Watching TV and films online at any time", url: "https://www.digitalunite.com/technology-guides/reading-entertainment", note: "Find out how to watch TV shows and movies online." },
      { name: "Helping older people to stay safe online", url: "https://www.ageuk.org.uk/information-advice/work-learning/technology-internet/internet-security/", note: "Tips to help older people avoid scams and use the internet safely." }
    ]
  },
  {
    heading: "People who are not employed",
    links: [
      { name: "Find a job online", url: "https://nationalcareers.service.gov.uk/find-a-job", note: "Learn how to search for jobs online." },
      { name: "Job Hunt for Today", url: "https://www.learnmyway.com/subjects/finding-work", note: "Get tips for finding a job." },
      { name: "Career Planning", url: "https://nationalcareers.service.gov.uk/", note: "Learn how to plan your career." },
      { name: "Youth Employment UK", url: "https://www.youthemployment.org.uk/", note: "Find career advice and job opportunities for young people." },
      { name: "The Skills Toolkit — National Careers Service", url: "https://nationalcareers.service.gov.uk/find-a-course", note: "Free courses to learn new skills or switch careers." }
    ]
  },
  {
    heading: "People on low income",
    links: [
      { name: "Using online banking", url: "https://www.learnmyway.com/subjects/online-banking", note: "Learn how to use online banking safely." },
      { name: "Learning to shop online", url: "https://www.learnmyway.com/subjects/shopping-online", note: "Get tips on comparing prices and shopping online." },
      { name: "Online money management", url: "https://www.learnmyway.com/subjects/managing-money", note: "Learn how to manage money online." },
      { name: "Finding cheaper internet deals", url: "https://www.ofcom.org.uk/phones-and-broadband/saving-money/social-tariffs", note: "Learn how to search for social tariffs and low-cost mobile plans." }
    ]
  },
  {
    heading: "People with disabilities",
    links: [
      { name: "Easy read technology guides", url: "https://www.digitalunite.com/technology-guides/accessibility", note: "Easy read guides on using devices and staying safe online." },
      { name: "My Computer My Way", url: "https://mcmw.abilitynet.org.uk/", note: "Tools to make internet use easier for people with disabilities." },
      { name: "Device accessibility settings", url: "https://mcmw.abilitynet.org.uk/", note: "Make text bigger, use voice controls, change colours, and make devices easier to use." },
      { name: "Neurodivergent children", url: "https://www.internetmatters.org/inclusive-digital-safety/", note: "Find resources for neurodivergent children and their families." }
    ]
  },
  {
    heading: "Residents from ethnic minorities and multilingual residents",
    links: [
      { name: "Digital Empowerment for Refugee Women", url: "https://www.goodthingsfoundation.org/", note: "Resources to help refugee women get online, with guides in many languages." },
      { name: "Digital Support in Arabic, Farsi, French and Spanish", url: "https://www.goodthingsfoundation.org/", note: "Guides on how to set up a device and stay safe online in multiple languages." },
      { name: "Using translation tools online", url: "https://translate.google.com/", note: "Learn how to translate websites, forms, letters, and messages." }
    ]
  },
  {
    heading: "Younger people and families",
    links: [
      { name: "Resources for 11 to 19 year olds", url: "https://www.childnet.com/", note: "Tips for young people to use the internet safely." },
      { name: "Online safety for children", url: "https://www.internetmatters.org/", note: "Learn how to keep children safe online." },
      { name: "Career Choices at 16", url: "https://nationalcareers.service.gov.uk/", note: "Get advice on choosing a career after school." },
      { name: "Social Media — safety for children", url: "https://www.internetmatters.org/issues/social-media/", note: "Learn how to help children use social media safely." },
      { name: "Parental controls", url: "https://www.internetmatters.org/parental-controls/", note: "Find out how to set up parental controls on devices and apps." },
      { name: "Helping your child stay safe online", url: "https://www.internetmatters.org/", note: "Tips and resources for parents and carers." }
    ]
  },
  {
    heading: "Small and micro businesses",
    links: [
      { name: "Remote support and meetings", url: "https://www.learnmyway.com/subjects/remote-working", note: "Learn how to do remote meetings and support." },
      { name: "Social networking and blogs", url: "https://www.learnmyway.com/subjects/social-media", note: "Get tips on social networking and blogging." },
      { name: "Microsoft 365 basics", url: "https://support.microsoft.com/en-gb/microsoft-365", note: "Learn the basics of Microsoft 365 for work and business." },
      { name: "Working with office programs", url: "https://www.learnmyway.com/subjects/using-office-programs", note: "Find out how to use word processing, spreadsheets, and more." }
    ]
  },
  {
    heading: "Staying safe online",
    links: [
      { name: "Identifying online scams", url: "https://www.getsafeonline.org/", note: "Learn how to spot online scams before they happen." },
      { name: "Fake news and misinformation", url: "https://www.getsafeonline.org/", note: "Learn how to spot fake news and unreliable information online." },
      { name: "Tackling online scams", url: "https://www.actionfraud.police.uk/", note: "Get tips on avoiding scams — from Action Fraud, the UK's national reporting centre." },
      { name: "Strong passwords", url: "https://www.ncsc.gov.uk/collection/top-tips-for-staying-secure-online/use-a-strong-and-separate-password-for-email", note: "Learn why strong passwords are important and how to create them." },
      { name: "Get Safe Online", url: "https://www.getsafeonline.org/", note: "Tips for new internet users and tools to check scam websites." },
      { name: "Guide on Staying Safe Online", url: "https://www.getsafeonline.org/personal/", note: "Comprehensive guide on staying safe online with videos and images." },
      { name: "Scam safety videos", url: "https://www.getsafeonline.org/personal/videos/", note: "Short videos on scam safety — easy to watch and share." }
    ]
  },
  {
    heading: "Further resources",
    links: [
      { name: "Learn My Way", url: "https://www.learnmyway.com/", note: "Free self-learning short courses to improve your digital skills." },
      { name: "GCF Global", url: "https://edu.gcfglobal.org/en/", note: "Courses on many topics, including online skills and using devices." },
      { name: "Open University — Digital Skills for Everyone", url: "https://www.open.edu/openlearn/digital-computing/digital-skills-everyone", note: "Free 8-week course to help you get online." },
      { name: "Digital Unite Technology Guides", url: "https://www.digitalunite.com/technology-guides", note: "Guides on computer skills and safe internet use." }
    ]
  }
];

export default function DigitalHelp({ onNavigate }: DigitalHelpProps) {
  const { t } = useI18n();

  return (
    <section className="bg-white py-12">
      <div className="govuk-width-container">
        <div className="mb-8 max-w-3xl">
          <p className="text-base font-bold text-slate-700">{t("digital.eyebrow")}</p>
          <h1 className="mt-2 text-4xl font-black text-ink">{t("digital.title")}</h1>
          <p className="mt-3 text-lg font-semibold leading-relaxed text-slate-700">
            {t("digital.subtitle")}
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-black text-ink">Improve your digital skills</h2>
          <p className="mt-3 text-lg text-slate-700 max-w-3xl">
            There are lots of free learning resources online that you can use to build confidence at your own pace. These guides and courses can help you with everyday tasks such as using your phone, sending emails, applying for jobs, accessing healthcare, managing money online, and staying safe from scams.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {resourceGroups.map((group) => (
              <div key={group.heading} className="govuk-panel p-5">
                <h3 className="text-lg font-black text-ink">{group.heading}</h3>
                <ul className="mt-3 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.name} className="border-t border-slate-200 pt-3">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex items-center gap-1 font-bold text-lagoon-700"
                      >
                        {link.name}
                        <ExternalLink size={12} aria-hidden="true" />
                      </a>
                      <span className="mt-0.5 block text-sm text-slate-600">{link.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button type="button" onClick={() => onNavigate("connect")} className="govuk-button px-5 py-3">
              Find local digital sessions near you
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
