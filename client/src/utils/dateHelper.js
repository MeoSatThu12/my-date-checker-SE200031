function isLeapYear(year) {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  if (year % 4 === 0) return true;
  return false;
}

function daysInMonth(month, year) {
  switch (month) {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12: return 31;
    case 4: case 6: case 9: case 11: return 30;
    case 2: return isLeapYear(year) ? 29 : 28;
    default: return 0;
  }
}

function isInteger(str) {
  if (typeof str !== 'string') return false;
  const trimmed = str.trim();
  if (trimmed === '') return false;
  return /^-?\d+$/.test(trimmed);
}

/**
 * Validates date inputs and returns { success, message }
 * Messages match the mobile test expectations in test.e2e.js
 */
export function validateDate(dayStr, monthStr, yearStr) {
  if (!isInteger(dayStr)) {
    return { success: false, message: 'Input data of Day is incorrect format!' };
  }
  const day = parseInt(dayStr.trim(), 10);

  if (!isInteger(monthStr)) {
    return { success: false, message: 'Input data of Month is incorrect format!' };
  }
  const month = parseInt(monthStr.trim(), 10);

  if (!isInteger(yearStr)) {
    return { success: false, message: 'Input data of Year is incorrect format!' };
  }
  const year = parseInt(yearStr.trim(), 10);

  if (day < 1 || day > 31) {
    return { success: false, message: 'Day is out of range!' };
  }
  if (month < 1 || month > 12) {
    return { success: false, message: 'Month is out of range!' };
  }
  if (year < 1000 || year > 3000) {
    return { success: false, message: 'Year is out of range!' };
  }

  const maxDays = daysInMonth(month, year);
  if (day > maxDays) {
    return { success: false, message: `${day}/${month}/${year} is NOT correct date time!` };
  }

  return { success: true, message: `${day}/${month}/${year} is correct date time!` };
}
