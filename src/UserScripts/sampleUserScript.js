import { registerCallback } from '../statePollerService.js';
import { triggerAction } from '../actionDispatch.js';

export default function () {
    callActionOnRiddleX();
    registerforStateChangeForRiddleX();
    registerforStateChangeForRiddleX2();
    registerforStateChangeForRiddleY();
}

function callActionOnRiddleX() {
        const payload = {}
        payload.names = ['Emil', 'Berta']
        payload.id = [1, 2]
        triggerAction("riddleIdX", "actionIdX", payload)
}

function stateChangeHandlerRiddleX(newState) {
    console.log("Received new State1: " + JSON.stringify(newState))
}
function stateChangeHandlerRiddleX2(newState) {
    console.log("Received new State2: " + JSON.stringify(newState))
}

function registerforStateChangeForRiddleX() {
    console.log("Registring Callback for riddleIdX")
    registerCallback("riddleIdX",stateChangeHandlerRiddleX);
}
function registerforStateChangeForRiddleX2() {
    console.log("Registring Callback for riddleIdX2")
    registerCallback("riddleIdX",stateChangeHandlerRiddleX2);
}
function registerforStateChangeForRiddleY() {
    console.log("Registring Callback for riddleIdY")
    registerCallback("riddleIdY",stateChangeHandlerRiddleX);
}

