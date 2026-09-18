import {validateSave} from './engine';
import type {Difficulty,GameState,Mode} from './types';
export const saveKey=(mode:Mode,difficulty:Difficulty)=>`hsdc:save:${mode}:${difficulty}:v2`;
export const legacyKey=(mode:Mode)=>`hsdc:save:${mode}:v1`;
export function readSave(storage:Storage,mode:Mode,difficulty:Difficulty):{state:GameState|null;raw:string|null;error:string|null} {
 const key=saveKey(mode,difficulty),raw=storage.getItem(key);
 const old=raw===null&&difficulty==='standard'?storage.getItem(legacyKey(mode)):null;
 const source=raw??old;
 if(source===null)return {state:null,raw,error:null};
 try {
  const result=validateSave(JSON.parse(source));
  if(!result.state)return {state:null,raw,error:result.error};
  if(result.state.mode!==mode||result.state.difficulty!==difficulty)return {state:null,raw,error:'Chế độ trong bản lưu không khớp. Bản lưu được giữ nguyên.'};
  if(raw===null){
   const migrated=JSON.stringify(result.state);
   // Preserve both the original and any v2 save that already exists.
   if(storage.getItem(key)!==null)return readSave(storage,mode,difficulty);
   storage.setItem(key,migrated);
   return {state:result.state,raw:migrated,error:null};
  }
  return {state:result.state,raw,error:null};
 } catch {return {state:null,raw,error:'Không đọc được bản lưu. Dữ liệu cũ được giữ nguyên; lưu đang tạm dừng.'};}
}
export function initialSelection(storage:Storage):{mode:Mode;difficulty:Difficulty;reduced:boolean} {
 let settings:Record<string,unknown>={};
 try{settings=JSON.parse(storage.getItem('hsdc:settings:v1')??'{}')??{};}catch{/* optional preferences */}
 const mode:Mode=settings.mode==='presenter'?'presenter':'individual';
 if(settings.difficulty==='easy'||settings.difficulty==='standard')return {mode,difficulty:settings.difficulty,reduced:settings.reduced===true};
 // Detect corrupt saves too, so they are reported instead of silently replaced.
 for(const m of [mode,mode==='individual'?'presenter':'individual'] as Mode[]){
  for(const difficulty of ['standard','easy'] as Difficulty[]){
   if(storage.getItem(saveKey(m,difficulty))!==null||(difficulty==='standard'&&storage.getItem(legacyKey(m))!==null))return {mode:m,difficulty,reduced:settings.reduced===true};
  }
 }
 return {mode,difficulty:'easy',reduced:settings.reduced===true};
}
