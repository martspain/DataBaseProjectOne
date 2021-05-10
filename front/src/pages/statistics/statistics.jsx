import React from 'react'
import TextLight from '../../components/text-light/text-light'
import TEXTS from '../../services/texts'
import ArtistSalesByDate from './components/artist-sales-by-date/artist-sales-by-date'
import GenreSalesByDate from './components/genre-sales-by-date/genre-sales-by-date'
import LargestProductionArtists from './components/largest-production-artists/largest-production-artists'
import MostActiveAccounts from './components/most-active-accounts/most-active-accounts'
import MostPlayedSongsByArtist from './components/most-played-songs-by-artist/most-played-songs-by-artist'
import PopularArtists from './components/popular-artists/popular-artists'
import PopularGenres from './components/popular-genres/popular-genres'
import RecentAlbums from './components/recent-albums/recent-albums'
import SalesByDate from './components/sales-by-date/sales-by-date'
import SubscriptionCount from './components/subscription-count/subscription-count'
import styles from './statistics.css'

const Statistics = () => (
  <div className={styles.container}>
    <TextLight text="Statistics" type={TEXTS.SECTIONTITLE} />
    <div className={styles['stat-container']}>
      <RecentAlbums />
      <PopularArtists />
      <SubscriptionCount />
      <LargestProductionArtists />
      <PopularGenres />
      <MostActiveAccounts />
      <SalesByDate />
      <ArtistSalesByDate />
      <GenreSalesByDate />
      <MostPlayedSongsByArtist />
    </div>
  </div>
)

export default Statistics
