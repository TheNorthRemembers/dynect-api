# dynect-api
# A barely functional, yet servicable, Dynect Managed DNS REST API Interface

## Installation 

 - `npm i dynect-api`
 ### Build your self
 - `git clone https://github.com/TheNorthRemembers/dynect-api.git` and then `npm run build`


## Usage Examples (ES6)

All calls return Promises and are `async` and awaitable.

```
const Dynect = require('dynect-api');
// initialize
Dynect.init({
     customer_name: 'Customer Name',
    user_name: 'Dynect Username',
    password: 'Dynect Password',
});
// login
await Dynect.login().catch((err) => {
    // do something on error
});

// get all zones
const zones = await request('/Zone', 'GET', null).then((response) => {
	// do something with response if you want before returning it
}).catch((err) => {
    // do something with an error
});
```

To make a request 
```
const response = await request(apiPath, method, data);
```

There are a few wrapper functions
```
const zones = await Dynect.getZones();
const zone = await Dynect.getZone(zonePath);
```

## Resources

[Dynect resources by topic](https://help.dyn.com/rest-resources-by-topic/)
