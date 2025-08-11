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
    // prevent page reload for all except last form
    if (i < countForms - 1) {
      e.preventDefault();
      if (i === currentFormIndex) {
        currentFormIndex++;
        showForm(currentFormIndex);
      }
    } else {
      // last form → allow normal submission or handle final logic
      console.log('Final form submitted');
    }
  });
});
