import React from "react";
import styles from "./Landing.module.scss";
import ReactModal from 'react-modal';

export function Landing(): JSX.Element {

    // State
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string | null>(null);
    const [email, setEmail] = React.useState<string | null>(null);
    const [emailConfirmation, setEmailConfirmation] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isSuccess, setIsSucess] = React.useState<boolean>(false);

    // Functions
    const onSend = () => {
        // console.log("Landing.tsx onSend() called")

        setError(null);
        // Validate name is not null
        if (!name || !email || !emailConfirmation) {
            setError("Error: Please include all fields"); 
            return;
        }

        // Validates that emails are valid
        if (!validateEmail(email)) {
            setError("Error: Invalid email")
            return;
        }

        // Validate that emails match
        if (email !== emailConfirmation) {
            setError("Error: Emails do not match");
            return;
        }

        // Send
        postUserDetails();
    }

    const validateEmail = (email: string): boolean => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // This should be in a service class, but ran out of time
    const postUserDetails = async (): Promise<void> => {
        setIsLoading(true);
        const axios = (await import(/* webpackChunkName: 'axios-bundle' */"axios")).default;
        const payload = {
            "name": name,
            "email": email
        }

        axios.post("https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth", payload).then(resp => {
            setIsLoading(false);
            setIsSucess(true);
        }).catch(err => {
            setIsLoading(false);
            const errorMessage: string = `Error: ${err?.response?.data?.errorMessage}` || "Error: There was an issue with your request."
            setError(errorMessage)
        });
    }

    const closeModal = () => {
        setModalOpen(false);
        setIsSucess(false);
        setName(null);
        setEmail(null);
        setEmailConfirmation(null);
        setIsLoading(false);
        setError(null);
    }

    return (
        <div className={styles.landingContainer}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>A better way to enjoy every day.</h1>
                <h4 className={styles.subTitle}>Be the first to know when we launch.</h4>
                
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={()=> {
                        setModalOpen(true);
                    }}>
                        Request an invite
                    </button>
                
                </div>
            </div>
            <ReactModal 
                isOpen={modalOpen}
                // style={customStyles}
                onRequestClose={() => closeModal()}
                className={styles.modal}
                ariaHideApp={false}
            >
                { !isSuccess ? 
                    <div className={styles.formContainer}>
                        <h3 className={styles.formHeader}>Request an invite</h3>
                        <hr className={styles.lineBreak}/>
                        <input className={styles.input} placeholder="Full Name" type="text" onChange={ev => setName(ev.target.value)} value={name || undefined}/>
                        <input className={styles.input} placeholder="Email" type="email"  onChange={ev => setEmail(ev.target.value)} value={email || undefined}/>
                        <input className={styles.input} placeholder="Confirm Email" type="email"  onChange={ev => setEmailConfirmation(ev.target.value)} value={emailConfirmation || undefined}/>
                        <button className={styles.submitButton} onClick={(ev)=> onSend()} disabled={isLoading}>
                            {isLoading ? "Loading, please wait..." : "Send"}
                        </button>
                        {
                            error && <div className={styles.errorMessage}>{error}</div>
                        }
                    </div>
                : 
                    <div className={styles.formContainer}>
                        <h3 className={styles.formHeader}>All done!</h3>
                        <hr className={styles.lineBreak}/>
                        <div className={styles.succesText}>
                            You will be one of the first to experience Brocolli and Co. when we launch.
                        </div>

                        <button className={styles.submitButton} onClick={(ev)=> closeModal()} disabled={isLoading}>
                            Ok
                        </button>
                    </div>
                    }
            </ReactModal>
        </div>
    )

}