creatAutoComplete({
  root: document.querySelector('.autocomplete'),
  renderOption: (movie) => {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster
    return `
      <img src="${imgSrc}" />
      ${movie.Title} (${movie.Year})
    `
  },
  onOptionSelect: (movie) => {
    onMovieSelect(movie)
  },
  inputValue: (movie) => {
    return movie.Title
  },
  fetchData: async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: 'a4091f84',
        s: searchTerm
      }
    })

    if (response.data.Error) {
      return []
    }

    return response.data.Search
  }
})

const onMovieSelect = async movie => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'a4091f84',
      i: movie.imdbID
    }
  })

  document.querySelector('#summary').innerHTML = movieTemplate(response.data)
}

const movieTemplate = (movieDetail) => {
  return `
    <div class="media">
      <figure class="media-left">
      <p class="image">
        <img src="${movieDetail.Poster}" />
      </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </div>
    <div class="notification is-primary"> 
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </div>
    <div class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </div>
    <div class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </div>
    <div class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </div>
    <div class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </div>
  `
} 