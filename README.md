# 🏆 Kéo Co Đấu Trí - Tug of War Trivia

Trò chơi đối kháng kéo co trắc nghiệm kiến thức đời sống & khoa học thường thức dành cho 2 người chơi trên cùng bàn phím hoặc 1 người đấu với AI Bot.

---

## 🚀 Hướng Dẫn Deploy Lên GitHub Pages

Bạn có thể lựa chọn 1 trong 2 cách cực kỳ nhanh chóng dưới đây:

### 🌟 CÁCH 1: Deploy Trực Tiếp 3 File Tĩnh (Không Cần Cài Đặt, Chạy Ngay)
Trong thư mục `docs/`, toàn bộ mã nguồn đã được viết lại thành **3 file độc lập chuẩn HTML, CSS, JS**:
- `docs/index.html`
- `docs/style.css`
- `docs/app.js`

**Các bước đưa lên GitHub Pages:**
1. Tạo một repository mới trên GitHub (ví dụ đặt tên: `keo-co-dau-tri`).
2. Tải hoặc kéo thả 3 file `index.html`, `style.css`, `app.js` lên repository của bạn.
3. Vào mục **Settings** của repository trên GitHub ➔ Chọn tab **Pages** (ở cột bên trái).
4. Ở mục **Build and deployment** ➔ **Branch**:
   - Chọn nhánh `main` (hoặc `master`).
   - Thư mục chọn `/(root)` nếu bạn để 3 file ở ngoài, hoặc chọn `/docs` nếu bạn giữ nguyên cấu trúc thư mục này.
   - Nhấn **Save**.
5. Đợi khoảng 1 phút, GitHub sẽ cung cấp đường link web trực tiếp (dạng: `https://<tên-của-bạn>.github.io/keo-co-dau-tri/`).

---

### ⚙️ CÁCH 2: Deploy Tự Động Bằng GitHub Actions (Từ Source Code Vite / React)
Dự án đã được tích hợp sẵn file cấu hình tự động `.github/workflows/deploy.yml`:
1. Push toàn bộ mã nguồn của dự án lên GitHub.
2. Vào **Settings** ➔ **Pages** trên GitHub.
3. Ở mục **Source**, chọn **GitHub Actions**.
4. GitHub sẽ tự động biên dịch và triển khai website mỗi khi bạn cập nhật code!

---

## 🎮 Cách Chơi & Phím Bấm

| Đội | Vị Trí | Phím Bấm Đáp Án |
|---|---|---|
| 🔴 **Đội Đỏ** | Bên Trái | Các phím số `1`, `2`, `3`, `4` (tương ứng đáp án A, B, C, D) |
| 🔵 **Đội Xanh** | Bên Phải | Các phím mũi tên `↑`, `←`, `↓`, `→` hoặc cụm chữ `I`, `J`, `K`, `L` |
| ⏸️ **Tiếp Tục** | Cả hai | Phím `Space` hoặc `Enter` để qua câu hỏi tiếp theo |

---

## ✨ Tính Năng Nổi Bật
- **Thiết Kế 1 Màn Hình Chuẩn**: Bảng câu hỏi hiển thị riêng ở hai bên, 4 phương án trả lời nằm ngay ở dưới, không cần cuộn trang.
- **Võ Đài Kéo Co Sống Động**: Nhân vật gồng mình, dây thừng co giãn, vạch đo mét (-100m đến +100m).
- **Âm Thanh Web Audio 100% Thuần**: Tiếng còi trọng tài, tiếng kéo rít dây thừng, tiếng trả lời đúng/sai, tiếng cỗ vũ reo hò không cần tải thêm file mp3 ngoài.
- **Độ Khó Đa Dạng**: Nhanh (phản xạ mẹo sống), Vừa (hiện tượng tự nhiên), Khó (kỳ quan & vũ trụ), Chuyên Gia (vật lý lượng tử), và Tăng Tiến 10 câu.
- **Chế Độ Chơi**: Đấu 2 người (PvP) hoặc Đấu với Máy (AI Bot).
