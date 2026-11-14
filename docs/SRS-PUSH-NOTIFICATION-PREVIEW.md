# Software Requirements Specification (SRS)
## Push Notification Visual Preview & FCM Payload Builder

* **Dự án:** Store Preview Studio (`storepreviewstudio.com`)
* **Tính năng:** Push Notification Visual Preview & FCM Payload Builder (Micro-tool kéo traffic)
* **Route:** `/push-preview`
* **Mục tiêu:** Cung cấp công cụ xem trước thông báo đẩy trực quan trên đa nền tảng (iPhone & Android Phone), kèm bộ đếm ký tự cảnh báo cắt chữ và bộ sinh mã JSON FCM v1 chuẩn 100% Client-side, làm phễu chuyển đổi dẫn về các sản phẩm Gumroad.

---

## 1. Mục tiêu sản phẩm & Tầm nhìn (Product Vision & Strategy)

### 1.1 Vấn đề giải quyết (Core Pain Points)
* **Marketer / Copywriter:** Soạn tiêu đề và nội dung thông báo đẩy (Push Notification) nhưng không biết khi hiển thị thực tế trên màn hình khóa iPhone hoặc thanh trạng thái Android có bị cắt chữ (`...`) làm mất ý nghĩa câu kêu gọi hành động (CTA) hay không.
* **Developer (Mobile / Backend):** Sau khi nhận nội dung từ Marketing, dev phải mất công tự gõ và lắp ghép thủ công thành cấu trúc JSON Payload theo chuẩn API v1 mới của Firebase Cloud Messaging (FCM) hoặc APNs.
* **Rào cản của các công cụ hiện có (OneSignal, v.v.):** 
  * Giao diện mô phỏng cũ kỹ, lỗi thời.
  * Bắt buộc phải có URL ảnh online, không cho kéo thả ảnh từ máy.
  * Giấu cấu trúc payload của Firebase nhằm ép người dùng dùng dịch vụ trả phí của họ.

### 1.2 Giải pháp của Store Preview Studio
* **100% Client-side & Local-first:** Dữ liệu và hình ảnh người dùng kéo thả được xử lý trực tiếp trên trình duyệt, không lưu trữ trên máy chủ, an toàn bảo mật.
* **Mô phỏng chân thực:** Khung thông báo iPhone phong cách kính mờ hiện đại và Android Phone phong cách Material You với 2 chế độ: Thu gọn (Collapsed) và Mở rộng (Expanded kèm ảnh lớn).
* **Bộ đếm an toàn (Safe Character Meter):** Đo lường và cảnh báo trước điểm bị cắt chữ trên thiết bị thực tế.
* **1-Click Export FCM v1 JSON:** Xuất mã JSON chuẩn Firebase Cloud Messaging HTTP v1 API cho dev dùng ngay lập tức.
* **Phễu chuyển đổi:** Đặt banner tinh tế dẫn về *The No-BS ASO Cheatsheet ($0)* và *Store Preview Studio ($39)*.

---

## 2. Yêu cầu tuân thủ nguyên tắc thiết kế (Workspace Guardrails)

* **Không cam kết quá đà:** Tuyệt đối không dùng các từ ngữ cấm như `pixel perfect`, `production ready`, `with confidence`, `100% guaranteed`. Dùng các từ thay thế khách quan: `realistic device frames`, `styled frames`, `stored locally in your browser`, `streamlined`.
* **Tên thiết bị chung (Generic Device Categories):** Chỉ dùng `iPhone`, `Android phone`, `Web browser`, không ghi đích danh model phần cứng cụ thể (`iPhone 15 Pro`, `Pixel 8`).
* **Bảo vệ thương hiệu IP:** Không dùng logo quả táo Apple hoặc logo tam giác Google Play nguyên bản; dùng neutral geometric icons hoặc text pills.
* **Không dùng pill màu mè AI-slop:** Dùng plain text hoặc neutral pill (`bg-white text-[#0f172a]` hoặc `bg-[#1D1E1D] border-[#282928] text-[#989A99]`), không dùng combo chữ xanh + nền mờ xanh + viền xanh.

---

## 3. Yêu cầu chức năng chi tiết (Functional Requirements)

### FR-1: Bộ nhập liệu & Xử lý Asset (Push Editor Form)
* **FR-1.1 Tên ứng dụng (App Name):** Tối đa 25 ký tự, cập nhật tức thì lên thanh header của thông báo.
* **FR-1.2 Tiêu đề (Notification Title):** Tối đa 60 ký tự. Có bộ đếm ký tự và vạch mức an toàn (khuyến nghị $\le$ 40 ký tự để không bị cắt trên màn hình nhỏ).
* **FR-1.3 Phụ đề (Subtitle - Dành riêng cho iPhone):** Tối đa 60 ký tự, hiển thị giữa Tiêu đề và Nội dung trên iPhone.
* **FR-1.4 Nội dung (Notification Body):** Hỗ trợ văn bản nhiều dòng. Bộ đếm ký tự hiển thị cảnh báo đỏ khi vượt mốc khuyến nghị 120 ký tự.
* **FR-1.5 Icon ứng dụng (App Icon):**
  * Hỗ trợ upload ảnh từ máy tính (kéo thả hoặc chọn file) qua `URL.createObjectURL`.
  * Hỗ trợ nhập URL ảnh trực tuyến.
  * Có sẵn icon mặc định nếu chưa chọn ảnh.
* **FR-1.6 Ảnh đính kèm (Big Picture / Media Attachment):**
  * Hỗ trợ kéo thả hoặc chọn file ảnh lớn (tỉ lệ 16:9 hoặc 2:1).
  * Hiển thị trong chế độ xem mở rộng (Expanded state).
* **FR-1.7 Nút hành động tương tác (Action Buttons):**
  * Cho phép thêm tối đa 3 nút bấm (ví dụ: *Open, Reply, Dismiss*).
  * Giới hạn tối đa 15 ký tự/nút.

### FR-2: Khung xem trước trực quan (Visual Mockup Previews)
* **FR-2.1 Bộ chuyển đổi thiết bị (Device Switcher):**
  * Tab `iPhone`: Màn hình khóa với đồng hồ số, ngày tháng, hiệu ứng kính mờ (blur / glassmorphism card), nhãn thời gian ("now" hoặc "2m ago").
  * Tab `Android phone`: Thanh thông báo phong cách Material You, biểu tượng ứng dụng, tên app, chevron thu phóng, nút bấm dạng capsule.
* **FR-2.2 Bộ chuyển đổi trạng thái (State Switcher):**
  * `Collapsed` (Thu gọn): Trạng thái mặc định trên màn hình khóa hoặc thanh thông báo.
  * `Expanded` (Mở rộng): Trạng thái khi người dùng nhấn giữ / vuốt mở thông báo để xem ảnh lớn đính kèm và các nút hành động.
* **FR-2.3 Bộ chuyển đổi giao diện nền (Theme Switcher):**
  * Cho phép xem trên nền Sáng (Light wallpaper) hoặc Tối (Dark wallpaper) để kiểm tra độ tương phản chữ.

### FR-3: Đo lường giới hạn ký tự thông minh (Smart Character Meter)
* Hiển thị chỉ báo trực quan 3 mức độ:
  * **An toàn (Xanh / Neutral):** Ký tự trong khoảng tối ưu hiển thị trọn vẹn trên mọi kích thước màn hình.
  * **Cảnh báo (Vàng):** Có thể bị cắt chữ trên các thiết bị màn hình nhỏ.
  * **Nguy hiểm (Đỏ):** Chắc chắn bị cắt bằng dấu ba chấm (`...`) trên thiết bị thực tế.

### FR-4: Bộ xuất mã cho lập trình viên (Developer Code Exporter)
* **FR-4.1 Firebase Cloud Messaging (FCM v1) JSON Payload:**
  * Sinh đoạn mã JSON hoàn chỉnh chuẩn cấu trúc `projects.messages.send` (HTTP v1 API).
  * Bao gồm đầy đủ các block: `message.notification`, `message.android.notification`, và `message.apns.payload.aps`.
* **FR-4.2 APNs Payload (iOS Native):** Cấu trúc payload chuẩn của Apple Push Notification service.
* **FR-4.3 Nút 1-Click Copy:** Sao chép nhanh vào clipboard với hiệu ứng toast phản hồi người dùng.

### FR-5: Phễu chuyển đổi & Giới thiệu sản phẩm (Conversion Funnel)
* Đặt banner cố định dưới chân công cụ:
  * Nút dẫn tới **The No-BS ASO Cheatsheet ($0)** trên Gumroad.
  * Nút dẫn tới **Store Preview Studio ($39)** với mô tả ngắn gọn giúp kiểm tra toàn diện danh sách App Store & Google Play trước khi nộp duyệt.

---

## 4. Kiến trúc kỹ thuật & Cấu trúc thư mục (Architecture)

```
src/
├── app/
│   └── push-preview/
│       ├── page.tsx                    # Route chính của công cụ (/push-preview)
│       └── layout.tsx                  # Metadata SEO, OpenGraph riêng cho tool
└── components/
    └── push-preview/
        ├── PushPreviewHub.tsx          # Component cha điều phối State toàn bộ tool
        ├── PushFormEditor.tsx          # Form nhập liệu, kéo thả ảnh, đếm ký tự
        ├── IosPreviewCard.tsx          # Khung mô phỏng iPhone Lock Screen
        ├── AndroidPreviewCard.tsx      # Khung mô phỏng Android Phone Notification
        ├── CharacterSafeMeter.tsx      # Thanh đo ký tự an toàn
        ├── FcmPayloadModal.tsx         # Modal xuất mã JSON FCM v1 / APNs
        └── FunnelFooterBanner.tsx      # Banner điều hướng sang Gumroad ($0 & $39)
```

---

## 5. Tiêu chí nghiệm thu (Acceptance Criteria)

1. [ ] Người dùng nhập App Name, Title, Subtitle, Message thì khung xem trước tự động cập nhật ngay lập tức không có độ trễ.
2. [ ] Kéo thả ảnh từ máy tính hiển thị ngay lập tức lên khung xem trước cả icon và ảnh đính kèm.
3. [ ] Chuyển đổi mượt mà giữa `iPhone` và `Android phone`, giữa trạng thái `Collapsed` và `Expanded`.
4. [ ] Bấm nút "Export FCM Payload" hiển thị modal chứa mã JSON hợp lệ cấu trúc FCM v1, bấm Copy thành công.
5. [ ] Giao diện chuẩn mực, tuân thủ bảng màu tối sang trọng của `storepreviewstudio.com`, không dính lỗi AI-slop badge pill.
6. [ ] Chạy mượt mà trên `localhost:3000/push-preview` với Next.js dev server.
