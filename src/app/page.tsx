"use client";
import { useState } from 'react';
import styles from '../styles/Home.module.scss';

export default function Home() {
  const prizes = ['Prize 1', 'Prize 2', 'Prize 3', 'Prize 4', 'Prize 5', 'Prize 6', 'Prize 7', 'Prize 8', 'Prize 9', 'Prize 10', 'Prize 11', 'Prize 12'];
  const [name, setName] = useState(styles.circle);
  const [stoppedIndex, setStoppedIndex] = useState<number | null>(null);
  const [hasSpinStarted, setSpinStarted] = useState(false);

  const startSpinning = () => {
    setSpinStarted(true);
    setStoppedIndex(null);
    setName(`${styles.circle} ${styles.spin}`);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * prizes.length);
      setStoppedIndex(randomIndex);
      setName(`${styles.circle} ${styles.spin} ${styles.stopSpin}`);
      setSpinStarted(false);
    }, Math.floor(Math.random() * 10000) + 1);
  }

  const getDegrees = (idx: number) => {
    return (360 / prizes.length) * idx;
  }

  return (
    <main>
      <h1 className={styles.heading}>Spin the wheel to win prizes</h1>
      <ul className={name}>
        {prizes.map((prize, idx) => (
          <li
            key={idx}
            className={`${styles.listItem} ${stoppedIndex === idx ? styles.stopped : ''}`}
            style={{
              transform: `rotate(${getDegrees(idx)}deg) skewY(-60deg)`
            }}
          >
            <div className={styles.text}>{prize}</div>
          </li>
        ))}
      </ul>
      <div className={styles.center}>
        <button
          className={styles.spinBtn}
          onClick={startSpinning}
          disabled={hasSpinStarted}
        >spin the wheel</button>
        {stoppedIndex !== null && (
          <div className={styles.result}>Congratulations! You won: <strong>{prizes[stoppedIndex]}</strong></div>
        )}
      </div>
    </main>
  )
}
