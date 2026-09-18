import { tasks, recoveryActions, chainOptions, reportOptions, relationOptions, initialOptions } from './tasks';
import { evidence } from './evidence';
import type { Answer, Evaluation, GameState, Mode, Action, Verdict, Result, Chapter } from './types';
const sameSet=(a:string[],b:string[])=>a.length===b.length&&new Set(a).size===a.length&&b.every(x=>a.includes(x));
const chain=['requirement','mismatch','reject','failure'];
export function emptyAnswer(id:string):Answer {
 const task=tasks.find(t=>t.id===id)!;
 switch(task.kind){
  case 'classify':return {kind:'classify',categories:{},evidence:[]};
  case 'chain':return {kind:'chain',order:[],evidence:[],relation:''};
  case 'relations':return {kind:'relations',priority:[],monitor:[],reason:''};
  case 'report':return {kind:'report',order:[],reason:''};
  case 'recovery':return {kind:'recovery',order:[],reality:'',conclusion:''};
  default:return {kind:'choices',values:{}};
 }
}
export function evaluateChallenge(id:string,a:Answer):Evaluation {
 const task=tasks.find(t=>t.id===id);
 if(!task||a.kind!==task.kind) return {score:0,met:[false,false,false,false]};
 let m:boolean[]=[false,false,false,false];
 switch(a.kind){
  case 'classify': m=[a.categories.s1==='fact',a.categories.s2==='unproven',a.categories.s3==='unproven',a.categories.s4==='supported'&&sameSet(a.evidence,['E07','E08'])];break;
  case 'chain':m=[sameSet(a.order,chain),a.order.join()===chain.join(),sameSet(a.evidence,['E04','E05']),a.relation==='decision'];break;
  case 'relations':m=[a.priority.length===2&&a.priority.includes('req_update'),a.priority.length===2&&a.priority.includes('handover_test'),sameSet(a.monitor,['test_result','condition_fallback']),a.reason==='core'];break;
  case 'report':m=[sameSet(a.order,reportOptions.map(o=>o.id)),a.order.slice(0,3).join()==='req,incompat,test',a.order.includes('impact')&&a.order.indexOf('measure')>a.order.indexOf('impact')&&a.order.indexOf('retest')>a.order.indexOf('measure'),a.reason==='structure'];break;
  case 'choices':m=task.questions!.map(q=>a.values[q.id]===q.correct);break;
  case 'recovery':m=[a.reality==='available',['A1','A2','A3','A4'].every(x=>a.order.includes(x)),simulateRecovery(a.order).success,a.conclusion==='limited'];break;
 }
 return {score:m.filter(Boolean).length,met:m};
}
export function answerComplete(id:string,a:Answer):boolean {
 if(!isAnswer(id,a))return false;
 const task=tasks.find(t=>t.id===id)!;
 switch(a.kind){
  case 'classify':return ['s1','s2','s3','s4'].every(x=>!!a.categories[x])&&a.evidence.length===2;
  case 'chain':return a.order.length===4&&a.evidence.length===2&&!!a.relation;
  case 'relations':return a.priority.length===2&&a.monitor.length===2&&!!a.reason;
  case 'choices':return task.questions!.every(q=>!!a.values[q.id]);
  case 'report':return a.order.length===6&&!!a.reason;
  case 'recovery':return a.order.length>0&&!!a.reality&&!!a.conclusion;
 }
}
export function simulateRecovery(order:string[]){
 const totalTime=order.reduce((n,id)=>n+(recoveryActions.find(a=>a.id===id)?.minutes??0),0);
 const seen=new Set<string>();
 for(const id of order){const a=recoveryActions.find(a=>a.id===id);if(!a||seen.has(id))return {success:false,totalTime,message:'Hành động không hợp lệ hoặc lặp lại.'};if(a.requires&&!seen.has(a.requires))return {success:false,totalTime,message:`${id} thiếu điều kiện trước: ${a.requires}. Hãy sắp lại kế hoạch.`};seen.add(id);}
 if(totalTime>60)return {success:false,totalTime,message:`Phương án cần ${totalTime} phút, vượt thời hạn 60 phút.`};
 if(!['A1','A2','A3','A4'].every(id=>seen.has(id)))return {success:false,totalTime,message:'Chưa đủ bước chốt dữ liệu, chuyển đổi, kiểm thử và chuẩn bị local.'};
 return {success:true,totalTime,message:'Mô phỏng: demo giới hạn qua kiểm thử, còn 5 phút dự phòng. Chưa xác nhận khả năng khai thác thực tế.'};
}
export function simulateNetwork(online:boolean,converted:boolean){return {localSuccess:converted,shareAvailable:online,message:converted?'Dữ liệu hợp lệ → lưu đăng ký → tạo phiếu xác nhận.':'Thiếu fullName → từ chối dữ liệu → chưa tạo phiếu.'};}
export function simulateLinks(link:'BC'|'CA'|null){
 const edges=[['A','B'],['B','A'],['C','D'],...(link==='BC'?[['B','C']]:link==='CA'?[['C','A']]:[])];
 const queue=['A'],visited=new Set<string>();while(queue.length){const n=queue.shift()!;if(visited.has(n))continue;visited.add(n);edges.filter(e=>e[0]===n).forEach(e=>queue.push(e[1]));}
 return {success:visited.has('D'),count:edges.length,path:visited.has('D')?'A → B → C → D':'A → B → A · chưa tới D'};
}
export function deriveEnding(evaluations:Record<string,Evaluation>,v:Verdict,recovery:ReturnType<typeof simulateRecovery>):Result {
 const score=tasks.reduce((n,t)=>n+(evaluations[t.id]?.score??0),0),get=(id:string)=>evaluations[id]?.score??0;
 const ev=v.evidence;
 const backed=ev.length===4&&new Set(ev).size===4&&ev.includes('E08')&&ev.includes('E05')&&['E03','E04'].some(x=>ev.includes(x))&&['E07','E09'].some(x=>ev.includes(x));
 const threshold=score>=30&&['T01','T02','T05'].every(x=>get(x)>=3)&&backed;
 const ending=v.conclusion==='V1'||v.conclusion==='V2'?1:v.conclusion==='V4'||!threshold?2:get('T09')<3||get('T10')<3||get('T11')<4||!recovery.success?3:4;
 return {score,ending,evaluations};
}
export function resultFor(state:GameState,v:Verdict):Result {
 const evaluations=Object.fromEntries(tasks.map(t=>[t.id,state.answers[t.id]?evaluateChallenge(t.id,state.answers[t.id]):{score:0,met:[false,false,false,false]}]));
 const a=state.answers.T11;return deriveEnding(evaluations,v,simulateRecovery(a?.kind==='recovery'?a.order:[]));
}
export const chapterRequirements:Record<Chapter,{taskId:string;minimum:number}[]>={
  1:[{taskId:'T01',minimum:3},{taskId:'T02',minimum:3}],
  2:[{taskId:'T05',minimum:3},{taskId:'T07',minimum:3}],
  3:[{taskId:'T09',minimum:3},{taskId:'T11',minimum:4}]
};
export function chapterReadiness(s:GameState,c:Chapter){
 const incomplete=tasks.filter(t=>t.chapter===c&&!s.answers[t.id]).map(t=>t.id);
 const unresolved=chapterRequirements[c].filter(({taskId,minimum})=>(evaluateChallenge(taskId,s.answers[taskId]??emptyAnswer(taskId)).score)<minimum);
 return {complete:incomplete.length===0,ready:incomplete.length===0&&unresolved.length===0,incomplete,unresolved};
}
export function caseCredibility(s:GameState){
 const achieved=tasks.reduce((total,t)=>total+(s.answers[t.id]?evaluateChallenge(t.id,s.answers[t.id]).score:0),0);
 const opened=Math.min(10,s.opened.length);
 const core=([1,2,3] as Chapter[]).reduce((total,c)=>total+(chapterRequirements[c].every(r=>(evaluateChallenge(r.taskId,s.answers[r.taskId]??emptyAnswer(r.taskId)).score)>=r.minimum)?5:0),0);
 const score=Math.min(100,Math.round(15+achieved/44*60+opened+core));
 const label=score<35?'Vội kết luận':score<60?'Đang kiểm chứng':score<80?'Lập luận có cơ sở':'Hồ sơ vững';
 return {score,label};
}
export function createState(mode:Mode='individual'):GameState {return {schemaVersion:1,caseVersion:'1.1.0',caseId:'HS-01',mode,screen:'intro',chapter:1,unlocked:1,initial:null,selectedEvidence:'E01',activeTask:'T01',opened:[],pinned:[],answers:{},drafts:{},attempts:{},hints:{},experiments:{},notes:{},debriefs:[],verdict:null,result:null,elapsed:0,revision:0,updatedAt:''};}
export const chapterComplete=(s:GameState,c:Chapter)=>chapterReadiness(s,c).ready;
export function reduceGame(s:GameState,a:Action):GameState {
 if(a.type==='load')return a.state;
 if(s.screen==='result'&&!['reopen','tick'].includes(a.type))return s;
 let next=s;
 switch(a.type){
  case 'begin':if(initialOptions.some(o=>o.id===a.conclusion)&&['Thấp','Vừa','Cao'].includes(a.confidence))next={...s,initial:{conclusion:a.conclusion,confidence:a.confidence},screen:'investigation',opened:['E01','E02']};break;
  case 'evidence':if(evidence.some(e=>e.id===a.id&&e.chapter<=s.unlocked))next={...s,selectedEvidence:a.id,opened:[...new Set([...s.opened,a.id])]};break;
  case 'pin':if(evidence.some(e=>e.id===a.id&&e.chapter<=s.unlocked))next={...s,pinned:s.pinned.includes(a.id)?s.pinned.filter(x=>x!==a.id):[...s.pinned,a.id]};break;
  case 'task':if(tasks.some(t=>t.id===a.id&&t.chapter<=s.unlocked))next={...s,activeTask:a.id,chapter:tasks.find(t=>t.id===a.id)!.chapter,screen:'investigation'};break;
  case 'draft':if(isAnswer(a.id,a.answer)&&tasks.some(t=>t.id===a.id&&t.chapter<=s.unlocked))next={...s,drafts:{...s.drafts,[a.id]:a.answer}};break;
  case 'submit':{
   if(!answerComplete(a.id,a.answer)||!tasks.some(t=>t.id===a.id&&t.chapter<=s.unlocked))break;
   const prev=s.attempts[a.id]??[];if(prev.length&&JSON.stringify(prev.at(-1)!.answer)===JSON.stringify(a.answer))break;
   next={...s,answers:{...s.answers,[a.id]:a.answer},drafts:{...s.drafts,[a.id]:a.answer},attempts:{...s.attempts,[a.id]:[...prev,{answer:a.answer,evaluation:evaluateChallenge(a.id,a.answer),at:a.at}]},updatedAt:a.at};break;
  }
  case 'hint':next={...s,hints:{...s.hints,[a.id]:Math.min(2,(s.hints[a.id]??0)+1)}};break;
  case 'experiment':next={...s,experiments:{...s.experiments,[a.id]:[...new Set([...(s.experiments[a.id]??[]),a.run])]}};break;
  case 'note':next={...s,notes:{...s.notes,[a.id]:a.note.slice(0,500)}};break;
  case 'debrief':if(chapterReadiness(s,s.chapter).ready)next={...s,screen:'debrief'};break;
  case 'next':if(s.screen==='debrief'&&chapterReadiness(s,s.chapter).ready){const c=Math.min(3,s.chapter+1) as Chapter;next={...s,debriefs:[...new Set([...s.debriefs,s.chapter])],screen:s.chapter===3?'verdict':'investigation',chapter:c,unlocked:Math.max(s.unlocked,c) as Chapter,activeTask:tasks.find(t=>t.chapter===c)!.id,selectedEvidence:evidence.find(e=>e.chapter===c)!.id};}break;
  case 'chapter':if(a.chapter<=s.unlocked)next={...s,chapter:a.chapter,screen:'investigation',activeTask:tasks.find(t=>t.chapter===a.chapter)!.id,selectedEvidence:evidence.find(e=>e.chapter===a.chapter)!.id};break;
  case 'verdictDraft':if(isVerdict(a.verdict))next={...s,verdict:a.verdict};break;
  case 'finish':if(tasks.every(t=>s.answers[t.id])&&s.debriefs.length===3&&isVerdict(a.verdict))next={...s,screen:'result',verdict:a.verdict,result:resultFor(s,a.verdict)};break;
  case 'reopen':next={...s,screen:'investigation',chapter:3,result:null};break;
  case 'tick':if(s.screen!=='intro'&&s.screen!=='result')next={...s,elapsed:s.elapsed+Math.max(0,Math.min(a.seconds,10))};break;
 }
 return next===s?s:{...next,revision:s.revision+1};
}
const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const strings=(x:unknown,allowed?:string[]):x is string[]=>Array.isArray(x)&&new Set(x).size===x.length&&x.every(v=>typeof v==='string'&&(!allowed||allowed.includes(v)));
const inList=(x:unknown,values:string[])=>typeof x==='string'&&values.includes(x);
const evidenceIds=evidence.map(e=>e.id);
export function isAnswer(id:string,input:unknown):input is Answer {
 const t=tasks.find(t=>t.id===id);if(!t||!record(input)||input.kind!==t.kind)return false;
 const a=input;
 switch(a.kind){
  case 'choices':return record(a.values)&&Object.entries(a.values).every(([key,value])=>{const q=t.questions!.find(q=>q.id===key);return !!q&&inList(value,['',...q.options.map(o=>o.id)]);});
  case 'classify':return record(a.categories)&&Object.entries(a.categories).every(([k,v])=>['s1','s2','s3','s4'].includes(k)&&inList(v,['','fact','supported','unproven']))&&strings(a.evidence,evidenceIds)&&a.evidence.length<=2;
  case 'chain':return strings(a.order,chainOptions.map(o=>o.id))&&a.order.length<=4&&strings(a.evidence,evidenceIds)&&a.evidence.length<=2&&inList(a.relation,['','decision','same']);
  case 'relations':return strings(a.priority,relationOptions.map(o=>o.id))&&a.priority.length<=2&&strings(a.monitor,relationOptions.map(o=>o.id))&&a.monitor.length<=2&&inList(a.reason,['','core','expand']);
  case 'report':return strings(a.order,reportOptions.map(o=>o.id))&&inList(a.reason,['','structure','color']);
  case 'recovery':return strings(a.order,recoveryActions.map(o=>o.id))&&inList(a.reality,['','available','nothing'])&&inList(a.conclusion,['','limited','production']);
  default:return false;
 }
}
export function isVerdict(x:unknown):x is Verdict{return record(x)&&inList(x.conclusion,['V1','V2','V3','V4'])&&strings(x.evidence,evidenceIds)&&x.evidence.length<=4&&typeof x.note==='string'&&x.note.length<=500;}
export function validateSave(input:unknown):{state:GameState|null;error:string|null}{
 const fail=(error='Bản lưu không hợp lệ. Bạn có thể bắt đầu lượt mới.')=>({state:null,error});
 if(!record(input))return fail();
 if(input.schemaVersion!==1||input.caseVersion!=='1.1.0'||input.caseId!=='HS-01')return fail('Bản lưu thuộc phiên bản khác. Hãy bắt đầu lượt mới để dùng hồ sơ hiện tại.');
 if(!inList(input.mode,['individual','presenter'])||!inList(input.screen,['intro','investigation','debrief','verdict','result'])||![1,2,3].includes(Number(input.chapter))||![1,2,3].includes(Number(input.unlocked)))return fail();
 if(typeof input.chapter!=='number'||typeof input.unlocked!=='number'||input.chapter>input.unlocked)return fail();
 if(!record(input.answers)||!record(input.drafts)||!record(input.attempts)||!record(input.hints)||!record(input.experiments)||!record(input.notes))return fail();
 if(!Object.entries(input.answers).every(([id,a])=>isAnswer(id,a)&&answerComplete(id,a))||!Object.entries(input.drafts).every(([id,a])=>isAnswer(id,a)))return fail();
 if(!strings(input.opened,evidenceIds)||!strings(input.pinned,evidenceIds)||!Array.isArray(input.debriefs)||!input.debriefs.every(c=>[1,2,3].includes(c))||new Set(input.debriefs).size!==input.debriefs.length)return fail();
 if(!inList(input.selectedEvidence,evidenceIds)||!inList(input.activeTask,tasks.map(t=>t.id)))return fail();
 if(!['elapsed','revision'].every(k=>typeof input[k]==='number'&&Number.isFinite(input[k])&&Number(input[k])>=0)||typeof input.updatedAt!=='string')return fail();
 if(input.initial!==null&&(!record(input.initial)||!inList(input.initial.conclusion,initialOptions.map(o=>o.id))||!inList(input.initial.confidence,['Thấp','Vừa','Cao'])))return fail();
 if(input.screen!=='intro'&&!input.initial)return fail();
 if(input.verdict!==null&&!isVerdict(input.verdict))return fail();
 const knownTask=(id:string)=>tasks.some(t=>t.id===id);
 if(!Object.entries(input.hints).every(([id,v])=>knownTask(id)&&typeof v==='number'&&[0,1,2].includes(v))||!Object.entries(input.notes).every(([id,v])=>knownTask(id)&&typeof v==='string'&&v.length<=500)||!Object.entries(input.experiments).every(([id,v])=>knownTask(id)&&strings(v)&&v.every(s=>s.length<=100)))return fail();
 for(const [id,arr]of Object.entries(input.attempts)){if(!knownTask(id)||!Array.isArray(arr)||!arr.every(a=>record(a)&&isAnswer(id,a.answer)&&answerComplete(id,a.answer)&&typeof a.at==='string'))return fail();}
 const s=structuredClone(input) as unknown as GameState;
 for(const [id,a]of Object.entries(s.attempts))s.attempts[id]=a.map(x=>({...x,evaluation:evaluateChallenge(id,x.answer)}));
 if(s.opened.concat(s.pinned).some(id=>evidence.find(e=>e.id===id)!.chapter>s.unlocked)||Object.keys(s.answers).some(id=>tasks.find(t=>t.id===id)!.chapter>s.unlocked))return fail();
 for(let c=1;c<s.unlocked;c++)if(!chapterReadiness(s,c as Chapter).ready||!s.debriefs.includes(c as Chapter))return fail();
 if(s.screen==='debrief'&&!chapterReadiness(s,s.chapter).ready)return fail();
 if(['verdict','result'].includes(s.screen)&&(!tasks.every(t=>s.answers[t.id])||s.debriefs.length!==3))return fail();
 if(s.screen==='result'){if(!s.verdict)return fail();s.result=resultFor(s,s.verdict);}else s.result=null;
 return {state:s,error:null};
}
