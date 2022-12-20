/*
#Consegna
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
# MILESTONE 1
Prepariamo "qualcosa" per tenere il punteggio dell'utente.
Quando l'utente clicca su una cella, incrementiamo il punteggio.
Se riusciamo, facciamo anche in modo da non poter più cliccare la stessa cella.
# MILESTONE 2
Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
Generiamoli e stampiamo in console per essere certi che siano corretti
# MILESTONE 3
Quando l'utente clicca su una cella, verifichiamo se ha calpestato una bomba, controllando se il numero di cella è presente nell'array di bombe. Se si, la cella diventa rossa (raccogliamo il punteggio e e scriviamo in console che la partita termina) altrimenti diventa azzurra e dobbiamo incrementare il punteggio.
# MILESTONE 4
Quando l'utente clicca su una cella, e questa non è una bomba, dobbiamo controllare se il punteggio incrementato ha raggiunto il punteggio massimo perchè in quel caso la partita termina. Raccogliamo quindi il messaggio è scriviamo un messaggio appropriato.
(Ma come stabiliamo quale sia il punteggio massimo?)
# MILESTONE 5
Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o se perchè l'utente ha raggiunto il punteggio massimo. Dobbiamo poi stampare in pagina il punteggio raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.
#BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
#SUPER BONUS
Se avete finito tutti i bonus potete scrivere all'insegnante o ai tutor per ricevere delle sfide extra!
*/

// # FUNZIONI ------------------------
// creare una singola cella
function createCell(content) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.append(content)
    return cell;
}

// creare numero random unico per le bombe
function getUniqueRandomNumber (min = 1, max = 100, blackList){
    let randomNumber;
    
    do { 
        randomNumber = Math.floor(Math.random() * (max + 1 - min)) + min;
    } while (blackList.includes(randomNumber));

    return randomNumber;
}

// creare 16 bombe univoche
function createBombs() {
    const bombs = [];

    for (let i = 1; i <= 16; i++){
        bombs.push(getUniqueRandomNumber(1, 100, bombs))
    }

    return bombs;
}

// # FASE PRELIMINARE ------------------------
// recupero elementi dal DOM
const button = document.getElementById('play');
const grid = document.getElementById('grid');
const titleElement = document.getElementById('starting-title');

// valori iniziali
const rows = 10;
const cols = 10;
const totalCells = rows * cols;

let isGameOver = false;

// # AVVIO LOGICA
// al click del bottone play
button.addEventListener('click', function(event){
    // pulisco griglia
    grid.innerHTML='';

    // cambio testo al button
    event.target.innerText = 'Restart';

    isGameOver = false;

    // preparo contatore punteggio
    let score = 0;

    // creo array di bombe
    const bombs = createBombs()
    console.log(bombs);
    
    // per il totale delle celle...
    for (let i = 1; i <= totalCells; i++){
        // creo tot celle
        const cell = createCell(i);

        // al click della cella...
        cell.addEventListener('click', function(){
            // controllo se la cella contiene la classe clicked
            if (cell.classList.contains('clicked') || isGameOver){
                return;
            }
            
            // aggiungo la classe clicked
            cell.classList.add('clicked');

            // se il numero è contenuto nell'array bombe viene colorato di rosso e la partita termina
            if (bombs.includes(parseInt(cell.innerText))){
                cell.classList.add('bomb');
                console.log(`Hai perso, il tuo punteggio è ${score}`);
                isGameOver = true;
            } else {
                // altrimenti il punteggio viene incrementato
                score++;
                console.log(score);

                // se raggiunto il massimo, la partita termina
                if (score === totalCells - bombs.length){
                    console.log(`Congratulazioni, hai totalizzato il massimo`);
                }   
            }
        });
        // inserisco in griglia
        grid.appendChild(cell);

        
    }

});