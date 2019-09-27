// // index.js
// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss')
// ///////////////////////////
//       //test code//
// //////////////////////////
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("(My IP) It didn't work!" , error);
//     return;
//   }

//   console.log('(My IP) It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('162.245.144.188', (error, coords) => {
//   if (error) {
//     console.log("(Coords By Ip) It didn't work!" , error);
//     return;
//   }

//   console.log('(Coords By Ip) It worked! Returned Coords:' , coords);
// });

// const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

// fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
//   if (error) {
//     console.log("(Fly over times) It didn't work!" , error);
//     return;
//   }

//   console.log('(Fly over times) It worked! Returned flyover times:' , passTimes);
// });

const { nextISSTimesForMyLocation } = require('./iss');
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  
  console.log(passTimes);
});
