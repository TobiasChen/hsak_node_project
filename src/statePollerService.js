import axios from 'axios';
import lodash from 'lodash'
import { logger } from './logger.js';
import { config } from './config.js';

const dictOfCurrentState = {}
const dictOfCallbacks = {}


export async function runPollingService() {
  (function loop() {
    setTimeout(
      function () {
        const listOfRiddleIDs = Object.keys(dictOfCallbacks)
        logger.info(`Executing State Update for ${listOfRiddleIDs}`)
        for (var i = 0; i < listOfRiddleIDs.length; i++) {
          updateState(listOfRiddleIDs[i])
        }
        loop();
      }, config.statePollService.pollDelay);
  })();
}


export function registerCallback(riddleID, callback) {
  if(dictOfCallbacks[riddleID] == undefined){
    dictOfCallbacks[riddleID] = [callback]
  }
  else{
    dictOfCallbacks[riddleID].push(callback)
  }
  updateState(riddleID)
}

export function removeCallback(riddleID, callback){
  var index = dictOfCallbacks[riddleID].indexOf(callback);
  dictOfCallbacks[riddleID].splice(index,1)
}

function updateState(riddleID) {
  logger.info(`Updating State of ${riddleID}`)
  axios
    .get(config.statePollService.baseURL, {
      params: {
        symbol: 'BTC-USDT'
      }
    })
    .then(response => {
      logger.http(`UpdateState for ${riddleID} :  ${response.status}-${response.statusText} : ${response.data}`)
      if (!lodash.isEqual(dictOfCurrentState[riddleID], response.data)) {
        logger.verbose(`State changed for ${riddleID}`)
        dictOfCurrentState[riddleID] = response.data
        updateCallbacks(riddleID)
      }
    })
    .catch(error => {
      if(error.response != undefined) logger.error(`UpdateState for ${riddleID}:  ${error.response.status}-${error.response.statusText} : ${error.response.data}`)
      else logger.error(`Error triggering Action: ${error}`)
    })

}

function updateCallbacks(riddleID) {
  logger.verbose(`Updating callbacks for ${riddleID}`)
  for (var i = 0; i < dictOfCallbacks[riddleID].length; i++) {
    dictOfCallbacks[riddleID][i](dictOfCurrentState[riddleID]);
  }
}