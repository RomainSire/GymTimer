"use strict";
/**
 * GymTimer class
 */
var GymTimer = function() {
  this.targetDiv = document.getElementById('GymTimer');

}

GymTimer.prototype = {
  /** ------------------------------------------------- **\
   *                  UTILITIES METHODS
  \** -------------------------------------------------  */

  /**
   * Create a new paragraph with inpult fields representing a new exercice
   */
  addNewExercice: function(exoName = null, exoTime = null) {
    // create new input for name
    var inputExo = document.createElement('input');
    inputExo.setAttribute("type", "text");
    inputExo.setAttribute("name", "exo");
    inputExo.setAttribute("placeholder", "exercice à faire");
    if (exoName) {
      inputExo.setAttribute("value", exoName);
    }
    // create new input for time
    var inputTime = document.createElement('input');
    inputTime.setAttribute("type", "number");
    inputTime.setAttribute("name", "temps");
    inputTime.setAttribute("min", "0");
    inputTime.setAttribute("max", "300");
    if (exoTime) {
      inputTime.setAttribute("value", exoTime);
    }
    // create a span tu put unit
    var span = document.createElement('span');
    span.textContent = " sec."
    // create delete button
    var deleteBtn = document.createElement('a');
    deleteBtn.setAttribute("href", "#");
    deleteBtn.setAttribute("class", "delete");
    var fas = document.createElement('i');
    fas.setAttribute('class', 'fas fa-trash');
    deleteBtn.appendChild(fas);
    // addEventListener on the belete button
    deleteBtn.addEventListener('click', this.onDeleteBtnClicked);
    // insert the right things at the right place
    var p = document.createElement('p');
    p.appendChild(inputExo);
    p.appendChild(inputTime);
    p.appendChild(span);
    p.appendChild(deleteBtn);

    return p;
  },


  /**
   * Create the different html elements at start up
   */
  initiateHtml: function() {
    // the target div is emptied
    this.targetDiv.innerHTML = "";

    // Creation of the form (to enter the exercices and times)
    var form = document.createElement('form');
    // title
    var h2 = document.createElement("h2");
    h2.textContent = "Série d'exercies et leur temps d'exécution";
    form.appendChild(h2);
    // serie of exercice (check if a serie is already saved in localStorage)
    var serie = JSON.parse(window.localStorage.getItem('GYM_TIMER_SERIE'));
    if (serie !== null && serie.length > 0) {
      // serie already exists : create line for each exercice
      for (var i = 0; i < serie.length; i++) {
        var exoName = serie[i]["exo"];
        var exoTime = serie[i]["temps"]
        var p = this.addNewExercice(exoName, exoTime);
        form.appendChild(p);
      }
    } else {
      // serie doesn't exist : create only 1 new blank exercice
      var p = this.addNewExercice();
      form.appendChild(p);
    }
    // add exercice button
    var newExerciceButton = document.createElement('button');
    newExerciceButton.setAttribute("class", "addExercice");
    var fas =  document.createElement('i');
    fas.setAttribute("class", "fas fa-plus-circle");
    newExerciceButton.appendChild(fas);
    form.appendChild(newExerciceButton);
    // append form to the targetted div
    this.targetDiv.appendChild(form);

    // Creation of the buttons to start the exercices and save the serie of exercices
    var p2 = document.createElement("p");
    var startExerciceButton = document.createElement("button");
    startExerciceButton.textContent = "START";
    startExerciceButton.setAttribute("class", "startExercices");
    p2.appendChild(startExerciceButton);
    var saveButton = document.createElement('button');
    saveButton.textContent = "SAVE";
    saveButton.setAttribute("class", "save");
    p2.appendChild(saveButton);
    this.targetDiv.appendChild(p2);
  },



  /**
   * Read and format the form
   */
  readForm: function() {
    // form reading and formating
    var exos = document.querySelectorAll('#GymTimer input[name="exo"]');
    var temps = document.querySelectorAll('#GymTimer input[name="temps"]');
    var serie = []
    for (var i = 0; i < exos.length; i++) {
      serie[i] = {
        exo: exos[i].value,
        temps: temps[i].value
      }
    }
    return serie;
  },


  /** ------------------------------------------------- **\
   *             METHODS TRIGGERED BY EVENTS
  \** -------------------------------------------------  */


  /**
   * Called when "add exercice" button is clicked
   */
  onAddExerciceClicked: function(event) {
    event.preventDefault();
    // create new exercice line
    var p = this.addNewExercice();
    // select useful elements
    var button = this.targetDiv.querySelector('.addExercice');
    var form = this.targetDiv.querySelector('form');
    // insert the new line at the right place
    form.insertBefore(p, button);
  },


  /**
   * Called when "delete exercice" button is clicked
   */
  onDeleteBtnClicked: function(event) {
    this.parentNode.remove();
  },



  /**
   * Called when "SAVE" button is clicked
   */
  onSaveClicked: function(event) {
    // read the form
    var serie = this.readForm();
    // Save the serie of exercice in the localStorage (as JSON)
    window.localStorage.setItem('GYM_TIMER_SERIE', JSON.stringify(serie));
  },



  /**
   * METHODE TEST !  (WORK IN PROGRESS !)
   */
  countdown: function() {
    console.log("coucou !");
  },

  /**
   * Called when "START" button is clicked
   */
  onStartExerciceClicked: function(event) {
    event.preventDefault();
    // read and format the exercices form
    var serie = this.readForm();
    console.log(serie);

    var exoName = serie[0]["exo"];
    var secondsLeft = parseInt(serie[0]["temps"]);
    console.log(exoName, secondsLeft);

    setInterval(function(){
      console.log(secondsLeft);
      secondsLeft--;

    }, 1000);

    console.log("fini !");

    // var timer = window.setInterval(this.countdown(), 1000);

    // // For each exercice of the serie :
    // for (var i = 0; i < serie.length; i++) {
    //   var exoName = serie[i]["exo"];
    //   var exoTime = parseInt(serie[i]["temps"]);
    //   var timerSecond = window.setInterval(doIt, 1000);
    // }


    // var p = document.createElement("p");
    // p.textContent = "Touch my tralala";
    // this.targetDiv.appendChild(p);

    // Faire disparaitre le form et tout
    // afficher le nom et le compte à rebours

  },



  /** ------------------------------------------------- **\
   *                 APPLICATION START UP
  \** -------------------------------------------------  */


  start: function() {
    // html Form building
    this.initiateHtml();

    // event listener start up
    document.querySelector("#GymTimer .addExercice").addEventListener("click", this.onAddExerciceClicked.bind(this));

    document.querySelector('#GymTimer .startExercices').addEventListener('click', this.onStartExerciceClicked.bind(this));

    document.querySelector('#GymTimer .save').addEventListener('click', this.onSaveClicked.bind(this));
  }

}