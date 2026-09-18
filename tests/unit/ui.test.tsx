import {afterEach,describe,it,expect} from 'vitest';
import {cleanup,render,screen,fireEvent} from '@testing-library/react';
import {useState} from 'react';
import {Choice,Sorter} from '../../components/ui';
afterEach(cleanup);
describe('Các thao tác bằng nút và bàn phím',()=>{
 it('chọn một đáp án không phụ thuộc màu',()=>{function Demo(){const [v,set]=useState('');return <Choice label="Nhận định" value={v} onChange={set} options={[{id:'yes',label:'Có căn cứ'},{id:'no',label:'Chưa đủ'}]}/>;}render(<Demo/>);fireEvent.click(screen.getByRole('radio',{name:'Chưa đủ'}));expect((screen.getByRole('radio',{name:'Chưa đủ'}) as HTMLInputElement).checked).toBe(true);});
 it('thêm, sắp và bỏ thẻ không cần kéo thả',()=>{function Demo(){const [v,set]=useState<string[]>([]);return <Sorter label="Chuỗi" value={v} onChange={set} max={2} options={[{id:'a',label:'Đầu vào'},{id:'b',label:'Kết quả'}]}/>;}render(<Demo/>);fireEvent.click(screen.getByRole('button',{name:'Kết quả'}));fireEvent.click(screen.getByRole('button',{name:'Đầu vào'}));fireEvent.click(screen.getByRole('button',{name:'Đưa a lên'}));expect(screen.getAllByRole('listitem')[0].textContent).toContain('Đầu vào');fireEvent.click(screen.getByRole('button',{name:'Bỏ b'}));expect(screen.getAllByRole('listitem')).toHaveLength(1);});
});
