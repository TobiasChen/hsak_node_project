import { readdirSync } from 'fs';
import { logger } from './logger.js';
import { runPollingService } from './statePollerService.js';
import { config } from './config.js'

//Config
const scriptsFolder = './src/UserScripts/'

function main() {
  logger.info("Starting Raspi Service")
  runPollingService();
  runUserScripts();
  logger.info("Finished Setup")
}

function runUserScripts() {
  //Read Files and filter for JS files
  const files = readdirSync(scriptsFolder)
  const jsFiles = files.filter(f => f.endsWith('.js'))
  //Execute Files
  logger.debug(`Files loaded are: ${jsFiles}`)
  for (const file of jsFiles) {
    logger.info("Executing File: " + scriptsFolder + file)
    import("./UserScripts/sampleUserScript.js")
      .then((module) => {
        module.default()
      })
      .catch((err) => { if (err) console.error(err) })
  }
}
main();