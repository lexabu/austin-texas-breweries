export function formatPhoneNumber(phoneNumber: string | null) {
  if (!phoneNumber) {
    return null;
  }

  let formattedPhoneNumber = phoneNumber.replaceAll('-', '').replace(/\D[^.]/g, '');

  if (formattedPhoneNumber[0] === '1') {
    formattedPhoneNumber = formattedPhoneNumber.slice(1, formattedPhoneNumber.length - 1);
  }
  formattedPhoneNumber =
    formattedPhoneNumber.slice(0, 3) +
    '-' +
    formattedPhoneNumber.slice(3, 6) +
    '-' +
    formattedPhoneNumber.slice(6);

  return formattedPhoneNumber;
}

export function formatAddress(street: string | null, city: string, state: string, postal_code: string) {
  postal_code = postal_code.slice(0, 5);
  if (street === null) {
    return `${city}, ${state}, ${postal_code}`;
  } else {
    return `${street}, ${city}, ${state}, ${postal_code}`;
  }
}
