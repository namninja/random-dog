'use strict';

function getDogImage(num) {
  fetch(`https://dog.ceo/api/breeds/image/random/${num}`)
    .then(response => response.json())
    .then(responseJson =>
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function renderResult(item) {
  console.log(item + 'item ----------------------------------->')
  return `<img src="${item}" class="results-img">`
}

function displayResults(responseJson) {
  console.log(responseJson);
  //replace the existing image with the new one
  const results = responseJson.message.map((item, index) => renderResult(item));
  console.log(results + 'result----------------------------------->')
  $('.image-results').html(results)  
  //display the results section
  $('.results').removeClass('hidden')
  $('img').ready(function () {
    $('.loading').addClass('hidden')
  })


}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let numOfDogs = $('#dog-pics').val()
    console.log(numOfDogs)
    $('.results').addClass('hidden')
    $('.loading').removeClass('hidden');
    setTimeout(function () {
      getDogImage(numOfDogs)
    }, 3000)


  });
}
function dropDown() {
  let select = '';
  for (let i = 1; i <= 50; i++) {
    select += '<option val=' + i + '>' + i + '</option>';
  }
  $('#dog-pics').html(select);
  console.log(select)
}

$(function () {
  console.log('App loaded! Waiting for submit!');
  watchForm();
  dropDown();
});