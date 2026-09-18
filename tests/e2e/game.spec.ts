import {test,expect,type Page} from '@playwright/test';
import {completeState,perfect} from '../fixtures';
import {completeEasy,easyPerfect,easyVerdict} from '../easy-fixtures';
import {chainOptions,reportOptions,relationOptions,recoveryActions} from '../../game/tasks';
import {getConfig} from '../../game/config';
import {createState,reduceGame} from '../../game/engine';
import {saveKey} from '../../game/storage';
import type {GameState,Answer,Difficulty} from '../../game/types';
test.use({actionTimeout:15000});
async function seed(page:Page,state:GameState,legacy=false){
 await page.addInitScript(({state,legacy})=>{
  sessionStorage.setItem('hs01_intro_seen','1');
  if(sessionStorage.getItem('seeded'))return;
  sessionStorage.setItem('seeded','1');
  if(legacy){const {difficulty,...old}=state;void difficulty;localStorage.setItem(`hsdc:save:${state.mode}:v1`,JSON.stringify({...old,schemaVersion:1}));localStorage.setItem('hsdc:settings:v1',JSON.stringify({mode:state.mode,reduced:true}));}
  else {localStorage.setItem(`hsdc:save:${state.mode}:${state.difficulty}:v2`,JSON.stringify(state));localStorage.setItem('hsdc:settings:v1',JSON.stringify({mode:state.mode,difficulty:state.difficulty,reduced:true}));}
 },{state:{...state,elapsed:5},legacy});await page.goto('/');
}
async function begin(page:Page,difficulty:Difficulty){
 await page.goto('/');await page.getByRole('button',{name:difficulty==='easy'?'Dễ':'Tiêu chuẩn',exact:true}).click();
 await page.getByRole('button',{name:'Mở hồ sơ',exact:true}).click();
 await page.getByRole('radio',{name:'Chưa có đủ dữ kiện để kết luận.',exact:true}).check();
 await page.getByRole('radio',{name:'Vừa',exact:true}).check();
 await page.getByRole('button',{name:'Bắt đầu điều tra',exact:true}).click();
 await page.getByRole('button',{name:'[Bỏ qua]',exact:true}).click();
 await page.getByAltText('Chỉ thị điều tra').click();
}
async function notebook(page:Page){
 const skip=page.getByRole('button',{name:'[Bỏ qua]',exact:true});
 if(await skip.isVisible()){await skip.click();await page.getByAltText('Chỉ thị điều tra').click();}
 await page.getByRole('button',{name:'Hồ sơ vụ án (Sổ điều tra)',exact:true}).click();
}
async function closeObject(page:Page){await page.locator('.point-and-click > dialog > .modal-head button').click();}
async function fillTask(page:Page,id:string,a:Answer){
 const panel=page.getByRole('complementary',{name:'Nhiệm vụ điều tra'});const task=getConfig(id.startsWith('N')?'easy':'standard').tasks.find(t=>t.id===id)!;
 await page.getByRole('button',{name:`Nhiệm vụ ${id}`,exact:true}).click();
 const radio=async(text:string)=>{await panel.getByRole('radio',{name:text,exact:true}).check();};
 switch(a.kind){
 case 'easyOrder':for(const item of a.order)await panel.getByRole('button',{name:task.orderOptions!.find(o=>o.id===item)!.label,exact:true}).click();await radio(task.questions![0].options.find(o=>o.id===a.conclusion)!.label);if(id==='N5'){await panel.getByRole('button',{name:'Mô phỏng phương án'}).click();await expect(panel.getByText(/bản trình bày hoạt động trong điều kiện/)).toBeVisible();}break;
 case 'classify':{const values=Object.values(a.categories);for(let i=0;i<4;i++)await panel.getByRole('combobox').nth(i).selectOption(values[i]);for(const ev of a.evidence)await panel.getByRole('button',{name:new RegExp(`^${ev} ·`)}).click();break;}
 case 'chain':for(const v of a.order)await panel.getByRole('button',{name:chainOptions.find(o=>o.id===v)!.label,exact:true}).click();for(const ev of a.evidence)await panel.getByRole('button',{name:new RegExp(`^${ev} ·`)}).click();await radio('Lỗi chưa khắc phục là căn cứ cho quyết định rút demo tiếp theo.');break;
 case 'relations':for(const v of a.priority)await panel.getByRole('group',{name:'Hai quan hệ ưu tiên',exact:false}).getByRole('button',{name:relationOptions.find(o=>o.id===v)!.label,exact:true}).click();for(const v of a.monitor)await panel.getByRole('group',{name:'Hai quan hệ theo dõi',exact:false}).getByRole('button',{name:relationOptions.find(o=>o.id===v)!.label,exact:true}).click();await radio('Sát giờ trình diễn: khôi phục luồng cốt lõi và xác nhận điều kiện.');break;
 case 'choices':for(const q of task.questions!)await radio(q.options.find(o=>o.id===a.values[q.id])!.label);break;
 case 'report':for(const v of a.order)await panel.getByRole('button',{name:reportOptions.find(o=>o.id===v)!.label,exact:true}).click();await radio('Bố cục và liên kết giữa các phần giúp làm rõ nội dung.');break;
 case 'recovery':await radio('Mã, bản lưu, dữ liệu thử và thành viên đã có. Demo còn cần thực hiện.');for(const v of a.order){const o=recoveryActions.find(o=>o.id===v)!;await panel.getByRole('button',{name:`${v} · ${o.label} (${o.minutes}′)`,exact:true}).click();}await radio('Demo giới hạn được thực hiện trong điều kiện mô phỏng; cần kiểm tra thêm để khai thác thật.');break;
 }
 if(id==='T05'){await panel.getByRole('button',{name:'Chạy lại mô hình'}).click();await expect(panel.getByText('Local: từ chối',{exact:true})).toBeVisible();await panel.getByRole('checkbox',{name:'Đã chuyển đổi dữ liệu'}).check();await panel.getByRole('button',{name:'Chạy lại mô hình'}).click();await expect(panel.getByText('Local: hoàn tất',{exact:true})).toBeVisible();}
 if(id==='T08'){await panel.getByRole('button',{name:'Thử C → A'}).click();await expect(panel.getByText('A → B → A · chưa tới D',{exact:true})).toBeVisible();await panel.getByRole('button',{name:'Thử B → C'}).click();await expect(panel.getByText('A → B → C → D',{exact:true})).toBeVisible();}
 if(id==='T10'){for(const v of ['V1','V2','V3']){await panel.getByRole('button',{name:v,exact:true}).click();await panel.getByRole('button',{name:`Chạy bản ${v}`,exact:true}).click();}}
 if(id==='T11'){await panel.getByRole('button',{name:'Mô phỏng phương án'}).click();await expect(panel.getByText(/demo giới hạn qua kiểm thử/)).toBeVisible();}
 await panel.getByRole('button',{name:'Ghi nhận lập luận',exact:true}).click();await expect(panel.getByText(`${task.criteria.length}/${task.criteria.length} tiêu chí có căn cứ`,{exact:true})).toBeVisible();
}
for(const difficulty of ['easy','standard'] as const)test(`${difficulty}: toàn bộ lượt chơi qua phòng, nhiệm vụ và kết quả`,async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await begin(page,difficulty);const config=getConfig(difficulty);
 await expect(page.locator('.chapter-nav button')).toHaveCount(config.chapters.length);
 await page.getByRole('button',{name:'Điện thoại - liên lạc nhóm',exact:true}).click();
 await expect(page.locator('.phone-library-mockup .evidence-item')).toHaveCount(2);
 await page.locator('.phone-library-mockup .evidence-item').last().click();
 await expect(page.getByRole('region',{name:'Nội dung chứng cứ'})).toBeVisible();
 await closeObject(page);
 await notebook(page);
 for(const task of config.tasks){
  await fillTask(page,task.id,(difficulty==='easy'?easyPerfect:perfect)[task.id]);
  if(config.tasks.filter(t=>t.chapter===task.chapter).at(-1)!.id===task.id){
   await page.getByRole('button',{name:`Giải mã chương ${task.chapter}`,exact:true}).click();
   await expect(page.getByText(`GIẢI MÃ CHƯƠNG 0${task.chapter}`,{exact:true})).toBeVisible();
   await page.getByRole('button',{name:task.chapter===config.lastChapter?'Viết kết luận cuối':'Mở chương tiếp theo',exact:true}).click();
   if(task.chapter<config.lastChapter)await notebook(page);
  }
 }
 await page.getByRole('radio',{name:config.verdictOptions.find(o=>o.id==='V3')!.label,exact:true}).check();
 for(const id of difficulty==='easy'?['EZ02']:['E08','E05','E04','E07'])await page.getByRole('button',{name:new RegExp(`^${id} ·`)}).click();
 await page.getByRole('button',{name:'Lưu kết luận',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Khép lại hồ sơ bằng một lập luận có căn cứ',exact:true})).toBeVisible();
 await expect(page.getByText(`${config.maxScore}/${config.maxScore} tiêu chí`,{exact:false})).toBeVisible();
 await expect(page.locator('.concept-card')).toHaveCount(11);
 await expect.poll(()=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)!).screen,saveKey('individual',difficulty))).toBe('result');
 await page.reload();await expect(page.getByRole('heading',{name:'Khép lại hồ sơ bằng một lập luận có căn cứ',exact:true})).toBeVisible();
 expect(errors).toEqual([]);
});

test('Dễ: nháp, phản biện, sửa đáp án và đổi độ khó không mất lượt',async({page})=>{
 await seed(page,reduceGame(createState('individual','easy'),{type:'begin',conclusion:'unknown',confidence:'Vừa'}));
 await notebook(page);
 await page.getByRole('radio',{name:'Nam đã xóa tài liệu để phá hoại nhóm.',exact:true}).check();
 await page.getByRole('button',{name:'Ghi nhận lập luận',exact:true}).click();
 await expect(page.getByText('0/1 tiêu chí có căn cứ',{exact:true})).toBeVisible();
 await expect(page.locator('.counterpoint')).toContainText('Mai');
 await page.getByRole('button',{name:'Nhiệm vụ N2',exact:true}).click();
 await page.getByRole('button',{name:'Yêu cầu thông tin thay đổi',exact:true}).click();
 await page.getByRole('button',{name:'Các phần chưa thống nhất',exact:true}).click();
 await page.getByText('Ghi chú riêng',{exact:false}).click();await page.getByRole('textbox',{name:'Ghi chú riêng'}).fill('Đối chiếu thời điểm.');
 await closeObject(page);await page.locator('.exit-room-btn').filter({hasText:'X'}).click();
 await page.getByRole('button',{name:'Tiêu chuẩn',exact:true}).click();await expect(page.getByRole('button',{name:'Mở hồ sơ',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Dễ',exact:true}).click();await page.getByRole('button',{name:'Tiếp tục điều tra',exact:true}).click();
 await notebook(page);await expect(page.locator('.sort-stack li')).toHaveCount(2);
 await page.reload();await notebook(page);await expect(page.locator('.sort-stack li')).toHaveCount(2);
 await page.getByRole('button',{name:'Nhiệm vụ N1',exact:true}).click();
 await page.getByRole('radio',{name:getConfig('easy').tasks[0].questions![0].options[1].label,exact:true}).check();
 await page.getByRole('button',{name:'Cập nhật lập luận',exact:true}).click();await expect(page.getByText('1/1 tiêu chí có căn cứ',{exact:true})).toBeVisible();
});

test('Tiêu chuẩn: tự chuyển bản cũ và giữ đủ 44 điểm, không đổi dữ liệu gốc',async({page})=>{
 const old=reduceGame(completeState(),{type:'finish',verdict:{conclusion:'V3',evidence:['E08','E05','E04','E07'],note:''}});
 await seed(page,old,true);await expect(page.getByText('44/44 tiêu chí',{exact:false})).toBeVisible();
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('hsdc:save:individual:v1')!).schemaVersion)).toBe(1);
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('hsdc:save:individual:standard:v2')!).difficulty)).toBe('standard');
});

test('Dễ: kết luận sai và hoàn thiện lại giữ nguyên luồng cũ',async({page})=>{
 await seed(page,completeEasy());await page.getByRole('radio',{name:'Nam đã phá hoại dự án vì bức xúc.',exact:true}).check();
 await page.getByRole('button',{name:/^EZ01 ·/}).click();await page.getByRole('button',{name:'Lưu kết luận',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Kết luận còn vội',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Hoàn thiện lập luận',exact:true}).click();await notebook(page);
 await expect(page.getByRole('button',{name:'Nhiệm vụ N4',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Giải mã chương 2',exact:true}).click();await page.getByRole('button',{name:'Viết kết luận cuối',exact:true}).click();
 await expect(page.getByRole('button',{name:'Quay lại chương 2',exact:true})).toBeVisible();
});

test('bản lưu hỏng được giữ nguyên và báo lỗi',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('hsdc:save:individual:v1','{invalid'));
 await page.goto('/');await expect(page.getByRole('alert')).toContainText('lưu đang tạm dừng');
 expect(await page.evaluate(()=>localStorage.getItem('hsdc:save:individual:v1'))).toBe('{invalid');
 expect(await page.evaluate(()=>localStorage.getItem('hsdc:save:individual:standard:v2'))).toBeNull();
});

test('trình chiếu/cá nhân và độ khó có bản lưu riêng',async({page})=>{
 const s={...completeEasy(),mode:'presenter' as const,initial:{conclusion:'unknown',confidence:'Cao'}};await seed(page,s);
 await expect(page.getByText(/Chế độ trình chiếu · một máy/)).toBeVisible();
 await page.getByRole('button',{name:'Dừng để thảo luận'}).click();await expect(page.getByRole('button',{name:'Tiếp tục',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Tùy chọn',exact:true}).click();await page.getByRole('button',{name:'Chuyển sang cá nhân',exact:true}).click();
 await expect(page.getByRole('button',{name:'Mở hồ sơ',exact:true})).toBeVisible();
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('hsdc:save:presenter:easy:v2')!).initial.confidence)).toBe('Cao');
});

test('xung đột tab chỉ áp dụng đúng ô lưu',async({page,context})=>{
 const s=reduceGame(createState('individual','easy'),{type:'begin',conclusion:'unknown',confidence:'Vừa'});await seed(page,s);
 const other=await context.newPage();await other.goto('/');
 await other.evaluate(()=>localStorage.setItem('hsdc:save:individual:standard:v2','unrelated'));
 await expect(page.getByRole('alert')).toHaveCount(0);
 await other.evaluate(()=>{const key='hsdc:save:individual:easy:v2';const s=JSON.parse(localStorage.getItem(key)!);s.selectedEvidence='EZ02';s.opened.push('EZ02');s.revision++;localStorage.setItem(key,JSON.stringify(s));});
 await expect(page.getByRole('alert')).toContainText('lưu đang tạm dừng');
 await page.locator('.exit-room-btn').filter({hasText:'X'}).click();await page.getByRole('button',{name:'Tải bản mới nhất',exact:true}).click();await expect(page.getByRole('alert')).toHaveCount(0);await other.close();
});
