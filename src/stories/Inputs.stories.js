import React, { useState } from 'react';
import { TextInput, TextArea, Select, Checkbox, Toggle, RadioGroup, RangeInput, FileInput, ColorPicker, DateInput } from './Inputs';

export default {
  id: 'example-inputs',
  title: 'Input Components',
  component: TextInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export const Text = {
  name: 'Text',
  render: (args) => {
    const [v, setV] = useState(args.value);
    return React.createElement(TextInput, { ...args, value: v, onChange: setV });
  },
  args: { label: 'Name', value: '', placeholder: 'Enter name' },
};

export const Area = {
  name: 'TextArea',
  render: (args) => {
    const [v, setV] = useState(args.value);
    return React.createElement(TextArea, { ...args, value: v, onChange: setV });
  },
  args: { label: 'Bio', value: '', placeholder: 'Write something…', rows: 4 },
};

export const SelectSingle = {
  name: 'Select',
  render: (args) => {
    const [v, setV] = useState(args.value);
    return React.createElement(Select, { ...args, value: v, onChange: setV });
  },
  args: { label: 'Role', value: '', placeholder: 'Choose…', options: [{ value: 'admin', label: 'Admin' }, { value: 'editor', label: 'Editor' }, { value: 'viewer', label: 'Viewer' }] },
};

export const SelectMulti = {
  name: 'Multi-Select',
  render: (args) => {
    const [v, setV] = useState(args.value);
    return React.createElement(Select, { ...args, value: v, onChange: setV, multiple: true });
  },
  args: { label: 'Tags', value: ['alpha'], options: [{ value: 'alpha', label: 'Alpha' }, { value: 'beta', label: 'Beta' }, { value: 'gamma', label: 'Gamma' }] },
};

export const ChecksTogglesRadios = {
  name: 'Checkbox / Toggle / Radio',
  render: () => {
    const [c, setC] = useState(true);
    const [t, setT] = useState(false);
    const [r, setR] = useState('a');
    return React.createElement('div', { style: { display: 'grid', gap: 12 } },
      React.createElement(Checkbox, { label: 'Accept', checked: c, onChange: setC }),
      React.createElement(Toggle, { label: 'Enable', checked: t, onChange: setT }),
      React.createElement(RadioGroup, { name: 'grp', value: r, onChange: setR, options: [{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }] }),
    );
  }
};

export const Range = {
  name: 'Range',
  render: (args) => {
    const [v, setV] = useState(args.value);
    return React.createElement(RangeInput, { ...args, value: v, onChange: setV });
  },
  args: { label: 'Volume', value: 30, min: 0, max: 100, step: 1 },
};

export const File = {
  name: 'File Input',
  render: () => React.createElement(FileInput, { label: 'Upload files', onFiles: () => {} }),
};

export const Color = {
  name: 'Color Picker',
  render: (args) => {
    const [v, setV] = useState('#4f46e5');
    return React.createElement(ColorPicker, { ...args, value: v, onChange: setV });
  },
  args: { label: 'Pick color' },
};

export const DateField = {
  name: 'Date Picker',
  render: (args) => {
    const [v, setV] = useState('');
    return React.createElement(DateInput, { ...args, value: v, onChange: setV });
  },
  args: { label: 'Date' },
};


