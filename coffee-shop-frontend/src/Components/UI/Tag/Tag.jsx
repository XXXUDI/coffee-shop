import React from 'react';
import styles from "./styles.module.css";

export const Tag = ({text}) => {
    return (
        <div className={styles.tag}>
            <p>{text}</p>
        </div>
    );

}