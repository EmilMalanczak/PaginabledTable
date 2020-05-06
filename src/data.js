const dataCreate = () => {
  let array = [];
  for (let i = 1; i < 421; i++) {
    array.push({
      place: i,
      name: "John",
      surname: "Doe",
    });
  }
  return array;
};

export const dataEntries = dataCreate();
