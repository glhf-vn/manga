import chroma from "chroma-js";

export const colourStyles = {
  container: (provided) => ({
    ...provided,
    display: "block",
  }),
  control: (provided, { isFocused }) => ({
    ...provided,
    border: "none",
    background: "none",
    borderRadius: "none",
    boxShadow: "unset",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "unset",
  }),
  option: (provided, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...provided,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...provided[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      borderRadius: "0.5rem",
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color,
      color: "white",
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "1rem",
    overflow: "hidden",
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),
};
