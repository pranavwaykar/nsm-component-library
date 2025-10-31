import '../index.scss';
import { PageNotFound } from '../components/PageNotFound/PageNotFound';

export default {
  id: 'page-not-found',
  title: 'Page Not Found',
  component: PageNotFound,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { source: { language: 'jsx', code: '<PageNotFound />' } },
  },
};

export const Default = { name: 'Default', args: {} };


