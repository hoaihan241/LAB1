'use strict';

(function () {
  const tu = new URLSearchParams(location.search).get('tu');
  const dang = Auth.hienTai();

  // Đã đăng nhập thì không cần ở trang này (trừ khi bị chuyển từ trang quản trị sang)
  if (dang && tu !== 'admin') {
    location.replace(dang.vaiTro === 'admin' ? 'admin.html' : 'tai-khoan.html');
    return;
  }

  const hien = (sel, noiDung) => { const el = $(sel); el.textContent = noiDung; el.hidden = !noiDung; };
  const diDen = nguoi => {
    if (nguoi.vaiTro === 'admin') return 'admin.html';
    return tu === 'gio-hang' ? 'index.html#/gio-hang' : 'index.html';
  };

  if (tu === 'admin') hien('#loiDN', dang
    ? 'Tài khoản hiện tại không có quyền quản trị. Hãy đăng nhập bằng tài khoản quản trị.'
    : 'Hãy đăng nhập bằng tài khoản quản trị.');

  document.querySelectorAll('.tab-nut').forEach(nut => nut.addEventListener('click', () => {
    document.querySelectorAll('.tab-nut').forEach(x => x.classList.toggle('hien', x === nut));
    $('#formDangNhap').hidden = nut.dataset.tab !== 'dn';
    $('#formDangKy').hidden = nut.dataset.tab !== 'dk';
  }));

  $('#formDangNhap').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    const kq = Auth.dangNhap(f.email.value, f.matKhau.value);
    if (!kq.ok) return hien('#loiDN', kq.loi);
    location.href = diDen(kq.nguoi);
  });

  $('#formDangKy').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    if (f.matKhau.value !== f.nhapLai.value) return hien('#loiDK', 'Mật khẩu nhập lại không khớp');
    const kq = Auth.dangKy({ hoTen: f.hoTen.value, email: f.email.value, sdt: f.sdt.value, matKhau: f.matKhau.value });
    if (!kq.ok) return hien('#loiDK', kq.loi);
    location.href = diDen(kq.nguoi);
  });
})();
