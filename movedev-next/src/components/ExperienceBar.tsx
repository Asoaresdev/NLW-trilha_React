import React from 'react'
import styles from '../styles/components/experienceBar.module.css'
export default function ExperienceBar() {
    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width:'50%'}}></div>
                <span className={styles.currentExperience}
                style={{left:'50%'}}
                >300xp
                </span>
            </div>
            <span>600xp</span>
        </header>
    )
}
