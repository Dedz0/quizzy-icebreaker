import React, { createContext, useContext, useState } from "react";

type Language = "en" | "fr" | "es" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "welcome": "Welcome to Icebreaker Quiz!",
    "enter.username": "Enter your username",
    "start": "Start Quiz",
    "select.theme": "Select a Theme",
    "agility": "Agility",
    "sports": "Sports",
    "culture": "General Culture",
    "customer": "Customer Care",
    "time.remaining": "Time Remaining",
    "next": "Next",
    "submit": "Submit",
    "score": "Your Score",
  },
  fr: {
    "welcome": "Bienvenue au Quiz Brise-glace !",
    "enter.username": "Entrez votre nom d'utilisateur",
    "start": "Commencer le Quiz",
    "select.theme": "Sélectionnez un Thème",
    "agility": "Agilité",
    "sports": "Sports",
    "culture": "Culture Générale",
    "customer": "Service Client",
    "time.remaining": "Temps Restant",
    "next": "Suivant",
    "submit": "Soumettre",
    "score": "Votre Score",
  },
  es: {
    "welcome": "¡Bienvenido al Quiz Rompehielos!",
    "enter.username": "Ingresa tu nombre de usuario",
    "start": "Comenzar Quiz",
    "select.theme": "Selecciona un Tema",
    "agility": "Agilidad",
    "sports": "Deportes",
    "culture": "Cultura General",
    "customer": "Atención al Cliente",
    "time.remaining": "Tiempo Restante",
    "next": "Siguiente",
    "submit": "Enviar",
    "score": "Tu Puntaje",
  },
  de: {
    "welcome": "Willkommen beim Eisbrecher-Quiz!",
    "enter.username": "Benutzername eingeben",
    "start": "Quiz starten",
    "select.theme": "Wähle ein Thema",
    "agility": "Agilität",
    "sports": "Sport",
    "culture": "Allgemeinwissen",
    "customer": "Kundenbetreuung",
    "time.remaining": "Verbleibende Zeit",
    "next": "Weiter",
    "submit": "Absenden",
    "score": "Deine Punktzahl",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations["en"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};