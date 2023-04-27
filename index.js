const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'a4091f84',
      s: searchTerm
    }
  })

  console.log(response.data)
}

const input = document.querySelector('input')

const onInput = event => {
  fetchData(event.target.value)
}

input.addEventListener('input', debounce(onInput, 500))