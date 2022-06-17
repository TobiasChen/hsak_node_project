import axios from 'axios';
import lodash from 'lodash'

var currentState = {}
var stateChanged = false
var arrayOfCallbacks = []


expose({
  runPollingService() {
  (function loop(){
    setTimeout(function() {
      console.log("Executing State Update")
      updateState()
      if (stateChanged) {
        updateCallback()
        stateChanged = false
      }
       loop();
   }, 1000);
  })();
}
})

export function registerCallback(callback) {
  arrayOfCallbacks.push(callback);
}


function updateState() {
  axios
    .get('https://api.nasa.gov/planetary/apod', {
      params: {
        api_key: 'DEMO_KEY'
      }
    })
    .then(response => {
      if (!lodash.isEqual(currentState, response.data)) {
        console.log("State changed!\n prev: " + JSON.stringify(currentState) + "\n new: " + JSON.stringify(response.data))
        stateChanged = true
        currentState = response.data
      }
    })
    .catch(error => {
      console.error("UpdateState:" + error.response.status + "-" + error.response.statusText + ': ' + error.response.data)
    })

}

function updateCallback() {
  for (const func in arrayOfCallbacks){
    console.log("Calling " + func + " with changed Values");
    func(currentState);
  }
}
