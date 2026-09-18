'use client';
import {createContext,useContext,useReducer,useEffect,useRef,useState,useCallback,type ReactNode,type Dispatch} from 'react';
import {createState,reduceGame,validateSave} from '../game/engine';
import type {Action,GameState,Mode} from '../game/types';
const key=(m:Mode)=>`hsdc:save:${m}:v1`;
type Context={state:GameState;dispatch:Dispatch<Action>;ready:boolean;saveStatus:string;conflict:boolean;resolveConflict:()=>void;enter:(m:Mode,fresh?:boolean)=>void;home:boolean;setHome:(v:boolean)=>void;paused:boolean;setPaused:(v:boolean)=>void;reduced:boolean;setReduced:(v:boolean)=>void};
const GameContext=createContext<Context|null>(null);
export function GameProvider({children}:{children:ReactNode}){
 const [state,dispatch]=useReducer(reduceGame,undefined,()=>createState());
 const [ready,setReady]=useState(false),[saveStatus,setSaveStatus]=useState('Đang mở hồ sơ…'),[conflict,setConflict]=useState(false),[home,setHome]=useState(false),[paused,setPaused]=useState(false),[reduced,setReduced]=useState(false);
 const lastRaw=useRef<string|null>(null),lastRevision=useRef(-1),pending=useRef<GameState|null>(null);
 const read=useCallback((m:Mode)=>{try{const raw=localStorage.getItem(key(m));lastRaw.current=raw;if(!raw)return null;const v=validateSave(JSON.parse(raw));if(v.error){setSaveStatus(v.error);setConflict(true);return null;}if(v.state?.mode!==m){setSaveStatus('Chế độ trong bản lưu không khớp. Hãy bắt đầu lượt mới.');setConflict(true);return null;}return v.state;}catch{setSaveStatus('Không đọc được bản lưu. Lượt mới vẫn có thể chơi trên thiết bị này.');setConflict(true);return null;}},[]);
 // A hydration effect reads this device's storage only after server rendering.
 // eslint-disable-next-line react-hooks/set-state-in-effect
 useEffect(()=>{let m:Mode='individual';try{const settings=JSON.parse(localStorage.getItem('hsdc:settings:v1')??'{}');m=settings.mode==='presenter'?'presenter':'individual';setReduced(settings.reduced===true);}catch{/* preferences are optional */}const s=read(m);dispatch({type:'load',state:s??createState(m)});lastRevision.current=s?.revision??0;if(s)setSaveStatus('Đã khôi phục tiến trình');else if(!lastRaw.current)setSaveStatus('Tiến trình lưu trên thiết bị');setReady(true);},[read]);
 useEffect(()=>{if(!ready||conflict||state.revision===lastRevision.current)return;
 const flush=()=>{try{if(localStorage.getItem(key(state.mode))!==lastRaw.current){setConflict(true);setSaveStatus('Một tab khác vừa cập nhật tiến trình.');return;}const raw=JSON.stringify(state);localStorage.setItem(key(state.mode),raw);lastRaw.current=raw;lastRevision.current=state.revision;pending.current=null;setSaveStatus('Đã lưu trên thiết bị');}catch{setSaveStatus('Không lưu được; bạn vẫn có thể tiếp tục chơi trong tab này.');}};
 pending.current=state;const timer=setTimeout(flush,250);window.addEventListener('pagehide',flush);return()=>{clearTimeout(timer);window.removeEventListener('pagehide',flush);};
 },[state,ready,conflict]);
 useEffect(()=>{const onStorage=(e:StorageEvent)=>{if(e.key===key(state.mode)&&e.newValue!==lastRaw.current){setConflict(true);setSaveStatus('Tiến trình đã thay đổi trong tab khác.');}};window.addEventListener('storage',onStorage);return()=>window.removeEventListener('storage',onStorage);},[state.mode]);
 useEffect(()=>{if(!ready||paused||home||conflict)return;const timer=setInterval(()=>{if(document.visibilityState==='visible')dispatch({type:'tick',seconds:5});},5000);return()=>clearInterval(timer);},[ready,paused,home,conflict]);
 useEffect(()=>{if(!ready)return;document.documentElement.dataset.motion=reduced?'reduce':'normal';try{localStorage.setItem('hsdc:settings:v1',JSON.stringify({mode:state.mode,reduced}));}catch{/* game remains usable */}},[ready,state.mode,reduced]);
 const enter=(m:Mode,fresh=false)=>{setConflict(false);pending.current=null;const s=fresh?null:read(m);const next=s??createState(m);if(fresh){try{const raw=JSON.stringify(next);localStorage.setItem(key(m),raw);lastRaw.current=raw;setSaveStatus('Đã bắt đầu lượt mới');}catch{setSaveStatus('Chơi trong bộ nhớ; chưa lưu được trên thiết bị.');lastRaw.current=null;}}lastRevision.current=next.revision;dispatch({type:'load',state:next});setHome(false);setPaused(false);};
 const resolveConflict=()=>{setConflict(false);const s=read(state.mode);if(s){dispatch({type:'load',state:s});lastRevision.current=s.revision;setSaveStatus('Đã tải tiến trình mới nhất');}};
 return <GameContext.Provider value={{state,dispatch,ready,saveStatus,conflict,resolveConflict,enter,home,setHome,paused,setPaused,reduced,setReduced}}>{children}</GameContext.Provider>;
}
export function useGame(){const c=useContext(GameContext);if(!c)throw new Error('GameProvider missing');return c;}
