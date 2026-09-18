# 🕵️ HƯỚNG DẪN CHƠI QUA MÀN - HỒ SƠ ĐẢO CHIỀU

## 🗺️ 1. Giới thiệu các địa điểm (Nơi nào chứa gì?)
- **Bàn làm việc (Desk):** Nơi chứa Laptop (chứa chat, email, code log, terminal) và Điện thoại (tin nhắn, thông báo).
- **Bảng trắng (Board):** Nơi bạn ghim các bằng chứng (Evidence) thu thập được từ Laptop và Điện thoại.
- **Hồ sơ (Dossier):** Nơi chứa danh sách các chương và Nhiệm vụ (Task). Bạn cần hoàn thành tất cả nhiệm vụ trong một chương để mở khóa chương tiếp theo.

## 🎮 2. Cách thức qua chương
Để hoàn thành một chương, bạn cần mở **Hồ sơ**, chọn các nhiệm vụ đang mở. Mỗi nhiệm vụ sẽ đưa ra một số câu hỏi hoặc yêu cầu.
Bạn phải **đối chiếu** các manh mối/bằng chứng (bấm nút "Chọn bằng chứng" có hình cái kẹp giấy) để trả lời các câu hỏi đó.
Lưu ý: Bằng chứng phải đúng với câu hỏi thì mới qua được, nếu chọn sai hoặc trả lời sai, bạn sẽ nhận được gợi ý (hint) hoặc phản biện (counterpoint) để thử lại.

## 🧩 3. Đáp án chi tiết các Nhiệm vụ (Spoilers!)

### Nhiệm vụ T01: Từ dấu hiệu đến sự thật
- **Hỏi:** C-A, C-B, C-C là gì trong phân tích này?
  - **Đáp án:** Ba trường hợp dự án cụ thể (cái riêng)
- **Hỏi:** Điểm chung của C-A và C-B là gì?
  - **Đáp án:** Các phần không tương thích và chưa được kiểm thử khi ghép chung
- **Hỏi:** Nét riêng cần giữ lại là gì?
  - **Đáp án:** C-A lệch trường dữ liệu, C-B sai đường dẫn API
- **Hỏi:** Kết luận nào phù hợp nhất?
  - **Đáp án:** Hai hồ sơ có vấn đề quy trình chung, nhưng chưa đủ để kết luận cho mọi nhóm

### Nhiệm vụ T05: Nếu điều kiện bên ngoài thay đổi
- **Hỏi:** Dữ liệu vẫn thiếu fullName nhưng mạng ổn định thì sao?
  - **Đáp án:** API vẫn từ chối dữ liệu thiếu trường bắt buộc
- **Hỏi:** Sự cố mạng giữ vai trò nào trong phạm vi này?
  - **Đáp án:** Điều kiện bên ngoài, không sinh ra lỗi quy ước dữ liệu
- **Hỏi:** Có thể bỏ qua sự cố mạng không?
  - **Đáp án:** Không, nó làm khó việc đồng bộ và xử lý, dù không tạo lỗi dữ liệu
- **Hỏi:** Nếu nhóm sửa đúng dữ liệu đầu vào thì sao?
  - **Đáp án:** Cần kiểm tra lại; khi nguyên nhân đổi, kết quả có thể đổi

### Nhiệm vụ T06: Tổ chức một báo cáo có căn cứ
- **Hỏi:** Hai mặt đối lập trong quy trình là gì?
  - **Đáp án:** Yêu cầu chuẩn chung và yêu cầu chủ động, linh hoạt
- **Hỏi:** Vì sao hai mặt này vẫn cần nhau?
  - **Đáp án:** Cần chuẩn để tích hợp, cần chủ động để xử lý từng phần linh hoạt
- **Hỏi:** Sự kìm hãm biểu hiện ở đâu?
  - **Đáp án:** Kiểm soát quá chặt làm chậm tiến độ; tự do quá mức làm vỡ chuẩn chung
- **Hỏi:** Phương án giải quyết phù hợp là gì?
  - **Đáp án:** Phân quyền theo phạm vi, giữ quy ước và kiểm thử chung

### Nhiệm vụ T08: Khi nào thay đổi lượng tạo ra chất mới?
- **Hỏi:** Mặt “lượng” đang được xét là gì?
  - **Đáp án:** Số liên kết được tạo trong mô hình
- **Hỏi:** “Chất” mới của mô hình là gì?
  - **Đáp án:** Luồng xử lý đi thông từ A đến D
- **Hỏi:** Hai cách nối cho thấy điều gì?
  - **Đáp án:** Thêm yếu tố sai cấu trúc không tạo ra luồng hoạt động
- **Hỏi:** Diễn giải nào phù hợp nhất?
  - **Đáp án:** Liên kết đúng là điều kiện; luồng thông suốt biểu hiện sự chuyển hóa về chất

### Nhiệm vụ T09: Thiết kế quy trình A′
- **Hỏi:** Phương án A′ nên tổ chức thế nào?
  - **Đáp án:** Tự quản phạm vi phụ trách, tuân thủ chuẩn chung và kiểm thử liên tục
- **Hỏi:** Yếu tố nào từ A còn phù hợp để kế thừa?
  - **Đáp án:** Sự chủ động trong phạm vi phần việc
- **Hỏi:** Yếu tố nào từ B cần được giữ lại?
  - **Đáp án:** Quy ước chung và hệ thống nhật ký
- **Hỏi:** A′ có phải A được lặp lại nguyên trạng không?
  - **Đáp án:** Không, A′ kế thừa nhưng đã cải biến ở trình độ tổ chức mới

### Nhiệm vụ T10: Bản cập nhật nào là phát triển thực sự?
- **Hỏi:** V1 chỉ thay hiệu ứng giao diện. Đánh giá nào phù hợp?
  - **Đáp án:** Đó là thay đổi cách thể hiện, chưa giải quyết lỗi cốt lõi
- **Hỏi:** V2 thêm giao diện tối và nút chia sẻ. Điều gì cần lưu ý?
  - **Đáp án:** Mở rộng tính năng không đồng nghĩa luồng chính đã hoạt động
- **Hỏi:** V3 sửa dữ liệu và kiểm thử lại. Kết luận nào hợp lý?
  - **Đáp án:** V3 phát triển năng lực thực hiện luồng cốt lõi trong điều kiện đã kiểm thử
- **Hỏi:** Có thể khẳng định V3 chắc chắn thành công ở mọi nơi không?
  - **Đáp án:** Không, cần tiếp tục kiểm tra trong các điều kiện khác

