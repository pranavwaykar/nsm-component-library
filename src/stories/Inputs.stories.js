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
    showLabel: { control: "boolean", description: "Show or hide the field label" },
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
    value: { table: { disable: true } },
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
  argTypes: {
    text: { table: { disable: true } },
    placeholder: { table: { disable: true } },
    inputColor: { table: { disable: true } },
    inputBorder: { table: { disable: true } },
    inputBgColor: { table: { disable: true } },
    leftSection: { table: { disable: true } },
    controlCheckboxSize: { control: "text", description: "Checkbox size (e.g., 18px, 1.2rem)" },
    controlColor: { control: "color", description: "Checkbox check color (accent-color)" },
    w: { table: { disable: true } },
    h: { table: { disable: true } },
    minW: { table: { disable: true } },
    maxW: { table: { disable: true } },
    minH: { table: { disable: true } },
    maxH: { table: { disable: true } },
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
  argTypes: {
    text: { table: { disable: true } },
    placeholder: { table: { disable: true } },
    inputColor: { table: { disable: true } },
    inputBorder: { table: { disable: true } },
    inputBgColor: { table: { disable: true } },
    leftSection: { table: { disable: true } },
    controlToggleSize: { control: "text", description: "Toggle height (e.g., 24px, 1.5rem, 120%)" },
    toggleOnColor: { control: "color", description: "Track color when ON" },
    toggleOffColor: { control: "color", description: "Track color when OFF" },
    knobColor: { control: "color", description: "Thumb color" },
    w: { table: { disable: true } },
    h: { table: { disable: true } },
    minW: { table: { disable: true } },
    maxW: { table: { disable: true } },
    minH: { table: { disable: true } },
    maxH: { table: { disable: true } },
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
    label: "Options",
    name: "grp",
    value: "a",
    options: [
      { value: "a", label: "Option A" },
      { value: "b", label: "Option B" },
    ],
    id: "radio-1",
    "data-testid": "radio",
  },
  argTypes: {
    value: { table: { disable: true } },
    name: { table: { disable: true } },
    text: { table: { disable: true } },
    inputColor: { table: { disable: true } },
    inputBorder: { table: { disable: true } },
    inputBgColor: { table: { disable: true } },
    leftSection: { table: { disable: true } },
    rightSection: { table: { disable: true } },
    controlRadioSize: { control: "text", description: "Radio control size (e.g., 16px, 1rem)" },
  },
};



export const Range = {
  name: "Range",
  render: (args) => {
    const [v, setV] = React.useState(args.value);
    React.useEffect(() => { setV(args.value); }, [args.value]);
    return React.createElement(RangeInput, { ...args, value: v, onChange: setV });
  },
  args: {
    label: "Volume",
    value: 30,
    min: 0,
    max: 100,
    step: 1,
    id: "range-1",
    "data-testid": "range",
    sliderColor: "#2a44ca",
    sliderThumbSize: "20px",
  },
  argTypes: {
    step: { table: { disable: true } },
    text: { table: { disable: true } },
    placeholder: { table: { disable: true } },
    inputColor: { table: { disable: true } },
    inputBgColor: { table: { disable: true } },
    inputBorder: { table: { disable: true } },
    leftSection: { table: { disable: true } },
    rightSection: { table: { disable: true } },
    sliderColor: { control: "color", description: "Fill color of the slider" },
    sliderThumbSize: { control: "text", description: "Thumb size (e.g., 18px, 1.2rem)" },
  },
};

export const File = {
  name: "File Input",
  render: (args) => React.createElement(FileInput, { ...args }),
  args: {
    label: "Upload files",
    placeholder: "Choose file",
    helper: "Drag & drop files here",
    showLabel: true,
    showHelper: true,
    showPlaceholder: true,
    fileRemovable: true,
    error: "",
    id: "file-1",
    "data-testid": "file",
  },
  argTypes: {
    text: { table: { disable: true } },
    onFiles: { table: { disable: true } },
    inputColor: { table: { disable: true } },
    inputBorder: { table: { disable: true } },
    leftSection: { table: { disable: true } },
    rightSection: { table: { disable: true } },
  },
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
  argTypes: {
    text: { table: { disable: true } },
    placeholder: { table: { disable: true } },
    helper: { table: { disable: true } },
    inputColor: { table: { disable: true } },
    leftSection: { table: { disable: true } },
    rightSection: { table: { disable: true } },
    backgroundColor: { table: { disable: true } },
  }
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
  argTypes: {
    value: { table: { disable: true } },
    text: { table: { disable: true } },
    placeholder: { control: "text" },
    helper: { control: "text" },
    error: { control: "text" },
    triggerBgColor: { control: "color" },
    menuBgColor: { control: "color" },
    menuTextColor: { control: "color" },
    menuBorderColor: { control: "color" },
    placeholderColor: { control: "color" },
    menuTitleColor: { control: "color" },
    menuDowColor: { control: "color" },
    menuDayColor: { control: "color" },
    presetBgColor: { control: "color" },
    presetButtonBgColor: { control: "color" },
    presetButtonTextColor: { control: "color" },
    prevArrowColor: { control: "color" },
    nextArrowColor: { control: "color" },
    menuW: { control: "text" },
    menuH: { control: "text" },
    menuMinW: { control: "text" },
    menuMaxW: { control: "text" },
    menuMinH: { control: "text" },
    menuMaxH: { control: "text" },
    menuPadding: { control: "text" },
    menuMargin: { control: "text" },
  }
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
  argTypes: {
    value: { table: { disable: true } },
    text: { table: { disable: true } },
    backgroundColor: { table: { disable: true } },
    category: { table: { disable: true } },
    inputColor: { table: { disable: true } },
    inputTextColor: { control: "color" },
    inputBgColor: { control: "color" },
    inputBorder: { control: "text" },
    placeholderColor: { control: "color" },
    categoryBgColor: { control: "color" },
    categoryTextColor: { control: "color" },
    categoryIconColor: { control: "color" },
    categoryChevronColor: { control: "color" },
    menuBgColor: { control: "color" },
    menuTextColor: { control: "color" },
    menuBorderColor: { control: "color" },
    menuW: { control: "text" },
    menuH: { control: "text" },
    searchIcon: { control: "text" },
    micIcon: { control: "text" },
    categoryChevronIcon: { control: "text" },
  },
};
