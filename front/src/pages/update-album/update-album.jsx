import React, { useState, useEffect } from 'react'
import { getAllAlbums } from '../../services/albumService'
import styles from './update-album.css'

const UpdateAlbum = () => {
  const [data, setData] = useState([])
  const [selected, setSelected] = useState({
    id: '',
    name: '',
    preview_url: '',
    launch_date: '',
    active: '',
  })
  const [toFind, setToFind] = useState('')

  useEffect(() => {
    getAllAlbums().then((res) => setData(res))
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
    setSelected({
      id: '',
      name: '',
      active: true,
    })
  }
}

export default UpdateAlbum
