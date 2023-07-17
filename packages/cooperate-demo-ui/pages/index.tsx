import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { ClaimNFTButton } from 'components/claim-nft-button'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <ClaimNFTButton />
    </div>
  )
}

export default Home
