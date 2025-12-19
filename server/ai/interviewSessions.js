import { randomUUID } from "crypto";

const sessions = new Map();

export const createInterviewSession = (candidateProfile) => {
  const sessionId = randomUUID();

sessions.set(sessionId, {
  sessionId,
  candidateProfile,
  questionsAsked: [],
  answers: [],
  evaluations: [],
  currentStep: 0,
  maxQuestions: 5
});

  return sessionId;
};

export const getInterviewSession = (sessionId) => {
  return sessions.get(sessionId);
};

export const updateInterviewSession = (sessionId, question) => {
  const session = sessions.get(sessionId);

  if (!session) return null;

  session.questionsAsked.push(question);
  session.currentStep += 1;

  sessions.set(sessionId, session);
  return session;
};

export const saveAnswerEvaluation = (sessionId, data) => {
  const session = sessions.get(sessionId);
  if (!session) return null;

  session.answers.push({
    question: data.question,
    answer: data.answer
  });

  session.evaluations.push(data.evaluation);
  sessions.set(sessionId, session);
  return session;
};
