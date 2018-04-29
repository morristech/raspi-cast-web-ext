export const getPercent = (value: number, total: number): string => {
  return `${value / total * 100}%`;
};
