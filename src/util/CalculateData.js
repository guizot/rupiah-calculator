let calculateData = (amount, fractions) => {
  let array = [];
  for (let fraction of fractions) {
    let count = 0;
    if (amount !== 0) {
      if (amount - fraction === 0) {
        amount = amount - fraction;
        array.push({ kurs: fraction, amount: count + 1 });
      } else {
        while (amount - fraction >= 0) {
          amount = amount - fraction;
          count++;
        }
        if (count !== 0) {
          array.push({ kurs: fraction, amount: count });
        }
      }
    }
  }
  if (amount !== 0) {
    array.push({ kurs: amount, amount: "No Fraction" });
  }
  return array;
};

export default calculateData;
