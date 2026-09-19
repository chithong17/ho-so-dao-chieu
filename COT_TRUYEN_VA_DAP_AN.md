# HỒ SƠ ĐẢO CHIỀU (HS-01) — CỐT TRUYỆN & ĐÁP ÁN TOÀN TẬP

> Tài liệu tổng hợp toàn bộ cốt truyện, chân tướng vụ án, hệ thống triết học Mác – Lênin (2 Nguyên lý, 3 Quy luật, 6 Cặp phạm trù) và đáp án chi tiết của tất cả các nhiệm vụ trong trò chơi **Hồ Sơ Đảo Chiều**.

---

## MỤC LỤC
1. [Bối cảnh & Cốt truyện chân tướng](#1-bối-cảnh--cốt-truyện-chân-tướng)
2. [Hệ thống triết học ứng dụng (2 - 3 - 6)](#2-hệ-thống-triết-học-ứng-dụng-2---3---6)
3. [Danh mục 17 Chứng cứ](#3-danh-mục-17-chứng-cứ)
4. [Đáp án chi tiết — Chế độ Tiêu chuẩn (Standard)](#4-đáp-án-chi-tiết--chế-độ-tiêu-chuẩn-standard)
   - [Chương 1: Dấu vết của sự cố](#chương-1-dấu-vết-của-sự-cố) (T01 – T03)
   - [Chương 2: Bên trong hệ thống](#chương-2-bên-trong-hệ-thống) (T04 – T07)
   - [Chương 3: Từ sự cố đến phương án mới](#chương-3-từ-sự-cố-đến-phương-án-mới) (T08 – T11)
5. [Đáp án chi tiết — Chế độ Dễ (Easy)](#5-đáp-án-chi-tiết--chế-độ-dễ-easy) (N1 – N5)
6. [Kết luận chung cuộc & 4 Kết thúc (Endings)](#6-kết-luận-chung-cuộc--4-kết-thúc-endings)

---

## 1. BỐI CẢNH & CỐT TRUYỆN CHÂN TƯỚNG

### 1.1. Các nhân vật trong nhóm Mạch Nối
- **Nam**: Phụ trách lập trình giao diện (Frontend). Cậu là người bị nghi ngờ nhiều nhất do một bức ảnh chụp tin nhắn bức xúc bị rò rỉ.
- **Quân**: Phụ trách yêu cầu và kiểm thử (QA/Tester). Người đổi cấu trúc dữ liệu nhưng không đảm bảo toàn bộ các bên nhận được và kiểm thử chung.
- **Linh**: Thành viên điều phối và thuyết trình. Người nhận ra rủi ro khi chưa kiểm thử và đề xuất tạm rút demo.
- **Mai**: Trưởng nhóm (Team Lead). Người ra quyết định ẩn bản demo khỏi danh sách để bảo vệ nhóm và tổ chức họp khắc phục.

### 1.2. Sự cố bề ngoài (Hiện tượng)
- **19:40 ngày D**: Đêm triển lãm học phần, các nhóm chuẩn bị lượt nghiệm thu/thuyết trình sản phẩm.
- **19:50 ngày D**: Ban tổ chức thông báo dự án **Mạch Nối** không còn tên trong danh sách trình bày.
- **Nghi vấn ban đầu**: Một bức ảnh chụp màn hình tin nhắn của Nam xuất hiện với nội dung: *"Nếu yêu cầu cứ thay đổi mà không báo bên thiết kế thì mình không thể tiếp tục làm như cũ…"*. Nhiều người lập tức suy đoán: Nam bức xúc với nhóm nên đã xóa mã nguồn, phá hoại dự án. Số khác cho rằng sự cố sập mạng lúc 19:35 là nguyên nhân duy nhất làm hỏng sản phẩm.

### 1.3. Chân tướng thực sự (Bản chất)
1. **Nguyên nhân cốt lõi (Lỗi dữ liệu nội bộ)**:
   - Lúc **18:10**, Quân gửi email cập nhật: trường `name` đổi thành `fullName` và API bắt buộc trường mới này (`E03`).
   - Tuy nhiên, phần giao diện do Nam phụ trách chưa kịp cập nhật, vẫn gửi trường `name` (`E04`).
   - Lúc **19:20**, Nam chạy test cục bộ trên máy (`registration.log` - `E05`): API từ chối lưu vì thiếu trường `fullName`. Luồng đăng ký đã dừng hoạt động ngay trên máy local **từ trước khi có sự cố mạng**.
2. **Vai trò của sự cố mạng (Điều kiện bên ngoài/Ngẫu nhiên)**:
   - Từ **19:35 – 19:45**, mạng khu vực bị gián đoạn 10 phút (`E06`).
   - Mất mạng chỉ gây khó khăn cho việc chia sẻ, đồng bộ trực tuyến, chứ **không phải** nguyên nhân sinh ra lỗi lệch dữ liệu `fullName` đã xảy ra từ 19:20.
3. **Sự thật về tin nhắn của Nam & hành động của nhóm**:
   - Đọc đầy đủ ngữ cảnh cuộc trao đổi lúc 19:42 (`E07`): Nam giải thích lỗi thiếu `fullName` đã phát hiện từ lúc test 19:20, mã nguồn vẫn còn nguyên trên máy, cần chốt lại chuẩn dữ liệu để test lại. Nam **không hề xóa mã nguồn**.
   - Lúc **19:47**, Linh đề xuất tạm rút bản demo vì hệ thống chưa kiểm thử tích hợp đầy đủ.
   - Lúc **19:50**, Mai dùng quyền Team Lead đổi trạng thái hiển thị sang **`HIDDEN`** (ẩn dự án khỏi danh sách công khai, không xóa kho lưu trữ - `E08`).
4. **Vấn đề quy trình sâu xa**:
   - Nhóm rơi vào mâu thuẫn giữa hai thái cực quy trình: Phương án A (quá tự do, ai làm việc nấy, nhanh nhưng vỡ chuẩn) và Phương án B (quá chặt chẽ, một người duyệt tất cả, tạo điểm nghẽn) (`E11`).
   - Giải pháp là xây dựng quy trình mới **A′**: phân quyền theo mô-đun, duy trì quy ước chuẩn chung và tự động hóa kiểm thử tích hợp (`E15`).
   - Nhóm có đủ 60 phút và đầy đủ tiền đề (code, backup, dữ liệu mẫu) để sửa trường dữ liệu và khôi phục bản demo nghiệm thu lại thành công (`E17`).

---

## 2. HỆ THỐNG TRIẾT HỌC ỨNG DỤNG (2 - 3 - 6)

Game lồng ghép toàn bộ cốt lõi của **Phép biện chứng duy vật** (Triết học Mác – Lênin):

### 2.1. Hai Nguyên lý cơ bản
- **NL01 — Nguyên lý về mối liên hệ phổ biến**: Các bộ phận trong hệ thống (Giao diện, API, Database, Kiểm thử) có mối liên hệ mật thiết. Một bên đổi chuẩn (`fullName`) mà bên kia không đồng bộ sẽ làm sập cả luồng. Cần nhìn toàn diện, không xem xét cô lập.
- **NL02 — Nguyên lý về sự phát triển**: Phát triển là sự nâng cao về năng lực giải quyết nhiệm vụ cốt lõi. Bản V1 (đổi màu) hay V2 (thêm nút chia sẻ) chỉ là bề ngoài; chỉ có V3 (sửa luồng dữ liệu) mới là sự phát triển thực sự.

### 2.2. Ba Quy luật phổ biến
- **QL01 — Quy luật chuyển hóa từ những thay đổi về lượng dẫn đến những thay đổi về chất và ngược lại**: Số lượng liên kết chỉ là mặt lượng. Phải nối đúng mắt xích trọng yếu ($B \to C$) trong cấu trúc thì hệ thống mới thông suốt (bước nhảy về chất).
- **QL02 — Quy luật thống nhất và đấu tranh của các mặt đối lập**: Mâu thuẫn giữa "chuẩn chung" (để tích hợp) và "quyền chủ động" (để linh hoạt tiến độ). Cả hai vừa phụ thuộc vừa kìm hãm nhau; giải quyết bằng phân quyền theo phạm vi.
- **QL03 — Quy luật phủ định của phủ định**: Quy trình A′ kế thừa tính chủ động của A và tính chuẩn mực của B, khắc phục điểm nghẽn cũ để tiến lên trình độ tổ chức cao hơn.

### 2.3. Sáu Cặp phạm trù
- **PT01 — Cái riêng và cái chung**: C-A, C-B, C-C là những cái riêng. Điểm chung của C-A và C-B là thiếu kiểm thử tích hợp, nhưng lỗi cụ thể của mỗi nhóm là cái đơn nhất riêng biệt. Không được vội vã quy chụp "mọi nhóm đều thất bại".
- **PT02 — Nguyên nhân và kết quả**: Chuỗi nhân quả sinh ra lỗi: Yêu cầu đổi $\to$ Giao diện chưa sửa $\to$ API từ chối $\to$ Đăng ký thất bại. Việc ẩn demo là quyết định chủ động sau đó, không phải kết quả tự động của lỗi kỹ thuật.
- **PT03 — Tất nhiên và ngẫu nhiên**: Thiếu `fullName` tất nhiên dẫn đến API từ chối. Mất mạng lúc 19:35 là biến cố ngẫu nhiên bên ngoài, không tạo ra lỗi dữ liệu.
- **PT04 — Nội dung và hình thức**: Cùng 6 mảnh dữ kiện, nếu sắp xếp đúng theo trật tự logic (Yêu cầu $\to$ Lỗi $\to$ Hậu quả $\to$ Khắc phục $\to$ Nghiệm thu) thì nội dung báo cáo mới trở nên sáng rõ và thuyết phục.
- **PT05 — Bản chất và hiện tượng**: Bức ảnh chụp tin nhắn cắt xén là hiện tượng bên ngoài. Bản chất bên trong là nhóm chủ động ẩn demo khi chưa test toàn luồng, không ai xóa code.
- **PT06 — Khả năng và hiện thực**: Nhóm có sẵn mã nguồn, backup, người làm (tiền đề khách quan). Kế hoạch 60 phút biến khả năng khôi phục thành hiện thực thông qua chuỗi hành động có điều kiện.

---

## 3. DANH MỤC 17 CHỨNG CỨ

| Mã | Tên chứng cứ | Nguồn tìm kiếm | Nội dung cốt lõi |
|---|---|---|---|
| **E01** | Ảnh chụp một đoạn tin nhắn | Điện thoại (`phone`) | Tin nhắn cắt xén của Nam: "không thể tiếp tục làm như cũ...". |
| **E02** | Thông báo vắng tên trong danh sách | Tủ hồ sơ (`files`) | BTC xác nhận dự án ẩn lúc 19:50, không nói gì về xóa code. |
| **E03** | Yêu cầu cập nhật dữ liệu v2 | Laptop (`laptop`) | Quân đổi trường `name` thành `fullName` lúc 18:10. |
| **E04** | Biên bản đối chiếu giao diện và API | Laptop (`laptop`) | Giao diện gửi `name`, API đòi `fullName`, lệch chuẩn nội bộ lúc 18:25. |
| **E05** | Nhật ký test registration.log | Laptop (`laptop`) | Lỗi thiếu `fullName` xuất hiện trên máy cục bộ lúc **19:20** (trước khi mất mạng). |
| **E06** | Sự cố kết nối mạng | Laptop (`laptop`) | Mạng gián đoạn 10 phút (19:35–19:45), không sinh ra lỗi dữ liệu 19:20. |
| **E07** | Toàn bộ cuộc trao đổi của nhóm | Điện thoại (`phone`) | Ngữ cảnh đầy đủ: Nam nói code vẫn còn; Linh đề xuất rút demo; Mai xác nhận ẩn. |
| **E08** | Nhật ký thay đổi trạng thái dự án | Tủ hồ sơ (`files`) | Mai set `HIDDEN` lúc 19:50; audit xác nhận không có thao tác xóa code hay repo. |
| **E09** | Bảng chuẩn bị trước giờ trình bày | Tủ hồ sơ (`files`) | Từng phần việc báo xong riêng lẻ nhưng thiếu người test đầu-cuối tích hợp. |
| **E10** | Ba hồ sơ đối chiếu (C-A, C-B, C-C) | Tủ hồ sơ (`files`) | So sánh 3 dự án: C-A và C-B cùng thiếu test tích hợp; C-C test tốt nên vẫn chạy local. |
| **E11** | Nhật ký quy trình (A và B) | Bảng lập luận (`board`) | Phương án A (tự do, dễ vỡ chuẩn) vs Phương án B (duyệt tập trung, nghẽn tiến độ). |
| **E12** | Bản nháp báo cáo sự cố | Bảng lập luận (`board`) | 6 mảnh thông tin rời rạc cần được tổ chức thành cấu trúc lập luận nhân quả. |
| **E13** | Biên bản họp về quy trình duyệt | Điện thoại (`phone`) | Mai đề xuất cân bằng giữa chuẩn chung và quyền chủ động theo mô-đun. |
| **E14** | Mô hình luồng A → D | Bảng lập luận (`board`) | Thêm nối $B \to C$ giúp luồng thông suốt từ A đến D (thay đổi lượng đổi chất). |
| **E15** | Đề xuất quy trình A′ | Bảng lập luận (`board`) | Quy trình mới phủ định của phủ định: tự quản mô-đun + chuẩn chung + test tự động. |
| **E16** | Đối chiếu ba bản xây dựng | Bảng lập luận (`board`) | V1 (đổi giao diện), V2 (thêm tính năng phụ), V3 (sửa luồng dữ liệu). |
| **E17** | Kế hoạch khôi phục demo 60 phút | Điện thoại (`phone`) | Danh mục hành động và tiền đề hiện thực để khôi phục demo trong 1 giờ. |

---

## 4. ĐÁP ÁN CHI TIẾT — CHẾ ĐỘ TIÊU CHUẨN (STANDARD)

### CHƯƠNG 1: DẤU VẾT CỦA SỰ CỐ

#### Nhiệm vụ T01 — Từ dấu hiệu đến sự thật (Phạm trù Bản chất & Hiện tượng - PT05)
- **Loại nhiệm vụ**: Phân loại nhận định (`classify`)
- **Đáp án phân loại**:
  1. *“Dự án Mạch Nối không còn xuất hiện trong danh sách trình bày từ 19:50.”* $\to$ **Đã được xác nhận** (`fact`).
  2. *“Nam đã bức xúc và cố ý xóa mã nguồn của nhóm.”* $\to$ **Chưa có căn cứ / Suy đoán** (`unproven`).
  3. *“Mã nguồn của dự án đã bị xóa hoàn toàn khỏi hệ thống.”* $\to$ **Chưa có căn cứ / Suy đoán** (`unproven`).
  4. *“Nhóm Mạch Nối đã chủ động ẩn bản demo khỏi danh sách để kiểm tra lại.”* $\to$ **Có căn cứ hỗ trợ** (`supported`).
- **Chọn 2 chứng cứ chứng minh**: **`E07`** và **`E08`** (E07 cho thấy hội thoại đầy đủ Nam không xóa code, E08 xác nhận Mai chỉ set HIDDEN).

---

#### Nhiệm vụ T02 — Lần theo chuỗi nguyên nhân (Phạm trù Nguyên nhân & Kết quả - PT02)
- **Loại nhiệm vụ**: Chuỗi quan hệ nhân quả (`chain`)
- **4 mắt xích đúng và thứ tự**:
  1. `requirement`: **Yêu cầu đổi từ name sang fullName**
  2. `mismatch`: **Giao diện chưa cập nhật, API yêu cầu quy ước mới**
  3. `reject`: **API từ chối dữ liệu thiếu trường bắt buộc**
  4. `failure`: **Luồng đăng ký không lưu được dữ liệu**
- **Nhận định về quan hệ**: Chọn **`decision`** (*Ẩn demo là quyết định tiếp theo của nhóm, không phải kết quả tự động do lỗi kỹ thuật gây ra*).
*(Lưu ý: T02 không yêu cầu gắn chứng cứ khi nộp, chỉ cần sắp đúng 4 mắt xích và chọn quan hệ).*

---

#### Nhiệm vụ T03 — Xác định điểm cần tác động (Nguyên lý Mối liên hệ phổ biến - NL01)
- **Loại nhiệm vụ**: Chọn mối liên hệ (`relations`)
- **2 Mối liên hệ ưu tiên xử lý (`priority`)**:
  - `req_update`: **Yêu cầu thay đổi ↔ Các phần liên quan phải cập nhật đồng bộ**
  - `handover_test`: **Hoàn thành từng phần ↔ Test khi ghép toàn bộ hệ thống**
- **2 Mối liên hệ cần theo dõi (`monitor`)**:
  - `test_result`: **Kết quả test ↔ Quyết định có trình bày bản demo hay không**
  - `condition_fallback`: **Trình diễn trực tuyến ↔ Phương án dự phòng chạy cục bộ**
- **Lý do chọn trọng tâm (`reason`)**: Chọn **`core`** (*Đây là những mối liên hệ bên trong trực tiếp quyết định khả năng vận hành của luồng dữ liệu*).

---

### CHƯƠNG 2: BÊN TRONG HỆ THỐNG

#### Nhiệm vụ T04 — Từ ba trường hợp đến một nhận xét (Phạm trù Cái riêng & Cái chung - PT01)
- **Loại nhiệm vụ**: Trắc nghiệm 4 câu hỏi (`choices`)
- **Đáp án**:
  1. *C-A, C-B, C-C là gì trong phân tích này?* $\to$ **`specific`** (*Ba trường hợp dự án cụ thể (cái riêng)*).
  2. *Điểm chung của C-A và C-B là gì?* $\to$ **`incompatible`** (*Các phần không tương thích và chưa được test khi ghép chung*).
  3. *Nét riêng cần giữ lại là gì?* $\to$ **`field`** (*C-A lệch trường dữ liệu, C-B sai đường dẫn API*).
  4. *Kết luận nào phù hợp nhất?* $\to$ **`limited`** (*Hai hồ sơ có vấn đề quy trình chung, nhưng chưa đủ để kết luận cho mọi nhóm*).

---

#### Nhiệm vụ T05 — Nếu điều kiện bên ngoài thay đổi (Phạm trù Tất nhiên & Ngẫu nhiên - PT03)
- **Loại nhiệm vụ**: Trắc nghiệm 4 câu hỏi (`choices`)
- **Đáp án**:
  1. *Dữ liệu vẫn thiếu fullName nhưng mạng ổn định thì sao?* $\to$ **`reject`** (*API vẫn từ chối dữ liệu thiếu trường bắt buộc*).
  2. *Sự cố mạng giữ vai trò nào trong phạm vi này?* $\to$ **`external`** (*Điều kiện bên ngoài, không sinh ra lỗi quy ước dữ liệu*).
  3. *Có thể bỏ qua sự cố mạng không?* $\to$ **`caused`** (*Không, nó làm khó việc đồng bộ và xử lý, dù không tạo lỗi dữ liệu*).
  4. *Nếu nhóm sửa đúng dữ liệu đầu vào thì sao?* $\to$ **`conditional`** (*Cần kiểm tra lại; khi nguyên nhân đổi, kết quả có thể đổi*).

---

#### Nhiệm vụ T06 — Tổ chức một báo cáo có căn cứ (Phạm trù Nội dung & Hình thức - PT04)
- **Loại nhiệm vụ**: Sắp xếp bố cục báo cáo 6 mảnh (`report`)
- **Thứ tự 6 mảnh thông tin**:
  1. `req`: **Yêu cầu: đổi name thành fullName**
  2. `incompat`: **Không tương thích: giao diện gửi name, API yêu cầu fullName**
  3. `test`: **Kết quả test: thiếu trường bắt buộc**
  4. `impact`: **Hậu quả: tạm ẩn bản demo**
  5. `measure`: **Biện pháp: bổ sung bước chuyển đổi dữ liệu**
  6. `retest`: **Nghiệm thu: test lại với dữ liệu mẫu**
- **Lý do chọn cách sắp xếp (`reason`)**: Chọn **`structure`** (*Trật tự này thể hiện chuỗi nhân quả: từ nguyên nhân bên trong dẫn đến hậu quả, từ đó đề xuất biện pháp và tiêu chí nghiệm thu*).

---

#### Nhiệm vụ T07 — Giải quyết mâu thuẫn trong quy trình (Quy luật Mâu thuẫn - QL02)
- **Loại nhiệm vụ**: Trắc nghiệm 4 câu hỏi (`choices`)
- **Đáp án**:
  1. *Hai mặt đối lập trong quy trình là gì?* $\to$ **`standard`** (*Yêu cầu chuẩn chung và yêu cầu chủ động, linh hoạt*).
  2. *Vì sao hai mặt này vẫn cần nhau?* $\to$ **`depend`** (*Cần chuẩn để tích hợp, cần chủ động để xử lý từng phần linh hoạt*).
  3. *Sự kìm hãm biểu hiện ở đâu?* $\to$ **`change`** (*Kiểm soát quá chặt làm chậm tiến độ; tự do quá mức làm vỡ chuẩn chung*).
  4. *Phương án giải quyết phù hợp là gì?* $\to$ **`delegate`** (*Phân quyền theo phạm vi, giữ quy ước và test chung*).

---

### CHƯƠNG 3: TỪ SỰ CỐ ĐẾN PHƯƠNG ÁN MỚI

#### Nhiệm vụ T08 — Khi nào thay đổi lượng tạo ra chất mới? (Quy luật Lượng - Chất - QL01)
- **Loại nhiệm vụ**: Trắc nghiệm mô hình liên kết (`choices`)
- **Đáp án**:
  1. *Mặt “lượng” đang được xét là gì?* $\to$ **`links`** (*Số liên kết được tạo trong mô hình*).
  2. *“Chất” mới của mô hình là gì?* $\to$ **`flow`** (*Luồng xử lý đi thông từ A đến D*).
  3. *Hai cách nối cho thấy điều gì?* $\to$ **`right`** (*Thêm yếu tố sai cấu trúc không tạo ra luồng hoạt động* - chỉ khi nối $B \to C$ thì luồng mới chạy).
  4. *Diễn giải nào phù hợp nhất?* $\to$ **`process`** (*Liên kết đúng là điều kiện; luồng thông suốt biểu hiện sự chuyển hóa về chất*).

---

#### Nhiệm vụ T09 — Thiết kế quy trình A′ (Quy luật Phủ định của phủ định - QL03)
- **Loại nhiệm vụ**: Trắc nghiệm 4 câu hỏi (`choices`)
- **Đáp án**:
  1. *Phương án A′ nên tổ chức thế nào?* $\to$ **`adaptive`** (*Tự quản phạm vi phụ trách, tuân thủ chuẩn chung và test liên tục*).
  2. *Yếu tố nào từ A còn phù hợp để kế thừa?* $\to$ **`autonomy`** (*Sự chủ động trong phạm vi phần việc*).
  3. *Yếu tố nào từ B cần được giữ lại?* $\to$ **`standards`** (*Quy ước chung và hệ thống nhật ký*).
  4. *A′ có phải A được lặp lại nguyên trạng không?* $\to$ **`higher`** (*Không, A′ kế thừa nhưng đã cải biến ở trình độ tổ chức mới*).

---

#### Nhiệm vụ T10 — Bản cập nhật nào là phát triển thực sự? (Nguyên lý về Sự phát triển - NL02)
- **Loại nhiệm vụ**: Trắc nghiệm 4 câu hỏi (`choices`)
- **Đáp án**:
  1. *V1 chỉ thay hiệu ứng giao diện. Đánh giá nào phù hợp?* $\to$ **`presentation`** (*Đó là thay đổi cách thể hiện, chưa giải quyết lỗi cốt lõi*).
  2. *V2 thêm giao diện tối và nút chia sẻ. Điều gì cần lưu ý?* $\to$ **`expansion`** (*Mở rộng tính năng không đồng nghĩa luồng chính đã hoạt động*).
  3. *V3 sửa dữ liệu và test lại. Kết luận nào hợp lý?* $\to$ **`capability`** (*V3 phát triển năng lực thực hiện luồng cốt lõi trong điều kiện đã test*).
  4. *Có thể khẳng định V3 chắc chắn thành công ở mọi nơi không?* $\to$ **`limited`** (*Không, cần tiếp tục kiểm tra trong các điều kiện khác*).

---

#### Nhiệm vụ T11 — Từ khả năng đến kết quả (Phạm trù Khả năng & Hiện thực - PT06)
- **Loại nhiệm vụ**: Lập kế hoạch khôi phục trong 60 phút (`recovery`)
- **Tiền đề hiện thực (`reality`)**: Chọn **`available`** (*Nhóm đang có sẵn mã nguồn, bản sao lưu, dữ liệu mẫu và nhân sự*).
- **Thứ tự 4 bước hành động cốt lõi (Tổng 55 phút / 60 phút)**:
  1. **`A1`**: **Chốt yêu cầu dữ liệu** (10 phút)
  2. **`A2`**: **Viết bước chuyển name → fullName** (20 phút, yêu cầu xong A1)
  3. **`A3`**: **Test đầu-cuối toàn hệ thống** (15 phút, yêu cầu xong A2)
  4. **`A4`**: **Chuẩn bị bản chạy cục bộ và tài liệu** (10 phút, yêu cầu xong A3)
  *(Không chọn A5, A6 vì tốn thời gian không cần thiết; không chọn A7 vì chờ mạng là thụ động).*
- **Kết luận về phương án (`conclusion`)**: Chọn **`limited`** (*Bản demo hoạt động trong phạm vi đã test không đồng nghĩa với sản phẩm sẵn sàng triển khai rộng rãi*).

---

## 5. ĐÁP ÁN CHI TIẾT — CHẾ ĐỘ DỄ (EASY)

Dành cho người mới làm quen, tập trung vào bản chất logic mà không dùng nhiều thuật ngữ kỹ thuật.

### Nhiệm vụ N1 — Một tin nhắn có đủ không? (Bản chất & Hiện tượng)
- **Câu hỏi**: *Điều gì đã xảy ra?*
- **Đáp án đúng**: **`withdraw`** (*Nhóm chủ động ẩn bản trình bày; chưa có căn cứ quy kết Nam phá hoại*).

### Nhiệm vụ N2 — Lỗi bắt đầu từ đâu? (Nguyên nhân & Kết quả)
- **Thứ tự 3 thẻ**:
  1. `changed`: **Yêu cầu thông tin thay đổi**
  2. `mismatch`: **Các phần chưa thống nhất**
  3. `failed`: **Chạy thử thất bại**
- **Câu hỏi phụ**: *Khi mạng hoạt động lại, lỗi trên máy có tự hết không?*
- **Đáp án đúng**: **`unchanged`** (*Không, hai phần vẫn cần được sửa cho thống nhất*).

### Nhiệm vụ N3 — Hiểu đúng và kể rõ (Cái riêng - Cái chung / Nội dung - Hình thức)
- **Câu hỏi 1**: *Nhóm Mạch Nối và nhóm B có điểm gì giống nhau?*
- **Đáp án**: **`both_incompat`** (*Cả hai đều có các phần chưa thống nhất và chưa kiểm tra chung*).
- **Câu hỏi 2**: *Nhóm C thì sao?*
- **Đáp án**: **`unified`** (*Các phần thống nhất và đã kiểm tra, nên vẫn chạy trên máy khi mất mạng*).
- **Câu hỏi 3**: *Khi viết báo cáo, người đọc cần thấy điều gì trước?*
- **Đáp án**: **`cause_first`** (*Nguyên nhân gây ra sự cố, rồi mới đến kết quả và cách xử lý*).

### Nhiệm vụ N4 — Cách phối hợp mới (Quy luật Mâu thuẫn & Phủ định của phủ định)
- **Câu hỏi 1**: *Cách làm thứ nhất (mỗi người tự làm) gặp hạn chế gì?*
- **Đáp án**: **`hard_merge`** (*Làm nhanh lúc đầu nhưng các phần khó ghép lại*).
- **Câu hỏi 2**: *Cách làm thứ hai (chờ một người duyệt) gặp hạn chế gì?*
- **Đáp án**: **`bottleneck`** (*Thống nhất hơn nhưng công việc bị dồn ứ lại*).
- **Câu hỏi 3**: *Cách phối hợp mới nên thế nào?*
- **Đáp án**: **`balance`** (*Giao quyền trong từng phần việc, giữ quy ước chung và kiểm tra khi ghép lại*).

### Nhiệm vụ N5 — Kế hoạch khôi phục (Khả năng & Hiện thực)
- **Thứ tự 3 công việc**:
  1. `agree`: **Thống nhất mẫu thông tin**
  2. `repair`: **Sửa các phần cho khớp nhau**
  3. `check`: **Chạy thử toàn bộ trên máy**
- **Câu hỏi**: *Bản V3 sửa hai phần cho thống nhất có ý nghĩa gì?*
- **Đáp án**: **`fix_core`** (*Nó giải quyết đúng vấn đề chính, dù chưa thay đổi nhiều về diện mạo*).

---

## 6. KẾT LUẬN CHUNG CUỘC & 4 KẾT THÚC (ENDINGS)

### 6.1. Bảng lựa chọn Kết luận cuối (Verdict)
Khi kết thúc điều tra, người chơi chọn 1 trong 4 nhận định và đính kèm chứng cứ:
- **V1**: *Nam đã phá hoại dự án vì bức xúc.* (Sai hoàn toàn)
- **V2**: *Sự cố mạng là nguyên nhân duy nhất khiến dự án thất bại.* (Sai, bỏ qua nguyên nhân nội bộ)
- **V3**: **Nhóm chủ động ẩn bản demo khi chưa test; lỗi dữ liệu và quy trình là có thật, nhưng không có bằng chứng Nam phá hoại.** $\to$ **ĐÁP ÁN CHUẨN XÁC NHẤT.**
- **V4**: *Chưa thể kết luận nếu không đối chiếu thêm chứng cứ.* (Chưa đủ tự tin lập luận)

### 6.2. Yêu cầu 4 chứng cứ đính kèm để đạt điểm tuyệt đối:
Để hồ sơ đạt mức **Hồ sơ vững / Hoàn hảo (100 điểm)**, người chơi phải chọn đúng 4 chứng cứ đại diện:
1. **`E08`** (Bắt buộc): Chứng minh Mai chỉ set `HIDDEN`, không có thao tác xóa code.
2. **`E05`** (Bắt buộc): Chứng minh lỗi dữ liệu đã xuất hiện lúc 19:20, trước khi mất mạng.
3. Một trong hai chứng cứ: **`E03`** hoặc **`E04`** (Chứng minh việc đổi trường dữ liệu và không tương thích).
4. Một trong hai chứng cứ: **`E07`** hoặc **`E09`** (Chứng minh trao đổi đầy đủ của Nam hoặc việc thiếu kiểm thử tích hợp).

*(Ở chế độ Dễ: chỉ cần chọn kết luận V3 và đính kèm chứng cứ **`EZ02`**).*

---

### 6.3. Chi tiết 4 Kết thúc (Endings)

| Kết thúc | Tên kết thúc | Đánh giá | Điều kiện kích hoạt | Lời khuyên của trò chơi |
|:---:|---|---|---|---|
| **01** | **Kết luận còn vội** | CẦN KIỂM CHỨNG THÊM | Người chơi chọn **`V1`** (kết tội Nam) hoặc **`V2`** (đổ lỗi hoàn toàn cho mạng). | Bạn đã dựa quá nhiều vào một dấu hiệu bề ngoài. Hãy đối chiếu E07/E08 (Nam không xóa code) và E05/E06 (lỗi có từ 19:20 trước khi mạng sập). |
| **02** | **Đã thấy sự cố, chưa thấy toàn bộ cơ chế** | CẦN PHÂN TÍCH TOÀN DIỆN | Chọn **`V4`**, hoặc chọn V3 nhưng điểm số thấp ($<30$), các nhiệm vụ cốt lõi (T01, T02, T05) chưa đạt chuẩn, hoặc thiếu 4 chứng cứ chuẩn. | Bạn đã nhận diện được một phần vấn đề nhưng chưa nối chuỗi nguyên nhân và điều kiện thành một hệ thống lập luận hoàn chỉnh. |
| **03** | **Đã tìm được gốc rễ, cần hoàn thiện phương án** | NHẬN DIỆN ĐÚNG VẤN ĐỀ | Chọn **`V3`** đúng, phân tích nguyên nhân tốt nhưng các nhiệm vụ Chương 3 (T09, T10, T11) làm chưa đạt hoặc kế hoạch 60 phút thất bại. | Bạn đã tìm ra gốc rễ sự cố nhưng phương án tái thiết và khôi phục chưa tối ưu (vượt quá thời gian 60 phút hoặc thiếu điều kiện tiên quyết). |
| **04** | **Khép lại hồ sơ bằng một lập luận có căn cứ** | LẬP LUẬN CÓ CĂN CỨ *(PERFECT ENDING)* | Chọn **`V3`**, gắn đủ 4 chứng cứ hợp lệ, điểm các nhiệm vụ $\ge 30$, hoàn thành kế hoạch khôi phục T11 (55/60 phút). | **Xuất sắc!** Bạn đã đối chiếu hiện tượng với bản chất, phân biệt nguyên nhân với điều kiện, tìm ra mâu thuẫn quy trình và lập kế hoạch khôi phục khả thi. Đây là sự vận dụng mẫu mực của tư duy biện chứng duy vật vào thực tiễn. |

---
*Tài liệu được biên soạn phục vụ học tập, ôn tập học phần Triết học Mác – Lênin (MLN111) và nghiên cứu kịch bản trò chơi Hồ Sơ Đảo Chiều.*
