import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Countdown.module.css'


let countdownTimeout : NodeJS.Timeout //variavel criada para não ter delay quando interrompe o ciclo

export function Countdown(){
    const { startNewChallenge } = useContext(ChallengesContext) 
    
    
    const [time, setTime] = useState(0.1 * 60)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinishid] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    //transforma em string, usa dois caracteres,caso só tenha um o padStart coloca 0(zero) e o split devolve em array
    //const minutesTotal = String(minutes).padStart(2, '0').split('')
    //desestruturando
    const [minute1, minute2] = String(minutes).padStart(2, '0').split('')
    const [second1, second2] = String(seconds).padStart(2, '0').split('')

    
    function startcountdown() {
        setIsActive(true)
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setTime (25*60)
    }

    useEffect(()=> {
        if(isActive && time > 0){
            countdownTimeout = setTimeout(()=> {setTime(time-1)}, 1000)
        }else if(isActive && time === 0){
            setHasFinishid(true)
            setIsActive(false)
            startNewChallenge()
        }
        
    }, [isActive, time])

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