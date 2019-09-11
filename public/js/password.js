function isValid() {
  console.log('hello');
  if ($('#password').val() === $('#confirm-password')) {
    return 'is-valid';
  }
  return 'is-invalid';
}
