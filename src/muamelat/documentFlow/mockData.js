const today = new Date();
function fmt(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const base = new Date(today.getFullYear(), today.getMonth(), 1);

const names = ['Documents', 'Email', 'Miscellaneous', 'Contracts', 'Notices', 'Reports'];

const mockData = Array.from({ length: 18 }).map((_, i) => ({
  name: names[i % names.length],
  count: Math.floor(Math.random() * 10) + 1,
  fromDate: fmt(new Date(base.getFullYear(), base.getMonth(), (i % 28) + 1)),
}));

export default mockData;


