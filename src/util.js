import numeral from "numeral";
// orderBy DESC
export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};
export const numberFormat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";
