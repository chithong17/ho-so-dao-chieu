import type {Answer,GameState,Verdict} from '../game/types';
import {createState,reduceGame} from '../game/engine';
export const easyPerfect:Record<string,Answer>={
 N1:{kind:'choices',values:{claim:'withdraw'}},
 N2:{kind:'easyOrder',order:['changed','mismatch','failed'],conclusion:'unchanged'},
 N3:{kind:'choices',values:{common:'limited',report:'structured'}},
 N4:{kind:'choices',values:{team:'shared',progress:'V3'}},
 N5:{kind:'easyOrder',order:['agree','repair','check'],conclusion:'limited'}
};
export const easyVerdict:Verdict={conclusion:'V3',evidence:['EZ02'],note:''};
export function completeEasy():GameState {
 let state=reduceGame(createState('individual','easy'),{type:'begin',conclusion:'unknown',confidence:'Vừa'});
 for(const [id,answer] of Object.entries(easyPerfect)){
  state=reduceGame(state,{type:'task',id});
  state=reduceGame(state,{type:'submit',id,answer,at:'2026-09-18T00:00:00Z'});
  if(id==='N3'||id==='N5'){state=reduceGame(state,{type:'debrief'});state=reduceGame(state,{type:'next'});}
 }
 return state;
}
