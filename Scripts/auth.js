'use strict';

// ===== Tài khoản (frontend, lưu trong localStorage) =====
// Lưu ý: chỉ dùng để học/demo. Mọi thứ nằm trong trình duyệt nên KHÔNG an toàn thật.
// Muốn bảo mật thật cần backend (kiểm tra mật khẩu và quyền ở máy chủ).

// Chống chèn HTML khi in dữ liệu người dùng nhập ra màn hình
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const Auth = (() => {
  const KHOA_DS = 'nguoiDung', KHOA_PHIEN = 'phienDangNhap';
  const doc = (k, md) => { try { return JSON.parse(localStorage.getItem(k)) || md; } catch (e) { return md; } };
  const luu = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* bỏ qua */ } };

  // Băm mật khẩu (cyrb53). Chỉ để không lưu mật khẩu dạng chữ thường, không phải bảo mật thật.
  const bam = s => {
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0; i < s.length; i++) {
      const c = s.charCodeAt(i);
      h1 = Math.imul(h1 ^ c, 2654435761);
      h2 = Math.imul(h2 ^ c, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
  };
  const maHoa = (email, mk) => bam(email + '|' + mk + '|mohinhviet');
  const chuanEmail = e => String(e || '').trim().toLowerCase();

  const tatCa = () => doc(KHOA_DS, []);
  const hienTai = () => {
    const id = doc(KHOA_PHIEN, null);
    return id ? tatCa().find(u => u.id === id) || null : null;
  };
  const laAdmin = () => { const u = hienTai(); return !!u && u.vaiTro === 'admin'; };

  function suaNguoi(id, fn) {
    const ds = tatCa();
    const u = ds.find(x => x.id === id);
    if (!u) return false;
    fn(u);
    luu(KHOA_DS, ds);
    return true;
  }

  // Tài khoản quản trị mặc định (đổi mật khẩu ngay sau lần đăng nhập đầu tiên)
  function khoiTao() {
    const ds = tatCa();
    if (ds.some(u => u.vaiTro === 'admin')) return;
    const email = 'admin@mohinhviet.example';
    ds.push({ id: 'u-admin', hoTen: 'Quản trị viên', email, sdt: '', matKhau: maHoa(email, 'admin123'), vaiTro: 'admin', ngayTao: new Date().toISOString() });
    luu(KHOA_DS, ds);
  }

  function dangKy({ hoTen, email, sdt, matKhau }) {
    email = chuanEmail(email);
    if (String(matKhau).length < 6) return { ok: false, loi: 'Mật khẩu cần ít nhất 6 ký tự' };
    const ds = tatCa();
    if (ds.some(u => u.email === email)) return { ok: false, loi: 'Email này đã được đăng ký' };
    const nguoi = {
      id: 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
      hoTen: String(hoTen).trim(), email, sdt: String(sdt || '').trim(),
      matKhau: maHoa(email, matKhau), vaiTro: 'khach', ngayTao: new Date().toISOString()
    };
    ds.push(nguoi);
    luu(KHOA_DS, ds);
    luu(KHOA_PHIEN, nguoi.id);
    return { ok: true, nguoi };
  }

  function dangNhap(email, matKhau) {
    email = chuanEmail(email);
    const nguoi = tatCa().find(u => u.email === email && u.matKhau === maHoa(email, matKhau));
    if (!nguoi) return { ok: false, loi: 'Email hoặc mật khẩu không đúng' };
    luu(KHOA_PHIEN, nguoi.id);
    return { ok: true, nguoi };
  }

  function dangXuat() { try { localStorage.removeItem(KHOA_PHIEN); } catch (e) { /* bỏ qua */ } }

  function capNhatHoSo(id, { hoTen, sdt }) { return suaNguoi(id, u => { u.hoTen = hoTen; u.sdt = sdt; }); }

  function doiMatKhau(id, cu, moi) {
    const u = tatCa().find(x => x.id === id);
    if (!u || u.matKhau !== maHoa(u.email, cu)) return { ok: false, loi: 'Mật khẩu hiện tại không đúng' };
    if (String(moi).length < 6) return { ok: false, loi: 'Mật khẩu mới cần ít nhất 6 ký tự' };
    suaNguoi(id, x => { x.matKhau = maHoa(x.email, moi); });
    return { ok: true };
  }

  // Chỉ quản trị viên dùng; không tự đổi quyền / xóa chính mình
  function datVaiTro(id, vaiTro) {
    if (!laAdmin() || id === hienTai().id) return false;
    return suaNguoi(id, u => { u.vaiTro = vaiTro; });
  }
  function xoa(id) {
    if (!laAdmin() || id === hienTai().id) return false;
    luu(KHOA_DS, tatCa().filter(u => u.id !== id));
    return true;
  }

  // Chặn trang: chưa đủ quyền thì chuyển về trang đăng nhập
  function yeuCauDangNhap() {
    if (hienTai()) return true;
    location.replace('dang-nhap.html?tu=tai-khoan');
    return false;
  }
  function yeuCauAdmin() {
    if (laAdmin()) return true;
    location.replace('dang-nhap.html?tu=admin');
    return false;
  }

  // Vẽ khu tài khoản trên đầu trang (menu thả xuống ở máy tính, thêm vào menu ở điện thoại)
  function veHeader() {
    const u = hienTai();
    const muc = u
      ? [{ href: 'tai-khoan.html', chu: 'Tài khoản của tôi' }]
        .concat(u.vaiTro === 'admin' ? [{ href: 'admin.html', chu: 'Trang quản trị' }] : [])
        .concat([{ xuat: true, chu: 'Đăng xuất' }])
      : [{ href: 'dang-nhap.html', chu: 'Đăng nhập' }];
    const html = lop => muc.map(m => m.xuat
      ? `<button type="button" class="${lop}" data-dang-xuat>${m.chu}</button>`
      : `<a class="${lop}" href="${m.href}">${m.chu}</a>`).join('');

    const khu = document.getElementById('khuTaiKhoan');
    if (khu) {
      khu.innerHTML = u
        ? `<details class="tk-menu"><summary class="nut-tk">${esc(u.hoTen)}</summary><div class="tk-xo">${html('')}</div></details>`
        : '<a class="nut-tk" href="dang-nhap.html">Đăng nhập</a>';
    }
    const nav = document.getElementById('nav');
    if (nav) {
      nav.querySelectorAll('.nav-tk').forEach(x => x.remove());
      nav.insertAdjacentHTML('beforeend', html('nav-tk'));
    }
  }

  document.addEventListener('click', e => {
    if (e.target.closest('[data-dang-xuat]')) { dangXuat(); location.href = 'index.html'; return; }
    document.querySelectorAll('.tk-menu[open]').forEach(d => { if (!d.contains(e.target)) d.removeAttribute('open'); });
  });

  khoiTao();
  veHeader();
  return { tatCa, hienTai, laAdmin, dangKy, dangNhap, dangXuat, capNhatHoSo, doiMatKhau, datVaiTro, xoa, yeuCauDangNhap, yeuCauAdmin, veHeader };
})();
