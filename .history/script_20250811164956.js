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
  sections.forEach((sec, i) => {
    if (!sec) return;
    if (i === 0) return; // never hide the first section
    sec.classList.toggle('hideThis', i !== index);
  });
}

// hide all except index 0 & starting index
sections.forEach((sec, i) => {
  if (!sec) return;
  if (i !== 0 && i !== currentFormIndex) sec.classList.add('hideThis');
});

// show the initial form (section 2)
showForm(currentFormIndex);

// listen for form submissions
forms.forEach((form, i) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (i === currentFormIndex) {
      if (currentFormIndex < countForms - 1) {
        currentFormIndex++;
        showForm(currentFormIndex);
      } else {
        console.log('All steps complete');
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