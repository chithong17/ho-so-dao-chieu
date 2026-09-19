'use client';
import {createContext,useContext,useReducer,useEffect,useRef,useState,useCallback,type ReactNode,type Dispatch} from 'react';
import {createState,reduceGame} from '../game/engine';
import {getConfig} from '../game/config';
import {initialSelection,readSave,saveKey} from '../game/storage';
import type {Action,GameState,Mode,Difficulty} from '../game/types';
export type TrackedMission = {
  taskId: string;
  taskTitle: string;
  evidenceIds: string[];
} | null;

export type CompetitionBridge={state:GameState;version:number;showIntro:boolean;send:(action:Action,version:number)=>Promise<{state:GameState;version:number}>;exit:()=>void};
type Context={state:GameState;config:ReturnType<typeof getConfig>;dispatch:Dispatch<Action>;ready:boolean;saveStatus:string;conflict:boolean;resolveConflict:()=>void;enter:(m:Mode,fresh?:boolean,difficulty?:Difficulty)=>void;home:boolean;setHome:(v:boolean)=>void;paused:boolean;setPaused:(v:boolean)=>void;reduced:boolean;setReduced:(v:boolean)=>void;trackedMission:TrackedMission;setTrackedMission:React.Dispatch<React.SetStateAction<TrackedMission>>;competitive:boolean;competitionIntro:boolean};
const GameContext=createContext<Context|null>(null);
export function GameProvider({children,competition}:{children:ReactNode;competition?:CompetitionBridge}){
 const [state,dispatch]=useReducer(reduceGame,undefined,()=>competition?.state??createState());
 const [ready,setReady]=useState(!!competition),[saveStatus,setSaveStatus]=useState(competition?'Đã kết nối phòng thi đấu':'Đang mở hồ sơ…'),[conflict,setConflict]=useState(false),[home,setHome]=useState(false),[paused,setPaused]=useState(false),[reduced,setReduced]=useState(false);
 const [trackedMission,setTrackedMission]=useState<TrackedMission>(null);

 const competitionVersion=useRef(competition?.version??0),competitionQueue=useRef(Promise.resolve());
 const customDispatch: Dispatch<Action> = useCallback((action: Action) => {
  dispatch(action);
  if(competition&&!['load','begin','tick','reopen'].includes(action.type))competitionQueue.current=competitionQueue.current.then(async()=>{try{const result=await competition.send(action,competitionVersion.current);competitionVersion.current=result.version;setSaveStatus('Đã đồng bộ với phòng');}catch{setSaveStatus('Mất đồng bộ với phòng; đang khôi phục trạng thái…');window.location.reload();}});
 }, [competition]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleInspect = (e: Event) => {
      const detail = (e as CustomEvent<{ id: string }>).detail;
      if (detail?.id) {
        customDispatch({ type: 'evidence', id: detail.id });
      }
    };
    window.addEventListener('hsdc-inspect-evidence', handleInspect);
    return () => window.removeEventListener('hsdc-inspect-evidence', handleInspect);
  }, [customDispatch]);
 const lastRaw=useRef<string|null>(null),lastRevision=useRef(0),pending=useRef<GameState|null>(null);
 const blocked=useRef(false);
 const read=useCallback((m:Mode,d:Difficulty)=>{
  try {
   const result=readSave(localStorage,m,d);
   lastRaw.current=result.raw;blocked.current=!!result.error;setConflict(!!result.error);
   setSaveStatus(result.error??(result.state?'Đã khôi phục tiến trình':'Tiến trình lưu trên thiết bị'));
   return result.state;
  } catch {blocked.current=true;setConflict(true);setSaveStatus('Không đọc được bản lưu. Lưu đang tạm dừng.');return null;}
 },[]);
 const flush=useCallback(()=>{
  const next=pending.current;
  if(!next||blocked.current)return;
  try {
   const key=saveKey(next.mode,next.difficulty);
   if(localStorage.getItem(key)!==lastRaw.current){blocked.current=true;setConflict(true);setSaveStatus('Một tab khác vừa cập nhật tiến trình.');return;}
   const raw=JSON.stringify(next);localStorage.setItem(key,raw);lastRaw.current=raw;lastRevision.current=next.revision;pending.current=null;setSaveStatus('Đã lưu trên thiết bị');
  }catch{setSaveStatus('Không lưu được; bạn vẫn có thể tiếp tục chơi trong tab này.');}
 },[]);
 useEffect(()=>{
  if(competition){competitionVersion.current=competition.version;return;}
  let selection:{mode:Mode;difficulty:Difficulty;reduced:boolean}={mode:'individual',difficulty:'easy',reduced:false};
  try{selection=initialSelection(localStorage);}catch{/* read below reports unavailable storage */}
  setReduced(selection.reduced);
  const saved=read(selection.mode,selection.difficulty);
  if(saved&&Array.isArray(saved.opened)&&Object.keys(saved.answers??{}).length===0&&!saved.opened.includes('EZ02')&&!saved.opened.includes('E03')){
   saved.opened=saved.opened.filter(id=>id!=='EZ01'&&id!=='E01'&&id!=='E02');
  }
  dispatch({type:'load',state:saved??createState(selection.mode,selection.difficulty)});
  lastRevision.current=saved?.revision??0;setReady(true);
 },[read,competition]);
 useEffect(()=>{
  if(competition||!ready||conflict||state.revision===lastRevision.current)return;
  pending.current=state;
  const timer=setTimeout(flush,250);window.addEventListener('pagehide',flush);
  return()=>{clearTimeout(timer);window.removeEventListener('pagehide',flush);};
 },[state,ready,conflict,flush,competition]);
 useEffect(()=>{
  if(competition)return;const onStorage=(e:StorageEvent)=>{
   if((e.key===null||e.key===saveKey(state.mode,state.difficulty))&&e.newValue!==lastRaw.current){blocked.current=true;setConflict(true);setSaveStatus('Tiến trình đã thay đổi trong tab khác.');}
  };
  window.addEventListener('storage',onStorage);return()=>window.removeEventListener('storage',onStorage);
 },[state.mode,state.difficulty,competition]);
 useEffect(()=>{if(!ready||paused||home||conflict)return;const timer=setInterval(()=>{if(document.visibilityState==='visible')dispatch({type:'tick',seconds:5});},5000);return()=>clearInterval(timer);},[ready,paused,home,conflict]);
 useEffect(()=>{if(!ready)return;document.documentElement.dataset.motion=reduced?'reduce':'normal';if(!competition)try{localStorage.setItem('hsdc:settings:v1',JSON.stringify({mode:state.mode,difficulty:state.difficulty,reduced}));}catch{/* optional preferences */}},[ready,state.mode,state.difficulty,reduced,competition]);
 const setHomeSafe=(value:boolean)=>{if(competition&&value){competition.exit();return;}setHome(value);};
 const enter=(m:Mode,fresh=false,difficulty:Difficulty=state.difficulty)=>{
  // Flush outgoing changes before switching slots, including the debounce window.
  if(!(fresh&&m===state.mode&&difficulty===state.difficulty)){
   if(state.revision!==lastRevision.current)pending.current=state;
   flush();
  }
  pending.current=null;
  const saved=fresh?null:read(m,difficulty);
  const next=saved??createState(m,difficulty);
  if(fresh){
   blocked.current=false;setConflict(false);
   try{const raw=JSON.stringify(next);localStorage.setItem(saveKey(m,difficulty),raw);lastRaw.current=raw;setSaveStatus('Đã bắt đầu lượt mới');}
   catch{lastRaw.current=null;setSaveStatus('Chơi trong bộ nhớ; chưa lưu được trên thiết bị.');}
  }
  lastRevision.current=next.revision;dispatch({type:'load',state:next});setHome(false);setPaused(false);setTrackedMission(null);
 };
 const resolveConflict=()=>{const saved=read(state.mode,state.difficulty);if(saved){pending.current=null;dispatch({type:'load',state:saved});lastRevision.current=saved.revision;setSaveStatus('Đã tải tiến trình mới nhất');}};
 return <GameContext.Provider value={{state,config:getConfig(state.difficulty),dispatch:customDispatch,ready,saveStatus,conflict,resolveConflict,enter,home,setHome:setHomeSafe,paused,setPaused,reduced,setReduced,trackedMission,setTrackedMission,competitive:!!competition,competitionIntro:competition?.showIntro??false}}>{children}</GameContext.Provider>;
}
export function useGame(){const c=useContext(GameContext);if(!c)throw new Error('GameProvider missing');return c;}
