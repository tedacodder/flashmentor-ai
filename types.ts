
export interface UserProfile {
  name: string;
  email: string;
  level: number;
  xp: number;
  badges: Badge[];
  institutionType: 'University' | 'High School';
  institutionName: string;
  year: string;
  department: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: QuizQuestion[];
  score?: number;
  timestamp: number;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  mastery: number; // 0 to 5
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface StudyStats {
  date: string;
  minutes: number;
  quizzes: number;
}
