'use strict';

(function () {
  if (!Auth.yeuCauAdmin()) return;
  $('#noiDungAdmin').hidden = false;

  // ===== Thống kê =====
  function veThongKe() {
    const don = layDon();
    const doanhThu = don.filter(d => d.trangThai !== 'Đã hủy').reduce((t, d) => t + d.tong, 0);
    const o = [
      ['Tổng đơn hàng', don.length],
      ['Chờ xác nhận', don.filter(d => d.trangThai === 'Chờ xác nhận').length],
      ['Doanh thu (không tính đơn hủy)', vnd(doanhThu)],
      ['Khách hàng', Auth.tatCa().filter(u => u.vaiTro === 'khach').length],
      ['Mô hình hết hàng', SAN_PHAM.filter(s => s.kho === 0).length]
    ];
    $('#thongKe').innerHTML = o.map(([ten, gt]) => `<div class="tk-the"><small>${ten}</small><strong>${gt}</strong></div>`).join('');
  }

  // ===== Đơn hàng =====
  function veDon() {
    const loc = $('#locTrangThai').value;
    const ds = layDon().filter(d => !loc || d.trangThai === loc).reverse();
    $('#dsDonAdmin').innerHTML = ds.map(d => {
      const k = d.khach || {};
      const chon = d.trangThai === 'Đã hủy'
        ? '<span class="tt tt-huy">Đã hủy</span>'
        : `<select data-don="${esc(d.ma)}" aria-label="Trạng thái đơn ${esc(d.ma)}">${TRANG_THAI.map(t => `<option ${t === d.trangThai ? 'selected' : ''}>${t}</option>`).join('')}</select>`;
      return `<tr>
        <td><strong>${esc(d.ma)}</strong><br><small>${new Date(d.ngay).toLocaleString('vi-VN')}</small></td>
        <td>${esc(k.hoTen)}<br><small>${esc(k.sdt)} · ${esc(k.diaChi)}</small><br><small>${d.taiKhoan ? 'Có tài khoản' : 'Khách vãng lai'} · ${esc(k.thanhToan)}</small>${k.ghiChu ? `<br><small>Ghi chú: ${esc(k.ghiChu)}</small>` : ''}</td>
        <td>${d.hang.map(h => `${esc(h.ten)} × ${h.sl}`).join('<br>')}</td>
        <td>${vnd(d.tong)}</td>
        <td>${chon}</td>
      </tr>`;
    }).join('') || '<tr><td colspan="5" class="rong">Chưa có đơn hàng nào.</td></tr>';
  }

  TRANG_THAI.forEach(t => $('#locTrangThai').insertAdjacentHTML('beforeend', `<option>${t}</option>`));
  $('#locTrangThai').addEventListener('change', veDon);

  document.addEventListener('change', e => {
    const o = e.target.closest('[data-don]');
    if (!o) return;
    if (o.value === 'Đã hủy' && !confirm('Hủy đơn này? Hàng sẽ được hoàn lại kho và không mở lại được.')) return veDon();
    doiTrangThaiDon(o.dataset.don, o.value);
    veDon(); veThongKe(); veSP();
    thongBao('Đã cập nhật trạng thái đơn');
  });

  // ===== Sản phẩm =====
  const f = $('#formSP');

  function veSP() {
    $('#dsSPAdmin').innerHTML = SAN_PHAM.map(sp => `<tr>
      <td><img src="${esc(sp.anh)}" alt="">${esc(sp.ten)}<br><small>MH${String(sp.id).padStart(3, '0')} · ${esc(sp.loai)}</small></td>
      <td>${vnd(sp.gia)}</td>
      <td>${sp.kho}</td>
      <td><button class="sua" data-sua="${sp.id}">Sửa</button> · <button class="xoa" data-xoa-sp="${sp.id}">Xóa</button></td>
    </tr>`).join('') || '<tr><td colspan="4" class="rong">Chưa có sản phẩm nào.</td></tr>';
  }

  function datForm(sp) {
    f.maSP.value = sp ? sp.id : '';
    f.ten.value = sp ? sp.ten : '';
    f.loai.value = sp ? sp.loai : 'Gundam';
    f.gia.value = sp ? sp.gia : '';
    f.kho.value = sp ? sp.kho : '';
    f.giaCu.value = sp && sp.giaCu ? sp.giaCu : '';
    f.moi.checked = !!(sp && sp.moi);
    f.anh.value = sp ? sp.anh : 'Images/sp1.svg';
    f.mota.value = sp ? sp.mota : '';
    $('#nutLuuSP').textContent = sp ? 'Lưu thay đổi' : 'Thêm sản phẩm';
    $('#nutHuySua').hidden = !sp;
  }

  f.addEventListener('submit', e => {
    e.preventDefault();
    const du = {
      ten: f.ten.value.trim(), loai: f.loai.value,
      gia: Math.round(Number(f.gia.value)), kho: Math.round(Number(f.kho.value)),
      giaCu: Math.round(Number(f.giaCu.value)) || 0, moi: f.moi.checked,
      anh: f.anh.value.trim(), mota: f.mota.value.trim()
    };
    if (f.maSP.value) {
      Object.assign(timSP(f.maSP.value), du);
    } else {
      // Mã không bị dùng lại khi xóa sản phẩm
      const id = Math.max(doc('spIdCuoi', 0), ...SAN_PHAM.map(s => s.id)) + 1;
      luu('spIdCuoi', id);
      SAN_PHAM.push({ id, ...du });
    }
    luu('sanPham', SAN_PHAM);
    datForm(null); veSP(); veThongKe();
    thongBao('Đã lưu sản phẩm');
  });

  $('#nutHuySua').addEventListener('click', () => datForm(null));
  $('#nutKhoiPhuc').addEventListener('click', () => {
    if (!confirm('Khôi phục 8 sản phẩm mẫu ban đầu? Các thay đổi về sản phẩm sẽ mất (đơn hàng giữ nguyên).')) return;
    try { localStorage.removeItem('sanPham'); } catch (err) { /* bỏ qua */ }
    location.reload();
  });

  // ===== Tài khoản =====
  function veKH() {
    const dem = layDon().reduce((m, d) => { if (d.taiKhoan) m[d.taiKhoan] = (m[d.taiKhoan] || 0) + 1; return m; }, {});
    const toi = Auth.hienTai().id;
    $('#dsKH').innerHTML = Auth.tatCa().map(u => `<tr>
      <td>${esc(u.hoTen)}${u.id === toi ? ' <small>(bạn)</small>' : ''}</td>
      <td>${esc(u.email)}<br><small>${esc(u.sdt) || 'Chưa có SĐT'}</small></td>
      <td>${u.vaiTro === 'admin' ? 'Quản trị' : 'Khách hàng'}</td>
      <td>${dem[u.id] || 0}</td>
      <td>${u.id === toi ? '' : `<button class="sua" data-vai="${esc(u.id)}">${u.vaiTro === 'admin' ? 'Thu quyền quản trị' : 'Cấp quyền quản trị'}</button> · <button class="xoa" data-xoa-kh="${esc(u.id)}">Xóa</button>`}</td>
    </tr>`).join('');
  }

  // ===== Sự kiện chung =====
  document.addEventListener('click', e => {
    const sua = e.target.closest('[data-sua]');
    if (sua) { datForm(timSP(sua.dataset.sua)); f.scrollIntoView({ behavior: 'smooth' }); return; }

    const xoaSP = e.target.closest('[data-xoa-sp]');
    if (xoaSP) {
      const i = SAN_PHAM.findIndex(s => s.id === Number(xoaSP.dataset.xoaSp));
      if (i >= 0 && confirm(`Xóa "${SAN_PHAM[i].ten}" khỏi cửa hàng?`)) {
        SAN_PHAM.splice(i, 1);
        luu('sanPham', SAN_PHAM);
        veSP(); veThongKe();
      }
      return;
    }

    const vai = e.target.closest('[data-vai]');
    if (vai) {
      const u = Auth.tatCa().find(x => x.id === vai.dataset.vai);
      const moi = u.vaiTro === 'admin' ? 'khach' : 'admin';
      if (confirm(`${moi === 'admin' ? 'Cấp' : 'Thu hồi'} quyền quản trị của ${u.hoTen}?`)) { Auth.datVaiTro(u.id, moi); veKH(); veThongKe(); }
      return;
    }

    const xoaKH = e.target.closest('[data-xoa-kh]');
    if (xoaKH) {
      const u = Auth.tatCa().find(x => x.id === xoaKH.dataset.xoaKh);
      if (confirm(`Xóa tài khoản của ${u.hoTen}? Các đơn hàng cũ vẫn được giữ.`)) { Auth.xoa(u.id); veKH(); veThongKe(); }
    }
  });

  document.querySelectorAll('.tab-nut').forEach(nut => nut.addEventListener('click', () => {
    document.querySelectorAll('.tab-nut').forEach(x => x.classList.toggle('hien', x === nut));
    ['don', 'sp', 'kh'].forEach(t => { $('#tab-' + t).hidden = t !== nut.dataset.tab; });
  }));

  datForm(null);
  veThongKe(); veDon(); veSP(); veKH();
})();
