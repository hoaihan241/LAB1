// Đặt giao diện sáng/tối ngay khi tải trang (nằm trong <head> để không bị nháy trắng)
(function () {
  let t = null;
  try { t = localStorage.getItem('giaoDien'); } catch (e) { /* bỏ qua */ }
  if (!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'toi' : 'sang';
  document.documentElement.dataset.theme = t === 'toi' ? 'dark' : 'light';
})();
