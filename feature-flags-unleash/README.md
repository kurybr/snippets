# Feature Flag Unleash

A ideia foi criar uma classe para gerenciar o uso do unleash-client, facilitando assim a configuração de feature flags dentro de um projeto.

------

The idea is create a class for manage use of unleash-client,
facilitating the configuration of feature flags inside project

# Dependences

- unleash-client ( npm package )

# How Use

```javascript
const FeatureFlag = require('.')

const ff = FeatureFlag({  singletonMode: true })

ff.init({ 
	url: 'http://localhost:4242/api/', 
	appName: 'feature-flag-service-example',
	instanceId: 'my-unique-instance-id'
})
```