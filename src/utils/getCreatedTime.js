/* eslint-disable consistent-return */

const getCreatedTime = (date) => {
  const now = new Date();
  const created = new Date(date);
  const differentTime = now - created;
  const differentYears = Math.floor(
    differentTime / (1000 * 60 * 60 * 24 * 30 * 12),
  );
  const differentMonths = Math.floor(
    differentTime / (1000 * 60 * 60 * 24 * 30),
  );
  const differentDays = Math.floor(differentTime / (1000 * 60 * 60 * 24));
  const differentHours = Math.floor(differentTime / (1000 * 60 * 60));
  const diffenentMinutes = Math.floor(differentTime / (1000 * 60));
  const differentSeconds = Math.floor(differentTime / 1000);

  if (differentYears > 0) {
    return `${differentYears} tahun yang lalu`;
  }
  if (differentMonths > 0) {
    return `${differentMonths} bulan yang lalu`;
  }
  if (differentDays > 0) {
    return `${differentDays} hari yang lalu`;
  }
  if (differentHours > 0) {
    return `${differentHours} jam yang lalu`;
  }
  if (diffenentMinutes > 0) {
    return `${diffenentMinutes} menit yang lalu`;
  }
  if (differentSeconds >= 0) {
    return `${differentSeconds} detik yang lalu`;
  }
};

export default getCreatedTime;
