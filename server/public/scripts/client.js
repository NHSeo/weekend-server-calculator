console.log('client.js is sourced!');

document.addEventListener('DOMContentLoaded', function() {
    const resultHistorySection = document.querySelector('[data-testid="resultHistory"]');
  
    function rendCalc(calculations) {
      resultHistorySection.innerHTML = '';
      for (const calc of calculations) {
        const calcText = `${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}`;
        resultHistorySection.innerHTML += `<p>${calcText}</p>`;
      }
    }
  
    function getCalc() {
      axios.get('/calculations')
        .then(response => {
          rendCalc(response.data);
        })
        .catch(error => {
          console.error('Error fetching calculations:', error);
        });
    }
  
    getCalc();
  });
  