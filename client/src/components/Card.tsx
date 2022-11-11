import React from 'react';
import Tilt from 'react-parallax-tilt';

import styles from '../styles';
import { allCards } from '../assets';
import { IPlayer } from '../page/Battle';

type Props = {
  card: IPlayer | undefined;
  title: string | undefined;
  cardRef: string;
  restStyles?: string;
  playerTwo?: boolean;
};

const generateRandomCardImage = () =>
  allCards[Math.floor(Math.random() * (allCards.length - 1))];

const img1 = generateRandomCardImage();
const img2 = generateRandomCardImage();

const Card = ({ card, title, cardRef, restStyles, playerTwo }: Props) => {
  return (
    <Tilt>
      <div className={`${styles.cardContainer} ${restStyles}`}>
        <img
          src={playerTwo ? img2 : img1}
          alt='card'
          className={styles.cardImg}
        />

        <div
          className={`${styles.cardPointContainer} sm:left-[27.2%] left-[29%] ${styles.flexCenter}`}
        >
          <p className={`${styles.cardPoint} text-yellow-400`}>{card?.att}</p>
        </div>
        <div
          className={`${styles.cardPointContainer} sm:right-[22.5%] right-[25%] ${styles.flexCenter}`}
        >
          <p className={`${styles.cardPoint} text-red-700`}>{card?.def}</p>
        </div>

        <div className={`${styles.cardTextContainer} ${styles.flexCenter}`}>
          <p className={styles.cardText}>{title}</p>
        </div>
      </div>
    </Tilt>
  );
};

export default Card;
