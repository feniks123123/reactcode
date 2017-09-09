import http from './../../../common/utils/http';

export default id =>
 http.get(`/bulk/chessplan?new=1&block_id={${ id }}&types=4`)
    .then(currentCommerceBlock => currentCommerceBlock.bulks.reduce((acc, { sections, ...bulk }) => {
      sections.forEach(({ floors, ...section })=> {
        Object.keys(floors).forEach(level => {
          const { flats, ...floor } = floors[ level ];

          flats.forEach((flat) => {
            acc.push({
              bulk   : { ...bulk },
              section: { ...section },
              floor  : {
                level,
                ...floor
              },
              flat: { ...flat }
            });
          });
        });
      });
      return acc;
    }, []))
    .catch(err => console.log(err));