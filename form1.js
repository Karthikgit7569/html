
const form = document.createElement('form');
form.id = 'studentForm';
const nameLabel = document.createElement('label');
nameLabel.textContent = 'Full Name:';
const nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.name = 'name';
nameInput.placeholder = 'Enter full name';
nameInput.required = true;
form.appendChild(nameLabel);
form.appendChild(nameInput);
form.appendChild(document.createElement('br'));

const ageLabel = document.createElement('label');
ageLabel.textContent = 'Age:';
const ageInput = document.createElement('input');
ageInput.type = 'number';
ageInput.name = 'age';
ageInput.placeholder = 'Enter age';
ageInput.required = true;
form.appendChild(ageLabel);
form.appendChild(ageInput);
form.appendChild(document.createElement('br'));

const gradeLabel = document.createElement('label');
gradeLabel.textContent = 'Grade:';
const gradeInput = document.createElement('input');
gradeInput.type = 'text';
gradeInput.name = 'grade';
gradeInput.placeholder = 'Enter grade';
gradeInput.required = true;
form.appendChild(gradeLabel);
form.appendChild(gradeInput);
form.appendChild(document.createElement('br'));

const emailLabel = document.createElement('label');
emailLabel.textContent = 'Email:';
const emailInput = document.createElement('input');
emailInput.type = 'email';
emailInput.name = 'email';
emailInput.placeholder = 'Enter email';
emailInput.required = true;
form.appendChild(emailLabel);
form.appendChild(emailInput);
form.appendChild(document.createElement('br'));

const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.textContent = 'Submit';
form.appendChild(submitButton);

document.body.appendChild(form);

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const data = {
    name: nameInput.value,
    age: ageInput.value,
    grade: gradeInput.value,
    email: emailInput.value
  };

  console.log('Student Data:', data);
});
