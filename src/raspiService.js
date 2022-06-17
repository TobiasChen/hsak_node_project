import { Worker, spawn as threadSpawn } from 'threads';
import { spawn as childSpawn } from 'child_process';
import { readdirSync } from 'fs';

//Config
const scriptsFolder = './src/UserScripts/'

function main(){
    console.log("Starting Raspi Service")
    startStatePollerService();
    runUserScripts();
    console.log("Finished init")
}

async function startStatePollerService(){
    const pollerService = await threadSpawn(new Worker("./statePollerService.js"))
    await pollerService.runPollingService();
}

function runUserScripts(){
    //Read Files and filter for JS files
    const files = readdirSync(scriptsFolder)
    const jsFiles = files.filter(f => f.endsWith('.js'))
    //Execute Files
    for (const file of jsFiles){
        console.log("Executing File: " + scriptsFolder + file)
        childSpawn('node', [scriptsFolder + file], { shell: true, stdio: 'inherit' })
    }
}


main();