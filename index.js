'use strict';

//Fetches data from API, converts and passes data to be displayed in DOM
function getDogImage(breed) {
  console.log('getDogImage ran')
  //Asynchronous request to DOG API
  fetch(`https://dog.ceo/api/breed/${breed}/images`)
  //convert response into Javascript object
    .then(response => response.json())
  //Pass the object as a parameter to the displayResults function
    .then(responseJson =>
      displayResults(responseJson))
      //raise error if previous promise fails and reload page
    .catch(function(error) {
      alert(`Sorry, ${breed} breed was not found. Please try another.`)
      location.reload()
    });
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

//Event listener for submit event
function watchForm() {
  console.log('watchForm ran')
  //Listens for submit event
  $('form').submit(event => {
    //override default behavior
    event.preventDefault();
    //store user's selected value and convert to lowercase
    let dogBreed = $('#breed-input').val().toLowerCase()
    console.log('User Selected: ' + dogBreed)
    //Hide results if there are any and show loading animation
    $('.results').addClass('hidden')
    $('.loading').removeClass('hidden');
    //pass user's selection to API call 
    getDogImage(dogBreed)
  });
}


$(function () {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});