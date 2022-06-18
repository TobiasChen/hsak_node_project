
import axios from 'axios';

const connectionString = "https://ptsv2.com/t/kruv3-1655553613/post"
const baseURL = "google.de/api"


export function triggerAction(riddleId, actionId, payload){
    const connectionString2 = `${baseURL}/${riddleId}/${actionId}`
    axios
    .post(connectionString, payload)
    .then(response => {
        console.log(`Post for ${riddleId}/${actionId}:  ${response.status}-${response.statusText} : ${response.data}`)
      }
    )
    .catch(error => {
      console.error(`Post for ${riddleId}/${actionId}:  ${error.response.status}-${error.response.statusText} : ${error.response.data}`)
    })
}