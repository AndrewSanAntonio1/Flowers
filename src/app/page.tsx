'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect, useRef } from "react";

interface Flower {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
  rotation: number;
}

const flowerEmojis = ['🌸', '🌺', '🌼', '🌻', '🌷', '🌹', '🏵️', '💐'];

export default function Home() {
  const [yesSize, setYesSize] = useState(12);
  const [noClicks, setNoClicks] = useState(0);
  const [showFrame2, setShowFrame2] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const flowerIdRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleScreenClick = (e: React.MouseEvent) => {
    const newFlowers: Flower[] = Array.from({ length: 6 }, () => ({
      id: flowerIdRef.current++,
      x: e.clientX + (Math.random() - 0.5) * 80,
      y: e.clientY + (Math.random() - 0.5) * 80,
      emoji: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
      size: Math.random() * 20 + 20,
      rotation: Math.random() * 360,
    }));
    setFlowers(prev => [...prev, ...newFlowers]);
    setTimeout(() => {
      setFlowers(prev => prev.filter(f => !newFlowers.find(n => n.id === f.id)));
    }, 1000);
  };

  const handleNoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (noClicks < 5) {
      setYesSize(prev => prev + 5);
      setNoClicks(prev => prev + 1);
    }
  };

  const handleYesClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFrame2(true);
  };

  if (isLoading) {
    return (
      <main className={styles.loadingPage}>
        <video
          className={styles.loadingVideo}
          autoPlay
          muted
          playsInline
          onEnded={() => setIsLoading(false)}
        >
          <source src="/video/loading.mp4" type="video/mp4" />
        </video>
      </main>
    );
  }

  if (showFrame2) {
    return (
      <main className={styles.galleryPage} onClick={handleScreenClick}>
        {flowers.map(flower => (
          <span
            key={flower.id}
            className={styles.clickFlower}
            style={{
              left: flower.x,
              top: flower.y,
              fontSize: flower.size,
              transform: `rotate(${flower.rotation}deg)`,
            }}
          >
            {flower.emoji}
          </span>
        ))}
        <div className={styles.galleryHeader}>
          <h1 className={styles.galleryTitle}>My Eunoni 💕</h1>
          <p className={styles.gallerySubtitle}>Forever and always ✨</p>
        </div>
        <div className={styles.galleryGrid}>
          <div className={styles.galleryItem}>
            <div className={styles.flipCard}>
              <div className={styles.flipCardInner}>
                <div className={styles.flipCardFront}>
                  <Image src="/images/eunice/1.png" alt="Memory 1" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.flipCardBack}>
                  <p>First moment I knew you were special 💕</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.galleryItem}>
            <div className={styles.flipCard}>
              <div className={styles.flipCardInner}>
                <div className={styles.flipCardFront}>
                  <Image src="/images/eunice/2.png" alt="Memory 2" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.flipCardBack}>
                  <p>Your smile makes my day brighter ✨</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.galleryItem}>
            <div className={styles.flipCard}>
              <div className={styles.flipCardInner}>
                <div className={styles.flipCardFront}>
                  <Image src="/images/eunice/3.png" alt="Memory 3" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.flipCardBack}>
                  <p>Every moment with you is precious 💖</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.galleryItem}>
            <div className={styles.flipCard}>
              <div className={styles.flipCardInner}>
                <div className={styles.flipCardFront}>
                  <Image src="/images/eunice/4.png" alt="Memory 4" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.flipCardBack}>
                  <p>You&apos;re my favorite person 🌸</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.galleryItem}>
            <div className={styles.flipCard}>
              <div className={styles.flipCardInner}>
                <div className={styles.flipCardFront}>
                  <Image src="/images/eunice/5.png" alt="Memory 5" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.flipCardBack}>
                  <p>Together is my favorite place to be 💗</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.galleryItem}>
            <div className={styles.flipCard}>
              <div className={styles.flipCardInner}>
                <div className={styles.flipCardFront}>
                  <Image src="/images/eunice/6.png" alt="Memory 6" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.flipCardBack}>
                  <p>Forever starts with you 💕</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.floatingHearts}>
          <span>💕</span>
          <span>💖</span>
          <span>💗</span>
          <span>💝</span>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page} onClick={handleScreenClick}>
      {flowers.map(flower => (
        <span
          key={flower.id}
          className={styles.clickFlower}
          style={{
            left: flower.x,
            top: flower.y,
            fontSize: flower.size,
            transform: `rotate(${flower.rotation}deg)`,
          }}
        >
          {flower.emoji}
        </span>
      ))}
      <Image
        className={styles.frameBackground}
        src="/images/frame.png"
        alt=""
        fill
        priority
        style={{ objectFit: 'cover' }}
      />
      <div className={styles.headerContainer}>
        <h1 className={styles.headerText}>Letter from my heart</h1>
      </div>
      <div className={styles.artworkStage}>
        <Image
          className={styles.backgroundImage}
          src="/images/background-design.png"
          alt=""
          width={1200}
          height={600}
          priority
        />
        <div className={styles.flowerContainer}>
          <div className={styles.flowerScroll}>
            <span className={styles.flower}>🌸</span>
            <span className={styles.flower}>🌺</span>
            <span className={styles.flower}>🌼</span>
            <span className={styles.flower}>🌻</span>
            <span className={styles.flower}>🌷</span>
            <span className={styles.flower}>🌹</span>
            <span className={styles.flower}>🏵️</span>
            <span className={styles.flower}>🌸</span>
            <span className={styles.flower}>🌺</span>
            <span className={styles.flower}>🌼</span>
            <span className={styles.flower}>🌻</span>
            <span className={styles.flower}>🌷</span>
            <span className={styles.flower}>🌹</span>
            <span className={styles.flower}>🏵️</span>
          </div>
        </div>
        <div className={styles.questionContainer}>
          <p className={styles.questionText}>Will you stay with me always?</p>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.yesButton}
            style={{
              padding: `clamp(10px, ${yesSize}px, 24px) clamp(20px, ${yesSize * 3}px, 64px)`,
              fontSize: `clamp(0.9rem, ${yesSize / 10}rem, 1.2rem)`
            }}
            onClick={handleYesClick}
          >
            Yes!
          </button>
          {noClicks < 5 && (
            <button
              className={styles.noButton}
              onClick={handleNoClick}
            >
              No
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
