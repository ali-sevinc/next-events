export function changeDate(date: string | Date) {
  const readableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return readableDate;
}

export function changeDateShorter(date: string | Date) {
  const readableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  return readableDate;
}

export function changeAddress(address: string) {
  const formatedAddress = address.replace(", ", "\n");
  return formatedAddress;
}

export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
