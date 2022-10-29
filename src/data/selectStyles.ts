import chroma from "chroma-js";

export const selectStyles = {
  control: (provided, { isFocused }) => ({
    ...provided,
    border: "1px solid #e4e4e7",
    background: "none",
    borderRadius: "0.5rem",
    boxShadow: "unset",
  }),
  valueContainer: (provided) => ({
    ...provided,
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
    borderRadius: "0.5rem",
    overflow: "hidden",
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),
};
