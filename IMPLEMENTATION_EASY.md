# Ghi chú triển khai chế độ Dễ

## Phạm vi đã xác nhận

Yêu cầu bổ sung của người dùng ưu tiên hơn những mục thay giao diện/luồng trong PLAN.md: chỉ rút gọn nội dung, giữ giao diện và luồng, thêm lựa chọn Dễ/Tiêu chuẩn.

Áp dụng: 2 chương / 5 nhiệm vụ / 7 chứng cứ, câu chữ đời thường, ba thẻ mỗi bài sắp xếp, đủ 11 liên hệ kiến thức, bốn ô lưu độc lập, chuyển đổi bản lưu cũ sang Tiêu chuẩn.

Không áp dụng các mục của plan làm đổi giao diện hoặc luồng: hướng dẫn nổi, tự mở đồ vật, đọc cạnh câu hỏi, màn từng bước, khóa N1→N5, câu đúng chỉ đọc, bỏ mức tự tin, rút cảnh mở đầu, ẩn điểm/độ tin cậy, thay bằng hai kết thúc. Không sửa CSS, hình ảnh, âm thanh hoặc bố cục phòng.

## Cấu trúc

- `game/easy.ts`: nội dung, phản biện, giải mã và liên hệ kiến thức rút gọn.
- `game/config.ts`: chọn nội dung và vị trí tài liệu theo độ khó, ngưỡng chương và mẫu số điểm.
- `game/engine.ts`: chấm đáp án, điều kiện chương, bốn kết thúc, mô phỏng và kiểm tra bản lưu theo cấu hình.
- `game/storage.ts`: khóa `hsdc:save:<individual|presenter>:<easy|standard>:v2`, chuyển đổi không xóa v1, không ghi đè v2.
- Các màn hình cũ đọc cấu hình từ GameProvider; không nhân bản giao diện cho bản Dễ.

Mỗi nhiệm vụ Dễ có 1–2 tiêu chí tương ứng các thao tác; tổng 9 tiêu chí. Giữ thang hiển thị phần trăm và độ tin cậy, thay mẫu số theo nội dung thực tế. Tiêu chuẩn vẫn tối đa 44.

Kết thúc Dễ: V1/V2 → nhánh 1; V4 hoặc thiếu cơ sở → nhánh 2. Cơ sở yêu cầu ít nhất 6/9, N1 đạt 1, N2 đạt 2 và gắn EZ02. Khi có cơ sở nhưng N4 hoặc N5 chưa đạt 2 → nhánh 3; còn lại → nhánh 4. Không tính điểm ghi chú, thời gian, số lần thử hay việc dùng gợi ý.

## Kiểm tra

Chạy `npm run test:unit`, `npm run typecheck`, `npm run test:e2e`, `npm run build`.

Bộ test đơn vị cũ có một dữ liệu sai: đáp án gọi là yếu ở T01 thực ra đạt 3/4, bằng ngưỡng qua chương. Đã sửa dữ liệu test thành 2/4; không đổi ngưỡng hoặc cách chấm Tiêu chuẩn.

Thời lượng 8–12 phút là mục tiêu nội dung, chưa phải kết quả thử với ba người mới. Xuất bản là bước bàn giao riêng như PLAN.md.

Kết quả kiểm tra khi bàn giao: TypeScript đạt; 53 test đơn vị đạt; 8 kịch bản Playwright đạt (5 đạt trong lượt đầy đủ, 3 kịch bản được chạy lại sau khi điều chỉnh bộ test theo hành vi hiện có). Hai kịch bản chơi trọn lượt xác nhận Dễ đạt 9/9 và Tiêu chuẩn đạt 44/44, đều đi đến kết thúc 4.

Build thành công. Công cụ build báo cảnh báo cú pháp CSS có sẵn trong khối `@media print`; không sửa stylesheet vì phạm vi yêu cầu giữ nguyên giao diện. Khi test, giữ nguyên hành vi cũ: header và nút ghim trên điện thoại bị CSS ẩn; nếu quay lại phòng rất sớm, đoạn mở đầu có thể phát lại; thông báo xung đột có thể nằm sau phòng nên dùng nút thoát phòng để tải bản mới nhất.
