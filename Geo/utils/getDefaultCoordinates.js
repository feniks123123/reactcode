const defaultCoordinates = {
  2 : { longitude: 41.9334, latitude: 56.0644 },
  19: { longitude: 39.718669, latitude: 47.222513 },
  22: { longitude: 36.586531, latitude: 55.112005 },
  23: { longitude: 36.252277, latitude: 54.507014 },
  25: { longitude: 37.768678, latitude: 44.723566 },
  27: { longitude: 39.893787, latitude: 57.626569 },
  29: { longitude: 56.229398, latitude: 58.010374 },
  81: { longitude: 30.3141300, latitude: 59.9386300 }
};

export default locationId =>({
  latitude : defaultCoordinates[ locationId ].latitude,
  longitude: defaultCoordinates[ locationId ].longitude
});