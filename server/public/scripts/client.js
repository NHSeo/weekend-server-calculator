console.log('client.js is sourced!');

document.addEventListener('DOMContentLoaded', function() {
    const calculatorForm = document.querySelector('[data-testid="calculator"]');
    const resultHistorySection = document.querySelector('[data-testid="resultHistory"]');
    const recentResultSection = document.querySelector('[data-testid="recentResult"]');
    let selectedOperator = null;
  
    function rendCalc(calculations) {
      resultHistorySection.innerHTML = '';
      for (const calc of calculations) {
        const calcText = `${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}`;
        resultHistorySection.innerHTML += `<p>${calcText}</p>`;
      }
    }

    function renderRecentResult(result) {
        recentResultSection.innerHTML = `<h2>${result}</h2>`;
      }
  
    function getCalc() {
      axios.get('/calculations')
        .then(response => {
          rendCalc(response.data);
          if (response.data.length > 0) {
            renderRecentResult(response.data[response.data.length - 1].result);
          }
        })
        .catch(error => {
          console.error('Error getCalc:', error);
        });
    }
  
    function isNumber(value) {
      return value.trim() !== '' && !isNaN(value - 0);
    }
  
    calculatorForm.addEventListener('click', function(event) {
      const target = event.target;
      if (target.tagName !== 'BUTTON') {
        return;
      }
      event.preventDefault();
  
      const numOneInput = document.querySelector('[data-testid="numOne"]');
      const numTwoInput = document.querySelector('[data-testid="numTwo"]');
      const numOneValue = numOneInput.value;
      const numTwoValue = numTwoInput.value;
      const operator = target.textContent;
  
      if (operator === 'C') {
        numOneInput.value = '';
        numTwoInput.value = '';
        selectedOperator = null;
        return;
      }
  
      if (operator === '=') {
        if (!isNumber(numOneValue) || !isNumber(numTwoValue) || !selectedOperator) {
          alert('Please enter valid numbers.');
          return;
        }
  
        const numOne = numOneValue - 0;
        const numTwo = numTwoValue - 0;
  
        axios.post('/calculations', { numOne, numTwo, operator: selectedOperator })
          .then(response => {
            renderRecentResult(response.data.result);
            getCalc();
          })
          .catch(error => {
            console.error('Error POST calc:', error);
          });
  
        return;
      }
  
      selectedOperator = operator;
    });
  
    getCalc();
  });
  