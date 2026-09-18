import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hồ Sơ Đảo Chiều — Demo biến mất",
  description: "Một tin nhắn. Một bản demo bị rút. Một kết luận quá sớm. Game trinh thám tương tác về phép biện chứng duy vật.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
