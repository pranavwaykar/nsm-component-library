import React, { useState } from "react";
import { commonArgTypes } from "./helpers/controls";
import {
  TextInput,
  TextArea,
  Select,
  Checkbox,
  Toggle,
  RadioGroup,
  RangeInput,
  FileInput,
  ColorPicker,
  DateInput,
  MultiSelect,
  SingleSelect,
  DateRange,
  SearchInput,
} from "../components/Inputs/Inputs";

export default {
  id: "example-inputs",
  title: "Input Components",
  component: TextInput,
  parameters: { layout: "centered", docs: { description: { component: "A set of accessible form inputs used throughout the library: text, textarea, single/multi-select, checkbox, toggle, radio, range, file, color, and date range. Each input exposes a predictable onChange API and forwards universal/style props for seamless composition in forms and layouts." } } },
  tags: ["autodocs"],
  argTypes: {
    ...commonArgTypes,
    style: { control: "object" },
    containerProps: { table: { disable: true }  },
    inputProps: { table: { disable: true }  },
    inputColor: { control: "color", description: "Color of the input text" },
    inputBorder: { control: "color", description: "Border color of the input control" },
    inputBgColor: { control: "color", description: "Background color of the input control" },
    leftSection: { control: "text", description: "Text/icon content shown on the left side of the control" },
    rightSection: { control: "text", description: "Text/icon content shown on the right side of the control" },
    caretDown: { control: "text", description: "Custom caret (closed state) for Single/Multi Select" },
    caretUp: { control: "text", description: "Custom caret (open state) for Single/Multi Select" },
    variant: { table: { disable: true }  },
  },
};

export const Text = {
  name: "Text",
  render: (args) => {
    const [v, setV] = useState(args.text ?? "");
    React.useEffect(() => {
      setV(args.text ?? "");
    }, [args.text]);
    return React.createElement(TextInput, {
      ...args,
      text: v,
      onChange: setV,
    });
  },
  args: {
    label: "Name",
    text: "",
    placeholder: "Enter name",
    id: "text-1",
    tabIndex: 0,
    "data-testid": "text-input",
  },
  argTypes: { text: { control: "text" } },
};

export const Area = {
  name: "TextArea",
  render: (args) => {
    const [v, setV] = useState(args.text ?? "");
    React.useEffect(() => {
      setV(args.text ?? "");
    }, [args.text]);
    return React.createElement(TextArea, { ...args, text: v, onChange: setV });
  },
  args: {
    label: "Bio",
    text: "",
    placeholder: "Write something…",
    rows: 4,
    id: "area-1",
    "data-testid": "area",
  },
  argTypes: { text: { control: "text" } },
};

export const SelectSingle = {
  name: "Select",
  render: (args) => {
    const [v, setV] = useState(args.value ?? "");
    React.useEffect(() => { setV(args.value ?? ""); }, [args.value]);
    return React.createElement(SingleSelect, { ...args, value: v, onChange: setV });
  },
  args: {
    label: "Role",
    placeholder: "Choose…",
    options: [
      { value: "admin", label: "Admin" },
      { value: "editor", label: "Editor" },
      { value: "viewer", label: "Viewer" },
    ],
    id: "select-1",
    "data-testid": "select",
  },
  argTypes: {
    value: { table: { disable: true } },
    text: { table: { disable: true } },
    leftSection: { table: { disable: true } },
    rightSection: { table: { disable: true } },
    caretIcon: { table: { disable: true } },
    menuBgColor: { control: "color" },
    menuTextColor: { control: "color" },
    menuBorderColor: { control: "color" },
  },
};

export const SelectMulti = {
  name: "Multi-Select",
  render: (args) => {
    const [v, setV] = useState(args.value);
    return React.createElement(MultiSelect, {
      ...args,
      value: v,
      onChange: setV,
    });
  },
  args: {
    label: "Tags",
    value: [],
    placeholder: "Pick values",
    options: [
      { value: "alpha", label: "Alpha" },
      { value: "beta", label: "Beta" },
      { value: "gamma", label: "Gamma" },
    ],
    id: "ms-1",
    "data-testid": "ms",
  },
  argTypes: {
    menuBgColor: { control: "color" },
    menuTextColor: { control: "color" },
    menuBorderColor: { control: "color" },
    chipBgColor: { control: "color" },
    chipTextColor: { control: "color" },
    chipBorderColor: { control: "color" },
    chipRadius: { control: "text" },
    chipRemovable: { control: "boolean" },
    inputColor: { table: { disable: true } },
    searchable: { control: "boolean" },
  },
};

export const Check = {
  name: "Checkbox",
  render: (args) => {
    const [c, setC] = useState(args.checked ?? true);
    return React.createElement(Checkbox, {
      ...args,
      checked: c,
      onChange: setC,
    });
  },
  args: {
    label: "Accept",
    checked: true,
    id: "check-1",
    "data-testid": "check",
  },
};

export const ToggleSwitch = {
  name: "Toggle",
  render: (args) => {
    const [t, setT] = useState(args.checked ?? false);
    return React.createElement(Toggle, { ...args, checked: t, onChange: setT });
  },
  args: {
    label: "Enable",
    checked: false,
    id: "toggle-1",
    "data-testid": "toggle",
  },
};

export const Radio = {
  name: "Radio Group",
  render: (args) => {
    const [r, setR] = useState(args.value ?? "a");
    return React.createElement(RadioGroup, {
      ...args,
      value: r,
      onChange: setR,
    });
  },
  args: {
    name: "grp",
    value: "a",
    options: [
      { value: "a", label: "Option A" },
      { value: "b", label: "Option B" },
    ],
    id: "radio-1",
    "data-testid": "radio",
  },
};

export const ChecksTogglesRadios = Check;

export const Range = {
  name: "Range",
  render: (args) => {
    const [v, setV] = useState(args.value);
    return React.createElement(RangeInput, {
      ...args,
      value: v,
      onChange: setV,
    });
  },
  args: {
    label: "Volume",
    value: 30,
    min: 0,
    max: 100,
    step: 1,
    id: "range-1",
    "data-testid": "range",
  },
};

export const File = {
  name: "File Input",
  render: () =>
    React.createElement(FileInput, {
      label: "Upload files",
      onFiles: () => {},
      id: "file-1",
      "data-testid": "file",
    }),
};

export const Color = {
  name: "Color Picker",
  render: (args) => {
    const [v, setV] = useState("#4f46e5");
    return React.createElement(ColorPicker, {
      ...args,
      value: v,
      onChange: setV,
    });
  },
  args: { label: "Pick color", id: "color-1", "data-testid": "color" },
};

// export const DateField = {
//   name: 'Date Picker',
//   render: (args) => {
//     const [v, setV] = useState('');
//     return React.createElement(DateInput, { ...args, value: v, onChange: setV });
//   },
//   args: { label: 'Date' },
// };

export const DateRangePicker = {
  name: "Date Range Picker",
  render: (args) => {
    const [v, setV] = useState(args.value);
    return React.createElement(DateRange, {
      ...args,
      value: v,
      onChange: setV,
    });
  },
  args: {
    label: "Date Range",
    value: { start: "", end: "" },
    id: "dr-1",
    "data-testid": "dr",
  },
};

export const Search = {
  name: "Search",
  render: (args) => {
    const [v, setV] = useState(args.value ?? args.text ?? "");
    React.useEffect(() => {
      setV(args.value ?? args.text ?? "");
    }, [args.value, args.text]);
    const [cat, setCat] = useState(args.category);
    return React.createElement(SearchInput, { ...args, value: v, onChange: setV, category: cat, onCategoryChange: setCat });
  },
  args: {
    label: "",
    value: "",
    text: "",
    placeholder:
      "Search within all folders and content, or a specific folder’s content",
    category: "all",
    categories: [
      { value: "all", label: "All" },
      { value: "stages", label: "Stages" },
      { value: "tc", label: "Transaction Chronicles" },
      { value: "email", label: "E-Mail" },
      { value: "issue", label: "Issue Chronicles" },
    ],
  },
  argTypes: { text: { control: "text" } },
};
