import http from './../../../common/utils/http';

export default (path) =>
  http.get('/location?types=1')
    .then((locations) => {
      let currentLocation = locations.find(({ url }) => {
        if(!url) return false;
        return !!~path.search(new RegExp(url, 'ig'));
      });
      let locationsList = locations[ 0 ].locations;

      if (!!currentLocation) {
        locationsList = currentLocation.locations;
      } else {
        currentLocation = locations[ 0 ];
      }

      return { locations, currentLocation, locationsList };
    })
    .catch(err => console.log(err));