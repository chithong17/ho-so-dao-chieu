import {reduceGame} from './engine';
import {getConfig} from './config';
import type {Action,GameState} from './types';

export const COMPETITION_SCORING_VERSION=1;
export const CINEMATIC_SECONDS=36;
export const SCORE_RULES={evidence:10,criterion:20,task:50,chapter:100,hint:-20,evidenceHint:-20,wrong:-10,bestFinish:300,otherFinish:120} as const;
export type CompetitionStatus='lobby'|'countdown'|'playing'|'finished'|'cancelled';
export type CompetitionRole='host'|'player';
export type ScoreEvent={key:string;kind:string;reference:string;delta:number};
export type LeaderboardEntry={id:string;name:string;score:number;rank:number;ready:boolean;connected:boolean;completedAt:number|null;scoreUpdatedAt:number|null;ending:number|null;tieTime:number;stats:{evidence:number;criteria:number;tasks:number;chapters:number;hints:number;evidenceHints:number;wrong:number;submissions:number}};
export type RoomSnapshot={id:string;code:string;status:CompetitionStatus;role:CompetitionRole;difficulty:'easy'|'standard';chapterCount:number;durationSeconds:number;maxPlayers:number;startsAt:number|null;playStartsAt:number|null;endsAt:number|null;serverNow:number;endReason:string|null;members:{id:string;name:string;role:CompetitionRole;ready:boolean;connected:boolean}[];leaderboard:LeaderboardEntry[];me?:{id:string;name:string;ready:boolean;version:number;score:number;state:GameState|null;initial:{conclusion:string;confidence:string}|null}};

export function scoreAction(before:GameState,action:Action,after:GameState,actionId:string):ScoreEvent[]{
 const events:ScoreEvent[]=[];
 const add=(key:string,kind:string,reference:string,delta:number)=>events.push({key,kind,reference,delta});
 if(action.type==='evidence'&&Object.prototype.hasOwnProperty.call(before.missionProgress??{},before.activeTask)&&getConfig(before.difficulty).tasks.find(t=>t.id===before.activeTask)?.evidence.includes(action.id))add(`evidence:${action.id}`,'evidence',action.id,SCORE_RULES.evidence);
 if(action.type==='submit'){
  const task=getConfig(before.difficulty).tasks.find(t=>t.id===action.id);
  const previous=before.attempts[action.id]?.at(-1)?.evaluation.met??[];
  const evaluation=after.attempts[action.id]?.at(-1)?.evaluation;
  if(task&&evaluation){
   add(`submission:${actionId}`,'submission',action.id,0);
   evaluation.met.forEach((met,i)=>{if(met&&!previous[i])add(`criterion:${action.id}:${i}`,'criterion',`${action.id}:${i}`,SCORE_RULES.criterion);});
   if(evaluation.score===task.criteria.length)add(`task:${action.id}`,'task',action.id,SCORE_RULES.task);
   else add(`wrong:${actionId}`,'wrong',action.id,SCORE_RULES.wrong);
  }
 }
 if(action.type==='hint'&&(after.hints[action.id]??0)>(before.hints[action.id]??0))add(`hint:${action.id}:${after.hints[action.id]}`,'hint',action.id,SCORE_RULES.hint);
 if(action.type==='unlockEvidenceHint'&&!before.unlockedEvidenceHints?.includes(action.id)&&after.unlockedEvidenceHints?.includes(action.id))add(`evidence-hint:${action.id}`,'evidenceHint',action.id,SCORE_RULES.evidenceHint);
 if(action.type==='next'&&after.screen!==before.screen&&before.screen==='debrief')add(`chapter:${before.chapter}`,'chapter',String(before.chapter),SCORE_RULES.chapter);
 if(action.type==='finish'&&after.screen==='result'&&before.screen!=='result')add('finish','finish',String(after.result?.ending??0),after.result?.ending===4?SCORE_RULES.bestFinish:SCORE_RULES.otherFinish);
 return events;
}

export function applyCompetitionAction(state:GameState,action:Action,now:string){
 if(['load','begin','tick','reopen'].includes(action.type))return state;
 const safeAction=action.type==='submit'?{...action,at:now}:action;
 return reduceGame(state,safeAction as Action);
}
