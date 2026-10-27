'use strict';

(function () {
  const khung = $('#noiDungTin');
  if (!khung) return;

  const thamSo = new URLSearchParams(location.search);
  const ngay = s => new Date(s).toLocaleDateString('vi-VN');

  const theBai = b => `
    <a class="tin-the" href="tin-tuc.html?id=${b.id}">
      <span class="tin-nhan">${esc(b.loai)}</span>
      <h3>${esc(b.tieuDe)}</h3>
      <p>${esc(b.tomTat)}</p>
      <small>${ngay(b.ngay)} · ${b.phut} phút đọc</small>
    </a>`;

  function veDanhSachTin() {
    const loai = thamSo.get('loai') || '';
    const dsLoai = [...new Set(BAI_VIET.map(b => b.loai))];
    const ds = BAI_VIET.filter(b => !loai || b.loai === loai)
                       .sort((a, b) => b.ngay.localeCompare(a.ngay));

    document.title = (loai || 'Tin tức') + ' - Mô Hình Việt';
    $('#duongDan').innerHTML = `<a href="index.html">Trang chủ</a> / <span>${esc(loai || 'Tin tức')}</span>`;
    khung.innerHTML = `
      <h1>${esc(loai || 'Tin tức')}</h1>
      <div class="tin-loc">
        <a href="tin-tuc.html" class="${loai ? '' : 'hien'}">Tất cả</a>
        ${dsLoai.map(l => `<a href="tin-tuc.html?loai=${encodeURIComponent(l)}" class="${l === loai ? 'hien' : ''}">${esc(l)}</a>`).join('')}
      </div>
      <div class="tin-luoi">${ds.map(theBai).join('') || '<p class="rong">Chưa có bài viết nào.</p>'}</div>`;
  }

  function veBaiViet(b) {
    document.title = b.tieuDe + ' - Mô Hình Việt';
    $('#duongDan').innerHTML = `<a href="index.html">Trang chủ</a> / <a href="tin-tuc.html">Tin tức</a> / <span>${esc(b.tieuDe)}</span>`;

    const noiDung = b.noiDung.map(d => d.startsWith('## ') ? `<h2>${esc(d.slice(3))}</h2>` : `<p>${esc(d)}</p>`).join('');
    const spLQ = (b.sp || []).map(timSP).filter(Boolean);
    const baiKhac = BAI_VIET.filter(x => x.id !== b.id)
      .sort((x, y) => (y.loai === b.loai) - (x.loai === b.loai)).slice(0, 3);

    khung.innerHTML = `
      <article class="tin-bai">
        <span class="tin-nhan">${esc(b.loai)}</span>
        <h1>${esc(b.tieuDe)}</h1>
        <p class="tin-meta">${ngay(b.ngay)} · ${b.phut} phút đọc</p>
        ${noiDung}
      </article>
      ${spLQ.length ? `<h2>Mô hình liên quan</h2><div class="luoi">${spLQ.map(theSP).join('')}</div>` : ''}
      <h2>Bài viết khác</h2>
      <div class="tin-luoi">${baiKhac.map(theBai).join('')}</div>`;
  }

  const bai = BAI_VIET.find(b => b.id === Number(thamSo.get('id')));
  if (thamSo.has('id') && !bai) {
    khung.innerHTML = '<p class="rong">Không tìm thấy bài viết này. <a href="tin-tuc.html"><u>Quay lại trang tin tức</u></a></p>';
  } else if (bai) {
    veBaiViet(bai);
  } else {
    veDanhSachTin();
  }
})();