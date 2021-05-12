import React, { useState, useEffect } from 'react'
import ButtonLight from '../../components/button-light/button-light'
import InputLight from '../../components/input-light/input-light'
import TextLight from '../../components/text-light/text-light'
import { getAllAlbums, updateAlbum } from '../../services/albumService'
import TEXTS from '../../services/texts'
import styles from './update-album.css'

const UpdateAlbum = () => {
  const [data, setData] = useState([])
  const [selected, setSelected] = useState({
    id: '',
    name: '',
    preview_url: '',
    active: '',
  })
  const [toFind, setToFind] = useState('')

  useEffect(() => {
    getAllAlbums().then((res) => setData(res))
  }, [data])

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

  const saveUpdates = (album) => {
    const newAlbum = {
      id: selected.id,
      values: [],
    }
    if (selected.name !== album.name) {
      newAlbum.values.push({
        field: 'name',
        value: selected.name,
      })
    }
    if (selected.preview_url !== album.preview_url) {
      newAlbum.values.push({
        field: 'preview_url',
        value: selected.preview_url,
      })
    }
    if (selected.active !== album.active) {
      newAlbum.values.push({
        field: 'active',
        value: selected.active,
      })
    }
    updateAlbum(newAlbum).then(() => {
      getAllAlbums().then((res) => setData(res))
    })
    setSelected({
      id: '',
      name: '',
      preview_url: '',
      active: '',
    })
  }

  return (
    <div className={styles.container}>
      <InputLight
        title="Search album:"
        type="text"
        name="search-album-to-update-spofity"
        value={toFind}
        onChange={handleInputChangeSearch}
        placeHolder="Enter name or artist to Find an Album"
      />
      {
        data.filter((album) => (
          album.name?.toLowerCase().includes(toFind.toLowerCase())
          || album.artists?.find((artist) => (
            artist.artistic_name.toLowerCase().includes(toFind.toLowerCase())
          ))
        )).map((album) => (
          (selected.id === album.id)
            ? (
              <div key={album.id} className={styles['album-update-container']}>
                <InputLight
                  title="Name"
                  type="text"
                  name="name"
                  value={selected.name}
                  onChange={handleInputChange}
                  placeHolder="Enter the new album name"
                />
                <InputLight
                  title="Is Active"
                  type="checkbox"
                  name="active"
                  value={album.active.toString()}
                  onChange={handleInputChange}
                  checked={selected.active}
                />
                <div className={styles['preview-url-container']}>
                  <TextLight text="Preview URL:" type={TEXTS.TITLE3} />
                  <img src={album.preview_url} alt="album cover" />
                  <textarea
                    name="preview_url"
                    value={selected.preview_url}
                    onChange={handleInputChange}
                    placeHolder="Enter de album cover preview URL"
                  />
                </div>
                <div>
                  <TextLight text="Artists:" type={TEXTS.TEXT} />
                  {
                    album.artists?.map((artist) => (
                      <div key={artist.artist_id}>
                        <TextLight text={artist.artistic_name} type={TEXTS.TEXT} />
                      </div>
                    ))
                  }
                </div>
                <ButtonLight text="Save" onClick={() => saveUpdates(album)} />
              </div>
            ) : (
              <div key={album.id} className={styles['album-update-container']}>
                <TextLight text={album.name} type={TEXTS.TITLE3} />
                <InputLight
                  title="Is Active"
                  type="checkbox"
                  name="active"
                  value={album.active.toString()}
                  onChange={handleInputChange}
                  disabled
                  checked={album.active}
                />
                <div className={styles['preview-url-container']}>
                  <TextLight text="Preview URL:" type={TEXTS.TITLE3} />
                  <img src={album.preview_url} alt="album cover" />
                  <TextLight text={album.preview_url} type={TEXTS.TEXT} />
                </div>
                <div>
                  <TextLight text="Artists:" type={TEXTS.TEXT} />
                  {
                    album.artists?.map((artist) => (
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
                        id: album.id,
                        name: album.name,
                        preview_url: album.preview_url,
                        active: album.active,
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

export default UpdateAlbum
