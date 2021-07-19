import React from 'react';
import styles from './App.module.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Landing } from './components/Landing/Landing';

function App() {
    return (
        <div className={styles.app}>
            <Header />
            <Landing />
            <Footer />
        </div>
    );
}

export default App;
