export const hasUpperCase = (string: string) => /[A-Z]/.test(string)
export const hasLowerCase = (string: string) => /[a-z]/.test(string)
export const hasSpecialChar = (string: string) => /[^A-Za-z0-9]/.test(string)
