import { Question } from "@/types/quiz";

export const predefinedQuestions: Question[] = [
  // Agility Questions (10)
  {
    question: "What is Scrum?",
    theme: "agility",
    answers: [
      { text: "An Agile framework for project management", isCorrect: true },
      { text: "A rugby formation", isCorrect: false },
      { text: "A type of software bug", isCorrect: false },
      { text: "A database management system", isCorrect: false },
    ],
    explanation: "Scrum is an Agile framework that helps teams work together. It describes a set of meetings, tools, and roles that work in concert to help teams structure and manage their work.",
  },
  {
    question: "What is a Sprint in Agile?",
    theme: "agility",
    answers: [
      { text: "A short race between team members", isCorrect: false },
      { text: "A fixed time period for completing work", isCorrect: true },
      { text: "A type of emergency meeting", isCorrect: false },
      { text: "A software testing phase", isCorrect: false },
    ],
    explanation: "A Sprint in Agile is a short, time-boxed period when a scrum team works to complete a set amount of work.",
  },
  {
    question: "What is the role of a Scrum Master?",
    theme: "agility",
    answers: [
      { text: "The team's direct manager", isCorrect: false },
      { text: "The project owner", isCorrect: false },
      { text: "A servant-leader who facilitates Scrum practices", isCorrect: true },
      { text: "The lead developer", isCorrect: false },
    ],
    explanation: "The Scrum Master is a servant-leader for the Scrum Team. They help remove impediments, facilitate meetings, and ensure the team follows Scrum practices.",
  },
  {
    question: "What is a Daily Standup?",
    theme: "agility",
    answers: [
      { text: "A morning exercise routine", isCorrect: false },
      { text: "A brief daily team meeting to sync up", isCorrect: true },
      { text: "A performance evaluation", isCorrect: false },
      { text: "A client presentation", isCorrect: false },
    ],
    explanation: "A Daily Standup is a short, daily meeting where the team synchronizes activities and creates plans for the next 24 hours.",
  },
  {
    question: "What is a Product Backlog?",
    theme: "agility",
    answers: [
      { text: "A list of all desired features and improvements", isCorrect: true },
      { text: "A list of bugs in the product", isCorrect: false },
      { text: "A backup of the product", isCorrect: false },
      { text: "A product review document", isCorrect: false },
    ],
    explanation: "The Product Backlog is a list of all features, enhancements, and fixes that constitute the complete set of changes to be made to the product.",
  },
  {
    question: "What is Velocity in Agile?",
    theme: "agility",
    answers: [
      { text: "The speed of software deployment", isCorrect: false },
      { text: "The measure of work completed in a sprint", isCorrect: true },
      { text: "The speed of the development server", isCorrect: false },
      { text: "The number of team members", isCorrect: false },
    ],
    explanation: "Velocity in Agile is a measure of the amount of work a team can tackle during a single sprint and is used to plan future sprints.",
  },
  {
    question: "What is a Sprint Review?",
    theme: "agility",
    answers: [
      { text: "A performance review of team members", isCorrect: false },
      { text: "A meeting to demonstrate completed work", isCorrect: true },
      { text: "A code review session", isCorrect: false },
      { text: "A planning meeting", isCorrect: false },
    ],
    explanation: "A Sprint Review is held at the end of the sprint to demonstrate the work done to the stakeholders and gather feedback.",
  },
  {
    question: "What is the purpose of Sprint Planning?",
    theme: "agility",
    answers: [
      { text: "To assign annual goals", isCorrect: false },
      { text: "To plan the team's vacation schedule", isCorrect: false },
      { text: "To select and plan work for the upcoming sprint", isCorrect: true },
      { text: "To review past performance", isCorrect: false },
    ],
    explanation: "Sprint Planning is an event in Scrum that defines what can be delivered in the Sprint and how that work will be achieved.",
  },
  {
    question: "What is a User Story?",
    theme: "agility",
    answers: [
      { text: "A fictional tale about users", isCorrect: false },
      { text: "A description of a feature from the user's perspective", isCorrect: true },
      { text: "A user complaint", isCorrect: false },
      { text: "A user manual", isCorrect: false },
    ],
    explanation: "A User Story is a tool used in Agile software development to capture a description of a software feature from an end-user perspective.",
  },
  {
    question: "What is the Agile Manifesto?",
    theme: "agility",
    answers: [
      { text: "A legal document", isCorrect: false },
      { text: "A software license", isCorrect: false },
      { text: "A set of core values and principles for Agile development", isCorrect: true },
      { text: "A project management tool", isCorrect: false },
    ],
    explanation: "The Agile Manifesto is a declaration of the core values and principles that guide Agile software development.",
  },

  // Sports Questions (10)
  {
    question: "Which sport is known as 'The Beautiful Game'?",
    theme: "sports",
    answers: [
      { text: "Basketball", isCorrect: false },
      { text: "Football (Soccer)", isCorrect: true },
      { text: "Tennis", isCorrect: false },
      { text: "Rugby", isCorrect: false },
    ],
    explanation: "Football (Soccer) is known as 'The Beautiful Game' due to its flowing nature, artistic qualities, and universal appeal around the world.",
  },
  {
    question: "How many players are on a standard basketball team on court?",
    theme: "sports",
    answers: [
      { text: "5", isCorrect: true },
      { text: "6", isCorrect: false },
      { text: "7", isCorrect: false },
      { text: "4", isCorrect: false },
    ],
    explanation: "A standard basketball team has 5 players on the court at any given time.",
  },
  {
    question: "In which sport would you perform a 'slam dunk'?",
    theme: "sports",
    answers: [
      { text: "Volleyball", isCorrect: false },
      { text: "Tennis", isCorrect: false },
      { text: "Basketball", isCorrect: true },
      { text: "Football", isCorrect: false },
    ],
    explanation: "A 'slam dunk' is a type of shot in basketball where the player jumps and forces the ball down through the hoop.",
  },
  {
    question: "How many points is a try worth in rugby union?",
    theme: "sports",
    answers: [
      { text: "3", isCorrect: false },
      { text: "4", isCorrect: false },
      { text: "5", isCorrect: true },
      { text: "6", isCorrect: false },
    ],
    explanation: "In rugby union, a try is worth 5 points and is scored when a player grounds the ball in the opposition's in-goal area.",
  },
  {
    question: "What is the duration of a professional football (soccer) match?",
    theme: "sports",
    answers: [
      { text: "80 minutes", isCorrect: false },
      { text: "85 minutes", isCorrect: false },
      { text: "90 minutes", isCorrect: true },
      { text: "100 minutes", isCorrect: false },
    ],
    explanation: "A professional football (soccer) match typically lasts for 90 minutes, divided into two 45-minute halves.",
  },
  {
    question: "In tennis, what is a 'Grand Slam'?",
    theme: "sports",
    answers: [
      { text: "Winning all four major tournaments in a calendar year", isCorrect: true },
      { text: "Scoring four points in a row", isCorrect: false },
      { text: "Winning a match without losing a game", isCorrect: false },
      { text: "A powerful serve", isCorrect: false },
    ],
    explanation: "In tennis, a 'Grand Slam' refers to winning all four major tournaments (Australian Open, French Open, Wimbledon, and US Open) in a single calendar year.",
  },
  {
    question: "Which country invented table tennis?",
    theme: "sports",
    answers: [
      { text: "China", isCorrect: false },
      { text: "Japan", isCorrect: false },
      { text: "England", isCorrect: true },
      { text: "USA", isCorrect: false },
    ],
    explanation: "Table tennis was invented in England in the early 20th century.",
  },
  {
    question: "How many players are there in a volleyball team on court?",
    theme: "sports",
    answers: [
      { text: "5", isCorrect: false },
      { text: "6", isCorrect: true },
      { text: "7", isCorrect: false },
      { text: "8", isCorrect: false },
    ],
    explanation: "A volleyball team has 6 players on the court at a time.",
  },
  {
    question: "What is the maximum number of clubs allowed in a golf bag during a round?",
    theme: "sports",
    answers: [
      { text: "12", isCorrect: false },
      { text: "14", isCorrect: true },
      { text: "16", isCorrect: false },
      { text: "18", isCorrect: false },
    ],
    explanation: "The maximum number of clubs allowed in a golf bag during a round is 14.",
  },
  {
    question: "In which sport would you use a 'shuttlecock'?",
    theme: "sports",
    answers: [
      { text: "Table Tennis", isCorrect: false },
      { text: "Tennis", isCorrect: false },
      { text: "Badminton", isCorrect: true },
      { text: "Squash", isCorrect: false },
    ],
    explanation: "A 'shuttlecock' is used in the sport of badminton.",
  },

  // Customer Service Questions (10)
  {
    question: "What is the first step in handling a customer complaint?",
    theme: "customer",
    answers: [
      { text: "Solve the problem immediately", isCorrect: false },
      { text: "Listen actively to the customer", isCorrect: true },
      { text: "Transfer to a supervisor", isCorrect: false },
      { text: "Offer a refund", isCorrect: false },
    ],
    explanation: "Active listening is crucial as the first step because it helps understand the customer's issue fully, shows respect, and ensures the right solution is found.",
  },
  {
    question: "What does 'CRM' stand for in customer service?",
    theme: "customer",
    answers: [
      { text: "Customer Return Management", isCorrect: false },
      { text: "Customer Relationship Management", isCorrect: true },
      { text: "Customer Response Method", isCorrect: false },
      { text: "Customer Review Monitor", isCorrect: false },
    ],
    explanation: "'CRM' stands for Customer Relationship Management, which involves strategies and technologies used to manage and analyze customer interactions and data.",
  },
  {
    question: "What is empathy in customer service?",
    theme: "customer",
    answers: [
      { text: "Agreeing with everything the customer says", isCorrect: false },
      { text: "Understanding and sharing the customer's feelings", isCorrect: true },
      { text: "Following company policy strictly", isCorrect: false },
      { text: "Offering immediate solutions", isCorrect: false },
    ],
    explanation: "Empathy in customer service is the ability to understand and share the feelings of the customer, showing that you care about their situation.",
  },
  {
    question: "What is the best way to handle an angry customer?",
    theme: "customer",
    answers: [
      { text: "Interrupt them to correct their misconceptions", isCorrect: false },
      { text: "Remain calm and listen patiently", isCorrect: true },
      { text: "Transfer them immediately", isCorrect: false },
      { text: "End the conversation quickly", isCorrect: false },
    ],
    explanation: "The best way to handle an angry customer is to remain calm, listen patiently, and acknowledge their feelings before attempting to resolve the issue.",
  },
  {
    question: "What is a service level agreement (SLA)?",
    theme: "customer",
    answers: [
      { text: "A customer complaint form", isCorrect: false },
      { text: "A contract defining service expectations", isCorrect: true },
      { text: "A customer satisfaction survey", isCorrect: false },
      { text: "A training manual", isCorrect: false },
    ],
    explanation: "A service level agreement (SLA) is a contract between a service provider and the end user that defines the level of service expected from the service provider.",
  },
  {
    question: "What is the purpose of customer feedback?",
    theme: "customer",
    answers: [
      { text: "To evaluate employee performance only", isCorrect: false },
      { text: "To improve products and services", isCorrect: true },
      { text: "To create marketing materials", isCorrect: false },
      { text: "To set prices", isCorrect: false },
    ],
    explanation: "The purpose of customer feedback is to gather insights that can be used to improve products and services, and to enhance the overall customer experience.",
  },
  {
    question: "What is a key component of good customer service?",
    theme: "customer",
    answers: [
      { text: "Speaking quickly", isCorrect: false },
      { text: "Clear communication", isCorrect: true },
      { text: "Short conversations", isCorrect: false },
      { text: "Using technical terms", isCorrect: false },
    ],
    explanation: "Clear communication is a key component of good customer service, ensuring that customers understand the information being conveyed and feel understood.",
  },
  {
    question: "What is the purpose of customer segmentation?",
    theme: "customer",
    answers: [
      { text: "To discriminate against customers", isCorrect: false },
      { text: "To provide targeted, relevant service", isCorrect: true },
      { text: "To reduce service costs", isCorrect: false },
      { text: "To simplify reporting", isCorrect: false },
    ],
    explanation: "Customer segmentation is used to divide customers into groups based on shared characteristics, allowing businesses to provide more targeted and relevant service.",
  },
  {
    question: "What is First Contact Resolution (FCR)?",
    theme: "customer",
    answers: [
      { text: "The first time a customer calls", isCorrect: false },
      { text: "Resolving issues in the first interaction", isCorrect: true },
      { text: "The first response to an email", isCorrect: false },
      { text: "First level support", isCorrect: false },
    ],
    explanation: "First Contact Resolution (FCR) refers to resolving customer issues during the first interaction, whether it's a call, email, or chat.",
  },
  {
    question: "What is the importance of follow-up in customer service?",
    theme: "customer",
    answers: [
      { text: "To increase sales", isCorrect: false },
      { text: "To ensure customer satisfaction and resolution", isCorrect: true },
      { text: "To meet call quotas", isCorrect: false },
      { text: "To collect data", isCorrect: false },
    ],
    explanation: "Follow-up in customer service is important to ensure customer satisfaction, confirm that the issue has been fully resolved, and build lasting relationships.",
  },

  // General Culture Questions (20)
  {
    question: "Quelle est la capitale de l'Australie?",
    theme: "general",
    answers: [
      { text: "Sydney", isCorrect: false },
      { text: "Melbourne", isCorrect: false },
      { text: "Canberra", isCorrect: true },
      { text: "Brisbane", isCorrect: false },
    ],
    explanation: "Canberra est la capitale de l'Australie, et non pas Sydney comme beaucoup le pensent.",
  },
  {
    question: "Qui a peint 'La Nuit étoilée'?",
    theme: "general",
    answers: [
      { text: "Pablo Picasso", isCorrect: false },
      { text: "Vincent van Gogh", isCorrect: true },
      { text: "Claude Monet", isCorrect: false },
      { text: "Salvador Dalí", isCorrect: false },
    ],
    explanation: "'La Nuit étoilée' a été peinte par Vincent van Gogh en 1889.",
  },
  {
    question: "Quel est l'élément chimique le plus abondant dans l'univers?",
    theme: "general",
    answers: [
      { text: "Oxygène", isCorrect: false },
      { text: "Carbone", isCorrect: false },
      { text: "Hydrogène", isCorrect: true },
      { text: "Hélium", isCorrect: false },
    ],
    explanation: "L'hydrogène est l'élément le plus abondant dans l'univers, représentant environ 75% de la masse totale.",
  },
  {
    question: "En quelle année a eu lieu la Révolution française?",
    theme: "general",
    answers: [
      { text: "1789", isCorrect: true },
      { text: "1776", isCorrect: false },
      { text: "1804", isCorrect: false },
      { text: "1815", isCorrect: false },
    ],
    explanation: "La Révolution française a débuté en 1789 avec la prise de la Bastille le 14 juillet.",
  },
  {
    question: "Qui a écrit 'Les Misérables'?",
    theme: "general",
    answers: [
      { text: "Émile Zola", isCorrect: false },
      { text: "Victor Hugo", isCorrect: true },
      { text: "Gustave Flaubert", isCorrect: false },
      { text: "Alexandre Dumas", isCorrect: false },
    ],
    explanation: "'Les Misérables' a été écrit par Victor Hugo et publié en 1862.",
  },
  {
    question: "Quel est le plus grand désert du monde?",
    theme: "general",
    answers: [
      { text: "Le Sahara", isCorrect: false },
      { text: "L'Antarctique", isCorrect: true },
      { text: "Le désert de Gobi", isCorrect: false },
      { text: "Le désert d'Atacama", isCorrect: false },
    ],
    explanation: "L'Antarctique est techniquement le plus grand désert du monde car il reçoit très peu de précipitations.",
  },
  {
    question: "Quelle est la plus haute montagne du monde?",
    theme: "general",
    answers: [
      { text: "Le K2", isCorrect: false },
      { text: "Le Mont Blanc", isCorrect: false },
      { text: "L'Everest", isCorrect: true },
      { text: "Le Kilimandjaro", isCorrect: false },
    ],
    explanation: "L'Everest est la plus haute montagne du monde avec une altitude de 8 848 mètres.",
  },
  {
    question: "Qui était le premier homme à marcher sur la Lune?",
    theme: "general",
    answers: [
      { text: "Buzz Aldrin", isCorrect: false },
      { text: "Neil Armstrong", isCorrect: true },
      { text: "Youri Gagarine", isCorrect: false },
      { text: "Alan Shepard", isCorrect: false },
    ],
    explanation: "Neil Armstrong a été le premier homme à marcher sur la Lune le 20 juillet 1969.",
  },
  {
    question: "Quel est l'organe le plus grand du corps humain?",
    theme: "general",
    answers: [
      { text: "Le foie", isCorrect: false },
      { text: "Les poumons", isCorrect: false },
      { text: "La peau", isCorrect: true },
      { text: "Les intestins", isCorrect: false },
    ],
    explanation: "La peau est le plus grand organe du corps humain, couvrant environ 2 mètres carrés chez un adulte.",
  },
  {
    question: "Qui a inventé le téléphone?",
    theme: "general",
    answers: [
      { text: "Thomas Edison", isCorrect: false },
      { text: "Alexander Graham Bell", isCorrect: true },
      { text: "Nikola Tesla", isCorrect: false },
      { text: "Guglielmo Marconi", isCorrect: false },
    ],
    explanation: "Alexander Graham Bell a breveté le premier téléphone en 1876.",
  },
  {
    question: "Quelle est la plus grande planète du système solaire?",
    theme: "general",
    answers: [
      { text: "Saturne", isCorrect: false },
      { text: "Jupiter", isCorrect: true },
      { text: "Uranus", isCorrect: false },
      { text: "Neptune", isCorrect: false },
    ],
    explanation: "Jupiter est la plus grande planète du système solaire, avec un diamètre d'environ 139 820 kilomètres.",
  },
  {
    question: "Qui a écrit 'Don Quichotte'?",
    theme: "general",
    answers: [
      { text: "Miguel de Cervantes", isCorrect: true },
      { text: "Federico García Lorca", isCorrect: false },
      { text: "Pablo Neruda", isCorrect: false },
      { text: "Gabriel García Márquez", isCorrect: false },
    ],
    explanation: "'Don Quichotte' a été écrit par Miguel de Cervantes et publié en deux parties (1605 et 1615).",
  },
  {
    question: "Quel est le plus long fleuve du monde?",
    theme: "general",
    answers: [
      { text: "Le Nil", isCorrect: true },
      { text: "L'Amazone", isCorrect: false },
      { text: "Le Mississippi", isCorrect: false },
      { text: "Le Yangtsé", isCorrect: false },
    ],
    explanation: "Le Nil est considéré comme le plus long fleuve du monde avec environ 6 650 kilomètres.",
  },
  {
    question: "Qui a peint le plafond de la Chapelle Sixtine?",
    theme: "general",
    answers: [
      { text: "Léonard de Vinci", isCorrect: false },
      { text: "Michel-Ange", isCorrect: true },
      { text: "Raphaël", isCorrect: false },
      { text: "Botticelli", isCorrect: false },
    ],
    explanation: "Michel-Ange a peint le plafond de la Chapelle Sixtine entre 1508 et 1512.",
  },
  {
    question: "Quel est le symbole chimique de l'argent?",
    theme: "general",
    answers: [
      { text: "Au", isCorrect: false },
      { text: "Ag", isCorrect: true },
      { text: "Fe", isCorrect: false },
      { text: "Cu", isCorrect: false },
    ],
    explanation: "Le symbole chimique de l'argent est Ag, dérivé du latin 'argentum'.",
  },
  {
    question: "Dans quelle ville se trouve la Tour Eiffel?",
    theme: "general",
    answers: [
      { text: "Lyon", isCorrect: false },
      { text: "Marseille", isCorrect: false },
      { text: "Paris", isCorrect: true },
      { text: "Bordeaux", isCorrect: false },
    ],
    explanation: "La Tour Eiffel se trouve à Paris et a été construite pour l'Exposition universelle de 1889.",
  },
  {
    question: "Qui a découvert la pénicilline?",
    theme: "general",
    answers: [
      { text: "Louis Pasteur", isCorrect: false },
      { text: "Alexander Fleming", isCorrect: true },
      { text: "Marie Curie", isCorrect: false },
      { text: "Robert Koch", isCorrect: false },
    ],
    explanation: "Alexander Fleming a découvert la pénicilline en 1928, de façon accidentelle.",
  },
  {
    question: "Quel est le plus petit pays du monde?",
    theme: "general",
    answers: [
      { text: "Monaco", isCorrect: false },
      { text: "Le Vatican", isCorrect: true },
      { text: "Saint-Marin", isCorrect: false },
      { text: "Liechtenstein", isCorrect: false },
    ],
    explanation: "Le Vatican est le plus petit pays du monde avec une superficie de 0,44 km².",
  },
  {
    question: "Qui était le dieu grec de la mer?",
    theme: "general",
    answers: [
      { text: "Zeus", isCorrect: false },
      { text: "Hadès", isCorrect: false },
      { text: "Poséidon", isCorrect: true },
      { text: "Arès", isCorrect: false },
    ],
    explanation: "Poséidon était le dieu grec de la mer, des tremblements de terre et des chevaux.",
  },
  {
    question: "Quelle est la capitale du Japon?",
    theme: "general",
    answers: [
      { text: "Osaka", isCorrect: false },
      { text: "Kyoto", isCorrect: false },
      { text: "Tokyo", isCorrect: true },
      { text: "Yokohama", isCorrect: false },
    ],
    explanation: "Tokyo est la capitale du Japon depuis 1868.",
  }
];
