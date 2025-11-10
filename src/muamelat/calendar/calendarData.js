// Mock calendar events with additional fields to mirror Muamelat details
const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();

function at(d) {
  return new Date(y, m, d).toISOString();
}

const data = [
  {
    id: 1,
    created_at: at(2),
    title: 'Doc uploaded',
    documentName: '3287487324.png',
    subject: 'Initial upload',
    createdUser: 'Shraddha SHINDE',
    from: 'gsi',
    to: 'newmind',
    documentType: 'Deduction Rates Table',
  },
  {
    id: 2,
    created_at: at(7),
    title: 'Email sent',
    documentName: 'Muamelat-email.eml',
    subject: 'Muamelat update',
    createdUser: 'Shraddha SHINDE',
    from: 'muamelat',
    to: 'all',
    documentType: 'E-Mail',
  },
  {
    id: 3,
    created_at: at(7),
    title: 'Misc entry',
    documentName: 'notes.txt',
    subject: 'Daily notes',
    createdUser: 'System',
    from: 'system',
    to: 'journal',
    documentType: 'Misc',
  },
  {
    id: 4,
    created_at: at(12),
    title: 'Contract updated',
    documentName: 'contract_v2.pdf',
    subject: 'Scope change',
    createdUser: 'A. K.',
    from: 'legal',
    to: 'client',
    documentType: 'Contract',
  },
  {
    id: 5,
    created_at: at(19),
    title: 'Report reviewed',
    documentName: 'review_report.docx',
    subject: 'Review summary',
    createdUser: 'Reviewer',
    from: 'qa',
    to: 'lead',
    documentType: 'Report',
  },
  {
    id: 6,
    created_at: at(23),
    title: 'Notice drafted',
    documentName: 'notice.pdf',
    subject: 'Legal notice',
    createdUser: 'Legal',
    from: 'legal',
    to: 'partner',
    documentType: 'Notice',
  },
  {
    id: 7,
    created_at: at(28),
    title: 'Meeting notes',
    documentName: 'meeting_remarks.md',
    subject: 'Meeting recap',
    createdUser: 'P. M.',
    from: 'pm',
    to: 'team',
    documentType: 'Notes',
  },
];

export default data;


