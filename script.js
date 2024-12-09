class CalculadoraHorista {
  constructor(valorHora, horasMensais, numeroFilhos) {
    this.valorHora = valorHora;
    this.horasMensais = horasMensais;
    this.numeroFilhos = numeroFilhos;
  }

  calcularSalarioBruto() {
    return this.valorHora * this.horasMensais;
  }

  calcularSalarioFamilia(salarioBruto) {
    let salarioFamilia = 0;

    if (salarioBruto <= 788) {
      salarioFamilia = 30.50 * this.numeroFilhos;
    } else if (salarioBruto > 788 && salarioBruto <= 1100) {
      salarioFamilia = 18.50 * this.numeroFilhos;
    } else if (salarioBruto > 1100) {
      salarioFamilia = 11.90 * this.numeroFilhos;
    }

    return salarioFamilia;
  }

  calcularSalarioTotal() {
    const salarioBruto = this.calcularSalarioBruto();
    const salarioFamilia = this.calcularSalarioFamilia(salarioBruto);

    return salarioBruto + salarioFamilia;
  }
}

const configuracao = {
  limites: {
    horasMensais: 220,
    filhos: 10,
    valorHora: 100.00
  }
}

const salarioInput = document.getElementById('salario')
const capturarButton = document.getElementById('capturar')
const inputHoras = document.getElementById('horas')
const inputFilhos = document.getElementById('filhos')
const errorMessage = document.getElementById('error-message1')

salarioInput.addEventListener('input', (event) => {
  let value = event.target.value

  value = value.replace(/\D/g, '')

  value = (value / 100).toFixed(2).replace('.', ',')

  value = 'R$ ' + value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  event.target.value = value
})

inputHoras.addEventListener('input', () => {
  if (inputHoras.value > configuracao.limites.horasMensais) {
    errorMessage.classList.remove('hidden')
    errorMessage.textContent = `Limite de horas (${configuracao.limites.horasMensais}h) excedido!`
    inputHoras.value = ""
    return
  }

  if (inputHoras.value < 0) {
    errorMessage.classList.remove('hidden')
    errorMessage.textContent = "Por favor, insira um número positivo."
    inputHoras.value = ""
    return
  }

  errorMessage.textContent = ""   
  errorMessage.classList.add('hidden')   
})

inputFilhos.addEventListener('input', () => {
  if (inputFilhos.value > configuracao.limites.filhos) {
    errorMessage.classList.remove('hidden')
    errorMessage.textContent = `Limite de filhos (${configuracao.limites.filhos}) excedido!`
    inputFilhos.value = ""
    return
  }

  if (inputFilhos.value < 0) {
    errorMessage.classList.remove('hidden')
    errorMessage.textContent = "Por favor, insira um número positivo."
    inputFilhos.value = ""
    return
  }

  errorMessage.textContent = ""
  errorMessage.classList.add('hidden')
})

capturarButton.addEventListener('click', () => {
  const resultado = document.getElementById(`resultado1`)

  const valorFormatado = salarioInput.value.trim()
  const valorHora = parseFloat(
    valorFormatado.replace('R$ ', '').replace(/\./g, '').replace(',', '.')
  )

  if (valorHora > configuracao.limites.valorHora) {
    errorMessage.classList.remove('hidden')
    errorMessage.textContent = `Valor por hora excede o limite permitido (R$ ${configuracao.limites.valorHora.toFixed(2).replace('.', ',')})!`
    salarioInput.focus()
    return
  }

  const horasMensais = parseInt(inputHoras.value.trim(), 10)
  const numeroFilhos = parseInt(inputFilhos.value.trim(), 10)

  console.log(valorHora  ,horasMensais ,numeroFilhos)

  if (isNaN(valorHora) || isNaN(horasMensais) || isNaN(numeroFilhos)) {
    errorMessage.classList.remove('hidden')
    errorMessage.textContent = `Preencha todas as informações`
    return
  }

  const calculadora = new CalculadoraHorista(valorHora, horasMensais, numeroFilhos);

  const salarioBruto = calculadora.calcularSalarioBruto()
  const salarioFamilia = calculadora.calcularSalarioFamilia(salarioBruto)
  const salarioTotal = calculadora.calcularSalarioTotal()

  resultado.innerHTML = `
    <strong>Salário Bruto:</strong> R$ ${salarioBruto.toFixed(2)}<br>
    <strong>Salário Família:</strong> R$ ${salarioFamilia.toFixed(2)}<br>
    <strong>Salário Total:</strong> R$ ${salarioTotal.toFixed(2)}
  `
  
  errorMessage.textContent = ''
  errorMessage.classList.add('hidden')
})
















const btnCalcular = document.getElementById('calcular');
const inputQuantidade = document.getElementById('quantidade');
const inputSequencia = document.getElementById('sequencia');
const resultadoDiv = document.getElementById(`resultado2`);
const errorMessage2 = document.getElementById('error-message2')

btnCalcular.addEventListener('click', () => {

  const quantidade = parseInt(inputQuantidade.value.trim(), 10);
  const sequencia = inputSequencia.value.trim();

  if (!quantidade || isNaN(quantidade) || quantidade <= 0) {
    errorMessage2.textContent = 'Por favor, insira uma quantidade válida maior que 0.'
    errorMessage2.classList.remove('hidden')
    return;
  }

  if (!sequencia) {
    errorMessage2.textContent = 'Por favor, insira uma sequência de números.'
    errorMessage2.classList.remove('hidden')
    return;
  }

  const numeros = sequencia.split(',').map(num => parseFloat(num.trim()));

  if (numeros.length !== quantidade) {
    errorMessage2.textContent = 'A quantidade de números não corresponde à sequência informada.'
    errorMessage2.classList.remove('hidden')
    return;
  }

  if (numeros.some(num => isNaN(num))) {
    errorMessage2.textContent = 'Por favor, insira apenas números na sequência.'
    errorMessage2.classList.remove('hidden')
    return;
  }

  const menor = Math.min(...numeros);
  const maior = Math.max(...numeros);

  resultadoDiv.innerHTML = `
    <p><strong>Sequência informada:</strong> ${numeros.join(', ')}</p>
    <p><strong>Menor número:</strong> ${menor}</p>
    <p><strong>Maior número:</strong> ${maior}</p>
  `;

  errorMessage2.textContent = ''
  errorMessage2.classList.add('hidden')
});      














const btnGerar = document.getElementById('gerar')

btnGerar.addEventListener('click', () => {
  calcularFibonacci()
})


function gerarFibonacci(N) {
  if (N <= 0) {
    return [];
  }

  let fibonacci = [1]; 
  if (N === 1) return fibonacci;

  fibonacci.push(1);

  for (let i = 2; i < N; i++) {
    let next = fibonacci[i - 1] + fibonacci[i - 2];
    fibonacci.push(next);
  }

  return fibonacci;
}

function verificaFibonacci(N, fibonacci) {
  return fibonacci.includes(N);
}

function calcularFibonacci() {
  const nInput = document.getElementById('n');
  const resultado3 = document.getElementById('resultado3');
  const errorMessage3 = document.getElementById('error-message3');

  const N = parseInt(nInput.value, 10);

  if (!N || isNaN(N) || N <= 0) {
    errorMessage3.textContent = 'Por favor, insira um número válido maior que 0.';
    resultado3.innerHTML = '';
    return;
  }

  const fibonacci = gerarFibonacci(N);

  const pertence = verificaFibonacci(N, fibonacci);

  errorMessage3.textContent = '';
  resultado3.innerHTML = `
    <p><strong>Os ${N} primeiros números da sequência de Fibonacci são:</strong> ${fibonacci.join(', ')}</p>
    <p><strong>${N} ${pertence ? 'pertence' : 'não pertence'} à sequência de Fibonacci.</strong></p>
  `
}


