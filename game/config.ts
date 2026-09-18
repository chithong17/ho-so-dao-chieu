import {chapters, evidence} from './evidence';
import {tasks, counterpoints, initialOptions, verdictOptions} from './tasks';
import {concepts} from './concepts';
import {easyChapters,easyEvidence,easyTasks,easyCounterpoints,easyConceptText} from './easy';
import type {Chapter,Difficulty,Task} from './types';

export type EvidenceSource='phone'|'laptop'|'files'|'board';
const sources:Record<string,EvidenceSource>={
 E01:'phone',E02:'files',E03:'laptop',E04:'laptop',E05:'laptop',E06:'laptop',E07:'phone',E08:'files',E09:'files',E10:'files',
 E11:'board',E12:'board',E13:'phone',E14:'board',E15:'board',E16:'board',E17:'phone',
 EZ01:'phone',EZ02:'phone',EZ03:'laptop',EZ04:'files',EZ05:'board',EZ06:'board',EZ07:'phone'
};
export const chapterRequirements:Record<Chapter,{taskId:string;minimum:number}[]>={
 1:[{taskId:'T01',minimum:3},{taskId:'T02',minimum:3}],
 2:[{taskId:'T05',minimum:3},{taskId:'T07',minimum:3}],
 3:[{taskId:'T09',minimum:3},{taskId:'T11',minimum:4}]
};
const easyRequirements:typeof chapterRequirements={
 1:[{taskId:'N1',minimum:1},{taskId:'N2',minimum:2}],
 2:[{taskId:'N4',minimum:1},{taskId:'N5',minimum:2}],3:[]
};
export const taskConcepts=(task:Task)=>task.concepts??[task.concept];
export const allTasks=[...tasks,...easyTasks];
export function getConfig(difficulty:Difficulty='standard') {
 const easy=difficulty==='easy';
 const selectedTasks=easy?easyTasks:tasks;
 return {
  difficulty,chapters:easy?easyChapters:chapters,tasks:selectedTasks,evidence:easy?easyEvidence:evidence,
  sources,concepts:easy?concepts.map(c=>({...c,...easyConceptText[c.id]})):concepts,counterpoints:easy?easyCounterpoints:counterpoints,
  requirements:easy?easyRequirements:chapterRequirements,
  lastChapter:(easy?2:3) as Chapter,maxScore:selectedTasks.reduce((sum,t)=>sum+t.criteria.length,0),
  duration:easy?'8–12':'15–20',recoveryTask:easy?'N5':'T11',verdictEvidenceCount:easy?1:4,
  verdictEvidence:easy?['EZ01','EZ02','EZ03']:evidence.map(e=>e.id),
  initialEvidence:[],
  initialOptions:easy?initialOptions.map(o=>({...o,label:o.id==='sabotage'?'Nam bức xúc và đã xóa tài liệu của nhóm.':o.id==='technical'?'Lỗi ở sản phẩm khiến nhóm chưa thể trình bày.':o.label})):initialOptions,
  verdictOptions:easy?verdictOptions.map(o=>({...o,label:o.id==='V3'?'Nhóm chủ động ẩn bản trình bày khi vấn đề chưa được giải quyết; chưa có căn cứ quy kết Nam phá hoại.':o.label})):verdictOptions
 };
}
