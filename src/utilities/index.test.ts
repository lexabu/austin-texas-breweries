import { formatPhoneNumber } from '.';

describe('formatPhoneNumber', () => {
  it('should format phone number', () => {
    const phoneNumber = formatPhoneNumber('3372229999');
    expect(phoneNumber).toBe('337-222-9999');
  });
  it('should handle formatted phone number', () => {
    const phoneNumber = formatPhoneNumber('512-220-2340');
    expect(phoneNumber).toBe('512-220-2340');
  });
});
