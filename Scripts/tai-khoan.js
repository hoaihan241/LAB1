'use strict';

(function () {
  if (!Auth.yeuCauDangNhap()) return;
  $('#noiDungTK').hidden = false;
  const nguoi = Auth.hienTai();

  // Hồ sơ
  const fHoSo = $('#formHoSo');
  fHoSo.hoTen.value = nguoi.hoTen;
  fHoSo.email.value = nguoi.email;
  fHoSo.sdt.value = nguoi.sdt || '';
  fHoSo.addEventListener('submit', e => {
    e.preventDefault();
    Auth.capNhatHoSo(nguoi.id, { hoTen: fHoSo.hoTen.value.trim(), sdt: fHoSo.sdt.value.trim() });
    Auth.veHeader();
    thongBao('Đã lưu thông tin');
  });

  // Đổi mật khẩu
  $('#formMatKhau').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    if (f.moi.value !== f.nhapLai.value) return thongBao('Mật khẩu nhập lại không khớp');
    const kq = Auth.doiMatKhau(nguoi.id, f.cu.value, f.moi.value);
    thongBao(kq.ok ? 'Đã đổi mật khẩu' : kq.loi);
    if (kq.ok) f.reset();
  });

  // Đơn hàng của tôi
  function veDon() {
    const ds = layDon().filter(d => d.taiKhoan === nguoi.id).reverse();
    $('#dsDon').innerHTML = ds.map(d => `<tr>
      <td><strong>${esc(d.ma)}</strong><br><small>${new Date(d.ngay).toLocaleDateString('vi-VN')}</small></td>
      <td>${d.hang.map(h => `${esc(h.ten)} × ${h.sl}`).join('<br>')}</td>
      <td>${vnd(d.tong)}</td>
      <td><span class="tt tt-${LOP_TT[d.trangThai]}">${d.trangThai}</span></td>
      <td>${d.trangThai === 'Chờ xác nhận' ? `<button class="xoa" data-huy="${esc(d.ma)}">Hủy đơn</button>` : ''}</td>
    </tr>`).join('') || '<tr><td colspan="5" class="rong">Bạn chưa có đơn hàng nào. <a href="index.html#/san-pham"><u>Xem mô hình</u></a></td></tr>';
  }

  document.addEventListener('click', e => {
    const nut = e.target.closest('[data-huy]');
    if (!nut) return;
    const don = layDon().find(d => d.ma === nut.dataset.huy && d.taiKhoan === nguoi.id && d.trangThai === 'Chờ xác nhận');
    if (!don || !confirm('Hủy đơn ' + don.ma + '?')) return;
    doiTrangThaiDon(don.ma, 'Đã hủy');
    veDon();
    thongBao('Đã hủy đơn ' + don.ma);
  });

  veDon();
})();
