const hostIndex = (req, res) => {
  res.render('index', {
    page_title: 'Moov-E-Matic',
  });
};

const fs = require('fs');
const movies = JSON.parse(fs.readFileSync(`${__dirname}/../../data/movies.json`));

const getResults = (req, res) => {
  const { title, year, starring } = req.query;
  let results;

  if (title) {
    const searchTitle = title.toLowerCase();

    results = movies.filter((movie) => {
      const movieTitle = movie.title.toLowerCase();
      return movieTitle.includes(searchTitle) || searchTitle.includes(movieTitle);
    });
  }

  if (year) {
    const searchYear = Number(year);

    results = movies.filter((movie) => {
      return movie.year === searchYear;
    });
  }

  console.log(results);

  res.render('results', {
    query: {
      title,
      year,
      starring,
    },
    movies: results,
  });

  results.forEach(movie => {
    movie.cast = movie.cast.map(member => {
      return {
        name: member,
        isStarring: starring.includes(member)
      }
    })
  });
};

const notFound = (req, res) => {
  res.status(404).render('notFound', {
    page: req.url,
  });
};

module.exports = {
  index: hostIndex,
  getResults,
  notFound,
};
