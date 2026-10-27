'use strict';

// Dữ liệu bài viết. Muốn thêm bài thì copy 1 khối { ... } rồi đổi id (không trùng nhau).
const BAI_VIET = [
  {
    id: 1, loai: 'Hướng dẫn', ngay: '2026-10-20', phut: 4, sp: [1, 9, 11],
    tieuDe: 'Lắp Gundam snap-fit lần đầu: cần chuẩn bị gì?',
    tomTat: 'Chỉ với vài dụng cụ rẻ tiền, bạn đã có thể lắp một bộ Gundam gọn gàng, không cần keo hay sơn.',
    noiDung: [
      'Snap-fit nghĩa là các chi tiết khớp vào nhau bằng ngàm, không cần keo. Đây là dạng dễ nhất cho người mới, và hầu hết bộ Gundam HG, RG, MG đều theo kiểu này.',
      '## Dụng cụ nên có',
      'Kìm cắt nhựa (nipper) là món quan trọng nhất, hãy chọn loại một lưỡi để vết cắt phẳng. Ngoài ra nên có dao mỹ thuật nhỏ, giấy nhám mịn (độ nhám từ 400 đến 1000) và nhíp để dán decal.',
      '## Quy trình cơ bản',
      'Cắt chi tiết khỏi khung (runner) cách chỗ nối khoảng 1 đến 2 mm, sau đó tỉa phần nhựa thừa bằng dao hoặc nhám. Làm vậy sẽ không để lại vết trắng trên bề mặt. Lắp theo đúng thứ tự trong sách hướng dẫn, đối chiếu số hiệu chi tiết trước khi ép ngàm.',
      '## Lưu ý',
      'Đừng ép mạnh nếu ngàm chưa khớp, hãy kiểm tra lại chiều của chi tiết. Làm việc trên mặt phẳng sáng, dùng khay nhỏ để đựng chi tiết đã cắt để khỏi thất lạc.'
    ]
  },
  {
    id: 2, loai: 'Hướng dẫn', ngay: '2026-10-15', phut: 3, sp: [1, 2, 15],
    tieuDe: 'Chọn tỉ lệ 1/144, 1/100 hay 1/72 cho phù hợp',
    tomTat: 'Tỉ lệ quyết định kích thước, độ chi tiết và giá của mô hình. Đây là cách chọn cho đúng nhu cầu.',
    noiDung: [
      'Tỉ lệ 1/100 nghĩa là mô hình nhỏ hơn vật thật 100 lần. Số sau dấu gạch càng lớn thì mô hình càng nhỏ.',
      '## 1/144',
      'Một con Gundam cao khoảng 12 đến 13 cm. Giá dễ chịu, lắp nhanh, hợp người mới và người muốn sưu tầm nhiều mẫu mà không tốn chỗ.',
      '## 1/100',
      'Cao khoảng 18 cm, thường là dòng Master Grade có khung xương bên trong, khớp cử động nhiều và chi tiết hơn. Phù hợp khi bạn đã quen tay và muốn một mẫu trưng bày đẹp.',
      '## 1/72',
      'Hay dùng cho máy bay. Một chiếc chiến đấu cơ cỡ F-16 dài khoảng 21 cm, đủ lớn để thể hiện buồng lái và vũ khí. Dòng này thường cần sơn và dán decal.',
      'Nếu phân vân, hãy bắt đầu với 1/144 để làm quen rồi nâng dần lên.'
    ]
  },
  {
    id: 3, loai: 'Mẹo chơi', ngay: '2026-10-10', phut: 3, sp: [3, 5, 12],
    tieuDe: 'Dán decal nước không bị bọt khí',
    tomTat: 'Bọt khí và viền đục là lỗi phổ biến nhất khi dán decal nước. Vài bước nhỏ giúp tránh được hết.',
    noiDung: [
      'Decal nước bám tốt nhất trên bề mặt bóng. Nếu mô hình của bạn là nhựa nhám, hãy phủ một lớp clear bóng mỏng trước khi dán.',
      '## Các bước dán',
      'Cắt sát hình decal, ngâm nước ấm khoảng 10 đến 15 giây, đặt lên khăn giấy chờ chừng 30 giây cho keo mềm. Dùng nhíp đặt decal vào vị trí rồi trượt nhẹ tấm giấy nền ra.',
      'Dùng tăm bông hoặc khăn giấy ẩm ép nhẹ từ giữa ra ngoài để đẩy bọt khí và nước thừa. Nếu có dung dịch làm mềm decal, hãy nhỏ lên để decal ôm sát các đường cong.',
      '## Hoàn thiện',
      'Để khô hoàn toàn rồi phủ thêm một lớp clear để bảo vệ và che viền decal.'
    ]
  },
  {
    id: 4, loai: 'Bảo quản', ngay: '2026-10-05', phut: 3, sp: [4, 6, 13],
    tieuDe: 'Trưng bày mô hình để tránh bụi và ngả màu nhựa',
    tomTat: 'Ánh nắng, bụi và độ ẩm là ba kẻ thù của mô hình. Đây là cách giữ mô hình đẹp lâu năm.',
    noiDung: [
      '## Tránh ánh nắng trực tiếp',
      'Tia UV làm nhựa ngả vàng và phai màu theo thời gian. Hãy đặt mô hình xa cửa sổ, hoặc dùng kính, hộp acrylic có lớp chống UV.',
      '## Chống bụi',
      'Tủ kính hoặc hộp acrylic là giải pháp tốt nhất. Khi lau, dùng chổi lông mềm hoặc bình xịt hơi, tránh dùng khăn ướt với chi tiết sơn hoặc decal.',
      '## Giữ khô ráo',
      'Độ ẩm cao dễ gây mốc ở hộp giấy và làm hỏng decal. Có thể bỏ thêm gói hút ẩm trong tủ. Với mô hình kim loại đúc, hãy tránh để nơi ẩm vì dễ gỉ ở các khớp.'
    ]
  },
  {
    id: 5, loai: 'Mẹo chơi', ngay: '2026-09-28', phut: 4, sp: [5, 15, 16],
    tieuDe: 'Sơn mô hình lần đầu: bắt đầu từ đâu?',
    tomTat: 'Sơn giúp mô hình máy bay và xe trông chân thực hơn rất nhiều. Đây là lộ trình gọn cho người mới.',
    noiDung: [
      'Bạn không cần súng phun sơn ngay từ đầu. Sơn cọ với sơn nước acrylic dành cho mô hình đã đủ cho các chi tiết nhỏ.',
      '## Chuẩn bị',
      'Rửa khung nhựa bằng nước ấm pha chút xà phòng để bỏ dầu, để khô rồi mới sơn. Có thể phun một lớp lót (primer) để sơn bám tốt và lên màu đều.',
      '## Sơn mỏng nhiều lớp',
      'Sơn nhiều lớp mỏng, chờ khô giữa các lớp, sẽ đẹp hơn một lớp dày bị loang và che mất chi tiết. Hãy thử trên một chi tiết thừa của khung trước.',
      '## Làm lão hóa (tùy chọn)',
      'Dùng nước rửa (wash) màu đen hoặc nâu loãng chảy vào các rãnh để tạo chiều sâu, rồi lau bớt phần thừa.'
    ]
  },
  {
    id: 6, loai: 'Tin mới', ngay: '2026-10-25', phut: 2, sp: [7, 8, 18, 19, 20],
    tieuDe: 'Figure mới về kho: Goku, Zoro và Tanjiro',
    tomTat: 'Ba nhân vật được yêu thích vừa được bổ sung cùng các mẫu Naruto và Luffy.',
    noiDung: [
      'Cửa hàng vừa bổ sung các mẫu figure PVC sơn thủ công cao từ 22 đến 25 cm, kèm đế trưng bày và hộp đóng gói sưu tầm.',
      'Một số mẫu có số lượng rất ít, nếu bạn đã chọn được nhân vật yêu thích thì nên đặt sớm. Danh sách mô hình liên quan nằm ngay bên dưới bài viết.'
    ]
  }
];