const tipForm = document.getElementById('tip-form');
const tipsContainer = document.getElementById('tip-container');
const fbBtn = document.getElementById('feedback-btn');

fbBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '/feedback';
});

const createCard = (tip) => {

  const cardEl = document.createElement('div');
  cardEl.classList.add('card', 'mb-3', 'm-3');
  cardEl.setAttribute('key', tip.tip_id);


  const cardHeaderEl = document.createElement('h4');
  cardHeaderEl.classList.add(
    'card-header',
    'bg-primary',
    'text-light',
    'p-2',
    'm-0'
  );
  cardHeaderEl.innerHTML = `${tip.username} </br>`;


  const cardBodyEl = document.createElement('div');
  cardBodyEl.classList.add('card-body', 'bg-light', 'p-2');
  cardBodyEl.innerHTML = `<p>${tip.tip}</p>`;

  cardEl.appendChild(cardHeaderEl);
  cardEl.appendChild(cardBodyEl);


  tipsContainer.appendChild(cardEl);
};


const getTips = () =>
  fetch('/api/tips', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error('Error:', error);
    });


const postTip = (tip) =>
  fetch('/api/tips', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tip),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data);
      createCard(tip);
    })
    .catch((error) => {
      console.error('Error:', error);
    });


getTips().then((data) => data.forEach((tip) => createCard(tip)));



const validateTip = (newTip) => {
  const { username, topic, tip } = newTip;

 
  const errorState = {
    username: '',
    tip: '',
    topic: '',
  };


  const utest = username.length >= 4;
  if (!utest) {
    errorState.username = 'Invalid username!';
  }

  
  const tipContentCheck = tip.length > 15;
  if (!tipContentCheck) {
    errorState.tip = 'Tip must be at least 15 characters';
  }

 
  const topicCheck = topic.includes('UX' || 'UI');
  if (!topicCheck) {
    errorState.topic = 'Topic not relevant to UX or UI';
  }

  const result = {
    isValid: !!(utest && tipContentCheck && topicCheck),
    errors: errorState,
  };


  return result;
};


  const errors = Object.values(errorObj);
  errors.forEach((error) => {
    if (error.length > 0) {
      alert(error);
    }
  });
};


const submitDiagnostics = (submissionObj) => {
  // TODO: your code here
  console.info(
    '⚠️ Create the logic for the fetch POST request in scripts/index.js'
  );
  alert('Add your logic to scripts/index.js');
};


const handleFormSubmit = (e) => {
  e.preventDefault();
  console.log('Form submit invoked');

 
  const tipContent = document.getElementById('tipText').value;

 
  const tipUsername = document.getElementById('tipUsername').value.trim();


  const newTip = {
    username: tipUsername,
    topic: 'UX',
    tip: tipContent,
  };

 
  const submission = validateTip(newTip);

 
  return submission.isValid ? postTip(newTip) : submitDiagnostics(submission);
};


tipForm.addEventListener('submit', handleFormSubmit);
