'use strict';

var pic1 = document.getElementById('img1');
var caption1 = document.getElementById('figure1');
var pic2 = document.getElementById('img2');
var caption2 = document.getElementById('figure2');
var pic3 = document.getElementById('img3');
var caption3 = document.getElementById('figure3');

var imagesUsed = [];
var totalClicks = 0;
var percents = [];
var labels = [];

console.log (pic1);

function Image (name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.shown = 0;
  Image.list.push(this);
}

Image.list = [];

new Image ('bag', './img/bag.jpg');
new Image ('banana', './img/banana.jpg');
new Image ('bathroom', './img/bathroom.jpg');
new Image ('boots', './img/boots.jpg');
new Image ('breakfast', './img/breakfast.jpg');
new Image ('bubblegum', './img/bubblegum.jpg');
new Image ('chair', './img/chair.jpg');
new Image ('cthulhu', './img/cthulhu.jpg');
new Image ('dog duck', './img/dog-duck.jpg');
new Image ('dragon', './img/dragon.jpg');
new Image ('pen', './img/pen.jpg');
new Image ('pet sweep', './img/pet-sweep.jpg');
new Image ('scissors', './img/scissors.jpg');
new Image ('shark', './img/shark.jpg');
new Image ('sweep', './img/sweep.png');
new Image ('tauntaun', './img/tauntaun.jpg');
new Image ('unicorn', './img/unicorn.jpg');
new Image ('usb', './img/usb.gif');
new Image ('water can', './img/water-can.jpg');
new Image ('wine glass', './img/wine-glass.jpg');

function createRandom () {
  return Math.floor(Math.random() * Image.list.length);
}

var choice1;
var choice2;
var choice3;

function showImages () {

  if (imagesUsed.length === 6) {
    for (var i = 0; i < 3; i++) {
      imagesUsed.shift();
    }
  }

  var randImg1 = createRandom();
  while (imagesUsed.includes(randImg1) === true){
    randImg1 = createRandom();
  }
  pic1.src = Image.list[randImg1].src;
  caption1.textContent = Image.list[randImg1].name;
  imagesUsed.push(randImg1);
  Image.list[randImg1].shown++;
  choice1 = Image.list[randImg1];

  var randImg2 = createRandom();
  while (imagesUsed.includes(randImg2) === true){
    randImg2 = createRandom();
  }
  pic2.src = Image.list[randImg2].src;
  caption2.textContent = Image.list[randImg2].name;
  imagesUsed.push(randImg2);
  Image.list[randImg2].shown++;
  choice2 = Image.list[randImg2];

  var randImg3 = createRandom();
  while (imagesUsed.includes(randImg3) === true){
    randImg3 = createRandom();
  }
  pic3.src = Image.list[randImg3].src;
  caption3.textContent = Image.list[randImg3].name;
  imagesUsed.push(randImg3);
  Image.list[randImg3].shown++;
  choice3 = Image.list[randImg3];

}

function getPercentages () {
  for (var i = 0; i < Image.list.length; i++) {
    var percent = Math.floor((Image.list[i].clicks/Image.list[i].shown) * 100);

    percents.push(percent);
  }
}

function getLabels () {
  for (var i = 0; i < Image.list.length; i++) {
    var name = Image.list[i].name;

    labels.push(name);
  }
}

showImages();
getLabels ();

pic1.addEventListener('click', chosenOne);
pic2.addEventListener('click', chosenTwo);
pic3.addEventListener('click', chosenThree);

function chosenOne () {
  choice1.clicks++;
  totalClicks++;
  showImages();

  if (totalClicks >= 25) {
    pic1.removeEventListener('click', chosenOne);
    pic2.removeEventListener('click', chosenTwo);
    pic3.removeEventListener('click', chosenThree);

    getPercentages();
    makeChart();
  }
}

function chosenTwo () {
  choice2.clicks++;
  totalClicks++;
  showImages();

  if (totalClicks >= 25) {
    pic1.removeEventListener('click', chosenOne);
    pic2.removeEventListener('click', chosenTwo);
    pic3.removeEventListener('click', chosenThree);

    getPercentages();
    makeChart();
  }
}

function chosenThree () {
  choice3.clicks++;
  totalClicks++;
  showImages();

  if (totalClicks >= 25) {
    pic1.removeEventListener('click', chosenOne);
    pic2.removeEventListener('click', chosenTwo);
    pic3.removeEventListener('click', chosenThree);

    getPercentages();
    makeChart();
  }
}


function makeChart () {
//Sourced from chartjs.org
  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
  // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: labels,
      datasets: [{
        label: 'Item Selections by Percent',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: percents
      }]
    },

    // Configuration options go here
    options: {}
  });
}

