'use strict';

// ===== Dữ liệu sản phẩm (frontend, chưa có backend) =====
const SAN_PHAM_MAC_DINH = [
  { id: 1, ten: 'Gundam RX-78-2 tỉ lệ 1/100', loai: 'Gundam', gia: 1450000, giaCu: 1650000, kho: 5, anh: 'Images/sv1.jpg', mota: 'Bộ lắp ráp snap-fit, không cần keo. Khớp cử động linh hoạt, kèm kiếm beam và khiên.' },
  { id: 2, ten: 'Gundam Strike Freedom MG', loai: 'Gundam', gia: 1450000, kho: 5, anh: 'Images/sv2.jpg', mota: 'Master Grade với khung xương bên trong, cánh Wing of Light có thể mở rộng.' },
  { id: 3, ten: 'Xe Ferrari F40 tỉ lệ 1/24', loai: 'Xe mô hình', gia: 380000, giaCu: 450000, kho: 15, anh: 'Images/sv3.jpg', mota: 'Mô hình lắp ráp có nắp ca-pô mở được, bánh xe cao su và decal nước.' },
  { id: 4, ten: 'Xe Porsche 911 1/18 đúc kim loại', loai: 'Xe mô hình', gia: 1250000, kho: 0, anh: 'Images/sv4.jpg', mota: 'Thân xe đúc kim loại, cửa và nắp ca-pô mở được, nội thất chi tiết.' },
  { id: 5, ten: 'Máy bay F-16 Fighting Falcon 1/72', loai: 'Máy bay', gia: 380000, kho: 15, anh: 'Images/sv5.jpg', mota: 'Bộ kit nhựa cần sơn và dán decal, phù hợp người mới tập lắp mô hình máy bay.' },
  { id: 6, ten: 'Máy bay Boeing 747 tỉ lệ 1/200', loai: 'Máy bay', gia: 690000, moi: true, kho: 10, anh: 'Images/sv6.jpg', mota: 'Mô hình trưng bày có bệ đỡ, sơn sẵn theo livery hãng hàng không.' },
  { id: 7, ten: 'Figure Naruto Uzumaki', loai: 'Figure', gia: 780000, moi: true, kho: 3, anh: 'Images/sv7.jpg', mota: 'Figure PVC cao 22 cm, sơn thủ công, đế trưng bày có hiệu ứng Rasengan.' },
  { id: 8, ten: 'Figure Luffy Gear 5', loai: 'Figure', gia: 780000, kho: 3, anh: 'Images/sv8.jpg', mota: 'Figure PVC cao 25 cm, tư thế chiến đấu, hộp đóng gói sưu tầm.' },
    // ----- Gundam -----
  { id: 9, ten: 'Gundam Barbatos HG 1/144', loai: 'Gundam', gia: 420000, kho: 12, anh: 'Images/sp1.jpg', mota: 'Bộ HG dễ lắp cho người mới, kèm chùy và súng, khớp cử động tốt.' },
  { id: 10, ten: 'Gundam Unicorn RG 1/144', loai: 'Gundam', gia: 1250000, giaCu: 1450000, kho: 4, anh: 'Images/sp2.jpg', mota: 'Real Grade với khung xương chi tiết, có thể chuyển sang chế độ Destroy Mode.' },
  { id: 11, ten: 'Gundam Exia HG 1/144', loai: 'Gundam', gia: 390000, moi: true, kho: 8, anh: 'Images/sp3.jpg', mota: 'Mẫu Exia kinh điển, kèm kiếm GN và bộ vũ khí cận chiến.' },
  // ----- Xe mô hình -----
  { id: 12, ten: 'Xe Lamborghini Aventador 1/24', loai: 'Xe mô hình', gia: 420000, kho: 10, anh: 'Images/sp4.jpg', mota: 'Mô hình lắp ráp có cửa mở dạng cánh kéo, bánh cao su và decal nước.' },
  { id: 13, ten: 'Xe Nissan GT-R R35 1/18 đúc kim loại', loai: 'Xe mô hình', gia: 1350000, kho: 6, anh: 'Images/sp5.jpg', mota: 'Thân đúc kim loại, cửa và nắp ca-pô mở được, nội thất chi tiết.' },
  { id: 14, ten: 'Xe Mini Cooper 1/32 kéo thả', loai: 'Xe mô hình', gia: 260000, giaCu: 300000, kho: 20, anh: 'Images/sp6.jpg', mota: 'Xe kéo thả chạy bằng cót, cửa mở được, phù hợp làm quà tặng.' },
  // ----- Máy bay -----
  { id: 15, ten: 'Máy bay Su-27 Flanker 1/72', loai: 'Máy bay', gia: 410000, kho: 9, anh: 'Images/sp7.jpg', mota: 'Bộ kit nhựa cần sơn và dán decal, có nhiều decal phi đội để chọn.' },
  { id: 16, ten: 'Máy bay Spitfire Mk.IX 1/48', loai: 'Máy bay', gia: 520000, kho: 7, anh: 'Images/sp8.jpg', mota: 'Chiến đấu cơ huyền thoại, buồng lái chi tiết, cánh quạt quay được.' },
  { id: 17, ten: 'Máy bay Airbus A380 1/200', loai: 'Máy bay', gia: 790000, moi: true, kho: 5, anh: 'Images/sp9.jpg', mota: 'Mô hình trưng bày có bệ đỡ, sơn sẵn theo livery hãng hàng không.' },
  // ----- Figure -----
  { id: 18, ten: 'Figure Goku Super Saiyan', loai: 'Figure', gia: 820000, kho: 6, anh: 'Images/sp10.jpg', mota: 'Figure PVC cao 23 cm, tóc vàng hiệu ứng khí, đế trưng bày.' },
  { id: 19, ten: 'Figure Zoro Santoryu', loai: 'Figure', gia: 760000, giaCu: 880000, kho: 4, anh: 'Images/sp11.jpg', mota: 'Figure PVC cao 24 cm, tư thế ba kiếm, sơn thủ công.' },
  { id: 20, ten: 'Figure Tanjiro Kamado', loai: 'Figure', gia: 740000, moi: true, kho: 8, anh: 'Images/sp12.jpg', mota: 'Figure PVC cao 22 cm, kiếm có hiệu ứng nước, hộp đóng gói sưu tầm.' }
];

const THONG_SO = {
  1: { 'Tỉ lệ': '1/100', 'Chất liệu': 'Nhựa PS', 'Độ tuổi': '12+' },
  2: { 'Tỉ lệ': '1/100 (Master Grade)', 'Chất liệu': 'Nhựa PS, khung xương ABS', 'Độ tuổi': '14+' },
  3: { 'Tỉ lệ': '1/24', 'Chất liệu': 'Nhựa, bánh cao su', 'Độ tuổi': '14+' },
  4: { 'Tỉ lệ': '1/18', 'Chất liệu': 'Hợp kim đúc', 'Độ tuổi': '14+' },
  5: { 'Tỉ lệ': '1/72', 'Chất liệu': 'Nhựa, cần sơn và dán decal', 'Độ tuổi': '14+' },
  6: { 'Tỉ lệ': '1/200', 'Chất liệu': 'Nhựa, sơn sẵn', 'Độ tuổi': '8+' },
  7: { 'Chiều cao': '22 cm', 'Chất liệu': 'PVC, sơn thủ công', 'Độ tuổi': '15+' },
  8: { 'Chiều cao': '25 cm', 'Chất liệu': 'PVC, sơn thủ công', 'Độ tuổi': '15+' },
  9: { 'Tỉ lệ': '1/144 (High Grade)', 'Chất liệu': 'Nhựa PS', 'Độ tuổi': '8+' },
  10: { 'Tỉ lệ': '1/144 (Real Grade)', 'Chất liệu': 'Nhựa PS, khung xương ABS', 'Độ tuổi': '14+' },
  11: { 'Tỉ lệ': '1/144 (High Grade)', 'Chất liệu': 'Nhựa PS', 'Độ tuổi': '8+' },
  12: { 'Tỉ lệ': '1/24', 'Chất liệu': 'Nhựa, bánh cao su', 'Độ tuổi': '14+' },
  13: { 'Tỉ lệ': '1/18', 'Chất liệu': 'Hợp kim đúc', 'Độ tuổi': '14+' },
  14: { 'Tỉ lệ': '1/32', 'Chất liệu': 'Hợp kim, nhựa', 'Độ tuổi': '3+' },
  15: { 'Tỉ lệ': '1/72', 'Chất liệu': 'Nhựa, cần sơn và dán decal', 'Độ tuổi': '14+' },
  16: { 'Tỉ lệ': '1/48', 'Chất liệu': 'Nhựa, cần sơn và dán decal', 'Độ tuổi': '14+' },
  17: { 'Tỉ lệ': '1/200', 'Chất liệu': 'Nhựa, sơn sẵn', 'Độ tuổi': '8+' },
  18: { 'Chiều cao': '23 cm', 'Chất liệu': 'PVC, sơn thủ công', 'Độ tuổi': '15+' },
  19: { 'Chiều cao': '24 cm', 'Chất liệu': 'PVC, sơn thủ công', 'Độ tuổi': '15+' },
  20: { 'Chiều cao': '22 cm', 'Chất liệu': 'PVC, sơn thủ công', 'Độ tuổi': '15+' }
};

const TIN_TUC = [
  { loai: 'Hướng dẫn', tieuDe: 'Lắp Gundam snap-fit lần đầu: cần chuẩn bị gì?' },
  { loai: 'Hướng dẫn', tieuDe: 'Chọn tỉ lệ 1/144, 1/100 hay 1/72 cho phù hợp' },
  { loai: 'Mẹo chơi', tieuDe: 'Dán decal nước không bị bọt khí' },
  { loai: 'Bảo quản', tieuDe: 'Trưng bày mô hình để tránh bụi và ngả màu nhựa' }
];

// ===== Tiện ích =====
const $ = s => document.querySelector(s);
const vnd = n => n.toLocaleString('vi-VN') + ' ₫';
const boDau = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').toLowerCase();
const timSP = id => SAN_PHAM.find(s => s.id === Number(id));
const luu = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* bỏ qua */ } };
const doc = (k, macDinh) => { try { return JSON.parse(localStorage.getItem(k)) || macDinh; } catch (e) { return macDinh; } };
const SAN_PHAM = doc('sanPham', null) || SAN_PHAM_MAC_DINH; // admin sửa sản phẩm thì lưu ở localStorage
// Bổ sung trường mới (giaCu, moi) cho dữ liệu đã lưu từ trước
SAN_PHAM.forEach(sp => {
  const md = SAN_PHAM_MAC_DINH.find(m => m.id === sp.id);
  if (!md) return;
  if (sp.giaCu === undefined) sp.giaCu = md.giaCu;
  if (sp.moi === undefined) sp.moi = md.moi;
});
let gio = doc('gio', {}); // { idSanPham: soLuong }
let yeuThich = doc('yeuThich', []).filter(id => timSP(id)); // [idSanPham]

let hen;
function thongBao(noiDung) {
  const el = $('#thongBao');
  el.textContent = noiDung;
  el.classList.add('hien');
  clearTimeout(hen);
  hen = setTimeout(() => el.classList.remove('hien'), 2000);
}

const tinhTrang = sp => sp.kho > 0
  ? `<span class="tag ok">Còn hàng (${sp.kho})</span>`
  : '<span class="tag het">Hết hàng</span>';
const tongTien = () => Object.keys(gio).reduce((t, id) => t + timSP(id).gia * gio[id], 0);

// Giá cũ, nhãn Mới / Giảm giá, nút yêu thích
const giamPhanTram = sp => sp.giaCu > sp.gia ? Math.round((1 - sp.gia / sp.giaCu) * 100) : 0;
const nhanSP = sp => giamPhanTram(sp)
  ? `<span class="nhan nhan-giam">-${giamPhanTram(sp)}%</span>`
  : (sp.moi ? '<span class="nhan nhan-moi">Mới</span>' : '');
const hienGia = (sp, lop = 'gia') =>
  `<p class="${lop}">${vnd(sp.gia)}${giamPhanTram(sp) ? ` <s class="gia-cu">${vnd(sp.giaCu)}</s>` : ''}</p>`;
const laThich = id => yeuThich.includes(Number(id));
const chuTim = (lop, thich) => lop === 'nut-tim' ? (thich ? '♥ Đã thích' : '♡ Yêu thích') : (thich ? '♥' : '♡');
const nutTim = (sp, lop) =>
  `<button type="button" class="${lop}" data-tim="${sp.id}" aria-pressed="${laThich(sp.id)}" aria-label="Yêu thích">${chuTim(lop, laThich(sp.id))}</button>`;

const theSP = sp => `
    <article class="the">
      <div class="anh-the">
        <a href="product.html?id=${sp.id}"><img src="${sp.anh}" alt="${sp.ten}" loading="lazy"></a>
        ${nhanSP(sp)}
        ${nutTim(sp, 'tim')}
      </div>
      <div class="the-nd">
        <span class="loai">${sp.loai}</span>
        <h3><a href="product.html?id=${sp.id}">${sp.ten}</a></h3>
        ${hienGia(sp)}
        ${tinhTrang(sp)}
        <button class="btn" data-them="${sp.id}" ${sp.kho ? '' : 'disabled'}>${sp.kho ? 'Thêm vào giỏ' : 'Hết hàng'}</button>
      </div>
    </article>`;

// ===== Danh sách, tìm kiếm, lọc =====
function veDanhSach() {
  const q = boDau($('#timKiem').value.trim());
  const loai = $('#locLoai').value;
  const [min, max] = $('#locGia').value ? $('#locGia').value.split('-').map(Number) : [0, Infinity];
  const sx = $('#sapXep').value;
  const conHang = $('#chiConHang').checked;

  const ds = SAN_PHAM.filter(sp =>
    boDau(sp.ten).includes(q) && (!loai || sp.loai === loai) &&
    sp.gia >= min && sp.gia < max && (!conHang || sp.kho > 0));
  if (sx === 'tang') ds.sort((a, b) => a.gia - b.gia);
  if (sx === 'giam') ds.sort((a, b) => b.gia - a.gia);

const nhom = [...new Set(ds.map(sp => sp.loai))];
$('#luoi').innerHTML = nhom.map(ten => {
  const dsNhom = ds.filter(sp => sp.loai === ten);
  return `<section class="nhom">
    <div class="nhom-dau">
      <h3 class="nhom-tieu-de">${ten} <small>(${dsNhom.length})</small></h3>
      <div class="nhom-nut">
        <button type="button" class="truot-nut" data-truot="-1" aria-label="Trượt sang trái">‹</button>
        <button type="button" class="truot-nut" data-truot="1" aria-label="Trượt sang phải">›</button>
      </div>
    </div>
    <div class="truot-hang" tabindex="0">${dsNhom.map(theSP).join('')}</div>
  </section>`;
}).join('') || '<p class="rong">Không tìm thấy mô hình phù hợp. Hãy thử đổi từ khóa hoặc bỏ bớt bộ lọc.</p>';}

// ===== Series nổi bật (banner) =====
function veSeries() {
  const dsLoai = [...new Set(SAN_PHAM.map(sp => sp.loai))];
  $('#dsSeries').innerHTML = dsLoai.map(ten => {
    const ds = SAN_PHAM.filter(sp => sp.loai === ten);
    const giaThap = Math.min(...ds.map(sp => sp.gia));
    return `<button class="series-the" data-series="${ten}">
      <img src="${ds[0].anh}" alt="" loading="lazy">
      <span><strong>${ten}</strong><small>${ds.length} mô hình, từ ${vnd(giaThap)}</small></span>
    </button>`;
  }).join('');
}

// ===== Khung tin tức (banner) =====
function veTin() {
  $('#dsTin').innerHTML = BAI_VIET.slice(0, 4).map(t =>
    `<a href="tin-tuc.html?id=${t.id}" class="tin"><small>${t.loai}</small><span>${t.tieuDe}</span></a>`).join('');
}

// ===== Trang chi tiết (product.html?id=...) =====
function veTrangSP() {
  const sp = timSP(new URLSearchParams(location.search).get('id'));
  if (!sp) {
    $('#noiDungSP').innerHTML = '<p class="rong">Không tìm thấy mô hình này. <a href="index.html#/san-pham"><u>Quay lại danh sách sản phẩm</u></a></p>';
    return;
  }
  document.title = sp.ten + ' - Mô Hình Việt';
  $('#duongDan').innerHTML = `<a href="index.html">Trang chủ</a> / <a href="index.html#/san-pham">Sản phẩm</a> / <span>${sp.ten}</span>`;
  const hang = Object.entries({ 'Loại': sp.loai, 'Mã sản phẩm': 'MH' + String(sp.id).padStart(3, '0'), ...THONG_SO[sp.id] });
  $('#noiDungSP').innerHTML = `
    <div class="ct">
      <img src="${sp.anh}" alt="${sp.ten}">
      <div>
        <span class="loai">${sp.loai}</span>
<h1>${sp.ten}</h1>
        <p class="nhan-ct">${nhanSP(sp)} ${nutTim(sp, 'nut-tim')}</p>       ${hienGia(sp, 'gia lon')}
        ${tinhTrang(sp)}
        <p>${sp.mota}</p>
        ${sp.kho ? `
        <div class="dat-sl">
          <button class="sl-nut" id="giamSL" aria-label="Giảm số lượng">−</button>
          <input type="number" id="slChiTiet" min="1" max="${sp.kho}" value="1" aria-label="Số lượng">
          <button class="sl-nut" id="tangSL" aria-label="Tăng số lượng">+</button>
        </div>
        <div class="ct-nut">
          <button class="btn" data-them="${sp.id}" data-tu-ct="1">Thêm vào giỏ</button>
          <button class="btn nut-phu" data-them="${sp.id}" data-tu-ct="1" data-mua="1">Mua ngay</button>
        </div>` : '<p class="luu-y">Mô hình này tạm hết hàng. Bạn có thể xem các mô hình khác bên dưới.</p>'}
        <table class="ts"><tbody>${hang.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join('')}</tbody></table>
      </div>
    </div>`;

  if (sp.kho) {
    const o = $('#slChiTiet');
    $('#giamSL').onclick = () => { o.value = Math.max(1, (parseInt(o.value, 10) || 1) - 1); };
    $('#tangSL').onclick = () => { o.value = Math.min(sp.kho, (parseInt(o.value, 10) || 1) + 1); };
  }
  const lq = [...SAN_PHAM.filter(x => x.id !== sp.id && x.loai === sp.loai), ...SAN_PHAM.filter(x => x.id !== sp.id && x.loai !== sp.loai)].slice(0, 4);
  $('#tieuDeLQ').hidden = false;
  $('#spLienQuan').innerHTML = lq.map(theSP).join('');
}

// ===== Giỏ hàng =====
function themVaoGio(id, sl) {
  const sp = timSP(id);
  const moi = (gio[id] || 0) + sl;
  gio[id] = Math.min(moi, sp.kho);
  luu('gio', gio);
  capNhatSoLuong();
  thongBao(moi > sp.kho ? `Kho chỉ còn ${sp.kho} sản phẩm này` : 'Đã thêm vào giỏ hàng');
}

function capNhatSoLuong() {
  $('#soLuongGio').textContent = Object.values(gio).reduce((a, b) => a + b, 0);
}

function veGio() {
  const ids = Object.keys(gio);
  $('#dsGio').innerHTML = ids.map(id => {
    const sp = timSP(id), sl = gio[id];
    return `<tr>
      <td><img src="${sp.anh}" alt="">${sp.ten}</td>
      <td>${vnd(sp.gia)}</td>
      <td><button class="sl-nut" data-doi="${id}" data-d="-1" aria-label="Giảm">−</button> ${sl}
          <button class="sl-nut" data-doi="${id}" data-d="1" aria-label="Tăng">+</button></td>
      <td>${vnd(sp.gia * sl)}</td>
      <td><button class="xoa" data-xoa="${id}">Xóa</button></td>
    </tr>`;
  }).join('') || '<tr><td colspan="5" class="rong">Giỏ hàng đang trống. Hãy chọn một mô hình để bắt đầu.</td></tr>';
  $('#tongTien').textContent = vnd(tongTien());
}

function doiSoLuong(id, d) {
  const sp = timSP(id), moi = gio[id] + d;
  if (moi < 1) delete gio[id];
  else if (moi > sp.kho) return thongBao(`Kho chỉ còn ${sp.kho} sản phẩm này`);
  else gio[id] = moi;
  luu('gio', gio); capNhatSoLuong(); veGio();
}

// ===== Đơn hàng dùng chung (đặt hàng, đổi trạng thái, hoàn kho) =====
const LOP_TT = { 'Chờ xác nhận': 'cho', 'Đang giao': 'giao', 'Hoàn thành': 'xong', 'Đã hủy': 'huy' };
const TRANG_THAI = Object.keys(LOP_TT);

// Đọc đơn hàng, tự bổ sung trường còn thiếu ở đơn cũ (tạo trước khi có tài khoản)
const layDon = () => doc('donHang', []).map(d => ({
  trangThai: 'Chờ xác nhận', taiKhoan: null, truKho: false, ...d,
  hang: Array.isArray(d.hang) ? d.hang : Object.entries(d.hang || {}).map(([id, sl]) => ({
    id: Number(id), ten: timSP(id) ? timSP(id).ten : 'Mô hình #' + id, gia: timSP(id) ? timSP(id).gia : 0, sl
  }))
}));

// Đơn đã hủy thì không mở lại; hủy đơn sẽ hoàn hàng về kho
function doiTrangThaiDon(ma, trangThaiMoi) {
  const ds = layDon();
  const don = ds.find(d => d.ma === ma);
  if (!don || don.trangThai === 'Đã hủy' || don.trangThai === trangThaiMoi) return false;
  if (trangThaiMoi === 'Đã hủy' && don.truKho) {
    don.hang.forEach(h => { const sp = timSP(h.id); if (sp) sp.kho += h.sl; });
    luu('sanPham', SAN_PHAM);
  }
  don.trangThai = trangThaiMoi;
  luu('donHang', ds);
  return true;
}

// Đã đăng nhập thì tự điền thông tin vào form đặt hàng
function dienSanThongTin() {
  const nguoi = Auth.hienTai(), f = $('#formDat');
  $('#goiYDangNhap').hidden = !!nguoi;
  if (!nguoi || !f) return;
  if (!f.hoTen.value) f.hoTen.value = nguoi.hoTen;
  if (!f.sdt.value) f.sdt.value = nguoi.sdt || '';
  if (!f.email.value) f.email.value = nguoi.email;
}

// ===== Đặt hàng =====
$('#formDat')?.addEventListener('submit', e => {
  e.preventDefault();
  const ids = Object.keys(gio);
  if (!ids.length) return thongBao('Giỏ hàng đang trống');
  const thieu = ids.find(id => gio[id] > timSP(id).kho);
  if (thieu) return thongBao(`"${timSP(thieu).ten}" chỉ còn ${timSP(thieu).kho} sản phẩm`);

  const nguoi = Auth.hienTai();
  const don = {
    ma: 'DH' + Date.now().toString().slice(-8),
    ngay: new Date().toISOString(),
    khach: Object.fromEntries(new FormData(e.target)),
    hang: ids.map(id => ({ id: Number(id), ten: timSP(id).ten, gia: timSP(id).gia, sl: gio[id] })),
    tong: tongTien(),
    taiKhoan: nguoi ? nguoi.id : null,
    trangThai: 'Chờ xác nhận',
    truKho: true
  };
  ids.forEach(id => { timSP(id).kho -= gio[id]; });
  luu('sanPham', SAN_PHAM);
  luu('donHang', [...doc('donHang', []), don]);
  gio = {}; luu('gio', gio);
  e.target.reset(); capNhatSoLuong(); veGio(); veDanhSach(); dienSanThongTin();
  const kq = $('#ketQua');
  kq.textContent = `Đặt hàng thành công! Mã đơn ${don.ma}, tổng ${vnd(don.tong)}. Cửa hàng sẽ gọi xác nhận qua số ${don.khach.sdt}.` + (nguoi ? ' Bạn có thể xem lại đơn trong mục Tài khoản của tôi.' : '');
  kq.hidden = false;
  kq.scrollIntoView({ behavior: 'smooth' });
});

// ===== Yêu thích =====
function capNhatYeuThich() {
  document.querySelectorAll('#soYeuThich, .dem-yt').forEach(el => { el.textContent = yeuThich.length; });
}

function veYeuThich() {
  const ds = SAN_PHAM.filter(sp => laThich(sp.id));
  $('#luoiYT').innerHTML = ds.map(theSP).join('') || '<p class="rong">Bạn chưa thích mô hình nào. Bấm ♡ trên thẻ sản phẩm để lưu lại ở đây.</p>';
}

function doiYeuThich(id) {
  id = Number(id);
  const them = !laThich(id);
  yeuThich = them ? [...yeuThich, id] : yeuThich.filter(x => x !== id);
  luu('yeuThich', yeuThich);
  capNhatYeuThich();
  document.querySelectorAll(`[data-tim="${id}"]`).forEach(el => {
    el.setAttribute('aria-pressed', them);
    el.textContent = chuTim(el.className, them);
  });
  if ($('#luoiYT') && !$('#view-fav').hidden) veYeuThich(); // đang xem trang "Đã thích" thì bỏ thẻ vừa bỏ thích
  thongBao(them ? 'Đã thêm vào yêu thích' : 'Đã bỏ khỏi yêu thích');
}

// ===== Giao diện sáng / tối =====
function capNhatGiaoDien() {
  const toi = document.documentElement.dataset.theme === 'dark';
  document.querySelectorAll('.nut-giaodien').forEach(b => {
    b.textContent = toi ? '☀' : '☾';
    b.title = b.ariaLabel = toi ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối';
  });
  document.querySelectorAll('.nav-gd').forEach(b => { b.textContent = toi ? 'Giao diện: Tối (bấm để chuyển sáng)' : 'Giao diện: Sáng (bấm để chuyển tối)'; });
}

function doiGiaoDien() {
  const toi = document.documentElement.dataset.theme !== 'dark';
  document.documentElement.dataset.theme = toi ? 'dark' : 'light';
  try { localStorage.setItem('giaoDien', toi ? 'toi' : 'sang'); } catch (e) { /* bỏ qua */ }
  capNhatGiaoDien();
}

// Thêm nút Yêu thích + Giao diện vào đầu trang (máy tính) và vào menu (điện thoại), dùng cho mọi trang
function veTienIch() {
  const phai = $('.header-phai'), nav = $('#nav');
  const gio = phai && phai.querySelector('a[href$="#/gio-hang"]');
  if (!gio || !nav) return;
  gio.insertAdjacentHTML('beforebegin', `<div class="khu-ti">
      <a class="gio" href="index.html#/yeu-thich" aria-label="Mô hình đã thích">♡ <b id="soYeuThich">0</b></a>
      <button type="button" class="nut-giaodien" data-doi-giaodien></button>
    </div>`);
  nav.insertAdjacentHTML('beforeend', `<a class="nav-ti" href="index.html#/yeu-thich">Yêu thích (<span class="dem-yt">0</span>)</a>
    <button type="button" class="nav-ti nav-gd" data-doi-giaodien></button>`);
}

// ===== Banner trượt =====
const BANNER = [
  { td: 'Mô hình lắp ráp<br>cho người chơi kỹ tính', mt: 'Gundam, xe, máy bay và figure chính hãng. Giao hàng toàn quốc.', nut: 'Xem sản phẩm', href: '#/san-pham', tint: 'transparent', anh: 'Images/banner1.jpg' },
  { td: 'Gundam giá tốt<br>cho người mới và dân sưu tầm', mt: 'Từ RX-78-2 kinh điển đến Strike Freedom Master Grade.', nut: 'Xem Gundam', series: 'Gundam', tint: 'rgba(47, 111, 237, .35)', anh: 'Images/banner2.jpg' },
  { td: 'Bắt đầu với<br>mô hình máy bay', mt: 'Bộ kit 1/72 dễ làm quen và mẫu trưng bày sơn sẵn.', nut: 'Xem máy bay', series: 'Máy bay', tint: 'rgba(31, 138, 76, .35)', anh: 'Images/banner3.jpg' },
  { td: 'Figure mới về kho', mt: 'Naruto, Luffy Gear 5 và nhiều nhân vật được yêu thích.', nut: 'Xem figure', series: 'Figure', tint: 'rgba(229, 72, 77, .35)', anh: 'Images/banner4.jpg' }
];
let chiSoBanner = 0, dongHoBanner = null;

function hienSlide(i) {
  chiSoBanner = (i + BANNER.length) % BANNER.length;
  document.querySelectorAll('#bannerTruot .slide').forEach((el, k) => {
    el.classList.toggle('hien', k === chiSoBanner);
    el.setAttribute('aria-hidden', k !== chiSoBanner);
  });
  document.querySelectorAll('#bannerCham button').forEach((el, k) => el.classList.toggle('hien', k === chiSoBanner));
  $('.banner').style.setProperty('--tint', BANNER[chiSoBanner].tint);
  $('.banner').style.setProperty('--anh', `url("${new URL(BANNER[chiSoBanner].anh, document.baseURI).href}")`);
  
  $('.banner').style.setProperty('--tint', BANNER[chiSoBanner].tint);
}

const dungBanner = () => { clearInterval(dongHoBanner); dongHoBanner = null; };
function khoiDongBanner() {
  dungBanner();
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return; // người dùng tắt hiệu ứng thì không tự chạy
  dongHoBanner = setInterval(() => hienSlide(chiSoBanner + 1), 5000);
}

function veBanner() {
  if (!$('#bannerTruot')) return;
  $('#bannerTruot').innerHTML = BANNER.map((b, k) => `<div class="slide">
      ${k === 0 ? `<h1 class="an-chu">${b.td.replace('<br>', ' ')}</h1>` : ''}
      ${b.series ? `<button type="button" class="btn" data-series="${b.series}">${b.nut}</button>` : `<a class="btn" href="${b.href}">${b.nut}</a>`}
    </div>`).join('');
  $('#bannerCham').innerHTML = BANNER.map((_, k) => `<button type="button" data-slide="${k}" aria-label="Banner ${k + 1}"></button>`).join('');
  hienSlide(0);
  khoiDongBanner();
  const banner = $('.banner'); // rê chuột hoặc đang focus vào banner thì tạm dừng
  banner.addEventListener('mouseenter', dungBanner);
  banner.addEventListener('mouseleave', khoiDongBanner);
  banner.addEventListener('focusin', dungBanner);
  banner.addEventListener('focusout', khoiDongBanner);
}
// ===== Điều hướng bằng hash (#/, #/gio-hang) =====
function dieuHuong() {
  if (!$('#luoi')) return; // chỉ dùng cho index.html
  const [trang] = location.hash.replace(/^#\/?/, '').split('/');
 const view = trang === 'gio-hang' ? 'cart' : trang === 'yeu-thich' ? 'fav' : 'home';
  document.querySelectorAll('.view').forEach(v => { v.hidden = v.id !== 'view-' + view; });
if (view === 'fav') veYeuThich();
  const dich = { 'san-pham': 'sanpham', 'lien-he': 'lien-he' }[trang];
  if (view === 'home' && dich) document.getElementById(dich).scrollIntoView();
  else window.scrollTo(0, 0);
  $('#nav').classList.remove('mo');
    document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('hien-tai', a.getAttribute('href') === '#/' + trang));
}

// ===== Sự kiện =====
document.addEventListener('click', e => {
    const truot = e.target.closest('[data-truot]');
  if (truot) {
    const hang = truot.closest('.nhom').querySelector('.truot-hang');
    hang.scrollBy({ left: Number(truot.dataset.truot) * hang.clientWidth * 0.8, behavior: 'smooth' });
  }
    const tim = e.target.closest('[data-tim]');
  if (tim) doiYeuThich(tim.dataset.tim);
  if (e.target.closest('[data-doi-giaodien]')) doiGiaoDien();
  const cham = e.target.closest('[data-slide]');
  if (cham) { hienSlide(Number(cham.dataset.slide)); khoiDongBanner(); }
    const sapCo = e.target.closest('[data-sapco]');
  if (sapCo) { e.preventDefault(); thongBao((sapCo.dataset.sapco || sapCo.textContent.trim()) + ' đang được xây dựng'); }
  const series = e.target.closest('[data-series]');
  if (series) {
    $('#locLoai').value = series.dataset.series;
    veDanhSach();
    document.getElementById('sanpham').scrollIntoView({ behavior: 'smooth' });
  }

  const them = e.target.closest('[data-them]');
  if (them) {
    const sl = them.dataset.tuCt ? Math.max(1, parseInt($('#slChiTiet').value, 10) || 1) : 1;
    themVaoGio(them.dataset.them, sl);
    if (them.dataset.mua) location.href = 'index.html#/gio-hang';
  }
  const doi = e.target.closest('[data-doi]');
  if (doi) doiSoLuong(doi.dataset.doi, Number(doi.dataset.d));
  const xoa = e.target.closest('[data-xoa]');
  if (xoa) { delete gio[xoa.dataset.xoa]; luu('gio', gio); capNhatSoLuong(); veGio(); }
});
['timKiem', 'locLoai', 'locGia', 'sapXep', 'chiConHang'].forEach(id => $('#' + id)?.addEventListener('input', veDanhSach));
$('#nutMenu').addEventListener('click', () => $('#nav').classList.toggle('mo'));
window.addEventListener('hashchange', dieuHuong);

// ===== Khởi động =====
// Dọn giỏ nếu có sản phẩm không còn tồn tại trong danh sách
Object.keys(gio).forEach(id => { if (!timSP(id)) delete gio[id]; });
capNhatSoLuong();
veTienIch(); capNhatYeuThich(); capNhatGiaoDien();
if ($('#luoi')) { veBanner(); veSeries(); veTin(); veDanhSach(); dieuHuong(); }
if ($('#noiDungSP')) veTrangSP();
