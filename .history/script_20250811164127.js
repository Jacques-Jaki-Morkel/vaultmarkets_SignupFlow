// This is the form processing logic below

// Signup form processing logic: starts here

    // const form1 = document.querySelector('');

// Signup form processing logic: ends here

//form navigation logic
// navigation logic starts here
// Count all forms
const forms = document.querySelectorAll('form');
const countForms = forms.length;
console.log(countForms); // should be 18 forms

// Get all submit buttons
const buttons = document.querySelectorAll('button[type=submit]');

// Current form index (starting at 0)
let currentFormIndex = 0;

// Function to show a form by index and hide others
function showForm(index) {
    forms.forEach((form, i) => {
        form.parentElement.style.display = i === index ? 'block' : 'none';
    });
}

// Show the first form initially
showForm(currentFormIndex);

// Add click listeners to all submit buttons
buttons.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault(); // Stop actual form submit

        // Move to next form if available
        if (currentFormIndex < countForms - 1) {
            currentFormIndex++;
            showForm(currentFormIndex);
        }
    });
});



buttons.forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    // your func logic here
    console.log('Submit button clicked!');
  });
});