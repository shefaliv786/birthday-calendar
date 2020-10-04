
document.addEventListener('DOMContentLoaded', function(event) {
    document.getElementById('json-input-area').value = JSON.stringify(initData,null, 2);
    updateButtonHandler();
  });

function updateButtonHandler() {
    const textInputVal = document.getElementById('year-input').value;
    const jsonDataInput = document.getElementById('json-input-area');

    const formattedJson = formatJson(jsonDataInput.value);
    jsonDataInput.value = formattedJson;
    
    const _person = getPersonListFromJSON(formattedJson);
    const _groups = groupDataByWeekDay(_person, textInputVal);

    const cards = getCards(_groups);

    const container = document.getElementById('card-container');

    const cardsStr = cards.reduce((res, card) => res + card.toString(), '');


    container.innerHTML = cardsStr;
}

function formatJson(jsonString){
   
  jsonString = jsonString ? jsonString.trim() : jsonString;

  if(jsonString) {
    return JSON.stringify(JSON.parse(jsonString),null, 2);
  }
  return "[]";
}