import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.css'




export function Countdown(){
    const {
        minutes, 
        seconds, 
        hasFinished, 
        isActive, 
        resetCountdown, 
        startcountdown} = useContext(CountdownContext)

    //transforma em string, usa dois caracteres,caso só tenha um o padStart coloca 0(zero) e o split devolve em array
    //const minutesTotal = String(minutes).padStart(2, '0').split('')
    //desestruturando
    const [minute1, minute2] = String(minutes).padStart(2, '0').split('')
    const [second1, second2] = String(seconds).padStart(2, '0').split('')

    

    return(
        <div>
            <div className= {styles.countdownContainer}>
                <div>
                    <span>{minute1}</span>
                    <span>{minute2}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{second1}</span>
                    <span>{second2}</span>
                </div>
            </div>

            { hasFinished ? (
                  <button 
                  disabled 
                  className={styles.countdownButton}
                  >
                  Ciclo encerrado
                  </button>
                ) :(
                <>
                {isActive ? (
                <button 
                onClick={resetCountdown}
                type="button" 
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                >
                Abandonar ciclo
                </button>
               
                ) : (
                <button 
                onClick={startcountdown}
                type="button" 
                className={styles.countdownButton}
                >
                Iniciar um ciclo
                </button>
                )}
                </>
            )}
        </div>
    )
}