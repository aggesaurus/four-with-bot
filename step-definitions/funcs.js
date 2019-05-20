module.exports = {
  $: async function (selector, chosenDriver = driver){
    let elements = await chosenDriver.findElements(by.css(selector));
    if(elements.length === 0){
      return null; 
    }
    if(elements.length === 1){
      return elements[0];
    }
    return elements;
  },
  sleep: function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
 
