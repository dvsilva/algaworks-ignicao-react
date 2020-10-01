const names = ["Daniel", "Thiago", "William"];

const nameWithIndex = names.map((name, index) => {
  console.log(name, index);
  return name + index;
});

console.log(nameWithIndex);
