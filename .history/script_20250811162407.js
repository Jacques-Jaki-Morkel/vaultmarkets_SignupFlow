// This is the form processing logic below

// Signup form processing logic: starts here

    // const form1 = document.querySelector('');

// Signup form processing logic: ends here

//form navigation logic
// navigation logic starts here
const countForms = document.querySelectorAll('form').length
console.log(countForms) //should be 18 forms




//array for all the submit buttons
const buttons = document.querySelectorAll('button[type=submit]');

buttons.forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    // your func logic here
    console.log('Submit button clicked!');
  });
});