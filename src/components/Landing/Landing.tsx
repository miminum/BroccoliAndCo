import React from "react";
import styles from "./Landing.module.scss";

export function Landing(): JSX.Element {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);

    return (
        <div className={styles.landingContainer}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>A better way to enjoy every day.</h1>
                <h4 className={styles.subTitle}>Be the first to know when we launch.</h4>
                
                <div className={styles.buttonContainer}>
                    <button className={styles.button}>Request an invite</button>
                
                </div>
            </div>
        </div>
    )
}