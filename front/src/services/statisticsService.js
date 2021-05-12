import axios from 'axios'
import URL from './url'

const NURL = `${URL}/statistics`

const recentAlbums = async () => {
  let data = null
  await axios.get(`${NURL}/recentAlbums`).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

const popularArtists = async () => {
  let data = null
  await axios.get(`${NURL}/popularArtists`).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

const subscriptionCount = async () => {
  let data = null
  await axios.get(`${NURL}/subscriptionCount`).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

const largestProductionArtists = async () => {
  let data = null
  await axios.get(`${NURL}/largestProductionArtists`).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

const popularGenres = async () => {
  let data = null
  await axios.get(`${NURL}/popularGenres`).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

const mostActiveAccounts = async () => {
  let data = null
  await axios.get(`${NURL}/mostActiveAccounts`).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

const salesByDate = async (dates) => {
  let data = null
  await axios.post(`${NURL}/salesByDate`, { dates }).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

const NartistSalesByDate = async (dates, limit) => {
  let data = null
  await axios.post(`${NURL}/NartistSalesByDate`, { dates, limit }).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

const genreSalesByDate = async (dates) => {
  let data = null
  await axios.post(`${NURL}/genreSalesByDate`, { dates }).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

const mostPlayedSongsByArtist = async (artistId, limit) => {
  let data = null
  await axios.post(`${NURL}/mostPlayedSongsByArtist`, { artist_id: artistId, limit }).then((res) => {
    data = res.data
  }).catch((error) => {
    data = { message: error.message }
  })
  return data
}

export {
  recentAlbums,
  popularArtists,
  largestProductionArtists,
  popularGenres,
  mostActiveAccounts,
  subscriptionCount,
  salesByDate,
  NartistSalesByDate,
  genreSalesByDate,
  mostPlayedSongsByArtist,
}
