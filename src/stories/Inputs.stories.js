import React, { useState } from 'react';
import { TextInput, TextArea, Select, Checkbox, Toggle, RadioGroup, RangeInput, FileInput, ColorPicker, DateInput, MultiSelect, SingleSelect } from './Inputs';

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
    return React.createElement(SingleSelect, { ...args, value: v, onChange: setV });
  },
  args: { label: 'Role', value: '', placeholder: 'Choose…', options: [{ value: 'admin', label: 'Admin' }, { value: 'editor', label: 'Editor' }, { value: 'viewer', label: 'Viewer' }] },
};

export const SelectMulti = {
  name: 'Multi-Select',
  render: (args) => {
    const [v, setV] = useState(args.value);
    return React.createElement(MultiSelect, { ...args, value: v, onChange: setV });
  },
  args: { label: 'Tags', value: [], placeholder: 'Pick values', options: [{ value: 'alpha', label: 'Alpha' }, { value: 'beta', label: 'Beta' }, { value: 'gamma', label: 'Gamma' }] },
};

export const Check = {
  name: 'Checkbox',
  render: (args) => {
    const [c, setC] = useState(args.checked ?? true);
    return React.createElement(Checkbox, { ...args, checked: c, onChange: setC });
  },
  args: { label: 'Accept', checked: true },
};

export const ToggleSwitch = {
  name: 'Toggle',
  render: (args) => {
    const [t, setT] = useState(args.checked ?? false);
    return React.createElement(Toggle, { ...args, checked: t, onChange: setT });
  },
  args: { label: 'Enable', checked: false },
};

export const Radio = {
  name: 'Radio Group',
  render: (args) => {
    const [r, setR] = useState(args.value ?? 'a');
    return React.createElement(RadioGroup, { ...args, value: r, onChange: setR });
  },
  args: { name: 'grp', value: 'a', options: [{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }] },
};

export const ChecksTogglesRadios = Check;

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


