import axios from 'axios';
import lodash from 'lodash'

const dictOfCurrentState = {}
const dictOfCallbacks = {}



export async function runPollingService() {
  (function loop() {
    setTimeout(
      function () {
        const riddleIDs = Object.keys(dictOfCallbacks)
        console.log(`Executing State Update for ${riddleIDs}`)
        for (var i = 0; i < riddleIDs.length; i++) {
          updateState(riddleIDs[i])
        }
        loop();
      }, 5000);
  })();
}

export function registerCallback(riddleId, callback) {
  if(dictOfCallbacks[riddleId] == undefined){
    dictOfCallbacks[riddleId] = [callback]
  }
  else{
    dictOfCallbacks[riddleId].push(callback)
  }
}

function updateState(riddleID) {
  console.log(`Updating State of ${riddleID}`)
  axios
    .get('https://api.kucoin.com/api/v1/market/stats', {
      params: {
        symbol: 'BTC-USDT'
      }
    })
    .then(response => {
      console.log(`UpdateState for ${riddleID} :  ${response.status}-${response.statusText} : ${response.data}`)
      if (!lodash.isEqual(dictOfCurrentState[riddleID], response.data)) {
        console.log(`State changed for ${riddleID}`)
        dictOfCurrentState[riddleID] = response.data
        updateCallbacks(riddleID)
      }
    })
    .catch(error => {
      console.error("UpdateState for ${riddleId}: " + error.response.status + "-" + error.response.statusText + ': ' + error.response.data)
    })

}

function updateCallbacks(riddleID) {
  console.log(`Updating callbacks for ${riddleID}`)
  for (var i = 0; i < dictOfCallbacks[riddleID].length; i++) {
    //Call each Callback of the current riddle
    dictOfCallbacks[riddleID][i](dictOfCurrentState[riddleID]);
  }
}