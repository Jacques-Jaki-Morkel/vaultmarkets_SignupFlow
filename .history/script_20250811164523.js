// This is the form processing logic below

// Signup form processing logic: starts here

    // const form1 = document.querySelector('');

// Signup form processing logic: ends here

//form navigation logic
// navigation logic starts here
// grab all forms (assumes each form is wrapped in its own <section>)
const forms = document.querySelectorAll('form');

// Map each form to its wrapper section (or parentElement if no section)
const sections = Array.from(forms).map(f => f.closest('section') || f.parentElement);

const countForms = sections.length;
let currentFormIndex = 1;

// show the section at `index`, hide all others by toggling the .hideThis class
function showForm(index) {
  sections.forEach((sec, i) => {
    if (!sec) return;
    sec.classList.toggle('hideThis', i !== index); // adds hideThis when i !== index, removes when i === index
  });
}

// initialize: hide all, then reveal the first
sections.forEach(sec => sec && sec.classList.add('hideThis'));
if (sections[0]) showForm(0);

// prefer listening for form "submit" so browser validation runs naturally
forms.forEach((form, i) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent actual submission while navigating the multi-step flow

    // only advance when current form is the one being submitted
    if (i === currentFormIndex) {
      if (currentFormIndex < countForms - 1) {
        currentFormIndex++;
        showForm(currentFormIndex);
      } else {
        // last form submitted — do final action here (AJAX, show success, or submit)
        console.log('All steps complete');
        // e.g. send data or allow final submit: form.submit();
      }
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