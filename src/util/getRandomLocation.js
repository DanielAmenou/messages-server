const randomLocation = require("random-location");
/**
 *
 *
 * @param {*} location - ISO 6709 lng,lat format
 * @param {*} radius - max distance in meters from center
 * @returns
 */
const getRandomLocation = (location, radius) => {
  const result = randomLocation.randomCirclePoint({ longitude: location.lng, latitude: location.lat }, radius);
  return { lng: result.longitude, lat: result.latitude };
};

module.exports = getRandomLocation;
