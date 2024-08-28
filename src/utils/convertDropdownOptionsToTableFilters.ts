export const convertDropdownOptionsToTableFilters = (
  options: { value: string; label: string }[]
) => {
  return options.map((option) => ({
    text: option.label,
    value: option.value,
  }));
};
