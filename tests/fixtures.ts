import type {Answer,GameState} from '../game/types';
import {createState,reduceGame} from '../game/engine';
import {tasks} from '../game/tasks';
export const perfect:Record<string,Answer>={
 T01:{kind:'classify',categories:{s1:'fact',s2:'unproven',s3:'unproven',s4:'supported'},evidence:['E07','E08']},
 T02:{kind:'chain',order:['requirement','mismatch','reject','failure'],evidence:['E04','E05'],relation:'decision'},
 T03:{kind:'relations',priority:['req_update','handover_test'],monitor:['test_result','condition_fallback'],reason:'core'},
 T04:{kind:'choices',values:{cases:'specific',common:'incompatible',detail:'field',limit:'limited'}},
 T05:{kind:'choices',values:{fixed:'reject',network:'external',impact:'caused',change:'conditional'}},
 T06:{kind:'report',order:['req','incompat','test','impact','measure','retest'],reason:'structure'},
 T07:{kind:'choices',values:{opposites:'standard',unity:'depend',conflict:'change',solution:'delegate'}},
 T08:{kind:'choices',values:{quantity:'links',quality:'flow',structure:'right',transition:'process'}},
 T09:{kind:'choices',values:{model:'adaptive',fromA:'autonomy',fromB:'standards',return:'higher'}},
 T10:{kind:'choices',values:{v1:'presentation',v2:'expansion',v3:'capability',limit:'limited'}},
 T11:{kind:'recovery',order:['A1','A2','A3','A4'],reality:'available',conclusion:'limited'},
};
export function completeState():GameState{
 let s=reduceGame(createState(),{type:'begin',conclusion:'sabotage',confidence:'Cao'});
 for(const task of tasks){s=reduceGame(s,{type:'task',id:task.id});s=reduceGame(s,{type:'submit',id:task.id,answer:perfect[task.id],at:'2026-09-16T09:00:00Z'});if(['T03','T07','T11'].includes(task.id)){s=reduceGame(s,{type:'debrief'});s=reduceGame(s,{type:'next'});}}
 return s;
}
