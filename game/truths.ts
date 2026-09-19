export interface TruthPoint {
  number: string;
  time?: string;
  title: string;
  highlight: string;
  description: string;
  badges?: string[];
}

export interface ChapterTruth {
  tag: string;
  headline: string;
  summary: string;
  conclusion?: {
    badge: string;
    title: string;
    text: string;
  };
  points: TruthPoint[];
}

export const chapterTruths: Record<number, ChapterTruth> = {
  1: {
    tag: 'CHÂN TƯỚNG CHƯƠNG 01',
    headline: 'Hiện tượng vắng tên & Bản chất chuỗi lỗi dữ liệu',
    summary: 'Sự cố đêm triển lãm không phải hành vi phá hoại cá nhân, cũng không bắt nguồn từ việc rớt mạng. Nó là hệ quả của chuỗi lệch pha dữ liệu nội bộ kết hợp với việc nhóm chủ động ẩn demo khi chưa kiểm thử tích hợp.',
    conclusion: {
      badge: 'KẾT LUẬN DIỄN TIẾN VỤ ÁN',
      title: 'Bản chất chuỗi sự kiện: Lỗi dữ liệu & Thiếu kiểm thử tích hợp',
      text: 'Diễn tiến từ 18:10 (đổi trường dữ liệu) đến 19:20 (lỗi lưu cục bộ), 19:35 (mạng rớt ngẫu nhiên) và 19:50 (chủ động ẩn demo). Toàn bộ chuỗi nguyên nhân – kết quả bác bỏ hoàn toàn nghi vấn Nam phá hoại, chỉ ra bài học về tính thống nhất biện chứng giữa các bộ phận trong hệ thống.'
    },
    points: [
      {
        number: '01',
        time: '18:10 – 19:20 · Nguyên nhân cốt lõi',
        title: 'Lỗi dữ liệu nội bộ (Nguyên nhân cốt lõi)',
        highlight: 'E03 → E04 → E05 (Lệch name và fullName)',
        description: 'Lúc 18:10, Quân đổi trường name thành fullName bắt buộc trong API (E03), nhưng giao diện của Nam chưa kịp cập nhật nên vẫn gửi name cũ (E04). Lúc 19:20, Nam test cục bộ thì bị API từ chối lưu vì thiếu fullName (E05). Luồng đăng ký đã gãy ngay trên máy local từ trước khi có sự cố mạng.',
        badges: ['E03', 'E04', 'E05']
      },
      {
        number: '02',
        time: '19:35 – 19:45 · Điều kiện ngẫu nhiên',
        title: 'Vai trò của sự cố mạng (Điều kiện bên ngoài / Ngẫu nhiên)',
        highlight: '19:35 – 19:45 gián đoạn kết nối',
        description: 'Mạng khu vực bị ngắt 10 phút lúc 19:35 (E06). Sự cố này chỉ cản trở đồng bộ từ xa, hoàn toàn KHÔNG PHẢI nguyên nhân sinh ra lỗi lệch fullName vốn đã làm sập luồng đăng ký từ 19:20.',
        badges: ['E06']
      },
      {
        number: '03',
        time: '19:42 – 19:50 · Diễn biến thực tế',
        title: 'Sự thật về tin nhắn của Nam & Quyết định của nhóm',
        highlight: 'Nam không xóa code · Mai chủ động set HIDDEN',
        description: 'Hội thoại đầy đủ lúc 19:42 (E07) cho thấy Nam chỉ bức xúc vì đổi yêu cầu, mã nguồn vẫn còn nguyên trên máy. Linh đề xuất tạm rút demo vì chưa test; Mai dùng quyền Team Lead đổi trạng thái sang HIDDEN lúc 19:50 (E08). Hoàn toàn không có ai xóa mã nguồn hay phá hoại dự án.',
        badges: ['E07', 'E08']
      },
      {
        number: '04',
        time: '20:00 · Điểm mù hệ thống',
        title: 'Điểm mù quy trình: Thiếu kiểm thử tích hợp toàn luồng',
        highlight: 'Xong từng phần ≠ Toàn hệ thống hoạt động',
        description: 'Bảng chuẩn bị (E09) cho thấy các thành viên đều xong phần việc riêng, nhưng không ai nhận trách nhiệm kiểm thử tích hợp đầu-cuối khi ghép giao diện, API và cơ sở dữ liệu trước giờ mở màn triển lãm.',
        badges: ['E09']
      }
    ]
  },
  2: {
    tag: 'CHÂN TƯỚNG CHƯƠNG 02',
    headline: 'Bên trong hệ thống: Quy trình và Mâu thuẫn vận hành',
    summary: 'Phân tích đối chiếu giữa các hồ sơ dự án cho thấy nguyên nhân sâu xa không dừng lại ở một trường dữ liệu, mà nằm ở mâu thuẫn giữa chuẩn hóa và quyền chủ động trong quy trình vận hành nhóm.',
    conclusion: {
      badge: 'KẾT LUẬN VẬN HÀNH HỆ THỐNG',
      title: 'Bản chất giải quyết mâu thuẫn: Thống nhất trong đa dạng',
      text: 'Từ đối chiếu 3 dự án đến phân tích tất nhiên – ngẫu nhiên và giải quyết mâu thuẫn quy trình. Bài học phương pháp luận khẳng định muốn hệ thống phát triển bền vững cần kết hợp chuẩn hóa tập trung với quyền tự chủ theo mô-đun.'
    },
    points: [
      {
        number: '01',
        time: 'Mốc 01 · Đối chiếu hồ sơ',
        title: 'Cái riêng và Cái chung (Đối chiếu 3 hồ sơ)',
        highlight: 'C-A và C-B chung lỗ hổng tích hợp',
        description: 'Cả C-A (Mạch Nối) và C-B cùng mắc khuyết điểm thiếu kiểm thử tích hợp khi ghép nối (E10). Tuy nhiên, C-A lệch trường dữ liệu, C-B gọi sai đường dẫn API; đó là những nét riêng cụ thể. Nhóm C có quy ước thống nhất và bản chạy local nên vẫn hoạt động dù mất mạng.',
        badges: ['E10']
      },
      {
        number: '02',
        time: 'Mốc 02 · Mô phỏng sự cố',
        title: 'Tất nhiên và Ngẫu nhiên trong sự cố',
        highlight: 'Mạng ổn định không tự hết lỗi dữ liệu',
        description: 'Dữ liệu thiếu trường bắt buộc tất nhiên dẫn đến việc API từ chối. Mất mạng là biến cố ngẫu nhiên bên ngoài. Khi chạy thử nghiệm mô phỏng: nếu không sửa dữ liệu, dù mạng có ổn định thì hệ thống vẫn báo lỗi; chỉ khi sửa đúng nguyên nhân trực tiếp thì kết quả mới đổi.',
        badges: ['T05']
      },
      {
        number: '03',
        time: 'Mốc 03 · Cấu trúc logic',
        title: 'Tổ chức báo cáo sự cố (Nội dung & Hình thức)',
        highlight: '6 mảnh ghép theo chuỗi nhân quả',
        description: '6 mảnh dữ kiện rời rạc trong E12 chỉ thực sự có giá trị khi tổ chức theo trật tự logic: Yêu cầu → Không tương thích → Test thất bại → Hậu quả tạm ẩn → Biện pháp chuyển đổi → Nghiệm thu lại.',
        badges: ['E12']
      },
      {
        number: '04',
        time: 'Mốc 04 · Mâu thuẫn quy trình',
        title: 'Mâu thuẫn biện chứng trong quy trình nhóm',
        highlight: 'Phương án A vs Phương án B',
        description: 'Nhóm giằng co giữa hai mặt đối lập: Phương án A (quá tự do, nhanh nhưng vỡ chuẩn) và Phương án B (quá chặt chẽ, duyệt tập trung tạo điểm nghẽn) (E11, E13). Hai mặt này vừa cần nhau vừa kìm hãm nhau; giải pháp là phân quyền theo mô-đun kết hợp chuẩn chung.',
        badges: ['E11', 'E13']
      }
    ]
  },
  3: {
    tag: 'CHÂN TƯỚNG CHƯƠNG 03',
    headline: 'Từ sự cố đến phương án mới: Hiện thực hóa tiềm năng',
    summary: 'Đổi mới không phải là xóa sạch làm lại từ đầu. Bằng việc giải quyết mâu thuẫn quy trình, tích lũy đúng liên kết cấu trúc và thực hiện kế hoạch có điều kiện, nhóm hoàn toàn có thể khôi phục bản demo nghiệm thu.',
    conclusion: {
      badge: 'KẾT LUẬN PHƯƠNG ÁN MỚI',
      title: 'Khả năng trở thành hiện thực qua quy trình phủ định của phủ định',
      text: 'Tích lũy cải tiến đúng khâu then chốt (bước nhảy về chất), kế thừa tinh hoa quy trình cũ (A′) và lập kế hoạch hành động 60 phút có điều kiện đã giúp nhóm biến khả năng thành hiện thực thành công.'
    },
    points: [
      {
        number: '01',
        time: 'Giai đoạn 01 · Tích lũy lượng - chất',
        title: 'Chuyển hóa Lượng – Chất trong hệ thống',
        highlight: 'Mô hình luồng A → D (Nối B → C)',
        description: 'Số lượng liên kết là mặt lượng (E14). Thêm nhiều liên kết tùy tiện không làm hệ thống chạy. Chỉ khi nối đúng mắt xích cấu trúc trọng yếu (B → C) thì luồng xử lý mới thông suốt từ đầu đến cuối (bước nhảy về chất).',
        badges: ['E14']
      },
      {
        number: '02',
        time: 'Giai đoạn 02 · Quy trình A′',
        title: 'Quy trình A′ — Phủ định của phủ định',
        highlight: 'Kế thừa có chọn lọc ở trình độ cao hơn',
        description: 'Quy trình mới A′ (E15) không quay về sự hỗn loạn của A, cũng không duy trì nút thắt phê duyệt của B. A′ kế thừa quyền chủ động theo mô-đun của A, kết hợp với chuẩn chung và kiểm thử tự động của B.',
        badges: ['E15']
      },
      {
        number: '03',
        time: 'Giai đoạn 03 · Phát triển thực chất',
        title: 'Phát triển thực sự vs Mở rộng hình thức',
        highlight: 'Bản V3 nâng cao năng lực cốt lõi',
        description: 'V1 (đổi màu) và V2 (thêm tính năng phụ) chỉ là thay đổi hình thức bên ngoài (E16). Chỉ có bản V3 sửa đúng luồng dữ liệu và vượt qua kiểm thử mới là bước phát triển thực chất của sản phẩm.',
        badges: ['E16']
      },
      {
        number: '04',
        time: 'Giai đoạn 04 · Kế hoạch 60 phút',
        title: 'Biến Khả năng thành Hiện thực (Kế hoạch 60 phút)',
        highlight: 'A1 → A2 → A3 → A4 (55 phút + 5 phút dự phòng)',
        description: 'Mã nguồn, bản sao lưu, dữ liệu mẫu là tiền đề khách quan có sẵn (E17). Chuỗi hành động 4 bước theo đúng quan hệ phụ thuộc trước – sau giúp chuyển hóa khả năng thành hiện thực nghiệm thu thành công.',
        badges: ['E17']
      }
    ]
  }
};
