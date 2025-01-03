async function typeWriter(elemento, hide, callback) {
   elemento.hidden = false;
   const textoArray = elemento.innerHTML.split('');
   elemento.innerHTML = '';
   
   textoArray.forEach((letra, i) => {
      setTimeout(() => elemento.innerHTML += letra, 75 * i);
   });

   const tempoTotal = 75 * textoArray.length + 2500;
   
   setTimeout(() => {
      elemento.hidden = hide;
      if (callback) callback();
   }, tempoTotal);
}

const partes = [
   { elemento: document.querySelector('#parte-1'), hide: true },
   { elemento: document.querySelector('#parte-2'), hide: true },
   { elemento: document.querySelector('#parte-3'), hide: true },
   { elemento: document.querySelector('#parte-4'), hide: true },
   { elemento: document.querySelector('#parte-5'), hide: false }
];

function executarSequencia(index = 0) {
   if (index < partes.length) {
      const { elemento, hide } = partes[index];
      typeWriter(elemento, hide, () => executarSequencia(index + 1));
   }
}

function changeBgImageAndDisableEvents(element, url) {
   element.style.backgroundImage = url;
   element.style.cursor = 'default';
   element.style.pointerEvents = 'none';
}

function hideInitialMessage() {
   const intialMessage = document.querySelector('.star-wars-font');
   intialMessage.style.opacity = 0;
   intialMessage.style.height = 0;
}

function hideElement(element) {
   if(!element) {
      return;
   } 
   element.style.opacity = 0;
   element.hidden = true;
}

function showElement(element) {
   if(!element) {
      return;
   }
   element.style.opacity = 1; 
   element.hidden = false;
}

function passPage() {}
function returnPage() {}

executarSequencia();

const noButton = document.querySelector('.palpatine');
const simButton = document.querySelector('.yoda');

const nextButton = document.querySelector('.next-button');
const previousButton = document.querySelector('.previous-button');

const closeButton = document.querySelector('.close');
const letterModal = document.querySelector('.letter-modal');

const noModal = document.querySelector('.no-dialog');

const pageContainer = document.getElementById('letter-content');
const paginacao = document.querySelector('.paginacao');

// ativa a modal de negação e executa os processos para recusar a carta
noButton.onclick = function () {
   noModal.style.opacity = 1;
   noModal.showModal();

   setTimeout(() => {
      const noMessage = document.querySelector('.no-message');
      
      noModal.close();
      noModal.style.opacity = 0;
      hideElement(simButton)
      hideInitialMessage();
      changeBgImageAndDisableEvents(noButton, 'url(../assets/icons/palpatine.png)')
      typeWriter(noMessage, false);
   }, 5000);
}

//adiciona eventos para capturar entrada e saida do mouse dos botões de negar e aceitar ler a carta, altera a imagem dos botões

noButton.addEventListener('mouseover', function () {
   if (simButton.hidden) {
      return;
   }
   simButton.style.backgroundImage = 'url(../assets/icons/baby-yoda-nao-sorreiando.png)';
   noButton.style.backgroundImage = 'url(../assets/icons/palpatine.png)';
});

noButton.addEventListener('mouseout', function () {
   if (simButton.hidden) {
      noButton.style.backgroundImage = 'url(../assets/icons/palpatine.png)';
      return;
   }
   simButton.style.backgroundImage = 'url(../assets/icons/baby-yoda-neutro.png)';
   noButton.style.backgroundImage = 'url(../assets/icons/palpatine-neutro.png)';
});

simButton.addEventListener('mouseover', function () {
   if (noButton.hidden) {
      simButton.style.backgroundImage = 'url(../assets/icons/baby-yoda-sorreiando.png)';
      return;
   }
   simButton.style.backgroundImage = 'url(../assets/icons/baby-yoda-sorreiando.png)';
   noButton.style.backgroundImage = 'url(../assets/icons/palpatine-puto.png)';
});

simButton.addEventListener('mouseout', function () {
   if (noButton.hidden) {
      return;
   }
   simButton.style.backgroundImage = 'url(../assets/icons/baby-yoda-neutro.png)';
   noButton.style.backgroundImage = 'url(../assets/icons/palpatine-neutro.png)';
});

const paginas = [
   'legenda (Texto) - Anotações do Jeff do futuro, não estão na carta de papel.<br><br>oi Amanda, tudo certo?<br><br>Parabéns por ter passado no semestre da faculdade(sei que passou porque é inteligente), feliz aniversáro atrasado, feliz natal e ano novo adiantado ou atrasado não sei quando vou "enviar" esta carta.(no fim foi atrasado)<br><br>Espero que você e a Babidi estejam bem!!<br><br>Acabei de terminar de ler As vantegens de Ser invísivel talvez seja por isso que estou escrevendo essa carta a ideia da história ser contada por cartas é muito boa, gostei bastante do livro, agora to lendo A Hora da Estrela da Clarice, to gostando. Ainda fumo cigarros, mas, to tentando parar é mais díficil do que pensei que seria, maconha ainda fumo mas não tanto.',
   'continuo na start-up onde consegui meu primeiro emprego, estão fechando 4 ou 5 cliente por mês, as vezes mais o que é bom, um bom número porque o ticket médio por cliente é alto. isso faz com que eu queira continuar lá, caso eles cresçam vou crescer junto. Me elogiaram o que me deixou mais feliz do que eu pensei que ficaria ainda não sou clt, mas a previsão é que até em 3 meses do ano que vem(esse ano já) todos os funcionários sejam.<br><br>voltei pra faculdade... deveria ter feito isso antes tu me avisou, mas não vou sair dessa vez. Depois desse primeiro semestre posso dizer, izi achei fácil.<br><br> Sai da uJC e dei um tempo das batalhas, mas não desisti da música.<br>Tenho tanta coisa pra te falar, mas ja ta gigante essa carta(nem ficou tao grande na web), vou parar de enrolar e te falar o que realmente quero.<br>',
   'Amanda, sinto sua falta, muito, muito mesmo. Notei que quero tua amizade e companhia de volta antes e acima de qualquer coisa.<br><br>Podemos voltar a ser amigos?<br><br>Ass: Jeff, Moustachi :)<br><p class="date">seg, 9 dez 2024 05:09</p>',
];

let currentPage = 0;

function atualizarPagina() {
   pageContainer.innerHTML = paginas[currentPage];
   previousButton.setAttribute("disabled", currentPage === 0 ? "disabled" : null);
   nextButton.setAttribute("disabled", currentPage === paginas.length - 1 ? "disabled" : null);
   paginacao.innerHTML = `${currentPage + 1}/${paginas.length}`;
 }

 // Evento para o botão "Anterior"
 previousButton.addEventListener("click", () => {
   if (currentPage > 0) {
      currentPage--;
      atualizarPagina();
   }
 });

 nextButton.addEventListener("click", () => {
   if (currentPage < paginas.length - 1) {
      currentPage++;
      atualizarPagina();
    }
 });

// abre a modal da carta ao clicar no botão de sim
simButton.onclick = function() {
   atualizarPagina();
   letterModal.style.opacity = 1;
   letterModal.showModal();
}

// ao clicar no botão de fechar a modal da carta ativa essa função que esconde o botão de negar e esconde a mensagem inicial e ao fim da função escreve uma mensagem final
closeButton.onclick = function() {
   const yesMessage = document.querySelector('.yes-message');

   letterModal.style.opacity = 0;
   letterModal.close();
   hideElement(noButton);
   hideInitialMessage();
   changeBgImageAndDisableEvents(simButton, 'url(../assets/icons/baby-yoda-sorreiando.png)')
   typeWriter(yesMessage, false);
}


