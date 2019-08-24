'use strict';

var container = document.getElementById('image-box');

var imagesUsed = [];
var totalClicks = 0;
var percents = [];
var labels = [];
var timesShown = [];
var timesClicked = [];

function Image (name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.shown = 0;
  Image.list.push(this);
}

Image.list = [];

Image.prototype.updateShown = function () {
  this.shown++;
};

Image.prototype.updateClicks = function () {
  this.clicks++;
};

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
  var randomNum = Math.floor(Math.random() * Image.list.length);
  
  while (imagesUsed.includes(randomNum) === true){
    randomNum = Math.floor(Math.random() * Image.list.length);
  }
  
  return randomNum;
}

function createImageContainers (numImages) {
  
  for(var i = 1; i <= numImages; i++) {
    var figure = document.createElement('figure');
    figure.id = `figure-${i}`;
    container.appendChild(figure);
    var imageHolder = document.getElementById(`figure-${i}`);
    
    
    var img = document.createElement('img');
    img.id = `img-${i}`;
    imageHolder.appendChild(img);
    
    var caption = document.createElement('figcaption');
    caption.id = `caption-${i}`;
    imageHolder.appendChild(caption);
    
  }
}

function renderImages (numImages) {
  checkArray();
  
  for (var i = 1; i <= numImages; i++) {
    var id = `img-${i}`;
    var img = document.getElementById(id);
    
    var imageObject = createRandom();
    
    img.src = Image.list[imageObject].src;
    img.alt = Image.list[imageObject].name;
    
    imagesUsed.push(imageObject);
    Image.list[imageObject].updateShown();
    
    var location = `caption-${i}`;
    var caption = document.getElementById(location);
    
    caption.textContent = Image.list[imageObject].name;
  }
}

function checkArray () {
  if (imagesUsed.length === 6) {
    for (var i = 0; i < 3; i++) {
      imagesUsed.shift();
    }
  }
}

function getShown () {
  for (var i = 0; i < Image.list.length; i++) {
    var shownTotal = Image.list[i].shown;
    timesShown.push(shownTotal);
  }
}

function getClicked () {
  for (var i = 0; i < Image.list.length; i++) {
    var clickTotal = Image.list[i].clicks;
    timesClicked.push(clickTotal);
  }
}

function getPercentages () {
  percents = [];

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

function checkNumClicks () {

  if (totalClicks >= 25) {
    container.removeEventListener('click', eventHandler);

    saveData();
    getPercentages();
    makeChart();
  }
}

function setUpListener () {
  container.addEventListener('click', eventHandler);
}

function eventHandler (e) {
  checkNumClicks();
  var imageName = e.target.alt;

  for (var i = 0; i < Image.list.length; i++) {
  
    if (Image.list[i].name === imageName) {
      Image.list[i].updateClicks();
    }
  }
  totalClicks++;
  renderImages(3);
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

function saveData () {
  getClicked();
  getShown();

  var storedClicks = JSON.stringify(timesClicked);
  localStorage.setItem('clicks', storedClicks);

  var storedShowm = JSON.stringify(timesShown);
  localStorage.setItem('shown', storedShowm);
}

function retrieveData () {

  if (timesClicked.length !== 0 && timesShown.length !== 0) {
    timesClicked = JSON.parse(localStorage.getItem('clicks'));
    timesShown = JSON.parse(localStorage.getItem('shown'));

    setData();
  }
}

function setData () {
  for (var i = 0; i < Image.list.length; i++) {
    Image.list[i].clicks = timesClicked[i];
    Image.list[i].shown = timesShown[i];
  }
}

retrieveData();
createImageContainers(3);
renderImages(3);
setUpListener();
getLabels ();
