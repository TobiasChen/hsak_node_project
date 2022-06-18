export const config = {
    "log":{
            "level": "info",
            "path": "./log/"
    },
    "userScriptPath" : './src/UserScripts/',
    "statePollService":{
        "baseURL" : 'https://api.kucoin.com/api/v1/market/stats',
        "pollDelay": 10000 //Delay in MS 
    },
    "actionDispatch":{
        "baseURL":  "https://ptsv2.com/t/kruv3-1655553613/post"
    }
}