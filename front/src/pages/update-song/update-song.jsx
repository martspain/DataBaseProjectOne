import React, { useState, useEffect } from 'react'
import ButtonLight from '../../components/button-light/button-light'
import InputLight from '../../components/input-light/input-light'
import TextLight from '../../components/text-light/text-light'
import { getAllSongs, updateSong } from '../../services/songService'
import TEXTS from '../../services/texts'
import styles from './update-song.css'

const UpdateSong = () => {
  const [data, setData] = useState([])
  const [selected, setSelected] = useState({
    id: '',
    name: '',
    active: true,
  })
  const [toFind, setToFind] = useState('')

  useEffect(() => {
    getAllSongs().then((res) => setData(res))
  }, [])

  const handleInputChangeSearch = (event) => {
    const { value } = event.target
    setToFind(value)
  }

  const handleInputChange = (event) => {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value
    const { name } = target
    setSelected({
      ...selected,
      [name]: value,
    })
  }

  const saveUpdates = () => {
    updateSong({
      id: selected.id,
      values: [
        {
          field: 'name',
          value: selected.name,
        },
        {
          field: 'active',
          value: selected.active,
        },
      ],
    }).then((res) => {
      console.log(res)
    })
    setSelected({
      id: '',
      name: '',
      active: true,
    })
  }

  return (
    <div className={styles.container}>
      <InputLight
        title="Search song:"
        type="text"
        name="search-song-to-update-spofity"
        value={toFind}
        onChange={handleInputChangeSearch}
        placeHolder="Enter name, album or artist to Find a Song"
      />
      {
        data.filter((song) => (
          song.name?.toLowerCase().includes(toFind.toLowerCase())
          || song.album?.toLowerCase().includes(toFind.toLowerCase())
          || song.artists?.find((artist) => (
            artist.artistic_name.toLowerCase().includes(toFind.toLowerCase())
          ))))
          .map((song) => (
            (selected.id === song.id)
              ? (
                <div key={song.id} className={styles['song-update-container']}>
                  <InputLight
                    title="Name"
                    type="text"
                    name="name"
                    value={selected.name}
                    onChange={handleInputChange}
                    placeHolder="Enter the new song name"
                  />
                  <InputLight
                    title="Is Active"
                    type="checkbox"
                    name="active"
                    value={song.active.toString()}
                    onChange={handleInputChange}
                    checked={selected.active}
                  />
                  <div>
                    <TextLight text="Album:" type={TEXTS.TEXT} />
                    <img src={song.cover} alt="album cover" />
                    <TextLight text={song.album} type={TEXTS.TEXT} />
                  </div>
                  <div>
                    {
                    song.artists?.map((artist) => (
                      <div key={artist.artist_id}>
                        <TextLight text={artist.artistic_name} type={TEXTS.TEXT} />
                      </div>
                    ))
                  }
                  </div>
                  <ButtonLight text="Save" onClick={saveUpdates} />
                </div>
              ) : (
                <div key={song.id} className={styles['song-update-container']}>
                  <TextLight text={song.name} type={TEXTS.TITLE3} />
                  <InputLight
                    title="Is Active"
                    type="checkbox"
                    name="active"
                    value={song.active.toString()}
                    onChange={handleInputChange}
                    disabled
                    checked={song.active}
                  />
                  <div>
                    <img src={song.cover} alt="album cover" />
                    <TextLight text={song.album} type={TEXTS.TEXT} />
                  </div>
                  <div>
                    <TextLight text="Artists:" type={TEXTS.TEXT} />
                    {
                    song.artists?.map((artist) => (
                      <div key={artist.artist_id}>
                        <TextLight text={artist.artistic_name} type={TEXTS.TEXT} />
                      </div>
                    ))
                  }
                  </div>
                  {
                  (selected.id === '')
                  && (
                  <ButtonLight
                    text="Edit"
                    onClick={() => {
                      setSelected({
                        id: song.id,
                        name: song.name,
                        active: song.active,
                      })
                    }}
                  />
                  )
                }
                </div>
              )
          ))
      }
    </div>
  )
}

export default UpdateSong
