

const {USERS:users, USER:user,SDK, FLAG} = require('./config.json')
const  LaunchDarkly = require('launchdarkly-node-client-sdk');


(async function(){
    var ldClient;  // LaunchDarkly client variable

    try{
        ldClient = LaunchDarkly.initialize(SDK.CLIENT_ID, user);  // initialize with Client iD and user object
        await ldClient.waitForInitialization(); // wait for initialize to complete 
        
        // retrieve variation for targeted user, return default value if flag is not found
        const flagValue =  ldClient.variation( FLAG.key, FLAG.default); 
        console.log(`User=[${JSON.stringify(user)}] flagValue=[${flagValue}]`)

        const message = (flagValue)?"show":"hide";

        console.log(`${message} feature`);
        

    }catch (error){
        console.log(`error=${error}`);
    }finally{
        ldClient.close();
        console.log(`closed LaunchDarkly client`);
    }
    
    
})()

