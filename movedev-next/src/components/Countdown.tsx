import { useState, useEffect } from 'react'
import styles from '../styles/components/Countdown.module.css'

export function Countdown(){
    const [time, setTime] = useState(25 * 60)
    const [active, setActive] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    //transforma em string, usa dois caracteres,caso só tenha um o padStart coloca 0(zero) e o split devolve em array
    //const minutesTotal = String(minutes).padStart(2, '0').split('')
    //desestruturando
    const [minute1, minute2] = String(minutes).padStart(2, '0').split('')

    const [second1, second2] = String(seconds).padStart(2, '0').split('')

    
    function startcountdown() {
        setActive(true)
    }

    useEffect(()=> {
        if(active && time > 0){
            setTimeout(()=> {setTime(time-1)}, 1000)
        }
        
    }, [active, time])

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
            <button 
            onClick={startcountdown}
            type="button" 
            className={styles.countdownButton}>
                Iniciar ciclo
            </button>
        </div>
    )
}