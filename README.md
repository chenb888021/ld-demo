# ld-demo
Sample LaunchDarkly feature flag implementation.

### Configuration File
*File:config.json*
```
{
    "SDK": {
        "CLIENT_ID": "xxxxxxxxxxx",   // Your client ID
        "DEFAULT_VARIATION": false
    },
    "FLAG": {
        "key": "demo-flag",  // feature flag
        "default": false
    },
    "USER": {
        "key": "user-key",
        "name": "testUser01"
    }
   
}
```


### CODE
```


const {USER:user,SDK, FLAG} = require('./config.json')
const  LaunchDarkly = require('launchdarkly-node-client-sdk');


(async function(){
    var ldClient;  // LaunchDarkly client variable

    try{
        if (!SDK.CLIENT_ID){
            console.log(`CLIENT_ID is not set, quitting.`);
            return 
        }
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
        if (ldClient){
            ldClient.close();
            console.log(`closed LaunchDarkly client`);
        }
        
        
    }
    
    
})()




```

### OUTPUT
```
ld-demo % node index.js
info: [LaunchDarkly] LaunchDarkly client initialized
User=[{"key":"user-key","name":"testUser01"}] flagValue=[true]
show feature
closed LaunchDarkly client
```



###Feature Flag
![featureFlag](/images/featureflag.png)

