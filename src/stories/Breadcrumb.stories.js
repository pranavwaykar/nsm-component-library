import React from 'react';
import '../stories/tokens.css';
import '../muamelat/styles/index.scss';
import Breadcrumb from '../muamelat/Breadcrumb/Breadcrumb';

export default {
  id: 'breadcrumb',
  title: 'Muamelat/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { source: { language: 'jsx', code: '<Breadcrumb items={["ADVANCITY4009","TEST MUAMELAT 06","MUAMELE DETAY SAYFASI","KÜNYE BİLGİLERİ"]} />' } },
  },
};

export const Default = {
  name: 'Default',
  args: {
    items: ['ADVANCITY4009', 'TEST MUAMELAT 06', 'MUAMELE DETAY SAYFASI', 'KÜNYE BİLGİLERİ']
  },
};


