import {describe,expect,it} from 'vitest';
import {applyCompetitionAction,scoreAction} from '../../game/competition';
import {createState,reduceGame} from '../../game/engine';
import {perfect} from '../fixtures';

const started=()=>reduceGame(createState('individual','standard'),{type:'begin',conclusion:'unknown',confidence:'Vừa'});
describe('Điểm thi đấu',()=>{
 it('chỉ thưởng chứng cứ thuộc nhiệm vụ hiện tại và chỉ tạo cùng một khóa thưởng',()=>{const state=started();const valid={type:'evidence',id:'E01'} as const;const after=applyCompetitionAction(state,valid,'x');expect(scoreAction(state,valid,after,'a')).toEqual([{key:'evidence:E01',kind:'evidence',reference:'E01',delta:10}]);const unrelated={type:'evidence',id:'E03'} as const;expect(scoreAction(state,unrelated,applyCompetitionAction(state,unrelated,'x'),'b')).toEqual([]);expect(scoreAction(after,valid,applyCompetitionAction(after,valid,'x'),'c')[0].key).toBe('evidence:E01');});
 it('tính tiêu chí, nhiệm vụ, câu sai và gợi ý bằng các sự kiện riêng',()=>{const state=started();const submit={type:'submit',id:'T01',answer:perfect.T01,at:'client'} as const;const after=applyCompetitionAction(state,submit,'server');const events=scoreAction(state,submit,after,'submit-1');expect(events.filter(e=>e.kind==='criterion')).toHaveLength(4);expect(events.find(e=>e.kind==='task')?.delta).toBe(50);const hint={type:'hint',id:'T01'} as const;expect(scoreAction(state,hint,applyCompetitionAction(state,hint,'x'),'hint').at(0)?.delta).toBe(-20);});
});
