

window.onload=()=>{
const expressionElement = document.getElementById('expression');
const resultElement = document.getElementById('result');
let expression = '';
let result = '';

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'Ac') {
            expression = '';
            result = '';
            resultElement.classList.remove('visible');
        } else if (value === '+/-') {
            if (result) {
                result = (-parseFloat(result)).toString();
                resultElement.textContent = `=${result}`;
            } else if (expression) {

                let match = expression.match(/(\d+\.?\d*)$/);
                if (match) {
                    let number = match[0];
                    let negatedNumber = (-parseFloat(number)).toString();
                    expression = expression.slice(0, -number.length) + negatedNumber;
                    expressionElement.textContent = expression;
                }
            }
        } else if (value === '%') {
            if (result) {
                result = (parseFloat(result) / 100).toString();
                resultElement.textContent = `=${result}`;
            } else if (expression) {
                let match = expression.match(/(\d+\.?\d*)$/);
                if (match) {
                    let number = match[0];
                    let percentageNumber = (parseFloat(number) / 100).toString();
                    expression = expression.slice(0, -number.length) + percentageNumber;
                    expressionElement.textContent = expression;
                }
            }
        } else if (value === '=') {
            try {
                result = eval(expression.replace('x', '*'));
                resultElement.scrollLeft = resultElement.scrollWidth; // Scroll to the end of result
                resultElement.classList.add('visible');
            } catch {
                result = 'Error';
                resultElement.classList.add('visible');
            }
        } else {
            if (result) {
                expression = result;
                result = '';
                resultElement.classList.remove('visible');
           }           
if (/[\+\-\x\/]$/.test(expression) && /[\+\-\x\/]/.test(value)) { expression = expression.slice(0, -1) + value; } 
else { expression += value; } }
        expressionElement.textContent = expression;
        resultElement.textContent = result ? `=${result}` : '';

    
        expressionElement.scrollLeft = expressionElement.scrollWidth;
    });
});
}
