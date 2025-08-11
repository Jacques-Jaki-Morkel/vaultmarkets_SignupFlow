// This is the form processing logic below

// Signup form processing logic: starts here

    // const form1 = document.querySelector('');

// Signup form processing logic: ends here

//form navigation logic
// navigation logic starts here
// grab all forms (assumes each form is wrapped in its own <section>)
const forms = document.querySelectorAll('form');

// map each form to its wrapper section (or parent if no section)
const sections = Array.from(forms).map(f => f.closest('section') || f.parentElement);

const countForms = sections.length;
let currentFormIndex = 1; // start on section index 1 (second section)

// show only the section at `index`, hide others — skip index 0 so it's always visible
function showForm(index) {
  sections.forEach((se



buttons.forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    // your func logic here
    console.log('Submit button clicked!');
  });
});