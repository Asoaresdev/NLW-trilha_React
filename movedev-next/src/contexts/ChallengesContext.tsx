import { createContext, useState, ReactNode, useEffect } from 'react'
import challenges from '../../challenges.json'
import Cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal'


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
    closeLevelUpModal: () => void

}

// "tipando" o parametro children 
interface ChallengesProviderProps {
    children: ReactNode,
    level:number, 
    currentExperience:number, 
    challengesCompleted:number 
}


export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ 
    children, 
    ...rest
}:ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0) 
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelModalOpen] = useState(false)

    // calculo do proximo nível baseado em jogo de rpg
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    //pedindo permissão para notificação
    useEffect(()=>{
        Notification.requestPermission()
    }, [])

    useEffect(()=>{
        //Cookies só aceita parâmetro em formato de string
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExperience, challengesCompleted])

    function levelUp(){
        setLevel(level + 1)
        setIsLevelModalOpen(true)
    }

    function closeLevelUpModal() {
        setIsLevelModalOpen(false)
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
        completeChallenge,
        closeLevelUpModal
    }}
    >
       { children }
      { isLevelUpModalOpen && <LevelUpModal />} 
    </ChallengesContext.Provider>
)}