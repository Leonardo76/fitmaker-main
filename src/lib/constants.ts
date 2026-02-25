import {
  balancedDiet,
  buildMuscle,
  edi,
  edward,
  email,
  facebook,
  homeTraining,
  hTraining,
  instagram,
  josh,
  location,
  motivated,
  phone,
  service1,
  service2,
  service3,
  service4,
  steven,
  x,
  youtube,
} from "../assets";
import { NavLinksConfig } from "./types";

//meniul principal (link-urile)
// - title: textul din meniu (traductibil)
// - sectionId: id-ul secțiunii din pagină (fără #)
// - isCta: dacă link-ul trebuie să fie evidențiat ca buton (CTA)
export const navLinksConfig: NavLinksConfig = [
  // IMPORTANT: puteți schimba textul ("Alătură-te", "Servicii" ...),
  // dar NU atingeți celelalte
  { title: "Servicii", sectionId: "services" },
  { title: "Planuri", sectionId: "plans" },
  { title: "Antrenor", sectionId: "trainer" },
  { title: "FAQ", sectionId: "faq" },
  { title: "Contact", sectionId: "contact" },
  { title: "Alătură-te", sectionId: "join", isCta: true },
] as const;

export const stats = [
  {
    id: 1,
    figures: "+ 80",
    desc: "Coaches",
    positionClass: "top-1/3 -translate-x-1/3",
  },
  {
    id: 2,
    figures: "+ 1300",
    desc: "Positive Reviews",
    positionClass: "right-0 translate-y-24 xl:translate-y-1/2",
  },
  {
    id: 3,
    figures: "+ 1000",
    desc: "Workout Videos",
    positionClass: "bottom-0",
  },
  {
    id: 4,
    figures: "+ 1500",
    desc: "Trainers",
    positionClass: "bottom-0 right-0 -translate-y-1/3",
  },
];

export const ourWebsite = [
  {
    id: 1,
    numbers: "96%",
    title: "Client Satisfaction",
    description: "Our members love their results and experience",
  },
  {
    id: 2,
    numbers: "+5",
    title: "years of Experience",
    description: "Trust in our proven track record of transforming",
  },
  {
    id: 3,
    numbers: "+800",
    title: "Active Members",
    description: "Join our thriving fitness community",
  },
  {
    id: 4,
    numbers: "24/7",
    title: "Support Available",
    description: "Expert assistance whenever you need it",
  },
];

export const services = [
  {
    // name: "Losing weight", // VECHI
    id: "weight-loss", // NOU
    name: "Losing weight",
    image: service1,
    text: "Poți scăpa de kilogramele nedorite folosind un plan de antrenament bine structurat, concis și special adaptat modului tău de viață și timpului de care dispui în zilele de antrenament.",
  },
  {
    // name: "Building muscle", // VECHI
    id: "muscle-building", // NOU
    name: "Building muscle",
    image: service2,
    text: "Construiește-ți masa musculară folosind greutăți mari cu număr redus de repetări, respirația adecvată, poziția corectă de executarea exercițiului și nu în ultimul rând creează conexiunea minte-mușchi.",
  },
  {
    // name: "Training in home", // VECHI
    id: "home-training", // NOU
    name: "Training in home",
    image: service3,
    text: `Poți opta pentru unul dintre pachetele de antrenament online, chiar din confortul propriei case. 
Creează-ți propriul colț al casei pentru antrenament, pornești un apel video cu mine și vom începe antrenamentul rapid și eficient.`,
  },
  {
    // name: "Gym plan", // VECHI
    id: "gym-plan", // NOU
    name: "Gym plan",
    image: service4,
    text: `Planurile mele de antrenament sunt diferite pentru fiecare persoană în parte.    
Vrei să slăbești, să tonifiezi sau să crești în volum muscular? Cu un plan personalizat rezultatele nu vor întârzia să apară!`,
  },
];

export const plans = [
  {
    id: 1,
    package: "Plan de antrenament",
    description:
      "Planul de antrenament oferă avantajele ... (ex: workouts and personalized nutrition coaching to help you reach your goals faster. Sign Up Right Now!)",
    features: [
      ".................",
      ".................",
      "Access to All Of Our Exercise Videos ",
      "Progress Tracking",
      "Supportive Online Community",
      "Advanced, Personalized Workout Plans",
      "Comprehensive Nutrition Coaching",
      "Access to Advanced Workout Programs",
      "Body Composition Analysis",
    ],
    price: "300 RON",
    peLuna: "/lună",
  },
  {
    id: 2,
    package: `Antrenor personal`,
    description:
      "Planul de antrenament oferă avantajele ... (ex: workouts and personalized nutrition coaching to help you reach your goals faster. Sign Up Right Now!)",
    features: [
      ".................",
      ".................",
      "Access to All Of Our Exercise Videos ",
      "Progress Tracking",
      "Supportive Online Community",
      "Advanced, Personalized Workout Plans",
      "Comprehensive Nutrition Coaching",
      "Access to Advanced Workout Programs",
      "Body Composition Analysis",
    ],
    price: "150 RON",
    peLuna: "/ședință/lună",
  },
  {
    id: 3,
    package: `Antrenament Mini-Grup`,
    description:
      "Planul de antrenament oferă (3 persoane, 8 ședințe) ... (ex: workouts and personalized nutrition coaching to help you reach your goals faster. Sign Up Right Now!)",
    features: [
      ".................",
      ".................",
      "Access to All Of Our Exercise Videos ",
      "Progress Tracking",
      "Supportive Online Community",
      "Advanced, Personalized Workout Plans",
      "Comprehensive Nutrition Coaching",
      "Access to Advanced Workout Programs",
      "Body Composition Analysis",
    ],
    price: "400 RON",
    peLuna: "/pers./lună",
  },
  {
    id: 4,
    package: `Fitness Personal 8`,
    description:
      "Planul de antrenament oferă avantajele ... (ex: workouts and personalized nutrition coaching to help you reach your goals faster. Sign Up Right Now!)",
    features: [
      ".................",
      ".................",
      "Access to All Of Our Exercise Videos ",
      "Progress Tracking",
      "Supportive Online Community",
      "Advanced, Personalized Workout Plans",
      "Comprehensive Nutrition Coaching",
      "Access to Advanced Workout Programs",
      "Body Composition Analysis",
    ],
    price: "900",
    peLuna: "/lună",
  },
  {
    id: 5,
    package: `Fitness Personal 12`,
    description:
      "Planul de antrenament oferă avantajele ... (ex: workouts and personalized nutrition coaching to help you reach your goals faster. Sign Up Right Now!)",
    features: [
      ".................",
      ".................",
      "Access to All Of Our Exercise Videos ",
      "Progress Tracking",
      "Supportive Online Community",
      "Advanced, Personalized Workout Plans",
      "Comprehensive Nutrition Coaching",
      "Access to Advanced Workout Programs",
      "Body Composition Analysis",
    ],
    price: "1100",
    peLuna: "/lună",
  },
  {
    id: 6,
    package: `Fitness Personal 20`,
    description:
      "Planul de antrenament oferă avantajele ... (ex: workouts and personalized nutrition coaching to help you reach your goals faster. Sign Up Right Now!)",
    features: [
      ".................",
      ".................",
      "Access to All Of Our Exercise Videos ",
      "Progress Tracking",
      "Supportive Online Community",
      "Advanced, Personalized Workout Plans",
      "Comprehensive Nutrition Coaching",
      "Access to Advanced Workout Programs",
      "Body Composition Analysis",
    ],
    price: "1700",
    peLuna: "/lună",
  },
];

// export const tools = [tool1, tool2, tool3, tool4, tool3];

export const testimonials = [
  {
    id: 1,
    name: "Eduard",
    about: "Our Trainer",
    review:
      "I’ve been using Fitmaker for the past three months, and I’m genuinely impressed. The website is easy to navigate, and everything is laid out clearly. I purchased the Premium Plan, and the personalized coaching has been a game-changer for me. My coach is incredibly supportive and always available to answer my questions.",
    image: steven,
  },
  {
    id: 2,
    name: "Josh Oliver",
    about: "Our Trainer",
    review:
      "Fitmaker has been a great help in my fitness journey. I opted for the group coaching plan, and it has been wonderful. The workout plans are detailed and adaptable. The trainers are encouraging and keep me motivated throughout my progress. I highly recommend Fitmaker to anyone who needs professional guidance.",
    image: josh,
  },
  {
    id: 3,
    name: "Edward Hawley",
    about: "Our Trainer",
    review:
      "Choosing Fitmaker was one of the best decisions for my health goals. The variety of workout plans keeps it exciting, and the nutritional tips are very practical. The trainers are approachable and skilled, always making sure I’m on track. I’ve noticed significant improvements, and I feel more confident now.",
    image: edward,
  },
];

export const trainers = [
  {
    id: 1,
    name: "Eduard Bălăiță (32 de ani)",
    role: "Antrenor Personal",
    image: edi,
    about: `    Sunt fost sportiv de performanță (campion național la lupte libere). De la vârsta de 18 ani sunt antrenor personal.
    Absolvent al școlii de antrenori ”Master Class București”, am studiat la specializarea instructor de fitness, de aerobic, dar și cea de antrenor personal.
    Ulterior, m-am specializat în hidroterapie (recuperare medicală acvatică), am absolvit un curs de instructor de natație și un curs de AQUA GYM.
    În urma celor 14 ani de activitate zilnică în sălile sportive, am reușit să motivez mulți oameni încercând să le îmbunătățesc modul de viață prin propriul meu exemplu.`,
  },
  // {
  //   id: 2,
  //   name: "M. Harris",
  //   role: "Personal Trainer",
  //   image: harris,
  // },
  // {
  //   id: 3,
  //   name: "John Haley",
  //   role: "Personal Trainer",
  //   image: john,
  // },
  // {
  //   id: 4,
  //   name: "Tom Blake",
  //   role: "Personal Trainer",
  //   image: tom,
  // },
];

export const blogPosts = [
  {
    id: 1,
    title: "5 Essential Exercises for Building Muscle",
    category: "Strength Training",
    date: "August 14",
    image: buildMuscle,
  },
  {
    id: 2,
    title: "The Ultimate Guide to a Balanced Diet",
    category: "Nutrition",
    date: "August 14",
    image: balancedDiet,
  },
  {
    id: 3,
    title: "the Benefits of HIIT Training",
    category: "Cardio",
    date: "August 14",
    image: hTraining,
  },
  {
    id: 4,
    title: "Home Workouts for Busy people",
    category: "Home Workouts",
    date: "August 14",
    image: homeTraining,
  },
  {
    id: 5,
    title: "How to Always Stay Motivated ",
    category: "Motivation",
    date: "August 14",
    image: motivated,
  },
];

// export const communityBenefits = [];

export const faq = [
  {
    id: 1,
    question: "What is FitMaker and how can it help me reach my fitness goals?",
    answer:
      "FitMaker is an online fitness platform that provides personalized workout plans, expert coaching, and nutritional guidance. It helps you set clear fitness goals, stay motivated, and achieve results, whether you're aiming to lose weight, gain muscle, or improve overall health.",
  },
  {
    id: 2,
    question: "How do I get started with a workout plan on FitMaker?",
    answer:
      "Getting started is easy. Sign up on the FitMaker platform, complete a fitness assessment, and choose a plan based on your goals. Your personalized workout plan will be available immediately to help you start your journey.",
  },
  {
    id: 3,
    question: "What is included in the Custom Plan?",
    answer:
      "The Custom Plan includes a tailored workout program, personalized nutritional recommendations, progress tracking tools, and access to a personal fitness coach who provides guidance and support throughout your journey.",
  },
  {
    id: 4,
    question: "Can I change my plan after signing up?",
    answer:
      "Yes, you can modify your plan at any time to suit your changing needs. Simply update your preferences in the FitMaker dashboard, and your program will adjust accordingly.",
  },
  {
    id: 5,
    question: "What kind of support can I expect from my trainer?",
    answer:
      "Your trainer will provide personalized guidance, answer your questions, offer feedback on your progress, and help you stay motivated. They are available for consultations and to adjust your plan as needed.",
  },
];

export const socialIcons = [facebook, instagram, x, youtube];

export const companyLinks = [
  "About us",
  "Our Services",
  // "Careers",
  // "Blog",
  "Testimonial",
  "Contact Us",
];

export const resourcesLinks = [
  "Fitness tools",
  "Workout Videos",
  "Nutrition Guides",
  "FAQ",
  "Success Stories",
  "Membership",
];

export const programsLinks = [
  "Weight Loss",
  "Building muscles",
  "Home Workout",
  "Gym Plan",
  "Our Plans",
  "Fitness group",
];

export const contactInfo = [
  {
    icon: location,
    info: "Usa - Washington DC",
  },
  {
    icon: phone,
    info: "1234-56789",
  },
  {
    icon: email,
    info: "Fitmakerrr@Gmail.com",
  },
];

export const birthDatePlaceholders = ["ziua", "luna", "anul"];
