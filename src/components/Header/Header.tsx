import React from "react";
import styles from "./Header.module.scss";

export function Header(): JSX.Element {
    return (
        <div className={styles.header}>
            <div className={styles.textContainer}>
                BROCOLLI & CO.
            </div>
        </div>
    )
}