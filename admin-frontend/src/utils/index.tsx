export function convertToDate(date2: string) {
  const date = new Date(date2);

  return date.toLocaleDateString("en-GB");
}
