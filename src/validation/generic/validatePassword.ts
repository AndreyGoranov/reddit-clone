export const validatePasswordLength = (password: string): boolean => {
  if (password.length < 8) {
    return false;
  }

  return true;
};

export const validatePasswordMatch = (pw1: string, pw2: string): boolean => {  
  if (pw1 !== pw2) {
    return false;
  }
  
  return true;
};
