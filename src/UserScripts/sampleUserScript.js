import readline from 'readline'
import { registerCallback } from '../statePollerService.js';

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}


//const ans = await askQuestion("Are you sure you want to deploy to PRODUCTION? ");
//console.log('=========== \n Answer was: ' + ans + '\n ===========')

registerForRiddle();
callAction();
reactToStateChange();


function registerForRiddle(){
    
}

function callAction(){

}

function reactToStateChange(){
    registerCallback(stateChangeHandler);
}

function stateChangeHandler(newState){
    console.log("Received new State: " + JSON.stringify(newState))
}