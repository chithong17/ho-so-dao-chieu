export type Chapter = 1 | 2 | 3;
export type Mode = 'individual' | 'presenter';
export type Difficulty = 'easy' | 'standard';
export type ConceptId = 'NL01'|'NL02'|'QL01'|'QL02'|'QL03'|'PT01'|'PT02'|'PT03'|'PT04'|'PT05'|'PT06';
export type Evidence = { id: string; chapter: Chapter; title: string; author: string; time: string; order: number; app: 'chat'|'mail'|'files'|'terminal'|'lab'; summary: string; body: string[]; table?: string[][]; fiction: true };
export type Concept = { id: ConceptId; title: string; explanation: string; application: string; limit: string; pages: [number,number]; slide: string };
export type Option = { id: string; label: string };
export type Question = { id: string; label: string; options: Option[]; correct: string };
export type Task = { id: string; chapter: Chapter; concept: ConceptId; concepts?: ConceptId[]; title: string; prompt: string; evidence: string[]; hints: [string,string]; kind: Answer['kind']; questions?: Question[]; orderOptions?: Option[]; correctOrder?: string[]; criteria: string[]; feedback: string[] };
export type Answer =
 | { kind: 'easyOrder'; order: string[]; conclusion: string }
 | { kind: 'classify'; categories: Record<string,string>; evidence: string[] }
 | { kind: 'chain'; order: string[]; evidence?: string[]; relation: string }
 | { kind: 'relations'; priority: string[]; monitor: string[]; reason: string }
 | { kind: 'choices'; values: Record<string,string> }
 | { kind: 'report'; order: string[]; reason: string }
 | { kind: 'recovery'; order: string[]; reality: string; conclusion: string };
export type Evaluation = { score: number; met: boolean[] };
export type Attempt = { answer: Answer; evaluation: Evaluation; at: string };
export type Verdict = { conclusion: 'V1'|'V2'|'V3'|'V4'; evidence: string[]; note: string };
export type Result = { ending: 1|2|3|4; score: number; evaluations: Record<string,Evaluation> };
export type GameState = {
 schemaVersion: 2; caseVersion: '1.1.0'; caseId: 'HS-01'; mode: Mode; difficulty: Difficulty;
 chapterLimit?: Chapter;
 screen: 'intro'|'investigation'|'debrief'|'verdict'|'result'; chapter: Chapter; unlocked: Chapter;
 initial: { conclusion: string; confidence: string } | null;
 selectedEvidence: string; activeTask: string; opened: string[]; pinned: string[];
 answers: Record<string,Answer>; drafts: Record<string,Answer>; attempts: Record<string,Attempt[]>;
 hints: Record<string,number>; experiments: Record<string,string[]>; notes: Record<string,string>;
 missionProgress?: Record<string,string[]>;
 unlockedEvidenceHints?: string[];
 debriefs: Chapter[]; verdict: Verdict | null; result: Result | null;
 elapsed: number; revision: number; updatedAt: string;
};
export type Action =
 | { type: 'load'; state: GameState }
 | { type: 'begin'; conclusion: string; confidence: string }
 | { type: 'evidence'; id: string } | { type: 'pin'; id: string }
 | { type: 'task'; id: string } | { type: 'draft'; id: string; answer: Answer }
 | { type: 'submit'; id: string; answer: Answer; at: string }
 | { type: 'hint'; id: string } | { type: 'experiment'; id: string; run: string }
 | { type: 'unlockEvidenceHint'; id: string }
 | { type: 'acceptMission'; id: string }
 | { type: 'note'; id: string; note: string }
 | { type: 'debrief' } | { type: 'next' } | { type: 'chapter'; chapter: Chapter }
 | { type: 'verdictDraft'; verdict: Verdict } | { type: 'finish'; verdict: Verdict }
 | { type: 'reopen' } | { type: 'tick'; seconds: number };
