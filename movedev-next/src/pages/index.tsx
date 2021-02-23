import Head from 'next/head'
import { CompletedChallenge } from '../components/CompletedChalenge';
import { Countdown } from '../components/Countdown';
import ExperienceBar from "../components/ExperienceBar";
import { Profile } from '../components/Profile';


import styles from '../styles/pages/Home.module.css'
export default function Home() {
  return (
    <div className={styles.container}>
    <Head>
    <title>MoveDev</title>
    </Head>
    <ExperienceBar />
    <section>
      <div>
        <Profile />
        <CompletedChallenge />
        <Countdown />
      </div>
      <div>
        
      </div>
    </section>
   </div>
  )
}