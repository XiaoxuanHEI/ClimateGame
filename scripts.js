let userName = "";
let startTime = "";
let endTime = "";
let timeDiff = "";
let gameData = [];

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
            // 将加载的 HTML 内容替换到页面中
            document.getElementById('container').innerHTML = htmlContent;
        })
        .catch(error => console.error('Error loading language file:', error));

}

function start() {
  // Get user's name
  userName = document.getElementById("nameInput").value;
  document.getElementById('intro').style.display = 'none';
  // document.getElementById('goal').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}



function updateProgressBar() {
  document.getElementById('effortNum').innerText = effort;
  document.getElementById('carbonNum').innerText = carbon.toFixed(1);

  document.getElementById('effortFiller').style.width = effort + '%' ;
  document.getElementById('carbonFiller').style.width = carbon/34.2 * 100 + '%' ;
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


function saveInteraction() {
  const interactionData = {
    userName: userName,
    gameData: gameData,
    effort: effort,
    CO2: carbon.toFixed(1)
  };

  // Convert interaction data to JSON string
  const interactionJson = JSON.stringify(interactionData, null, 2);

  // Create Blob object
  const blob = new Blob([interactionJson], { type: 'application/json' });

  // Create download link
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);

  // Set download file name
  downloadLink.download = `${userName}_interaction.json`;

  // Append download link to the body and simulate click
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // Remove download link
  document.body.removeChild(downloadLink);

  if (carbon <= 0) {
    document.getElementById('win').style.display = 'none';
  } else if (num>= 12) {
    document.getElementById('end').style.display = 'none';
  } else {
    document.getElementById('lose').style.display = 'none';
  }
}


function addData(startTime, question, choice, num) {
  endTime = new Date();
  timeDiff = endTime - startTime;
  answer = {
    no: num,
    question: question,
    choice: choice,
    startTime: startTime.toLocaleString(),
    endTime: endTime.toLocaleString(),
    timeDiff: timeDiff,
  };
  gameData.push(answer);
}


function clickCoal() {
  num += 1;
  startTime = new Date();
  document.getElementById('coalQuiz').style.display = 'block';
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
        alert('You don’t have enough effort points for this option. Please choose another answer.');
      }
    } else if (userAnswer === 'coalC') {
      if (effort >= 8) {
        effort -= 8;
        carbon += 0.1;
        document.getElementById('coalQuiz').style.display = 'none';
        document.getElementById('coal').style.display = 'none';
        flag = true;
      } else {
        alert('You don’t have enough effort points for this option. Please choose another answer.');
      }
    }

    if (flag) {
      addData(startTime, 'coal', userAnswer);
      updateProgressBar();
      checkStatus();
    }

    // 重置选项按钮
    document.querySelectorAll('input[name="coalAnswer"]').forEach(option => option.checked = false);
  } else {
      alert('Please select an answer before submitting.');
  } 
}

function clickCar() {
  num += 1;
  startTime = new Date();
  document.getElementById('carQuiz').style.display = 'block';
}

function checkCarAnswer() {
  flag = false;
  const selectedAnswer = document.querySelector('input[name="carAnswer"]:checked');

  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;

    // 根据用户答案更新分数
    if (userAnswer === 'carA') {
      if (effort >= 5) {
        effort -= 5;
        carbon -= 1.8;
        document.getElementById('carQuiz').style.display = 'none';
        document.getElementById('car').style.display = 'none';
        document.getElementById('carA').style.display = 'block';
        flag = true;
      } else {
        alert('You don’t have enough effort points for this option. Please choose another answer.');
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
        alert('You don’t have enough effort points for this option. Please choose another answer.');
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
        alert('You don’t have enough effort points for this option. Please choose another answer.');
      }
    }

    if (flag) {
      addData(startTime, 'car', userAnswer);
      updateProgressBar();
      checkStatus();
    }

    // 重置选项按钮
    document.querySelectorAll('input[name="carAnswer"]').forEach(option => option.checked = false);
  } else {
    alert('Please select an answer before submitting.');
  }
}


function clickBuild() {
  num += 1;
  startTime = new Date();
  document.getElementById('buildQuiz').style.display = 'block';
}
 
function checkBuildAnswer() {
  flag = false;
  const selectedAnswer = document.querySelector('input[name="buildAnswer"]:checked');

  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;

    // 根据用户答案更新分数
    if (userAnswer === 'buildA') {
      if (effort >= 3) {
        effort -= 3;
        carbon -= 0.6;
        document.getElementById('buildQuiz').style.display = 'none';
        document.getElementById('build').style.display = 'none';
        document.getElementById('buildA').style.display = 'block';
        flag = true;
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
    } else if (userAnswer === 'buildC') {
      if (effort >= 8) {
        effort -= 8;
        carbon -= 1.7;
        document.getElementById('buildQuiz').style.display = 'none';
        document.getElementById('build').style.display = 'none';
        document.getElementById('buildC').style.display = 'block';
        flag = true;
      }
    }

    if (flag) {
      addData(startTime, 'build', userAnswer);
      updateProgressBar();
      checkStatus();
    }

    // 重置选项按钮
    document.querySelectorAll('input[name="buildAnswer"]').forEach(option => option.checked = false);
  } else {
      alert('Please select an answer before submitting.');
  }
}


function clickRecy() {
  num += 1;
  startTime = new Date();
  document.getElementById('recyQuiz').style.display = 'block';
}
 
function checkRecyAnswer() {
  flag = false;
  const selectedAnswer = document.querySelector('input[name="recyAnswer"]:checked');

  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;

    // 根据用户答案更新分数
    if (userAnswer === 'recyA') {
    if (effort >= 1) {
      effort -= 1;
      carbon -= 0;
      document.getElementById('recyQuiz').style.display = 'none';
      document.getElementById('recy').style.display = 'none';
      document.getElementById('recyA').style.display = 'block';
      flag = true;
    } else {
      alert('You don’t have enough effort points for this option. Please choose another answer.');
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
      alert('You don’t have enough effort points for this option. Please choose another answer.');
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
      alert('You don’t have enough effort points for this option. Please choose another answer.');
    }
    }

    if (flag) {
      addData(startTime, 'recy', userAnswer);
      updateProgressBar();
      checkStatus();
    }

    // 重置选项按钮
    document.querySelectorAll('input[name="recyAnswer"]').forEach(option => option.checked = false);
  } else {
      alert('Please select an answer before submitting.');
  }
}



function clickElec() {
  num += 1;
  startTime = new Date();
  document.getElementById('elecQuiz').style.display = 'block';
}
 
function checkElecAnswer() {
  flag = false;
  const selectedAnswer = document.querySelector('input[name="elecAnswer"]:checked');

  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;

    // 根据用户答案更新分数
    if (userAnswer === 'elecA') {
      if (effort >= 5) {
        effort -= 5;
        carbon -= 0;
        document.getElementById('elecQuiz').style.display = 'none';
        document.getElementById('elec').style.display = 'none';
        document.getElementById('elecA').style.display = 'block';
        flag = true;
      } else {
        alert('You don’t have enough effort points for this option. Please choose another answer.');
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
        alert('You don’t have enough effort points for this option. Please choose another answer.');
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
        alert('You don’t have enough effort points for this option. Please choose another answer.');
      }
    }

    if(flag) {
      addData(startTime, 'elec', userAnswer);
      updateProgressBar();
      checkStatus();
    }

    // 重置选项按钮
    document.querySelectorAll('input[name="elecAnswer"]').forEach(option => option.checked = false);
  } else {
      alert('Please select an answer before submitting.');
  }
}

function clickPlane() {
  num += 1;
  startTime = new Date();
  document.getElementById('planeQuiz').style.display = 'block';
}
 
function checkPlaneAnswer() {
  flag = false;
  const selectedAnswer = document.querySelector('input[name="planeAnswer"]:checked');

  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;

    // 根据用户答案更新分数
    if (userAnswer === 'planeA') {
      if (effort >= 5) {
        effort -= 5;
        carbon -= 0.4;
        document.getElementById('planeQuiz').style.display = 'none';
        document.getElementById('plane').style.display = 'none';
        document.getElementById('planeA').style.display = 'block';
        flag = true;
      } else {
        alert('You don’t have enough effort points for this option. Please choose another answer.');
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
        alert('You don’t have enough effort points for this option. Please choose another answer.');
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
        alert('You don’t have enough effort points for this option. Please choose another answer.');
      }
    }

    if(flag) {
      addData(startTime, 'plane', userAnswer);
      updateProgressBar();
      checkStatus();
    }

    // 重置选项按钮
    document.querySelectorAll('input[name="planeAnswer"]').forEach(option => option.checked = false);
  } else {
      alert('Please select an answer before submitting.');
  }
}

function clickOcean() {
  num += 1;
  startTime = new Date();
  document.getElementById('oceanQuiz').style.display = 'block';
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
        alert('You don’t have enough effort points for this option. Please choose another answer.');
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
        alert('You don’t have enough effort points for this option. Please choose another answer.');
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
        alert('You don’t have enough effort points for this option. Please choose another answer.');
      }
    }

    if(flag) {
      addData(startTime, 'ocean', userAnswer);
      updateProgressBar();
      checkStatus();
    }

    // 重置选项按钮
    document.querySelectorAll('input[name="oceanAnswer"]').forEach(option => option.checked = false);
  } else {
      alert('Please select an answer before submitting.');
  }
}

function clickPpl() {
  num += 1;
  startTime = new Date();
  document.getElementById('pplQuiz').style.display = 'block';
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
        alert('You don’t have enough effort points for this option. Please choose another answer.');
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
        alert('You don’t have enough effort points for this option. Please choose another answer.');
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
        alert('You don’t have enough effort points for this option. Please choose another answer.');
      }
    }

    if (flag) {
      addData(startTime, 'ppl', userAnswer);
      updateProgressBar();
      checkStatus();
    }
    // 重置选项按钮
    document.querySelectorAll('input[name="pplAnswer"]').forEach(option => option.checked = false);
  } else {
      alert('Please select an answer before submitting.');
  }
}

function clickUrban() {
  num += 1;
  startTime = new Date();
  document.getElementById('urbanQuiz').style.display = 'block';
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
        alert('You don’t have enough effort points for this option. Please choose another answer.');
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
        alert('You don’t have enough effort points for this option. Please choose another answer.');
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
        alert('You don’t have enough effort points for this option. Please choose another answer.');
      }
    }

    if (flag) {
      addData(startTime, 'urban', userAnswer);
      updateProgressBar();
      checkStatus();
    }

    // 重置选项按钮
    document.querySelectorAll('input[name="urbanAnswer"]').forEach(option => option.checked = false);
  } else {
      alert('Please select an answer before submitting.');
  }
}


function clickIndu() {
  num += 1;
  startTime = new Date();
  document.getElementById('induQuiz').style.display = 'block';
}
 
function checkInduAnswer() {
  flag = false;
  const selectedAnswer = document.querySelector('input[name="induAnswer"]:checked');

  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;

    // 根据用户答案更新分数
    if (userAnswer === 'induA') {
      if (effort >= 5) {
        effort -= 5;
        carbon -= 2.4;
        document.getElementById('induQuiz').style.display = 'none';
        document.getElementById('indu').style.display = 'none';
        document.getElementById('induA').style.display = 'block';
        flag = true;
      } else {
        alert('You don’t have enough effort points for this option. Please choose another answer.');
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
        alert('You don’t have enough effort points for this option. Please choose another answer.');
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
        alert('You don’t have enough effort points for this option. Please choose another answer.');
      }
    }

    if (flag) {
      addData(startTime, 'indu', userAnswer);
      updateProgressBar();
      checkStatus();
    }

    // 重置选项按钮
    document.querySelectorAll('input[name="induAnswer"]').forEach(option => option.checked = false);
  } else {
      alert('Please select an answer before submitting.');
  }
}


function clickDefo() {
  num += 1;
  startTime = new Date();
  document.getElementById('defoQuiz').style.display = 'block';
}
 
function checkDefoAnswer() {
  flag = false;
  const selectedAnswer = document.querySelector('input[name="defoAnswer"]:checked');

  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;

    // 根据用户答案更新分数
    if (userAnswer === 'defoA') {
      if (effort >= 5) {
        effort -= 5;
        carbon -= 0.8;
        document.getElementById('defoQuiz').style.display = 'none';
        document.getElementById('defo').style.display = 'none';
        document.getElementById('defoA').style.display = 'block';
        flag = true;
      } else {
        alert('You don’t have enough effort points for this option. Please choose another answer.');
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
        alert('You don’t have enough effort points for this option. Please choose another answer.');
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
        alert('You don’t have enough effort points for this option. Please choose another answer.');
      }
    }

    if (flag) {
      addData(startTime, 'defo', userAnswer);
      updateProgressBar();
      checkStatus();
    }

    // 重置选项按钮
    document.querySelectorAll('input[name="defoAnswer"]').forEach(option => option.checked = false);
  } else {
      alert('Please select an answer before submitting.');
  }
}

function clickAgri() {
  num += 1;
  startTime = new Date();
  document.getElementById('agriQuiz').style.display = 'block';
}
 
function checkAgriAnswer() {
  flag = false;
  const selectedAnswer = document.querySelector('input[name="agriAnswer"]:checked');

  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;

    // 根据用户答案更新分数
    if (userAnswer === 'agriA') {
      if (effort >= 5) {
        effort -= 5;
        carbon -= 0.7;
        document.getElementById('agriQuiz').style.display = 'none';
        document.getElementById('agri').style.display = 'none';
        document.getElementById('agriA').style.display = 'block';
        flag = true;
      } else {
        alert('You don’t have enough effort points for this option. Please choose another answer.');
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
        alert('You don’t have enough effort points for this option. Please choose another answer.');
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
        alert('You don’t have enough effort points for this option. Please choose another answer.');
      }
    }

    if  (flag) {
      addData(startTime, 'agri', userAnswer);
      updateProgressBar();
      checkStatus();      
    }


    // 重置选项按钮
    document.querySelectorAll('input[name="agriAnswer"]').forEach(option => option.checked = false);
  } else {
      alert('Please select an answer before submitting.');
  }
}