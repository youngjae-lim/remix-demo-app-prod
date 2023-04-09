// Validates expense title
function isValidTitle(value) {
  // Return true if the value is not empty, not null, and is less than 30 characters
  return value && value.trim().length > 0 && value.trim().length <= 30
}

// Validates expense amount
function isValidAmount(value) {
  const amount = parseFloat(value)
  // Return true if the value is a number and is greater than zero
  return !isNaN(amount) && amount > 0
}

// Validaates expense date
function isValidDate(value) {
  // Return true if the value does exist, and is a date before today
  return value && new Date(value).getTime() < new Date().getTime()
}

// Validates email
function isValidEmail(value) {
  // Return true if the value is not empty, not null, and is a valid email

  return value && value.trim().length > 0 && /^\S+@\S+$/.test(value)
}

// Validates password
function isValidPassword(value) {
  // Return true if the value is not empty, not null, and is at least 6 characters long
  return value && value.trim().length >= 6
}

// Validates expense input
export function validateExpenseInput(input) {
  let validationErrors = {}

  // If the title is not valid, add an error message to the validationErrors object
  if (!isValidTitle(input.title)) {
    validationErrors.title =
      'Invalid expense title. Must be at most 30 characters long.'
  }

  // If the amount is not valid, add an error message to the validationErrors object
  if (!isValidAmount(input.amount)) {
    validationErrors.amount =
      'Invalid amount. Must be a number greater than zero.'
  }

  // If the date is not valid, add an error message to the validationErrors object
  if (!isValidDate(input.date)) {
    validationErrors.date = 'Invalid date. Must be a date before today.'
  }

  // If there are any validation errors, throw them
  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors
  }
}

// Validates auth input
export function validateAuthInput(input) {
  let validationErrors = {}

  // If the email is not valid, add an error message to the validationErrors object
  if (!isValidEmail(input.email)) {
    validationErrors.email = 'Invalid email.'
  }

  // If the password is not valid, add an error message to the validationErrors object
  if (!isValidPassword(input.password)) {
    validationErrors.password =
      'Invalid password. Must be at least 6 characters long.'
  }

  // If there are any validation errors, throw them
  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors
  }
}
