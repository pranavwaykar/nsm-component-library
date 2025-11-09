// Minimal mock calendar events (created_at timestamps)
const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();

function at(d) {
  return new Date(y, m, d).toISOString();
}

const data = [
  { id: 1, created_at: at(2), title: 'Doc uploaded' },
  { id: 2, created_at: at(7), title: 'Email sent' },
  { id: 3, created_at: at(7), title: 'Misc entry' },
  { id: 4, created_at: at(12), title: 'Contract updated' },
  { id: 5, created_at: at(19), title: 'Report reviewed' },
  { id: 6, created_at: at(23), title: 'Notice drafted' },
  { id: 7, created_at: at(28), title: 'Meeting notes' },
];

export default data;


