import React from 'react';
import '../index.scss';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import { commonArgTypes } from './helpers/controls';

export default {
  id: 'breadcrumb',
  title: 'Breadcrumb Component',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      source: { language: 'jsx', code: '<Breadcrumb items={["ADVANCITY4009","TEST MUAMELAT 06","MUAMELE DETAY SAYFASI","KÜNYE BİLGİLERİ"]} />' },
      description: { component: 'Breadcrumb communicates the user\'s location in the app hierarchy. Provide `items` as an ordered array of labels. The container supports universal/style props for spacing and placement within headers or pages.' },
    },
  },
  argTypes: {
    ...commonArgTypes,
    separator: { control: 'text' },
    tone: { table: { disable: true } },
    colorScheme: { table: { disable: true } },
  },
};

export const Default = {
  name: 'Default',
  args: {
    items: ['ADVANCITY4009', 'TEST MUAMELAT 06', 'MUAMELE DETAY SAYFASI', 'KÜNYE BİLGİLERİ']
  },
};


