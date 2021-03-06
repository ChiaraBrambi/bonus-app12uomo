// //impostazioni riconoscimento vocale
// let lang = 'it-IT';
// let speechRec = new p5.SpeechRec(lang, gotSpeech);
// //colori contenitori parole
// let textColorS = '#877B85';
// let textColorD = '#877B85';
// let textColorC = '#877B85';
// let bButtonColorS = '#F9F9F9';
// let bButtonColorD = '#F9F9F9';
// let bButtonColorC = '#F9F9F9';

//icone
let baloonIcon, baloon_Puntini,noParola , logor, freccia;
let xBarra = 20; //lunghezza barra %
let w, h; //posizione
let s = 0; //ellisse BONUS
let palette = ['#F9F9F9', '#D5D0D3', '#B7AEB5', '#877B85'];
let i = 0; //contatore che regola ritmo
let i_ritardo;
let p_coord = 0; //var coordinazione

let input_utente = 0; //var utente che parla
let opacità = 210 //opacità rettangolo tutorial
let pronto //coordinzaione tutorial
let p = 0; //contatore parole

// var myRec = new p5.SpeechRec('en-US', parseResult); // new P5.SpeechRec object
// 	myRec.continuous = true; // do continuous recognition
// 	myRec.interimResults = true; // allow partial recognition (faster, less accurate)
/////////////////////////////////////////////////////////////////////////

function preload() {
  baloonIcon = loadImage("./assets/barretteParola.gif"); //nuvoletta attiva
  baloon_Puntini = loadImage("./assets/scuro.gif"); //nuvoletta pensa
  noParola = loadImage("./assets/noParola.png"); //nuvoletta attiva
  logor = loadImage("./assets/logopiccolo.png") //logo ridotto
  freccia = loadImage("./assets/freccia.png");
}

////////////setup/////////////////////////////////////////////////////////////

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(15); //rallenta

  //impostazioni riconoscimento vocale
  let continuous = true; //continua a registrare
  let interim = true;
  speechRec.start(continuous, interim);

  // //microfono get: Create an Audio input
  // mic = new p5.AudioIn();
  // mic.start();
}

/////////////////////////////////////////////////////////////////////////////

function draw() {
  background('#F9F9F9'); //chiaro
  imageMode(CENTER); //per pittogrammi
  noStroke();

  w = width / 20;
  h = height / 50;

  //testo caratteristiche
  textFont('quicksand');
  textAlign(CENTER, TOP);
  textStyle(BOLD);

  //testo centrale
  textSize(16);
  fill('#877B85'); //4° colore PALETTE
  text('PARTITA COOD O1', w * 10, h * 5);
  fill('#B7AEB5'); //3° PALETTE
  textSize(13);
  text('SQUADRA1-SQUADRA2', w * 10, h * 6.5);

  //testo sotto
  textSize(14);
  textAlign(CORNER);
  text('BONUS', w * 1.2, h * 43);

  //logo a destra
  image(logor, w * 18.5, h * 6, logor.width / 4.5, logor.height / 4.5);
  //freccia
  image(freccia, w, h * 6, freccia.width / 6, freccia.height / 6);


  //BARRA COORDINAZIONE
  fill('#D5D0D3'); //griga
  rectMode(CENTER);
  rect(w * 10, h * 45.5, width / 3.5, 15, 20); //rect(x,y,w,h,[tl])
  xBarra = ((width / 3.5) / 100) * p_coord; //altezza barra %, xTot= 439 = width / 3.5
  push();
  rectMode(CORNER);
  fill('#877B85'); //viola
  //width/7 è la metà della barra, che è lunga width/3.5
  rect(w * 10 - width / 7, h * 45.5 - 7.5, xBarra, 15, 20);
  pop();

  //pallini BONUS
  for (let i = 0; i < 6; i++) {
    if(p_coord > 60){
      push();
      fill('#877B85');
      ellipse(w, h*45.5, 15);
      pop();
    }
    ellipse(w + s, h * 45.5, 15);
    s = 25 * i;
  }
  //microfono input
  //let vol = round(mic.getLevel(), 2) * 1000;
  //console.log('volume: ' + vol);


  /////////////////// LA PARTE SOPRA è STANDARD ///////////////////////////////////////////////
  push();
      //CONTENITORI PAROLE VECCHE
      rectMode(CENTER);
      strokeWeight(5);
      stroke(textColorS) //viola
      fill(bButtonColorS) //bianco
      rect(w * 6, h*31, w * 3, 60, 40);
      stroke(textColorD) //viola
      fill(bButtonColorD) //bianco
      rect(w * 14, h*31, w * 3, 60, 40);
      //nuova parola
      stroke(textColorC) //viola
      fill(bButtonColorC) //bianco
      rect(w * 10 , h*31, w * 3, 60, 40);

      noStroke();
      textSize(30);
      textAlign(CENTER, TOP);
      fill(textColorS);
      text('forza.', w * 6, h*31 - 15);
      fill(textColorD);
      text('bravi.', w * 14, h*31 - 15);
      fill(textColorC);
      text('oplà.', w * 10, h*31 - 15);
  pop();

  //ritmo
  if (frameCount % 50 == 0) { //multiplo di 50 incrementa i
    i++;
  }

  //PERCENTUALE
  if (input_utente == 1 && i== i_ritardo+1) {
    p_coord = round(random(10, 80));
    input_utente = 0;//per bloccare ad una sola percentuale e non darne mille
  }
//per aprire l'altra pagina
  if(input_utente == 0 && i==i_ritardo+2){
    window.open('../indexPausa.html','_self');//doppio puntino per andare nella cartella sopra
  }

  push();
  textAlign(CORNER);
  fill('#B7AEB5'); //3° PALETTE
  text('SCELTA DA  ' + p_coord + ' % DEGLI UTENTI', w * 10, h * 43);
  pop();


  //ICONA CENTRALE CHE REAGISCE AL MIC
  // if (i > 1 && i < 3) {
  //   image(baloon_Puntini, width / 2, height / 2, baloon_Puntini.width / 4, baloon_Puntini.height / 4);
  // } else
  if (i >1 && p == 0) { // cambio colore del bottone centrale: feedback utente
    image(baloonIcon, width / 2, h*20, baloonIcon.width / 4.5, baloonIcon.height /  4.5);
  } else if (i > 1 && p == 1) {
    image(noParola, width / 2, h*20, noParola.width / 4.5, noParola.height /  4.5);
  }

  //rettangolo in opacità
  push();
  rectMode(CORNER)
  fill(255, 255, 255, opacità);
  rect(0, 0, width, height);
  //rettangolo diventta trasparente alla fine del tutorial
  if (i > 1) {
    opacità = 0
  }
  pop();

  //TUTORIAL
  push();
  textSize(16);
  fill('#B7AEB5'); //3 PALETTE
  if (i < 1 || i == 1) {
    document.getElementById("tutorial").style.display = "block";
      text('Scegli una parola', w * 10, h * 35);
        text('ESULTA QUANDO RICHIESTO', w * 10, h * 37);
      } else {
    document.getElementById("tutorial").style.display = "none";
  }
}
////////fine draw///////////////////////////////////////////////////////////////////////////////////

////////// Riconoscimento vocale parole //////////////////////////////////////////////////////////////

function gotSpeech() {
//  if(prima_p == 0){
  if (i >1 && p == 0) {
      console.log('p '+ p);
    if (speechRec.resultValue) {
      if (speechRec.resultString == 'forza') {
        //sx
        bButtonColorS = '#877B85';
        textColorS = '#F9F9F9';
        input_utente = 1;
        p = 1;
        i_ritardo = i;

      } else if (speechRec.resultString == 'bravi') {
        bButtonColorD = '#877B85';
        textColorD = '#F9F9F9';
        input_utente = 1;
        p = 1;
        i_ritardo = i;

      } else if (speechRec.resultString == 'Oplà') {
        bButtonColorC = '#877B85';
        textColorC = '#F9F9F9';
        input_utente = 1;
        p = 1;
        i_ritardo = i;
      }

      console.log(speechRec.resultString);

    }
  }
}

/////////////////////////////////////////////////////////////////////////

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
