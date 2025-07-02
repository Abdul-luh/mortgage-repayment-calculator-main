export const monthlyRepaymentCalc = (
  amount: number,
  rate: number,
  term: number
): string => {
  const r = rate / 100 / 12;
  const n = term * 12;

  const monthly =
    (amount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);

  return monthly.toLocaleString("en-UK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const yearlyRepaymentCalc = (
  amount: number,
  rate: number,
  term: number
): string => {
  const r = rate / 100;
  const n = term;

  if (rate === 0) {
    return (amount / n).toLocaleString("en-UK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const yearly = (amount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);

  return yearly.toLocaleString("en-UK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
