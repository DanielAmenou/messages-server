const coordinatesToLngLat = (arr) => {
  return { lng: arr[0], lat: arr[1] };
};

const lngLatToCoordinates = (lngLat) => {
  return [lngLat.lng, lngLat.lat];
};

module.exports = { coordinatesToLngLat, lngLatToCoordinates };
