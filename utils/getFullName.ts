export const getFullName = (firstName: string, lastName: string) => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  } else {
    return "Anonymous";
  }
};
