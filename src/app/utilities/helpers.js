export const filterOptions = (optionsProps, searchText, setState) => {
    setState(optionsProps?.filter(option => option.label?.includes(searchText)))
  }