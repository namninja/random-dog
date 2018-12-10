'use strict';

//Fetches data from API, converts and passes data to be displayed in DOM
function getDogImage(num) {
  console.log('getDogImage ran')
  //Asynchronous request to DOG API
  fetch(`https://dog.ceo/api/breeds/image/random/${num}`)
  //convert response into Javascript object
    .then(response => response.json())
  //Pass the object as a parameter to the displayResults function
    .then(responseJson =>
      displayResults(responseJson))
      //raiser error if previous promise fails
    .catch(error => alert('Something went wrong. Try again later.'));
}

//Renders each result into html
function renderResult(url) {
  console.log('renderResult ran')
  console.log('url: ' + url)
  //returns the html
  return `<img src="${url}" class="results-img">`
}

//Displays the results of the API call in the DOM
function displayResults(responseJson) {
  console.log('displayResults ran')
  console.log('JSON results: ' + responseJson);
  //render the data into html
  const results = responseJson.message.map((url, index) => renderResult(url));
  console.log('html results: ' + results)
  $('.image-results').html(results)  
  //display the results section
  $('.results').removeClass('hidden')
  //when images are ready hide progress indicator
  $('img').ready(function () {
    $('.loading').addClass('hidden')
  })
}

//This function creates and displays dropdown options in DOM
function dropDown() {
  console.log('dropDown ran')
  let select = '';
  //use for loop to create options 1-50 to be rendered as html
  for (let i = 1; i <= 50; i++) {
    select += '<option val=' + i + '>' + i + '</option>';
  }
  //add html to DOM
  $('#dog-pics').html(select);
}

//Event listener for submit event
function watchForm() {
  console.log('watchForm ran')
  //Listens for submit event
  $('form').submit(event => {
    //override default behavior
    event.preventDefault();
    //store user's selected value 
    let numOfDogs = $('#dog-pics').val()
    console.log(numOfDogs)
    //Hide results if there are any and show loading animation
    $('.results').addClass('hidden')
    $('.loading').removeClass('hidden');
    //used setTimeout function to test progress indicator animation
    setTimeout(function () {
      //pass user's selection to API call 
      getDogImage(numOfDogs)
    }, 3000)


  });
}


$(function () {
  console.log('App loaded! Waiting for submit!');
  watchForm();
  dropDown();
});