export const probability = (n: number) => {
  const divided = n / 100; // 0 < n < 100

  return !!n && Math.random() <= divided;
};
