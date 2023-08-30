$(document).ready(() => {
	getQuotes()
});
$("#new-quote").click(() =>  {
    getQuotes();
  });
async function getQuotes() {
  try {
    	var QUOTE_API = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,racist,sexist,explicit";
  var newQuotedata = await fetch(QUOTE_API);
  const newQuoteResponse = await newQuotedata.json()
  randomQuote(newQuoteResponse)
  } catch (error) {
    console.log(error)
        Swal.fire({
  position: 'top-end',
  icon: 'error',
  title: 'An error occured !!',
  showConfirmButton: false,
  timer: 1500
})
  }

}
function randomQuote(newQuoteResponse) {
	const { setup, id, delivery } = newQuoteResponse;
  if(setup == undefined){
    getQuotes()
  }else{
    var TweetQuoteAttr = '"I used the quote generator by @thejohncaleb to generate this quote ✨"' + setup + '';
    $("#text").html(setup + "🤔  " + delivery + "🤭");
    $("#tweet-quote").attr("href", Tweet('"' + TweetQuoteAttr + '" - ' + delivery));
  }
}
function copyToBoard(){
  var copyText = document.getElementById("text");
       navigator.clipboard.writeText(copyText.innerText);
        Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Quote Copied Successfully 🎉',
  showConfirmButton: false,
  timer: 1500
})
}
function Tweet(str) {
  var stringToConvert = str.split(" ").join("%20").split("@").join("%40").split("!").join("%21");
  var resultString = "https://x.com/intent/tweet?text=" + stringToConvert;
  return resultString;
}