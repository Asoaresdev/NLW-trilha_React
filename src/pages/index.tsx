import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenge } from '../components/CompletedChalenge';
import { Countdown } from '../components/Countdown';
import ExperienceBar from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext'

import styles from '../styles/pages/Home.module.css'

interface HomeProps {
  level:number, 
  currentExperience:number, 
  challengesCompleted:number 
}

export default function Home(props:HomeProps) {
  console.log(props);
  
  return (
    <ChallengesProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
    <div className={styles.container}>

    <Head>
    <title>MoveDev</title>
    </Head>

    <ExperienceBar />
    <CountdownProvider>
      <section>
        <div>
          <Profile />
          <CompletedChallenge />
          <Countdown />
        </div>
        <div>
          <ChallengeBox />
        </div>
      </section>
    </CountdownProvider>
   </div>
   </ChallengesProvider>
  )
}

export const getServerSideProps:GetServerSideProps  = async(ctx) => {
  // const cookies = ctx.req.cookies
  //desestruturando
  const {level, currentExperience, challengesCompleted } = ctx.req.cookies
  return {
    props:{
      level: Number(level), 
      currentExperience: Number(currentExperience), 
      challengesCompleted: Number(challengesCompleted) 
    }
  }
}