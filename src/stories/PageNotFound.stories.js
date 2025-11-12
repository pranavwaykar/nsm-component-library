import '../index.scss';
import { PageNotFound } from '../components/PageNotFound/PageNotFound';
import { commonArgTypes } from './helpers/controls';

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
  argTypes: {
    primaryOnClick: { action: 'primaryOnClick' },
    secondaryOnClick: { action: 'secondaryOnClick' },
    // visibility toggles
    showArt: { control: 'boolean' },
    showCode: { control: 'boolean' },
    showTitle: { control: 'boolean' },
    showDescription: { control: 'boolean' },
    showPrimary: { control: 'boolean' },
    showSecondary: { control: 'boolean' },
    // content controls
    code: { control: 'text', description: 'Content shown in the big code area (accepts string/number/node via args)' },
    title: { control: 'text' },
    description: { control: 'text' },
    ctaLabel: { control: 'text' },
    secondaryLabel: { control: 'text' },
    // per-section style controls (separate color, font, width, height)
    codeColor: { control: 'color' },
    codeFontFamily: { control: 'text' },
    codeFontSize: { control: 'text' },
    codeWidth: { control: 'text' },
    codeHeight: { control: 'text' },
    titleColor: { control: 'color' },
    titleFontFamily: { control: 'text' },
    titleFontSize: { control: 'text' },
    titleWidth: { control: 'text' },
    titleHeight: { control: 'text' },
    descriptionColor: { control: 'color' },
    descriptionFontFamily: { control: 'text' },
    descriptionFontSize: { control: 'text' },
    descriptionWidth: { control: 'text' },
    descriptionHeight: { control: 'text' },
    // action section style overrides
    actionsStyle: { control: 'object' },
    primaryButtonStyle: { control: 'object' },
    secondaryButtonStyle: { control: 'object' },
    // dimensions
    artWidth: { control: 'text' },
    artHeight: { control: 'text' },
    artBlockAWidth: { control: 'text' },
    artBlockAHeight: { control: 'text' },
    artBlockBWidth: { control: 'text' },
    artBlockBHeight: { control: 'text' },
    artBlockCSize: { control: 'text' },
    actionsGap: { control: 'text' },
    primaryButtonWidth: { control: 'text' },
    primaryButtonHeight: { control: 'text' },
    secondaryButtonWidth: { control: 'text' },
    secondaryButtonHeight: { control: 'text' },
    // color props for art and buttons
    artBgStartColor: { control: 'color' },
    artBgEndColor: { control: 'color' },
    artBorderColor: { control: 'color' },
    artBlockAColor: { control: 'color' },
    artBlockBColor: { control: 'color' },
    artBlockCColor: { control: 'color' },
    primaryButtonTextColor: { control: 'color' },
    primaryButtonBgColor: { control: 'color' },
    primaryButtonBorderColor: { control: 'color' },
    secondaryButtonTextColor: { control: 'color' },
    secondaryButtonBgColor: { control: 'color' },
    secondaryButtonBorderColor: { control: 'color' },
    ...commonArgTypes,
  },
};

export const Default = {
  name: 'Default',
  args: {
    code: '404',
    title: 'Page not found',
    description: "The page you are looking for doesn't exist or has been moved.",
    ctaLabel: 'Go Home',
    secondaryLabel: 'Contact support',
    showArt: true,
    showCode: true,
    showTitle: true,
    showDescription: true,
    showPrimary: true,
    showSecondary: true,
  },
  argTypes: {
    loading: { table: { disable: true } },
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
  }
};


