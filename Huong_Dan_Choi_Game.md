# 🕵️ HƯỚNG DẪN CHƠI QUA MÀN - HỒ SƠ ĐẢO CHIỀU (ULTIMATE FULL)

## 🗺️ 1. Giới thiệu các địa điểm
- **Bàn làm việc (Desk):** Nơi chứa **Laptop** (chat, email, code log, terminal) và **Điện thoại** (tin nhắn). Đọc nội dung để thu thập các manh mối ban đầu.
- **Bảng trắng (Board):** Nơi bạn ghim bằng chứng (Evidence) thu thập được. Kéo thả, sắp xếp để xâu chuỗi chúng lại.
- **Hồ sơ (Dossier):** Nơi chứa Nhiệm vụ (Task). Bạn cần hoàn thành tất cả nhiệm vụ trong một chương để mở khóa chương tiếp theo.

## 🎮 2. Cách thức qua chương & Trả lời câu hỏi
Bạn cần mở **Hồ sơ**, đọc yêu cầu. **Luôn nhớ phải kẹp đúng Bằng chứng (Evidence)** (nhấn nút cái kẹp giấy) trước khi bấm Submit, nếu không sẽ bị từ chối dù đáp án đúng!

---

## 🧩 3. Đáp án chi tiết & Giải thích đối chứng (Spoilers!)

### CHƯƠNG 1: HIỂU LẦM (Cái chung và Cái riêng)
*Sự cố sập hệ thống không phải do Nam xóa code, mà do cái "riêng" (các lỗi cục bộ) không tương thích khi gộp vào cái "chung" (hệ thống).*

**Nhiệm vụ T01: Từ dấu hiệu đến sự thật (Trắc nghiệm)**
- **Bằng chứng:** E07 (Toàn bộ cuộc trò chuyện) và E08 (Nhật ký trạng thái).
- **Đáp án:**
  - C-A, C-B, C-C là gì? -> **Ba trường hợp dự án cụ thể (cái riêng)**
  - Điểm chung của C-A và C-B là gì? -> **Các phần không tương thích và chưa được kiểm thử khi ghép chung**
  - Nét riêng cần giữ lại là gì? -> **C-A lệch trường dữ liệu, C-B sai đường dẫn API**
  - Kết luận nào phù hợp nhất? -> **Nhóm đã ẩn bản demo, không có bằng chứng Nam phá hoại**
- **Giải thích:** E07 cho thấy cả nhóm đã thống nhất "tạm ẩn" demo để tránh lỗi. E08 ghi nhận hành động là "Hide" (Ẩn) chứ không phải "Delete" (Xóa). Đừng đánh giá bản chất sự vật chỉ qua một hiện tượng đơn lẻ (đoạn chat E01).

**Nhiệm vụ T02: Lần theo chuỗi nguyên nhân (Minigame sắp xếp chuỗi)**
- **Bằng chứng:** E04 (Biên bản đối chiếu) và E05 (Nhật ký kiểm thử).
- **Đáp án (Xếp thứ tự):** 
  `Yêu cầu đổi...` -> `Giao diện chưa cập nhật...` -> `API từ chối...` -> `Luồng đăng ký không lưu...`
- **Giải thích:** E04 cho thấy code front-end gửi `name` nhưng API đòi `fullName`. E05 ghi nhận lỗi xuất hiện *trước khi* mạng rớt. Suy ra mạng rớt không phải nguyên nhân tạo ra lỗi dữ liệu.

**Nhiệm vụ T03: Xác định điểm cần tác động (Minigame nối quan hệ)**
- **Bằng chứng:** E03, E04, E09.
- **Đáp án (2 Ưu tiên, 2 Theo dõi):**
  - Ưu tiên: `Yêu cầu thay đổi ↔ Các phần liên quan...` & `Hoàn thành từng phần ↔ Kiểm thử khi ghép...`
  - Theo dõi: `Kết quả kiểm thử ↔ Quyết định có trình bày...` & `Trình diễn trực tuyến ↔ Phương án dự phòng...`
- **Giải thích:** Các chứng cứ chỉ ra lỗi do không đồng bộ code (E03, E04). Bảng E09 nhắc nhở hoàn thành từng phần là chưa đủ, phải kiểm thử toàn hệ thống mới được phép trình bày.

---

### CHƯƠNG 2: TRUY VẾT (Nguyên nhân - Kết quả / Lượng - Chất)
*Tìm nguyên nhân cốt lõi: Mạng rớt chỉ là điều kiện, dữ liệu lệch chuẩn mới là nguyên nhân bên trong.*

**Nhiệm vụ T04: Từ ba trường hợp đến một nhận xét (Trắc nghiệm)**
- **Bằng chứng:** E10 (Ba hồ sơ đối chiếu).
- **Đáp án:**
  - C-A, C-B, C-C là gì? -> **Ba trường hợp dự án cụ thể (cái riêng)**
  - Điểm chung của C-A và C-B? -> **Các phần không tương thích và chưa được kiểm thử khi ghép chung**
  - Nét riêng cần giữ lại? -> **C-A lệch trường dữ liệu, C-B sai đường dẫn API**
  - Kết luận phù hợp? -> **Hai hồ sơ có vấn đề quy trình chung, nhưng chưa đủ để kết luận cho mọi nhóm**
- **Giải thích:** E10 cho thấy mỗi nhóm lỗi một kiểu (Cái riêng), nhưng nhìn vào cả 3 ta rút ra quy luật (Cái chung): code rời rạc, ghép lại không test kỹ nên lỗi.

**Nhiệm vụ T05: Nếu điều kiện bên ngoài thay đổi (Trắc nghiệm)**
- **Bằng chứng:** E06 (Sự cố kết nối mạng).
- **Đáp án:**
  - Dữ liệu vẫn thiếu fullName nhưng mạng ổn định? -> **API vẫn từ chối dữ liệu thiếu trường bắt buộc**
  - Sự cố mạng giữ vai trò nào? -> **Điều kiện bên ngoài, không sinh ra lỗi quy ước dữ liệu**
  - Có thể bỏ qua sự cố mạng không? -> **Không, nó làm khó việc đồng bộ và xử lý...**
  - Nếu nhóm sửa đúng dữ liệu đầu vào? -> **Cần kiểm tra lại; khi nguyên nhân đổi, kết quả có thể đổi**
- **Giải thích:** Mất mạng (E06) chỉ là điều kiện (ngoại cảnh). Code sai cấu trúc dữ liệu mới là nguyên nhân trực tiếp (mâu thuẫn nội tại) làm sập API.

**Nhiệm vụ T06: Tổ chức một báo cáo có căn cứ (Minigame sắp xếp báo cáo)**
- **Bằng chứng:** E12 (Bản nháp báo cáo sự cố).
- **Đáp án (Xếp thứ tự):** 
  `Yêu cầu...` -> `Không tương thích...` -> `Kết quả kiểm thử...` -> `Hậu quả...` -> `Biện pháp...` -> `Nghiệm thu...`
- **Giải thích:** Báo cáo phải logic theo quy luật Nhân - Quả: Từ nguyên nhân gốc (Yêu cầu đổi) -> Mâu thuẫn (Lệch code) -> Kết quả (Test xịt) -> Hậu quả (Ẩn demo) -> Cách giải quyết -> Kiểm chứng.

**Nhiệm vụ T07: Giải quyết mâu thuẫn trong quy trình (Trắc nghiệm)**
- **Bằng chứng:** E11 (Nhật ký quy trình A, B) và E13 (Biên bản họp).
- **Đáp án:**
  - Hai mặt đối lập là gì? -> **Yêu cầu chuẩn chung và yêu cầu chủ động, linh hoạt**
  - Vì sao vẫn cần nhau? -> **Cần chuẩn để tích hợp, cần chủ động để xử lý từng phần linh hoạt**
  - Sự kìm hãm biểu hiện ở đâu? -> **Kiểm soát quá chặt làm chậm tiến độ; tự do quá mức làm vỡ chuẩn chung**
  - Phương án giải quyết phù hợp? -> **Phân quyền theo phạm vi, giữ quy ước và kiểm thử chung**
- **Giải thích:** E11 và E13 cho thấy quy trình A (tự do) và B (kiểm duyệt gắt) đá nhau. Đây là Mâu thuẫn biện chứng. Phải tìm cách cân bằng cả hai.

---

### CHƯƠNG 3: GIẢI QUYẾT (Phủ định của Phủ định)
*Xây dựng quy trình mới (A') kế thừa ưu điểm của cái cũ nhưng khắc phục được khuyết điểm.*

**Nhiệm vụ T08: Khi nào thay đổi lượng tạo ra chất mới? (Trắc nghiệm)**
- **Bằng chứng:** E14 (Mô hình luồng A → D).
- **Đáp án:**
  - Mặt “lượng” là gì? -> **Số liên kết được tạo trong mô hình**
  - “Chất” mới là gì? -> **Luồng xử lý đi thông từ A đến D**
  - Hai cách nối cho thấy điều gì? -> **Thêm yếu tố sai cấu trúc không tạo ra luồng hoạt động**
  - Diễn giải phù hợp? -> **Liên kết đúng là điều kiện; luồng thông suốt biểu hiện sự chuyển hóa về chất**
- **Giải thích:** Lượng đổi thành Chất chỉ xảy ra khi lượng (E14 - các liên kết) được thêm vào đúng với Cấu trúc (điều kiện). Cắm dây bừa bãi không tạo ra hệ thống mới.

**Nhiệm vụ T09: Thiết kế quy trình A′ (Trắc nghiệm)**
- **Bằng chứng:** E15 (Đề xuất quy trình A′).
- **Đáp án:**
  - Phương án A′ nên tổ chức thế nào? -> **Tự quản phạm vi phụ trách, tuân thủ chuẩn chung và kiểm thử liên tục**
  - Yếu tố nào từ A để kế thừa? -> **Sự chủ động trong phạm vi phần việc**
  - Yếu tố nào từ B cần giữ lại? -> **Quy ước chung và hệ thống nhật ký**
  - A′ có lặp lại nguyên trạng A không? -> **Không, A′ kế thừa nhưng đã cải biến ở trình độ tổ chức mới**
- **Giải thích:** Quy trình A' (E15) ra đời thay thế A và B. Nó kết hợp sự tự chủ của A và tính chuẩn mực của B. Đây là quy luật Phủ định của phủ định (kế thừa ở một cấp độ cao hơn).

**Nhiệm vụ T10: Bản cập nhật nào là phát triển thực sự? (Trắc nghiệm)**
- **Bằng chứng:** E16 (Đối chiếu ba bản xây dựng).
- **Đáp án:**
  - V1 chỉ thay hiệu ứng giao diện -> **Đó là thay đổi cách thể hiện, chưa giải quyết lỗi cốt lõi**
  - V2 thêm giao diện tối và nút chia sẻ -> **Mở rộng tính năng không đồng nghĩa luồng chính đã hoạt động**
  - V3 sửa dữ liệu và kiểm thử lại -> **V3 phát triển năng lực thực hiện luồng cốt lõi trong điều kiện đã kiểm thử**
  - V3 chắc chắn thành công ở mọi nơi không? -> **Không, cần tiếp tục kiểm tra trong các điều kiện khác**
- **Giải thích:** E16 ghi nhận V1, V2 chỉ đắp thêm hình thức (giao diện, nút bấm). Chỉ có V3 giải quyết mâu thuẫn bên trong (sửa code lõi). Phát triển phải đi từ bản chất.

**Nhiệm vụ T11: Từ khả năng đến kết quả (Minigame lập kế hoạch)**
- **Bằng chứng:** E17 (Kế hoạch 60 phút).
- **Đáp án (Xếp thứ tự):** 
  `Chốt yêu cầu dữ liệu` -> `Viết bước chuyển name → fullName` -> `Kiểm thử đầu-cuối toàn hệ thống` -> `Chuẩn bị bản chạy cục bộ và tài liệu`. *(Bỏ qua các hành động chỉnh giao diện, thêm tính năng, chờ mạng).*
- **Giải thích:** Thời gian có hạn (E17). Ta không thể "Trang trí giao diện". Phải nắm bắt các tiền đề thực tiễn sống còn và sắp xếp theo quan hệ nhân quả (phải chốt yêu cầu mới sửa được code, sửa xong mới test được).
