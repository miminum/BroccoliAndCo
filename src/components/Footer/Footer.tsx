import React from "react";
import styles from "./Footer.module.scss";

export function Footer(): JSX.Element {
    return (
        <div className={styles.footer}>
            <div className={styles.textContainer}>
                Made with &#10084; in Melbourne.
                
            </div>
            <div className={styles.textContainer}>
                &copy; 2016 Brocolli & CO. All rights reserved.
            </div>
        </div>
    )
}