import {
  edi,
  phone,
  service1,
  service2,
  service3,
  service4,
  tiktok,
} from "../assets";
import { FigureItem, NavLinksConfig } from "./types";

//region Texte secțiuni

//meniul principal (link-urile)
// - title: textul din meniu (traductibil)
// - sectionId: id-ul secțiunii din pagină (fără #)
// - isCta: dacă link-ul trebuie să fie evidențiat ca buton (CTA)
// IMPORTANT: puteți schimba textul ("Alătură-te", "Servicii" ...),
// dar NU atingeți celelalte
export const navLinksConfig: NavLinksConfig = [
  { title: "Servicii", sectionId: "services" },
  { title: "Planuri", sectionId: "plans" },
  { title: "Antrenor", sectionId: "trainer" },
  { title: "FAQ", sectionId: "faq" },
  { title: "Contact", sectionId: "contact" },
  { title: "Alătură-te", sectionId: "join", isCta: true },
] as const;

//mesajele din jurul imaginii din Hero
export const figures: FigureItem[] = [
  { figures: "+ 1400", desc: "Recenzii Pozitive" },
  { figures: "+ 500", desc: "Video Antrenamente" },
  { figures: "+ 14", desc: "Ani Experiență" },
  { figures: "+ 96%", desc: "Clienți Satisfăcuți" },
] as const;

//mesajele din OurWebsite
export const ourWebsite = [
  {
    numbers: "96%",
    title: "Clienți Satisfăcuți",
    description: "Clienții mei vor să descopere cea mai buna versiune a lor",
  },
  {
    numbers: "+14",
    title: "Ani de Experiență",
    description: "Ai incredere în tine și monitorizează-ti progresul",
  },
  {
    numbers: "+1000",
    title: "Persoane Antrenate",
    description: "Alătură-te comunității mele de fitness",
  },
  {
    numbers: "24/7",
    title: "Suport și Motivare",
    description: "Asistență permanentă pentru fiecare client în parte",
  },
] as const;

//mesajele de la Servicii
export const services = [
  {
    name: "Pierdere în greutate",
    image: service1,
    text: "Poți scăpa de kilogramele nedorite folosind un plan de antrenament bine structurat, concis și special adaptat modului tău de viață și timpului de care dispui în zilele de antrenament.",
  },
  {
    name: "Crește masa musculară",
    image: service2,
    text: "Construiește-ți masa musculară folosind greutăți mari cu număr redus de repetări, respirația adecvată, poziția corectă de executarea exercițiului și nu în ultimul rând creează conexiunea minte-mușchi.",
  },
  {
    name: "Antrenează-te acasă",
    image: service3,
    text: `Poți opta pentru unul dintre pachetele de antrenament online, chiar din confortul propriei case. 
Creează-ți propriul colț al casei pentru antrenament, pornești un apel video cu mine și vom începe antrenamentul rapid și eficient.`,
  },
  {
    name: "Plan personalizat",
    image: service4,
    text: `Planurile mele de antrenament sunt diferite pentru fiecare persoană în parte.    
Vrei să slăbești, să tonifiezi sau să crești în volum muscular? Cu un plan personalizat rezultatele nu vor întârzia să apară!`,
  },
];

export const plans = [
  {
    package: "Plan de antrenament",
    description:
      "Construiesc un program de antrenament pe baza căruia clientul se va putea antrena singur intr-o sală de fitness.",
    features: [],
    price: "300 RON",
    peLuna: "/lună",
  },
  {
    package: `Antrenor personal`,
    description:
      "Fiecare antrenament este conceput pentru a satisface nevoile și obiectivele fiecarui client în parte.",
    features: [],
    price: "150 RON",
    peLuna: "/ședință/lună",
  },
  {
    package: `Antrenament Mini-Grup`,
    description:
      "Se adresează unui număr de maxim 2-3 persoane, fiind individualizat pentru obiectivul fiecăruia dintre participanții la antrenamentul de grup.",
    features: [],
    price: "400 RON",
    peLuna: "/pers./lună",
  },
  {
    package: `Fitness Personal 8`,
    description:
      "Fiecare antrenament este conceput pentru a satisface nevoile și obiectivele fiecarui client în parte (8 sedinte).",
    features: [],
    price: "900",
    peLuna: "/lună",
  },
  {
    package: `Fitness Personal 12`,
    description:
      "Fiecare antrenament este conceput pentru a satisface nevoile și obiectivele fiecarui client în parte (12 sedinte).",
    features: [],
    price: "1100",
    peLuna: "/lună",
  },
  {
    package: `Fitness Personal 20`,
    description:
      "Fiecare antrenament este conceput pentru a satisface nevoile și obiectivele fiecarui client în parte (20 sedinte).",
    features: [],
    price: "1700",
    peLuna: "/lună",
  },
] as const;

// nefolosit
// export const testimonials = [
//   {
//     name: "Eduard",
//     about: "Our Trainer",
//     review:
//       "I’ve been using Fitmaker for the past three months, and I’m genuinely impressed. The website is easy to navigate, and everything is laid out clearly. I purchased the Premium Plan, and the personalized coaching has been a game-changer for me. My coach is incredibly supportive and always available to answer my questions.",
//     image: steven,
//   },
//   {
//     name: "Josh Oliver",
//     about: "Our Trainer",
//     review:
//       "Fitmaker has been a great help in my fitness journey. I opted for the group coaching plan, and it has been wonderful. The workout plans are detailed and adaptable. The trainers are encouraging and keep me motivated throughout my progress. I highly recommend Fitmaker to anyone who needs professional guidance.",
//     image: josh,
//   },
//   {
//     name: "Edward Hawley",
//     about: "Our Trainer",
//     review:
//       "Choosing Fitmaker was one of the best decisions for my health goals. The variety of workout plans keeps it exciting, and the nutritional tips are very practical. The trainers are approachable and skilled, always making sure I’m on track. I’ve noticed significant improvements, and I feel more confident now.",
//     image: edward,
//   },
// ];

export const trainers = [
  {
    name: "Eduard Bălăiță (32 de ani)",
    role: "Antrenor Personal",
    image: edi,
    about: `Sunt fost sportiv de performanță (campion național la lupte libere). De la vârsta de 18 ani sunt antrenor personal.
Absolvent al școlii de antrenori ”Master Class București”, am studiat la specializarea instructor de fitness, de aerobic, dar și cea de antrenor personal.
Ulterior, m-am specializat în hidroterapie (recuperare medicală acvatică), am absolvit un curs de instructor de natație și un curs de AQUA GYM.
În urma celor 14 ani de activitate zilnică în sălile sportive, am reușit să motivez mulți oameni încercând să le îmbunătățesc modul de viață prin propriul meu exemplu.`,
  },
];

export const faq = [
  {
    question:
      "Cine este Eduard Balaita și cum mă poate ajuta să îmi ating obiectivele de fitness?",
    answer:
      "Eduard Balaita este un om al sportului care, prin planuri de antrenament personalizate, coaching de specialitate și ghidare nutrițională, te poate ajuta să îți stabilești obiective clare de fitness, să rămâi motivat și să obții rezultate, indiferent dacă vrei să slăbești, să crești masa musculară sau să îți îmbunătățești starea generală de sănătate.",
  },
  {
    question: "Cum încep un plan de antrenament cu Eduard Balaita?",
    answer:
      "Este foarte simplu să începi. Alegi un tip de abonament în funcție de obiectivele tale, apoi ma contactezi prin intermediul platformei. Planul tău personalizat de antrenament va fi disponibil imediat, pentru a-ți începe parcursul.",
  },
  // {
  //   question: "Ce este inclus în Planul Personalizat?",
  //   answer:
  //     "Planul Personalizat include un program de antrenament adaptat nevoilor tale, recomandări nutriționale personalizate, instrumente pentru monitorizarea progresului și acces la un antrenor personal care îți oferă îndrumare și sprijin pe tot parcursul procesului.",
  // },
  {
    question: "Îmi pot schimba planul după ce mă înscriu?",
    answer:
      "Da, îți poți modifica planul în orice moment, în funcție de nevoile tale care se pot schimba. ",
  },
  {
    question: "La ce fel de suport mă pot aștepta din partea antrenorului meu?",
    answer:
      "Antrenorul tău îți va oferi îndrumare personalizată, va răspunde la întrebările tale, îți va oferi feedback privind progresul și te va ajuta să rămâi motivat. Este disponibil pentru consultații și pentru ajustarea planului ori de câte ori este nevoie.",
  },
];

//endregion

export const socialIcons = [
  {
    icon: tiktok,
    link: "https://www.tiktok.com/@eduard.personal.t?_r=1&_t=ZN-94Szy59TEDS",
  },
];

export const companyLinks = [];

export const resourcesLinks = [];

export const programsLinks = [
  "VEZI MAI SUS",
  "Building muscles",
  "Home Workout",
  "Gym Plan",
  "Our Plans",
  "Fitness group",
];

export const contactInfo = [
  {
    icon: phone,
    info: "0773825728",
    link: "tel:0773825728",
  },
  {
    icon: tiktok,
    info: "TikTok",
    link: "https://www.tiktok.com/@eduard.personal.t?_r=1&_t=ZN-94Szy59TEDS",
  },
];

//in Picker (nefolosit)
export const birthDatePlaceholders = ["ziua", "luna", "anul"];
