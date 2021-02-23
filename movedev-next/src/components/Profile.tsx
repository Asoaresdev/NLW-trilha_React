import styles from '../styles/components/Profile.module.css'

export function Profile(){
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/asoaresdev.png" alt="Asoaresdev"/>
        <div>
            <strong> Andréa Soares</strong>
            <p>
                <img src="icons/level.svg" alt="leve"/>
                Level 1
            </p>
        </div>
        </div>
    )
}