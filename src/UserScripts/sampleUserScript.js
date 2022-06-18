import { registerCallback } from '../statePollerService.js';
import { triggerAction } from '../actionDispatch.js';
import { logger } from '../logger.js';

export default function () {
    logger.info("Starting User Script")
    callActionOnRiddle1();
    registerCallbackRiddle1();
    registerCallbackRiddle2();
}

function callActionOnRiddle1() {
        const payload = {}
        payload.names = ['Emil', 'Berta']
        payload.id = [1, 2]
        triggerAction("riddle1", "action1", payload)
}

function stateChangeHandlerRiddle1(newState) {
    logger.verbose("Handling State change for Riddle 1")
    logger.debug("Received new State1: " + JSON.stringify(newState))
}
function stateChangeHandlerRiddle2(newState) {
    logger.verbose("Handling State change for Riddle 2")
    logger.debug("Received new State2: " + JSON.stringify(newState))
}

function registerCallbackRiddle1() {
    logger.info("Registring Callback for riddle1")
    registerCallback("riddle1",stateChangeHandlerRiddle1);
}

function registerCallbackRiddle2() {
    logger.info("Registring Callback for riddle2")
    registerCallback("riddle2",stateChangeHandlerRiddle2);
}

