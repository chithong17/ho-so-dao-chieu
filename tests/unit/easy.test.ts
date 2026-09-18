import {describe,it,expect,beforeEach} from 'vitest';
import {getConfig,taskConcepts} from '../../game/config';
import {answerComplete,caseCredibility,chapterReadiness,createState,emptyAnswer,evaluateChallenge,isAnswer,reduceGame,resultFor,simulateEasyRecovery,validateSave} from '../../game/engine';
import {initialSelection,legacyKey,readSave,saveKey} from '../../game/storage';
import {completeEasy,easyPerfect,easyVerdict} from '../easy-fixtures';
import {completeState,perfect} from '../fixtures';
import type {Answer,Difficulty,Mode,GameState} from '../../game/types';

describe('Nội dung rút gọn, cùng luồng điều tra',()=>{
 const config=getConfig('easy');
 it('có 2 chương, 5 nhiệm vụ, 7 chứng cứ và đủ 2–3–6',()=>{
  expect(config.chapters).toHaveLength(2);expect(config.tasks).toHaveLength(5);expect(config.evidence).toHaveLength(7);
  const ids=[...new Set(config.tasks.flatMap(taskConcepts))];
  expect(ids.filter(id=>id.startsWith('NL'))).toHaveLength(2);expect(ids.filter(id=>id.startsWith('QL'))).toHaveLength(3);expect(ids.filter(id=>id.startsWith('PT'))).toHaveLength(6);
  for(const e of config.evidence){expect(config.sources[e.id]).toBeTruthy();expect(e.body.length).toBeLessThanOrEqual(3);}
  for(const task of config.tasks){expect(task.evidence.every(id=>config.evidence.some(e=>e.id===id&&e.chapter<=task.chapter))).toBe(true);for(const q of task.questions??[])expect(q.options.length).toBeLessThanOrEqual(3);if(task.orderOptions)expect(task.orderOptions).toHaveLength(3);}
 });
 for(const task of config.tasks)it(`${task.id}: chấm nội dung, không tin điểm lưu sẵn`,()=>{
  expect(answerComplete(task.id,emptyAnswer(task.id))).toBe(false);
  expect(answerComplete(task.id,easyPerfect[task.id])).toBe(true);
  expect(evaluateChallenge(task.id,easyPerfect[task.id]).score).toBe(task.criteria.length);
 });
 it('giữ tự do chọn nhiệm vụ trong chương, chặn chương và dữ kiện chưa mở',()=>{
  const s=reduceGame(createState('individual','easy'),{type:'begin',conclusion:'unknown',confidence:'Vừa'});
  expect(reduceGame(s,{type:'task',id:'N3'}).activeTask).toBe('N3');
  for(const action of [{type:'chapter' as const,chapter:2 as const},{type:'chapter' as const,chapter:3 as const},{type:'task' as const,id:'N4'},{type:'evidence' as const,id:'EZ05'},{type:'evidence' as const,id:'E01'},{type:'submit' as const,id:'T01',answer:perfect.T01,at:'x'},{type:'submit' as const,id:'N5',answer:easyPerfect.N5,at:'x'}])expect(reduceGame(s,action)).toBe(s);
  expect(reduceGame(s,{type:'debrief'})).toBe(s);
 });
 it('sai vẫn lưu để sửa; ngưỡng chương kiểm tra bài trọng tâm',()=>{
  let s=reduceGame(createState('individual','easy'),{type:'begin',conclusion:'unknown',confidence:'Vừa'});
  const wrong:Answer={kind:'easyOrder',order:['failed','changed','mismatch'],conclusion:'unchanged'};
  for(const id of ['N1','N2','N3'])s=reduceGame(s,{type:'submit',id,answer:id==='N2'?wrong:easyPerfect[id],at:'x'});
  expect(chapterReadiness(s,1).ready).toBe(false);expect(s.answers.N2).toEqual(wrong);
  const restored=validateSave(JSON.parse(JSON.stringify(s))).state!;
  expect(restored.answers.N2).toEqual(wrong);expect(restored.attempts.N2[0].evaluation.score).toBe(1);
  s=reduceGame(restored,{type:'submit',id:'N2',answer:easyPerfect.N2,at:'y'});
  expect(chapterReadiness(s,1).ready).toBe(true);expect(s.attempts.N2).toHaveLength(2);
 });
 it('qua hai giải mã tới kết luận và quay lại chương 2 sau kết quả',()=>{
  const s=completeEasy();expect(s.screen).toBe('verdict');expect(s.debriefs).toEqual([1,2]);
  const finished=reduceGame(s,{type:'finish',verdict:easyVerdict});
  expect(finished.result).toMatchObject({score:9,ending:4});expect(validateSave(finished).error).toBeNull();
  expect(reduceGame(finished,{type:'reopen'})).toMatchObject({screen:'investigation',chapter:2,activeTask:'N4',result:null});
  expect(caseCredibility({...s,opened:config.evidence.map(e=>e.id)}).score).toBe(100);
 });
 it('giữ bốn nhánh kết thúc theo chất lượng lập luận',()=>{
  const s=completeEasy();
  expect(resultFor(s,{...easyVerdict,conclusion:'V1'}).ending).toBe(1);
  expect(resultFor(s,{...easyVerdict,conclusion:'V2'}).ending).toBe(1);
  expect(resultFor(s,{...easyVerdict,conclusion:'V4'}).ending).toBe(2);
  expect(resultFor(s,{...easyVerdict,evidence:['EZ01']}).ending).toBe(2);
  s.answers.N4={kind:'choices',values:{team:'shared',progress:'V1'}};
  expect(chapterReadiness(s,2).ready).toBe(true);expect(resultFor(s,easyVerdict).ending).toBe(3);
 });
 it('mô phỏng sai không đưa ra thứ tự đúng; không dùng ngân sách thời gian',()=>{
  expect(simulateEasyRecovery(['agree','repair','check']).success).toBe(true);
  const wrong=simulateEasyRecovery(['check','repair','agree']);expect(wrong.success).toBe(false);expect(wrong.message).toContain('vị trí 1');expect(wrong.message).not.toMatch(/agree|repair|check|→/);
  expect(simulateEasyRecovery(['agree','agree','check']).success).toBe(false);
  expect(isAnswer('N5',{kind:'easyOrder',order:['A1'],conclusion:'limited'})).toBe(false);
 });
 it('bản lưu không trộn độ khó hoặc vượt khóa',()=>{
  const s=completeEasy();
  for(const changed of [{...s,difficulty:'standard'},{...s,chapter:3},{...s,unlocked:3},{...s,answers:{...s.answers,T01:perfect.T01}},{...s,opened:['E01']}])expect(validateSave(changed).state).toBeNull();
  const first=createState('individual','easy');
  expect(validateSave({...first,drafts:{N4:easyPerfect.N4}}).state).toBeNull();
  expect(validateSave({...first,unlocked:2,chapter:2}).state).toBeNull();
 });
});

describe('Bốn bản lưu và chuyển đổi v1',()=>{
 beforeEach(()=>localStorage.clear());
 const old=(s:GameState)=>{const {difficulty,...rest}=s;void difficulty;return {...rest,schemaVersion:1};};
 it('người mới mặc định Dễ; bản cũ kể cả bản hỏng được nhận diện là Tiêu chuẩn',()=>{
  expect(initialSelection(localStorage).difficulty).toBe('easy');
  localStorage.setItem(legacyKey('presenter'),'{broken');expect(initialSelection(localStorage)).toMatchObject({mode:'presenter',difficulty:'standard'});
  expect(readSave(localStorage,'presenter','standard').error).toBeTruthy();expect(localStorage.getItem(legacyKey('presenter'))).toBe('{broken');expect(localStorage.getItem(saveKey('presenter','standard'))).toBeNull();
 });
 for(const stage of ['intro','middle','result'])it(`chuyển bản cũ ở ${stage}, giữ bản gốc`,()=>{
  const s=stage==='intro'?createState():stage==='middle'?reduceGame(completeState(),{type:'chapter',chapter:2}):reduceGame(completeState(),{type:'finish',verdict:{conclusion:'V3',evidence:['E08','E05','E04','E07'],note:''}});
  const raw=JSON.stringify(old(s));localStorage.setItem(legacyKey('individual'),raw);
  const loaded=readSave(localStorage,'individual','standard');
  expect(loaded.state).toMatchObject({schemaVersion:2,difficulty:'standard',screen:s.screen,chapter:s.chapter,answers:s.answers});
  expect(localStorage.getItem(legacyKey('individual'))).toBe(raw);expect(localStorage.getItem(saveKey('individual','standard'))).toBeTruthy();
  if(stage==='result')expect(loaded.state?.result).toMatchObject({score:44,ending:4});
 });
 it('bản v2 có ưu tiên, không ghi đè hoặc chuyển đáp án giữa các lượt',()=>{
  localStorage.setItem(legacyKey('individual'),JSON.stringify(old(completeState())));
  for(const mode of ['individual','presenter'] as Mode[])for(const difficulty of ['easy','standard'] as Difficulty[]){
   const s=createState(mode,difficulty);localStorage.setItem(saveKey(mode,difficulty),JSON.stringify(s));
  }
  expect(new Set((['individual','presenter'] as Mode[]).flatMap(m=>(['easy','standard'] as Difficulty[]).map(d=>saveKey(m,d)))).size).toBe(4);
  expect(readSave(localStorage,'individual','standard').state?.screen).toBe('intro');
  expect(readSave(localStorage,'individual','easy').state?.activeTask).toBe('N1');
  localStorage.setItem(saveKey('individual','standard'),'{bad v2');
  expect(readSave(localStorage,'individual','standard').error).toBeTruthy();expect(localStorage.getItem(saveKey('individual','standard'))).toBe('{bad v2');
 });
 it('khôi phục nháp, ghi chú, thử nghiệm và tính lại điểm kết quả',()=>{
  let s=completeEasy();s=reduceGame(s,{type:'task',id:'N5'});
  s=reduceGame(s,{type:'draft',id:'N5',answer:{kind:'easyOrder',order:['check','agree'],conclusion:'limited'}});
  s=reduceGame(s,{type:'note',id:'N5',note:'Giữ ghi chú'});s=reduceGame(s,{type:'experiment',id:'N5',run:'check,agree,repair'});
  expect(validateSave(JSON.parse(JSON.stringify(s))).state).toEqual(s);
  s=reduceGame(s,{type:'finish',verdict:easyVerdict});s.result!.score=999;s.result!.ending=1;
  expect(validateSave(s).state?.result).toMatchObject({score:9,ending:4});
 });
});
