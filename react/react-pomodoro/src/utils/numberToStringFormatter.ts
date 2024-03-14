const numberToStringFormatter = (value: number) => {
  return value.toString().padStart(2, "0");
};

export default numberToStringFormatter;
