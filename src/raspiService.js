import { readdirSync } from 'fs';
import { runPollingService } from './statePollerService.js';
//Config
const scriptsFolder = './src/UserScripts/'

function main() {
  console.log("Starting Raspi Service")
  runPollingService();
  runUserScripts();
  console.log("Finished init")
}
function runUserScripts() {
  //Read Files and filter for JS files
  const files = readdirSync(scriptsFolder)
  const jsFiles = files.filter(f => f.endsWith('.js'))
  //Execute Files
  for (const file of jsFiles) {
    console.log("Executing File: " + scriptsFolder + file)
    import("./UserScripts/sampleUserScript.js")
      .then((module) => {
        module.default()
      })
      .catch((err) => { if (err) console.error(err) })
  }
}
main();