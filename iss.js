const request = require('request');

//FETCH YA IP YOOOINKK
const fetchMyIP = function(callback) {
  //creates fetch request to api host:
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);
    //if error callback error, nullifying nonerror params
    if (response.statusCode !== 200) {
      //callback error+api status code, nullified nonerror params
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    //deconstruct object from body.data
    const ip = JSON.parse(body).ip;
    //if lat and lng successful, nullifiy error params, send proper data.
    callback(null, ip);
  });
};

//FETCH YA GEO LOCIZZLE BY IP

const fetchCoordsByIP = function(ip, callback) {

  //creates fetch request to api host:
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    //if error callback error, nullifying nonerror params
    if (error) {
      callback(error, null);
      return;
    }
    //if response !successful (!code200)
    if (response.statusCode !== 200) {
      //callback error+api status code, nullified nonerror params
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }
    //deconstruct object from body.data
    const { latitude, longitude } = JSON.parse(body).data;
    //if lat and lng successful, nullifiy error params, send proper data.
    callback(null, { latitude, longitude });
  });
};

//WHERE MY BOI ISS AT
const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

// iss.js 

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };