This sample app serves to demonstrate an example of micro-frontend implementation with Zoom Meeting SDK. It consists of the following apps in the respective directories:

* container (container app)
* container app (micro-frontend app)
* msdk app  (micro-frontend app)
---

### Starting the container app: container
The container will have all of the mircofrontend. Navigate to the container directory and run the following:

```
 $ cd container 
 
 $ npm install
 
 $ npm start 

```
---

### Starting the micro-frontend: auth
You can similarly navigate to the counter directory and run the following commands to start the micro-frontend. It will serve up the micro-frontend JavaScript bundle at http://localhost:8081/

```
 $ cd counter 
 
 $ npm install
 
 $ npm start 
```
---
### Starting the micro-frontend: msdk 
You can similarly navigate to the msdk directory and run the following commands to start the micro-frontend. It will serve up the micro-frontend JavaScript bundle at http://localhost:8082/

```
 $ cd msdk  
 
$ npm install
 
 $ npm start 
```


## Notes
* If change made to Webpack configuration files, must restart server for it to take affect