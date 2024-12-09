import { Answer, Question } from "@/typings/typings";
import { create } from "zustand";

type QuestionStore = {
  formId: string;

  answers: Answer[];
  questions: Question[];

  setFormId: (id: string) => void;

  addQuestion: (question: Question) => void;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  removeQuestion: (id: string) => void;

  addAnswer: (answer: Answer) => void;
  updateAnswer: (id: string, updates: Partial<Answer>) => void;
};

const useQuestionStore = create<QuestionStore>((set) => ({
  formId: "",
  answers: [],
  questions: [],

  setFormId: (id) => set({ formId: id }),

  addQuestion: (question) =>
    set((state) => ({
      questions: [...state.questions, question],
    })),
  updateQuestion: (id, updates) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, ...updates } : q
      ),
    })),
  removeQuestion: (id) =>
    set((state) => ({
      questions: state.questions.filter((q) => q.id !== id),
    })),

  addAnswer: (answer) =>
    set((state) => ({
      answers: [...state.answers, answer],
    })),

  updateAnswer: (id, updates) =>
    set((state) => ({
      answers: state.answers.map((ans) =>
        ans.id === id ? { ...ans, ...updates } : ans
      ),
    })),
}));

export default useQuestionStore;
