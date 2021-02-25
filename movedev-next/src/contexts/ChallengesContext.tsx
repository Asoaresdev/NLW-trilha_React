import { createContext, useState, ReactNode, useEffect } from 'react'
import challenges from '../../challenges.json'


// "tipando" os dados dos desafios
interface Challenge{
    type:'body' | 'eye';
    description: string;
    amount: number
}

// "tipando" os dados gaurdados no contexto 
interface ChallengesContextData {
    level:number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge
    levelUp: ()=>void;
    startNewChallenge: () =>void
    resetChallenge: () => void
    completeChallenge: () => void
    experienceToNextLevel: number

}

// "tipando" o parametro children 
interface ChallengesProviderProps {
    children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children }:ChallengesProviderProps) {
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0) 
    const [activeChallenge, setActiveChallenge] = useState(null)

    // calculo do proximo nível baseado em jogo de rpg
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    //pedindo permissão para notificação
    useEffect(()=>{
        Notification.requestPermission()
    }, [])

    function levelUp(){
      setLevel(level + 1)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        //adicionando audio quando recebe um desafio
        new Audio('/notification.mp3').play()

        // executando notificação
        if(Notification.permission === 'granted') {
            new Notification ('Novo Desafio', {
                body: `Valendo ${challenge.amount} xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if(!activeChallenge) {
           return 
        }
        const { amount } = activeChallenge

        let finalExperience = currentExperience + amount

        if( finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }
        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }

    return(
    <ChallengesContext.Provider  
    value= {{ 
        level, 
        currentExperience,
        challengesCompleted, 
        levelUp, 
        startNewChallenge, 
        activeChallenge, 
        resetChallenge,
        experienceToNextLevel,
        completeChallenge
    }}
    >
       { children }
    </ChallengesContext.Provider>
)}