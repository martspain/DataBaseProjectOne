import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import Album from '../../components/album/album'
import Artist from '../../components/artist/artist'
import Genre from '../../components/genre/genre'
import Playlist from '../../components/playlist/playlist'
import SongCard from '../../components/song-card/song-card'
import { search } from '../../services/searchService'
import styles from './search-results.css'

const SearchResults = ({ toFind }) => {
  const [data, setData] = useState([])
  const blankRegex = /(^$)/g
  const history = useHistory()

  useEffect(() => {
    if (blankRegex.test(toFind)) history.push('/')
    else search(toFind).then((res) => setData(res))
  }, [toFind])

  return (
    <div className={styles.container}>
      {
        data.map((result) => {
          switch (result.type) {
            case 'song':
              return (
                <div key={result.found.id}>
                  <p>Song</p>
                  <SongCard song={result.found} />
                </div>
              )
            case 'artist':
              return (
                <div key={result.found.id}>
                  <p>Artist</p>
                  <Artist id={result.found.id} artisticName={result.found.artistic_name} />
                </div>
              )
            case 'album':
              return (
                <div key={result.found.id}>
                  <p>Album</p>
                  <Album album={result.found} />
                </div>
              )
            case 'genre':
              return (
                <div key={result.found.id}>
                  <p>Genre</p>
                  <Genre id={result.found.id.toString()} name={result.found.name} />
                </div>
              )
            case 'playlist':
              return (
                <div key={result.found.id}>
                  <p>Playlist</p>
                  <Playlist playlist={result.found} />
                </div>
              )
            default:
              return (
                <div key="not found">
                  <p>No hay resultados</p>
                </div>
              )
          }
        })
      }
    </div>
  )
}

SearchResults.propTypes = {
  toFind: PropTypes.string.isRequired,
}

export default SearchResults
