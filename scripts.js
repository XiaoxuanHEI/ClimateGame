let userId = "";
let startTime = "";
let endTime = "";
let timeSpent = "";
let gameData = [];

let timeSum = 0;
let timeAvg = 0;
let num = 0;

let effort = 100;
let carbon = 34.2;

let flag = false;


function selectLanguage() {
  var languageSelect = document.getElementById('languageSelect');
  var selectedLanguage = languageSelect.value;
  fetch(`${selectedLanguage}.html`)
    .then(response => response.text())
    .then(htmlContent => {
      document.getElementById('container').innerHTML = htmlContent;
    })
    .catch(error => console.error('Error loading language file:', error));
}

function start() {
  // Get user's name
  userId = document.getElementById("nameInput").value;
  document.getElementById('intro').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

function updateProgressBar() {
  document.getElementById('effortNum').innerText = effort;
  document.getElementById('carbonNum').innerText = carbon.toFixed(1);

  document.getElementById('effortFiller').style.width = effort + '%';
  document.getElementById('carbonFiller').style.width = carbon / 34.2 * 100 + '%';
}

function checkStatus() {
  if (carbon <= 24.3 && carbon > 16.2) {
    document.getElementById('carbonFiller').style.backgroundColor = 'rgb(240, 141, 72)';
    document.getElementById('darkCloud3').style.display = 'none';
    document.getElementById('whiteCloud1').style.display = 'block';
  }
  if (carbon <= 16.2 && carbon > 8.1) {
    document.getElementById('carbonFiller').style.backgroundColor = 'rgb(253, 235, 83)';
    document.getElementById('darkCloud2').style.display = 'none';
    document.getElementById('whiteCloud2').style.display = 'block';
  }
  if (carbon <= 8.1 && carbon > 0) {
    document.getElementById('carbonFiller').style.backgroundColor = 'rgb(162, 201, 74)';
    document.getElementById('darkCloud1').style.display = 'none';
    document.getElementById('sun').style.display = 'block';
  }
  if (carbon <= 0) {
    document.getElementById('win').style.display = 'block';
  } else if (num >= 12) {
    document.getElementById('end').style.display = 'block';
  }
}

function shuffleOptions(questionId) {
  const optionsContainer = document.getElementById(questionId).querySelector('.options');
  const options = Array.from(optionsContainer.children);
  options.sort(() => Math.random() - 0.5);
  options.forEach(option => {
    optionsContainer.appendChild(option);
  });
}

function showQuestion(questionId) {
  const question = document.getElementById(questionId);
  question.style.display = 'block';
  shuffleOptions(questionId);
}

function saveInteraction() {
  const interactionData = {
    userId: userId,
    gameData: gameData,
    effort: effort,
    CO2: parseFloat(carbon.toFixed(1)),
    timeAvg: parseFloat((timeSum / num).toFixed(3))
  };

  // Convert interaction data to JSON string
  const interactionJson = JSON.stringify(interactionData, null, 2);

  // Create Blob object
  const blob = new Blob([interactionJson], { type: 'application/json' });

  // Create download link
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);

  // Set download file name
  downloadLink.download = `${userId}_climate.json`;

  // Append download link to the body and simulate click
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // Remove download link
  document.body.removeChild(downloadLink);

  if (carbon <= 0) {
    document.getElementById('win').style.display = 'none';
  } else if (num >= 12) {
    document.getElementById('end').style.display = 'none';
  } else {
    document.getElementById('lose').style.display = 'none';
  }
}


function addData(startTime, questionId, choice, num) {
  endTime = new Date();
  timeSpent = (endTime - startTime) / 1000;
  timeSum = timeSum + timeSpent;
  answer = {
    no: num,
    question: questionId,
    choice: choice,
    startTime: startTime.toLocaleString(),
    endTime: endTime.toLocaleString(),
    timeSpent: timeSpent,
  };
  gameData.push(answer);
}


function clickCoal() {
  num += 1;
  startTime = new Date();
  showQuestion('coalQuiz');
}

function checkCoalAnswer() {
  flag = false;
  const selectedAnswer = document.querySelector('input[name="coalAnswer"]:checked');

  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;

    if (userAnswer === 'coalA') {
      effort -= 0;
      carbon += 2.4;
      document.getElementById('coalQuiz').style.display = 'none';
      document.getElementById('coal').style.display = 'none';
      document.getElementById('coalA').style.display = 'block';
      flag = true;
    } else if (userAnswer === 'coalB') {
      if (effort >= 5) {
        effort -= 5;
        carbon += 1.8;
        document.getElementById('coalQuiz').style.display = 'none';
        document.getElementById('coal').style.display = 'none';
        document.getElementById('coalB').style.display = 'block';
        flag = true;
      } else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    } else if (userAnswer === 'coalC') {
      if (effort >= 8) {
        effort -= 8;
        carbon += 0.1;
        document.getElementById('coalQuiz').style.display = 'none';
        document.getElementById('coal').style.display = 'none';
        flag = true;
      } else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    }

    if (flag) {
      addData(startTime, 'coal', userAnswer);
      updateProgressBar();
      checkStatus();
    }

    document.querySelectorAll('input[name="coalAnswer"]').forEach(option => option.checked = false);
  } else {
    alert('Veuillez sélectionner une réponse avant de la soumettre.');
  }
}

function clickCar() {
  num += 1;
  startTime = new Date();
  showQuestion('carQuiz');
}

function checkCarAnswer() {
  flag = false;
  const selectedAnswer = document.querySelector('input[name="carAnswer"]:checked');

  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;
    if (userAnswer === 'carA') {
      if (effort >= 5) {
        effort -= 5;
        carbon -= 1.8;
        document.getElementById('carQuiz').style.display = 'none';
        document.getElementById('car').style.display = 'none';
        document.getElementById('carA').style.display = 'block';
        flag = true;
      } else {
        document.getElementById('lose').style.display = 'block';
      }
    } else if (userAnswer === 'carB') {
      if (effort >= 10) {
        effort -= 10;
        carbon += 0.5;
        document.getElementById('carQuiz').style.display = 'none';
        document.getElementById('car').style.display = 'none';
        document.getElementById('carB').style.display = 'block';
        flag = true;
      } else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    } else if (userAnswer === 'carC') {
      if (effort >= 10) {
        effort -= 10;
        carbon -= 4.6;
        document.getElementById('carQuiz').style.display = 'none';
        document.getElementById('car').style.display = 'none';
        document.getElementById('carC').style.display = 'block';
        flag = true;
      } else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    }

    if (flag) {
      addData(startTime, 'car', userAnswer);
      updateProgressBar();
      checkStatus();
    }

    document.querySelectorAll('input[name="carAnswer"]').forEach(option => option.checked = false);
  } else {
    alert('Veuillez sélectionner une réponse avant de la soumettre.');
  }
}


function clickBuild() {
  num += 1;
  startTime = new Date();
  showQuestion('buildQuiz');
}

function checkBuildAnswer() {
  flag = false;
  const selectedAnswer = document.querySelector('input[name="buildAnswer"]:checked');

  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;

    if (userAnswer === 'buildA') {
      if (effort >= 3) {
        effort -= 3;
        carbon -= 0.6;
        document.getElementById('buildQuiz').style.display = 'none';
        document.getElementById('build').style.display = 'none';
        document.getElementById('buildA').style.display = 'block';
        flag = true;
      } else {
        document.getElementById('lose').style.display = 'block';
      }
    } else if (userAnswer === 'buildB') {
      if (effort >= 5) {
        effort -= 5;
        carbon -= 0;
        document.getElementById('buildQuiz').style.display = 'none';
        document.getElementById('build').style.display = 'none';
        document.getElementById('buildB').style.display = 'block';
        flag = true;
      }
      else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    } else if (userAnswer === 'buildC') {
      if (effort >= 8) {
        effort -= 8;
        carbon -= 1.7;
        document.getElementById('buildQuiz').style.display = 'none';
        document.getElementById('build').style.display = 'none';
        document.getElementById('buildC').style.display = 'block';
        flag = true;
      }
      else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    }

    if (flag) {
      addData(startTime, 'build', userAnswer);
      updateProgressBar();
      checkStatus();
    }

    document.querySelectorAll('input[name="buildAnswer"]').forEach(option => option.checked = false);
  } else {
    alert('Veuillez sélectionner une réponse avant de la soumettre.');
  }
}


function clickRecy() {
  num += 1;
  startTime = new Date();
  showQuestion('recyQuiz');
}

function checkRecyAnswer() {
  flag = false;
  const selectedAnswer = document.querySelector('input[name="recyAnswer"]:checked');

  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;

    if (userAnswer === 'recyA') {
      if (effort >= 1) {
        effort -= 1;
        carbon -= 0;
        document.getElementById('recyQuiz').style.display = 'none';
        document.getElementById('recy').style.display = 'none';
        document.getElementById('recyA').style.display = 'block';
        flag = true;
      } else {
        document.getElementById('lose').style.display = 'block';
      }
    } else if (userAnswer === 'recyB') {
      if (effort >= 2) {
        effort -= 2;
        carbon -= 0.1;
        document.getElementById('recyQuiz').style.display = 'none';
        document.getElementById('recy').style.display = 'none';
        document.getElementById('recyB').style.display = 'block';
        flag = true;
      } else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    } else if (userAnswer === 'recyC') {
      if (effort >= 5) {
        effort -= 5;
        carbon -= 1.4;
        document.getElementById('recyQuiz').style.display = 'none';
        document.getElementById('recy').style.display = 'none';
        document.getElementById('recyC').style.display = 'block';
        flag = true;
      } else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    }

    if (flag) {
      addData(startTime, 'recy', userAnswer);
      updateProgressBar();
      checkStatus();
    }

    document.querySelectorAll('input[name="recyAnswer"]').forEach(option => option.checked = false);
  } else {
    alert('Veuillez sélectionner une réponse avant de la soumettre.');
  }
}



function clickElec() {
  num += 1;
  startTime = new Date();
  showQuestion('elecQuiz');
}

function checkElecAnswer() {
  flag = false;
  const selectedAnswer = document.querySelector('input[name="elecAnswer"]:checked');

  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;

    if (userAnswer === 'elecA') {
      if (effort >= 5) {
        effort -= 5;
        carbon -= 0;
        document.getElementById('elecQuiz').style.display = 'none';
        document.getElementById('elec').style.display = 'none';
        document.getElementById('elecA').style.display = 'block';
        flag = true;
      } else {
        document.getElementById('lose').style.display = 'block';
      }
    } else if (userAnswer === 'elecB') {
      if (effort >= 10) {
        effort -= 10;
        carbon -= 1.2;
        document.getElementById('elecQuiz').style.display = 'none';
        document.getElementById('elec').style.display = 'none';
        document.getElementById('elecB').style.display = 'block';
        flag = true;
      } else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    } else if (userAnswer === 'elecC') {
      if (effort >= 15) {
        effort -= 15;
        carbon -= 5.4;
        document.getElementById('elecQuiz').style.display = 'none';
        document.getElementById('elec').style.display = 'none';
        document.getElementById('elecC').style.display = 'block';
        flag = true;
      } else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    }

    if (flag) {
      addData(startTime, 'elec', userAnswer);
      updateProgressBar();
      checkStatus();
    }

    document.querySelectorAll('input[name="elecAnswer"]').forEach(option => option.checked = false);
  } else {
    alert('Veuillez sélectionner une réponse avant de la soumettre.');
  }
}

function clickPlane() {
  num += 1;
  startTime = new Date();
  showQuestion('planeQuiz');
}

function checkPlaneAnswer() {
  flag = false;
  const selectedAnswer = document.querySelector('input[name="planeAnswer"]:checked');

  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;

    if (userAnswer === 'planeA') {
      if (effort >= 5) {
        effort -= 5;
        carbon -= 0.4;
        document.getElementById('planeQuiz').style.display = 'none';
        document.getElementById('plane').style.display = 'none';
        document.getElementById('planeA').style.display = 'block';
        flag = true;
      } else {
        document.getElementById('lose').style.display = 'block';
      }
    } else if (userAnswer === 'planeB') {
      if (effort >= 7) {
        effort -= 7;
        carbon -= 1.8;
        document.getElementById('planeQuiz').style.display = 'none';
        document.getElementById('plane').style.display = 'none';
        document.getElementById('planeB').style.display = 'block';
        flag = true;
      } else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    } else if (userAnswer === 'planeC') {
      if (effort >= 10) {
        effort -= 10;
        carbon += 1.5;
        document.getElementById('planeQuiz').style.display = 'none';
        document.getElementById('plane').style.display = 'none';
        document.getElementById('planeC').style.display = 'block';
        flag = true;
      } else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    }

    if (flag) {
      addData(startTime, 'plane', userAnswer);
      updateProgressBar();
      checkStatus();
    }

    document.querySelectorAll('input[name="planeAnswer"]').forEach(option => option.checked = false);
  } else {
    alert('Veuillez sélectionner une réponse avant de la soumettre.');
  }
}

function clickOcean() {
  num += 1;
  startTime = new Date();
  showQuestion('oceanQuiz');
}

function checkOceanAnswer() {
  flag = false;
  const selectedAnswer = document.querySelector('input[name="oceanAnswer"]:checked');

  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;

    if (userAnswer === 'oceanA') {
      if (effort >= 2) {
        effort -= 2;
        carbon -= 0.2;
        document.getElementById('oceanQuiz').style.display = 'none';
        document.getElementById('ocean').style.display = 'none';
        document.getElementById('oceanA').style.display = 'block';
        flag = true;
      } else {
        document.getElementById('lose').style.display = 'block';
      }
    } else if (userAnswer === 'oceanB') {
      if (effort >= 4) {
        effort -= 4;
        carbon -= 1.5;
        document.getElementById('oceanQuiz').style.display = 'none';
        document.getElementById('ocean').style.display = 'none';
        document.getElementById('oceanB').style.display = 'block';
        flag = true;
      } else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    } else if (userAnswer === 'oceanC') {
      if (effort >= 5) {
        effort -= 5;
        carbon -= 3.8;
        document.getElementById('oceanQuiz').style.display = 'none';
        document.getElementById('ocean').style.display = 'none';
        document.getElementById('oceanC').style.display = 'block';
        flag = true;
      } else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    }

    if (flag) {
      addData(startTime, 'ocean', userAnswer);
      updateProgressBar();
      checkStatus();
    }

    document.querySelectorAll('input[name="oceanAnswer"]').forEach(option => option.checked = false);
  } else {
    alert('Veuillez sélectionner une réponse avant de la soumettre.');
  }
}

function clickPpl() {
  num += 1;
  startTime = new Date();
  showQuestion('pplQuiz');
}

function checkPplAnswer() {
  flag = false;
  const selectedAnswer = document.querySelector('input[name="pplAnswer"]:checked');

  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;

    if (userAnswer === 'pplA') {
      if (effort >= 2) {
        effort -= 2;
        carbon -= 0;
        document.getElementById('pplQuiz').style.display = 'none';
        document.getElementById('ppl').style.display = 'none';
        document.getElementById('pplA').style.display = 'block';
        flag = true;
      } else {
        document.getElementById('lose').style.display = 'block';
      }
    } else if (userAnswer === 'pplB') {
      if (effort >= 3) {
        effort -= 3;
        carbon -= 0.2;
        document.getElementById('pplQuiz').style.display = 'none';
        document.getElementById('ppl').style.display = 'none';
        document.getElementById('pplB').style.display = 'block';
        flag = true;
      } else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    } else if (userAnswer === 'pplC') {
      if (effort >= 4) {
        effort -= 4;
        carbon -= 0.8;
        document.getElementById('pplQuiz').style.display = 'none';
        document.getElementById('ppl').style.display = 'none';
        document.getElementById('pplC').style.display = 'block';
        flag = true;
      } else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    }

    if (flag) {
      addData(startTime, 'ppl', userAnswer);
      updateProgressBar();
      checkStatus();
    }

    document.querySelectorAll('input[name="pplAnswer"]').forEach(option => option.checked = false);
  } else {
    alert('Veuillez sélectionner une réponse avant de la soumettre.');
  }
}

function clickUrban() {
  num += 1;
  startTime = new Date();
  showQuestion('urbanQuiz');
}

function checkUrbanAnswer() {
  flag = false;
  const selectedAnswer = document.querySelector('input[name="urbanAnswer"]:checked');

  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;

    if (userAnswer === 'urbanA') {
      if (effort >= 5) {
        effort -= 5;
        carbon -= 0.3;
        document.getElementById('urbanQuiz').style.display = 'none';
        document.getElementById('urban').style.display = 'none';
        document.getElementById('urbanA').style.display = 'block';
        flag = true;
      } else {
        document.getElementById('lose').style.display = 'block';
      }
    } else if (userAnswer === 'urbanB') {
      if (effort >= 8) {
        effort -= 8;
        carbon -= 1.5;
        document.getElementById('urbanQuiz').style.display = 'none';
        document.getElementById('urban').style.display = 'none';
        document.getElementById('urbanB').style.display = 'block';
        flag = true;
      } else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    } else if (userAnswer === 'urbanC') {
      if (effort >= 8) {
        effort -= 8;
        carbon -= 0.8;
        document.getElementById('urbanQuiz').style.display = 'none';
        document.getElementById('urban').style.display = 'none';
        document.getElementById('urbanC').style.display = 'block';
        flag = true;
      } else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    }

    if (flag) {
      addData(startTime, 'urban', userAnswer);
      updateProgressBar();
      checkStatus();
    }

    document.querySelectorAll('input[name="urbanAnswer"]').forEach(option => option.checked = false);
  } else {
    alert('Veuillez sélectionner une réponse avant de la soumettre.');
  }
}


function clickIndu() {
  num += 1;
  startTime = new Date();
  showQuestion('induQuiz');
}

function checkInduAnswer() {
  flag = false;
  const selectedAnswer = document.querySelector('input[name="induAnswer"]:checked');

  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;

    if (userAnswer === 'induA') {
      if (effort >= 5) {
        effort -= 5;
        carbon -= 2.4;
        document.getElementById('induQuiz').style.display = 'none';
        document.getElementById('indu').style.display = 'none';
        document.getElementById('induA').style.display = 'block';
        flag = true;
      } else {
        document.getElementById('lose').style.display = 'block';
      }
    } else if (userAnswer === 'induB') {
      if (effort >= 10) {
        effort -= 10;
        carbon -= 0;
        document.getElementById('induQuiz').style.display = 'none';
        document.getElementById('indu').style.display = 'none';
        document.getElementById('induB').style.display = 'block';
        flag = true;
      } else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    } else if (userAnswer === 'induC') {
      if (effort >= 10) {
        effort -= 10;
        carbon -= 5.6;
        document.getElementById('induQuiz').style.display = 'none';
        document.getElementById('indu').style.display = 'none';
        document.getElementById('induC').style.display = 'block';
        flag = true;
      } else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    }

    if (flag) {
      addData(startTime, 'indu', userAnswer);
      updateProgressBar();
      checkStatus();
    }

    document.querySelectorAll('input[name="induAnswer"]').forEach(option => option.checked = false);
  } else {
    alert('Veuillez sélectionner une réponse avant de la soumettre.');
  }
}


function clickDefo() {
  num += 1;
  startTime = new Date();
  showQuestion('defoQuiz');
}

function checkDefoAnswer() {
  flag = false;
  const selectedAnswer = document.querySelector('input[name="defoAnswer"]:checked');

  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;

    if (userAnswer === 'defoA') {
      if (effort >= 5) {
        effort -= 5;
        carbon -= 0.8;
        document.getElementById('defoQuiz').style.display = 'none';
        document.getElementById('defo').style.display = 'none';
        document.getElementById('defoA').style.display = 'block';
        flag = true;
      } else {
        document.getElementById('lose').style.display = 'block';
      }
    } else if (userAnswer === 'defoB') {
      if (effort >= 8) {
        effort -= 8;
        carbon -= 2.2;
        document.getElementById('defoQuiz').style.display = 'none';
        document.getElementById('defo').style.display = 'none';
        document.getElementById('defoB').style.display = 'block';
        flag = true;
      } else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    } else if (userAnswer === 'defoC') {
      if (effort >= 10) {
        effort -= 10;
        carbon -= 4.5;
        document.getElementById('defoQuiz').style.display = 'none';
        document.getElementById('defo').style.display = 'none';
        document.getElementById('defoC').style.display = 'block';
        flag = true;
      } else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    }

    if (flag) {
      addData(startTime, 'defo', userAnswer);
      updateProgressBar();
      checkStatus();
    }

    document.querySelectorAll('input[name="defoAnswer"]').forEach(option => option.checked = false);
  } else {
    alert('Veuillez sélectionner une réponse avant de la soumettre.');
  }
}

function clickAgri() {
  num += 1;
  startTime = new Date();
  showQuestion('agriQuiz');
}

function checkAgriAnswer() {
  flag = false;
  const selectedAnswer = document.querySelector('input[name="agriAnswer"]:checked');

  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;

    if (userAnswer === 'agriA') {
      if (effort >= 5) {
        effort -= 5;
        carbon -= 0.7;
        document.getElementById('agriQuiz').style.display = 'none';
        document.getElementById('agri').style.display = 'none';
        document.getElementById('agriA').style.display = 'block';
        flag = true;
      } else {
        document.getElementById('lose').style.display = 'block';
      }
    } else if (userAnswer === 'agriB') {
      if (effort >= 8) {
        effort -= 8;
        carbon -= 1.5;
        document.getElementById('agriQuiz').style.display = 'none';
        document.getElementById('agri').style.display = 'none';
        document.getElementById('agriB').style.display = 'block';
        flag = true;
      } else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    } else if (userAnswer === 'agriC') {
      if (effort >= 10) {
        effort -= 10;
        carbon -= 3.2;
        document.getElementById('agriQuiz').style.display = 'none';
        document.getElementById('agri').style.display = 'none';
        document.getElementById('agriC').style.display = 'block';
        flag = true;
      } else {
        alert('Vous n\'avez pas assez de points d\'effort pour cette option. Veuillez choisir une autre réponse.');
      }
    }

    if (flag) {
      addData(startTime, 'agri', userAnswer);
      updateProgressBar();
      checkStatus();
    }

    document.querySelectorAll('input[name="agriAnswer"]').forEach(option => option.checked = false);
  } else {
    alert('Veuillez sélectionner une réponse avant de la soumettre.');
  }
}