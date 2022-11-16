export default async function validateInfo(values) {
  let errors = {}
  if (typeof (values.pseudo) !== 'undefined' && !values.pseudo.trim()) {
    errors.pseudo = 'You need to enter an username'
  }

  if (typeof (values.pseudo) !== 'undefined' && !values.name.trim()) {
    errors.name = 'You need to enter a name'
  }

  if (typeof (values.pseudo) !== 'undefined' && !values.lastname.trim()) {
    errors.lastname = 'You need to enter a last name'
  }

  if (typeof (values.pseudo) !== 'undefined' && !values.phone.trim()) {
    errors.phone = 'You need to enter a phone number'
  }

  if (typeof (values.pseudo) !== 'undefined' && !values.email.trim()) {
    errors.email = 'Email required'
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(values.email)) {
    errors.email = 'You need to enter a valid email'
  }

  if (typeof (values.pseudo) !== 'undefined' && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(values.password)) {
    errors.password = 'Your password must be at least 8 characters long and contain at least an uppercase letter and a number'
  }
  return errors;
}