let formData = {
 email: "",
 message: ""
}

const STORAGE_KEY = "feedback-form-state".trim(); 

const refs = {
 form: document.querySelector('.feedback-form'),
 input: document.querySelector('.feedback-form input'),
 textarea: document.querySelector('.feedback-form textarea'),
}

populateForm();    // додаємо перед реєстрацією слухачів, бо важливо напочатку отримати ці дані

refs.form.addEventListener('submit', onFormSubmit);


refs.form.addEventListener('input', evt => {
 formData[evt.target.name] = evt.target.value;            // зберегли дані з форми = formData.email = evt.currentTarget.value; або === formData.message = evt.currentTarget.value; 
 localStorage.setItem(STORAGE_KEY, JSON.stringify(formData)); // засетали в локал сторедж це значення 
})

// form
function onFormSubmit(evt) {
 evt.preventDefault();                          // скаcовуємо нормальну поведінку
 const form = evt.currentTarget;

 if (formData.email === '' || formData.message === '') {
  return  alert("Fill please all fields");
 } 
  console.log(formData);

  formData = {
   email: "",
   message: ""
  }

  form.reset();
                               // очищаем форму
  localStorage.removeItem(STORAGE_KEY);     // видаляємо повідомлення зі сховища 
 };

function populateForm() {
 
 const savedMessageFromLocalStorage = localStorage.getItem(STORAGE_KEY); // отримую значення textarea сховища ( якщо в локал строредж дані відсутні, то повернеться null)

 // паттерн раннього повернення
 if (savedMessageFromLocalStorage === null) return;                                     // якщо щось було, то обновляю DOM
 
 try {
   const parsedMessage = JSON.parse(savedMessageFromLocalStorage);

   formData = parsedMessage;
   refs.input.value = formData.email;
   refs.textarea.value = formData.message;
 } catch (error) {
  alert("Something went wrong!")
 }
}
