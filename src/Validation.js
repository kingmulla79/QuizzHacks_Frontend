export default function Validation(values) {
  const errors = {};

  const emailpattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  // eslint-disable-next-line
  const phone_number_pattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

  if (values.username.trim() === "") {
    errors.username = "A username is required!";
  }

  if (values.email.trim() === "") {
    errors.email = "A valid email must be provided!";
  } else if (!emailpattern.test(values.email)) {
    errors.email = "The email pattern is invalid";
  }

  if (values.phone.trim() === "") {
    errors.phone = "A phone number is required!";
  } else if (!phone_number_pattern.test(values.phone)) {
    errors.phone = "The phone number pattern is invalid";
  }

  if (values.password.trim() === "") {
    errors.password = "A password must be provided!";
  }

  if (values.confirmpassword.trim() === "") {
    errors.confirmpassword = "A password confirmation must be provided!";
  } else if (values.password !== values.confirmpassword) {
    errors.confirmpassword = "The passwords must match!";
  }
  return errors;
}
