import http from './../../../common/utils/http';

export default (locationsList) =>
  http.get(`/mortgage/?locations=${ locationsList }&types=flats&with_bank=1`)
    .then(partners => {
      const programsIds = [];
      const objects = {
        banks   : {},
        programs: {},
      };

      partners.forEach(({ programs, id, ...data }) => {
        programs.forEach(({ guid, ...data }) => {
          objects.programs[ guid ] = { ...data, bankId: id };
          programsIds.push(guid);
        });
        objects.banks[ id ] = { ...data, programs };
      });

      return objects;
    })
    .catch(err => console.log(err));
