import type { Evidence, Task, Question, Option, Concept, ConceptId } from './types';

const options = (items: string[][]): Option[] => items.map(([id, label]) => ({ id, label }));
const question = (id: string, label: string, correct: string, items: string[][]): Question => ({ id, label, correct, options: options(items) });

export const easyChapters = [
    { id: 1, title: 'Đừng kết luận vội', short: 'Điều tra', subtitle: 'Đối chiếu dấu vết và tìm nguyên nhân của sự cố.' },
    { id: 2, title: 'Cùng sửa để đi tiếp', short: 'Tái thiết', subtitle: 'Chọn cách phối hợp và kiểm tra phương án khôi phục.' }
] as const;

export const easyEvidence: Evidence[] = [
    {
        id: 'EZ01', chapter: 1, title: 'Tin nhắn khiến mọi người nghi ngờ', author: 'Nhóm Mạch Nối', time: 'Ngày D · 19:42–19:50', order: 1942, app: 'chat', summary: 'Ảnh chụp tin nhắn và thông báo từ danh sách triển lãm.', body: [
            'Nam|19:42|Nếu yêu cầu cứ thay đổi mà không báo, mình không thể tiếp tục làm như cũ…',
            'Ban tổ chức|19:50|Bản trình bày của nhóm Mạch Nối không còn xuất hiện trong danh sách. Ảnh chụp phía trên chỉ giữ lại một phần cuộc trao đổi; thông báo này chưa ghi nhận tình trạng các tài liệu của nhóm.'
        ], fiction: true
    },
    {
        id: 'EZ02', chapter: 1, title: 'Toàn bộ cuộc trao đổi', author: 'Nhóm Mạch Nối', time: 'Ngày D · 19:42–19:50', order: 1950, app: 'chat', summary: 'Phần hội thoại còn lại và xác nhận thay đổi trạng thái.', body: [
            'Nam|19:42|Mình không thể làm như cũ khi yêu cầu đổi. Mã nguồn và bản sao lưu vẫn còn. Cần thống nhất thông tin rồi thử lại.',
            'Linh|19:47|Chưa kiểm tra đạt thì tạm rút bản trình bày, sáng mai xin trình bày lại.',
            'Mai|19:50|Mình đã ẩn bản trình bày khỏi danh sách. Tài liệu của nhóm vẫn còn, không có thao tác xóa.'
        ], fiction: true
    },
    {
        id: 'EZ03', chapter: 1, title: 'Trước khi mất mạng', author: 'Quân · phụ trách test', time: 'Ngày D · 18:10–19:45', order: 1810, app: 'files', summary: 'Các mốc ghi nhận khi thay yêu cầu, chạy thử và mất kết nối.', body: [
            '18:10: Nhóm đổi mẫu thông tin. Phần nhập vẫn dùng mẫu cũ, còn phần tiếp nhận đã yêu cầu mẫu mới.',
            '19:20: Chạy thử trên máy, thông tin bị từ chối vì hai phần chưa thống nhất; đăng ký không được lưu.',
            '19:35–19:45: Mạng gián đoạn, gây khó khăn cho việc chia sẻ. Sau đó mạng hoạt động lại; nhóm chưa sửa hai mẫu thông tin.'
        ], fiction: true
    },
    { id: 'EZ04', chapter: 1, title: 'Ba nhóm, ba trường hợp', author: 'Quân · phụ trách test', time: 'Ngày D+1 · Hồ sơ so sánh', order: 3000, app: 'files', summary: 'Ba trường hợp được ghi lại để đối chiếu khi viết báo cáo.', body: ['Quân ghi lại ba trường hợp để nhóm đối chiếu. Báo cáo cần giúp người đọc hiểu việc gì gây ra sự cố, kết quả ra sao và nhóm dự định xử lý thế nào.'], table: [['Nhóm', 'Ghi nhận'], ['Mạch Nối', 'Hai mẫu thông tin khác nhau; chưa kiểm tra chung.'], ['Nhóm B', 'Hai phần dùng địa chỉ khác nhau; chưa kiểm tra chung.'], ['Nhóm C', 'Các phần thống nhất, đã kiểm tra; vẫn chạy trên máy khi mất mạng.']], fiction: true },
    {
        id: 'EZ05', chapter: 2, title: 'Nhóm nên phối hợp thế nào?', author: 'Mai · trưởng nhóm', time: 'Ngày D+1 · Họp nhóm', order: 4000, app: 'files', summary: 'Ghi nhận về hai cách phối hợp cũ và đề xuất cho lần tới.', body: [
            'Ban đầu, mỗi người tự làm: nhanh trong phần việc của mình nhưng các phần khó ghép với nhau.',
            'Sau đó, mọi thay đổi chờ một người duyệt: quy ước thống nhất hơn nhưng công việc bị ùn lại.',
            'Nhóm đang cân nhắc giao quyền trong từng phần việc, giữ quy ước chung và kiểm tra khi ghép các phần lại.'
        ], fiction: true
    },
    { id: 'EZ06', chapter: 2, title: 'Đẹp hơn hay hoạt động tốt hơn?', author: 'Quân · phụ trách test', time: 'Ba bản thử giả định', order: 4010, app: 'lab', summary: 'Kết quả đối chiếu ba bản thử của cùng một sản phẩm.', body: ['Nhóm thử ba bản trong cùng điều kiện trên máy. Mục tiêu là nhận và lưu được thông tin đăng ký. Chưa có kết quả kiểm tra ở các môi trường khác.'], table: [['Bản', 'Thay đổi và kết quả'], ['V1', 'Đổi màu, thêm hiệu ứng; đăng ký vẫn lỗi.'], ['V2', 'Thêm nút chia sẻ; đăng ký vẫn lỗi.'], ['V3', 'Sửa hai phần cho thống nhất; đăng ký được lưu trong lần thử.']], fiction: true },
    {
        id: 'EZ07', chapter: 2, title: 'Chuẩn bị trình bày lại', author: 'Mai · trưởng nhóm', time: 'Ngày D+1 · Chuẩn bị nghiệm thu', order: 4020, app: 'mail', summary: 'Nguồn lực và các điều kiện để chuẩn bị một bản trình bày mới.', body: [
            'Nhóm còn mã nguồn, bản sao lưu, thông tin mẫu và người thực hiện.',
            'Người sửa cần biết mẫu thống nhất trước khi cập nhật các phần liên quan. Người kiểm tra cần bản đã sửa để chạy thử toàn bộ.',
            'Lần thử dùng thông tin mẫu trên máy của nhóm. Việc trình bày lại còn phụ thuộc kết quả kiểm tra; các môi trường khác chưa được xác nhận.'
        ], fiction: true
    }
];

export const easyTasks: Task[] = [
    {
        id: 'N1', chapter: 1, concept: 'PT05', concepts: ['PT05'], kind: 'choices', title: 'Một tin nhắn có đủ không?', prompt: 'Đối chiếu đoạn tin nhắn với cuộc trao đổi đầy đủ. Nhận định nào có căn cứ?', evidence: ['EZ01', 'EZ02'], hints: ['Ảnh chụp giữ lại bao nhiêu phần của cuộc trao đổi?', 'Ai xác nhận thao tác đã thực hiện và tình trạng tài liệu?'], criteria: ['Phân biệt điều đã xảy ra với suy đoán về Nam'], feedback: ['Đối chiếu nội dung đầy đủ và thao tác được xác nhận; một câu nói riêng lẻ chưa chứng minh hành vi hay động cơ.'], questions: [question('claim', 'Điều gì đã xảy ra?', 'withdraw', [
            ['sabotage', 'Nam đã xóa tài liệu để phá hoại nhóm.'], ['withdraw', 'Nhóm chủ động ẩn bản trình bày; chưa có căn cứ quy kết Nam phá hoại.'], ['network', 'Mất mạng đã xóa toàn bộ sản phẩm.']])]
    },
    {
        id: 'N2', chapter: 1, concept: 'PT02', concepts: ['PT02', 'PT03', 'NL01'], kind: 'easyOrder', title: 'Lỗi bắt đầu từ đâu?', prompt: 'Sắp ba thẻ thành chuỗi gây ra lỗi rồi nhận định vai trò của mạng.', evidence: ['EZ03'], hints: ['Lần chạy thử và sự cố mạng xảy ra vào những thời điểm nào?', 'Khi một phần đổi yêu cầu, phần còn lại cần được đối chiếu thế nào?'], criteria: ['Sắp đúng quan hệ tạo ra lỗi', 'Phân biệt lỗi thông tin với điều kiện mạng'], feedback: ['Hãy kiểm tra quan hệ giữa yêu cầu, hai phần của sản phẩm và kết quả chạy thử.', 'Đối chiếu việc đã thay đổi khi mạng trở lại với việc vẫn còn giữ nguyên.'], orderOptions: options([['failed', 'Chạy thử thất bại'], ['changed', 'Yêu cầu thông tin thay đổi'], ['mismatch', 'Các phần chưa thống nhất']]), correctOrder: ['changed', 'mismatch', 'failed'], questions: [question('network', 'Khi mạng hoạt động lại, lỗi trên máy có tự hết không?', 'unchanged', [
            ['fixed', 'Có, kết nối trở lại là mọi phần tự khớp.'], ['unchanged', 'Không, hai phần vẫn cần được sửa cho thống nhất.']])]
    },
    {
        id: 'N3', chapter: 1, concept: 'PT01', concepts: ['PT01', 'PT04'], kind: 'choices', title: 'Hiểu đúng và kể rõ', prompt: 'So sánh ba nhóm và chọn cách kể lại sự cố để người đọc hiểu.', evidence: ['EZ03', 'EZ04'], hints: ['Trường hợp nhóm C có giống hoàn toàn hai nhóm còn lại không?', 'Người đọc cần biết điều gì để hiểu vì sao nhóm chọn một cách xử lý?'], criteria: ['Nhận xét có giới hạn từ các trường hợp cụ thể', 'Tổ chức báo cáo thành lập luận rõ ràng'], feedback: ['Đối chiếu điểm chung và khác nhau của cả ba nhóm trước khi khái quát.', 'Bố cục cần giúp người đọc theo được quan hệ giữa các thông tin, không chỉ nhìn thấy chúng.'], questions: [
            question('common', 'Có thể rút ra nhận xét nào?', 'limited', [['all', 'Mọi nhóm làm sản phẩm đều sẽ thất bại.'], ['limited', 'Mạch Nối và nhóm B cùng thiếu thống nhất, chưa kiểm tra chung; chưa thể kết luận cho mọi nhóm.'], ['same', 'Cả ba nhóm gặp cùng một lỗi.']]),
            question('report', 'Bố cục nào giúp giải thích sự cố?', 'structured', [['decorated', 'Chọn màu đẹp rồi đặt các thông tin theo ý thích.'], ['structured', 'Nguyên nhân → kết quả → cách xử lý.']])]
    },
    {
        id: 'N4', chapter: 2, concept: 'QL02', concepts: ['QL02', 'QL03', 'NL02'], kind: 'choices', title: 'Chọn cách làm tốt hơn', prompt: 'Dựa vào cách phối hợp cũ và kết quả các bản thử, chọn hướng cải thiện.', evidence: ['EZ05', 'EZ06'], hints: ['Mỗi cách phối hợp cũ đã giúp được gì và gây khó khăn ở đâu?', 'Bản thử nào được đánh giá bằng nhiệm vụ chính của sản phẩm?'], criteria: ['Kế thừa điểm phù hợp và giải quyết hạn chế của quy trình', 'Ưu tiên tiến bộ ở hoạt động chính'], feedback: ['So sánh tác dụng của quy ước chung và quyền chủ động; phương án mới cần xử lý hạn chế đã quan sát.', 'Hãy dùng kết quả đăng ký để đánh giá thay đổi, đồng thời xem kết quả đã được kiểm tra ở đâu.'], questions: [
            question('team', 'Nhóm nên phối hợp thế nào?', 'shared', [['free', 'Ai cũng tự quyết mọi thứ, bỏ quy ước chung.'], ['central', 'Mọi việc đều chờ một người duyệt.'], ['shared', 'Chủ động trong phần việc, giữ quy ước chung và kiểm tra khi ghép lại.']]),
            question('progress', 'Bản nào cải thiện hoạt động chính trong điều kiện đã thử?', 'V3', [['V1', 'V1: đổi màu và thêm hiệu ứng.'], ['V2', 'V2: thêm nút chia sẻ.'], ['V3', 'V3: sửa các phần và kiểm tra đăng ký thành công.']])]
    },
    {
        id: 'N5', chapter: 2, concept: 'PT06', concepts: ['QL01', 'PT06'], kind: 'easyOrder', title: 'Đưa kế hoạch thành kết quả', prompt: 'Sắp ba việc cần làm, thử phương án và nêu giới hạn của kết quả.', evidence: ['EZ07'], hints: ['Người sửa cần biết điều gì trước khi bắt đầu?', 'Một lần thử trên máy có cho biết kết quả trong mọi hoàn cảnh không?'], criteria: ['Sắp kế hoạch theo điều kiện trước–sau', 'Giới hạn kết luận trong điều kiện đã kiểm tra'], feedback: ['Đối chiếu mỗi việc với điều kiện cần có trước khi thực hiện.', 'Phân biệt nguồn lực đang có, phương án dự kiến và kết quả được xác nhận trong một lần kiểm tra.'], orderOptions: options([['check', 'Kiểm tra toàn bộ'], ['agree', 'Thống nhất mẫu thông tin'], ['repair', 'Sửa các phần liên quan']]), correctOrder: ['agree', 'repair', 'check'], questions: [question('result', 'Nếu mô phỏng thành công, có thể nói gì?', 'limited', [
            ['everywhere', 'Sản phẩm chắc chắn hoạt động ở mọi nơi.'], ['limited', 'Bản trình bày hoạt động trong điều kiện đã kiểm tra; nơi khác cần thử thêm.']])]
    }
];

export const easyCounterpoints: Record<string, { speaker: string; role: string; evidence: string; message: string }> = {
    N1: { speaker: 'Mai', role: 'Trưởng nhóm', evidence: 'EZ02', message: '“Nhận định của bạn đã đối chiếu với thao tác được xác nhận trong cuộc trao đổi chưa?”' },
    N2: { speaker: 'Quân', role: 'Phụ trách test', evidence: 'EZ03', message: '“Hãy so sánh thời điểm lần thử thất bại với thời điểm mất mạng. Nhận định của bạn đã giải thích được thứ tự này chưa?”' },
    N3: { speaker: 'Quân', role: 'Phụ trách test', evidence: 'EZ04', message: '“Hãy xem cả trường hợp khác biệt và cách bạn nối các thông tin thành một lời giải thích.”' },
    N4: { speaker: 'Mai', role: 'Trưởng nhóm', evidence: 'EZ05', message: '“Phương án của bạn giữ được điều gì hữu ích và xử lý được hạn chế nào của cách làm cũ?”' },
    N5: { speaker: 'Mai', role: 'Trưởng nhóm', evidence: 'EZ07', message: '“Mỗi việc trong phương án đã có đủ điều kiện để thực hiện chưa? Kết quả được kiểm tra trong phạm vi nào?”' }
};

export const easyLessons = {
    1: { title: 'Đừng kết luận vội từ một dấu hiệu.', text: 'Đối chiếu cuộc trao đổi và lần chạy thử giúp phân biệt sự kiện với suy đoán. Các phần của sản phẩm cần thống nhất, và mỗi trường hợp vẫn có hoàn cảnh riêng.', takeaway: 'Tìm quan hệ tạo ra kết quả, kiểm tra các điều kiện và tổ chức dữ kiện thành một lập luận rõ ràng.' },
    2: { title: 'Cùng sửa để đi tiếp.', text: 'Quy trình mới giữ quyền chủ động và quy ước chung. Nhóm đánh giá tiến bộ bằng hoạt động chính, rồi thực hiện phương án theo những điều kiện cần thiết.', takeaway: 'Có nguồn lực chưa đồng nghĩa đã có kết quả. Cần tổ chức phù hợp và kiểm tra trong điều kiện cụ thể; không phải cứ đủ ba việc là tự động có chất mới.' }
};

export const easyConceptText: Record<ConceptId, Pick<Concept, 'explanation' | 'application' | 'limit'>> = {
    PT05: { explanation: 'Điều nhìn thấy ban đầu có thể chỉ là một phần của sự việc. Cần đối chiếu nhiều dữ kiện để hiểu quan hệ bên trong.', application: 'EZ01 là tin nhắn bị cắt; EZ02 bổ sung cuộc trao đổi và thao tác đã thực hiện.', limit: 'Hiện tượng vẫn là dữ kiện có giá trị. Không thể chỉ dựa vào cảm giác để gán hành vi hay động cơ cho một người.' },
    PT02: { explanation: 'Nguyên nhân là tác động làm xuất hiện kết quả. Việc xảy ra trước chưa chắc đã gây ra việc xảy ra sau.', application: 'EZ03 cho thấy yêu cầu đổi nhưng hai phần chưa thống nhất, khiến thông tin bị từ chối khi chạy thử.', limit: 'Cần chứng minh quan hệ tạo ra kết quả, không chỉ sắp các sự kiện theo giờ.' },
    PT03: { explanation: 'Trong điều kiện xác định, quan hệ bên trong quy định một kết quả phải xảy ra. Những hoàn cảnh bên ngoài vẫn có thể ảnh hưởng quá trình.', application: 'Hai mẫu chưa thống nhất thì thông tin vẫn bị từ chối. Mất mạng làm khó việc chia sẻ nhưng xuất hiện sau lỗi trên máy.', limit: 'Ngẫu nhiên không có nghĩa vô nguyên nhân hay không đáng quan tâm. Khi điều kiện đổi, phải đánh giá lại vai trò của mỗi yếu tố.' },
    NL01: { explanation: 'Các phần của một sự việc có liên hệ và tác động lẫn nhau. Khi một phần thay đổi, cần xét những phần có liên quan.', application: 'Đổi mẫu thông tin cần đối chiếu phần nhập, phần tiếp nhận và việc kiểm tra chung.', limit: 'Xem xét toàn diện không có nghĩa coi mọi yếu tố quan trọng như nhau; cần tìm quan hệ chủ yếu trong hoàn cảnh cụ thể.' },
    PT01: { explanation: 'Mỗi trường hợp có đặc điểm riêng. Điểm chung xuất hiện qua nhiều trường hợp cụ thể nhưng không xóa đi sự khác biệt.', application: 'EZ04 cho thấy hai nhóm cùng thiếu thống nhất và kiểm tra chung; nhóm C có kết quả khác.', limit: 'Ba trường hợp chưa đủ để kết luận cho mọi nhóm. Cái đơn nhất là nét chỉ có ở một trường hợp trong phạm vi đang xét.' },
    PT04: { explanation: 'Nội dung gồm các thông tin và quan hệ của sự việc. Hình thức là cách chúng được tổ chức và liên kết.', application: 'Báo cáo cần nối nguyên nhân, kết quả và cách xử lý để người đọc theo được lập luận.', limit: 'Hình thức không chỉ là trang trí; bố cục cần phù hợp nội dung và mục đích, không có một cách sắp duy nhất cho mọi báo cáo.' },
    QL02: { explanation: 'Trong một cách tổ chức, hai yêu cầu có thể vừa cần nhau vừa kìm hãm nhau. Giải quyết quan hệ đó giúp thay đổi cách vận hành.', application: 'EZ05 thể hiện nhu cầu có quy ước chung và nhu cầu chủ động: thiếu một bên hoặc tuyệt đối hóa một bên đều gây khó khăn.', limit: 'Không phải mọi khác biệt hoặc tranh luận đều là mâu thuẫn biện chứng. Cần xét hai mặt trong cùng một quan hệ.' },
    QL03: { explanation: 'Cái mới có thể thay cái cũ bằng cách giữ lại điều phù hợp và cải biến hạn chế; một số nét ban đầu trở lại ở trình độ tổ chức mới.', application: 'Cách phối hợp mới giữ chủ động của giai đoạn đầu, quy ước của giai đoạn sau, đồng thời bổ sung kiểm tra chung.', limit: 'Đây là minh họa có giới hạn. Vài lần sửa quy trình không tự động tạo thành một chu kỳ phủ định của phủ định.' },
    NL02: { explanation: 'Phát triển là thay đổi theo hướng hoàn thiện hơn, có kế thừa. Cần xem năng lực thực hiện nhiệm vụ có tiến bộ hay không.', application: 'EZ06 cho thấy bản sửa hoạt động chính qua lần thử; đổi trang trí hoặc thêm chức năng phụ chưa giải quyết lỗi đăng ký.', limit: 'Không phải mọi thay đổi hoặc tăng số chức năng đều là phát triển. Kết quả một lần thử chưa bảo đảm mọi môi trường.' },
    QL01: { explanation: 'Sự tích lũy về lượng trong điều kiện phù hợp có thể dẫn tới thay đổi về chất. Cấu trúc và cách tổ chức các yếu tố có ý nghĩa quyết định trong mô hình này.', application: 'Kế hoạch tích lũy các điều kiện: có mẫu thống nhất, có các phần đã sửa, rồi có kết quả kiểm tra. Khi các phần phối hợp đúng, luồng đăng ký mới hoạt động.', limit: 'Không phải cứ đủ ba bước là lượng tự biến thành chất. Kế hoạch chỉ minh họa vai trò của điều kiện và cấu trúc; không xác định một điểm nút chung cho mọi sản phẩm.' },
    PT06: { explanation: 'Những gì đang có là hiện thực. Điều có thể làm được mới là khả năng, cần đủ điều kiện và hành động để thành kết quả.', application: 'EZ07 nêu tài liệu, người làm và thông tin mẫu đã có. Bản trình bày cần được sửa và kiểm tra trước khi xác nhận hoạt động.', limit: 'Mong muốn không thay thế điều kiện. Kết quả trên máy của nhóm chưa đồng nghĩa sản phẩm sẵn sàng trong mọi hoàn cảnh.' }
};
