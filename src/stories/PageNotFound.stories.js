import '../index.scss';
import { PageNotFound } from '../components/PageNotFound/PageNotFound';
import { universalArgTypes, styleSystemArgTypes } from './helpers/controls';

export default {
  id: 'page-not-found',
  title: 'Page Not Found',
  component: PageNotFound,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      source: { language: 'jsx', code: '<PageNotFound />' },
      description: { component: 'A friendly empty state for 404 errors. Includes decorative art, headline, description, and primary/secondary actions. Customize text and wire `onCtaClick` / `onSecondaryClick`. Container supports universal/style props.' },
    },
  },
  argTypes: { ...universalArgTypes, ...styleSystemArgTypes },
};

export const Default = {
  name: 'Default',
  args: {
    title: 'Page not found',
    description: "The page you are looking for doesn't exist or has been moved.",
    ctaLabel: 'Go Home',
    secondaryLabel: 'Contact support',
  },
};


