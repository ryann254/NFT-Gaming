import React, { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageHOC, CustomButton } from '../components';
import { useGlobalContext } from '../context';
import styles from '../styles';

type Props = {};

const JoinBattle = (props: Props): ReactElement => {
  const {
    gameData,
    walletAddress,
    setBattleName,
    contract,
    setShowAlert,
    setErrorMessage,
  } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    // @ts-ignore
    if (gameData.activeBattle.battleStatus === 1) {
      // @ts-ignore
      navigate(`/battle/${gameData.activeBattle.name}`);
    }
  }, [gameData]);

  const handleClick = async (battle: string) => {
    setBattleName(battle);

    try {
      await contract?.joinBattle(battle, {
        gasLimit: 200000,
      });

      setShowAlert({
        status: true,
        type: 'success',
        message: `Joining ${battle}`,
      });
    } catch (error) {
      setErrorMessage(error);
    }
  };
  return (
    <>
      <h2 className={styles.joinHeadText}>Available Battles:</h2>

      <div className={styles.joinContainer}>
        {gameData.pendingBattles.length ? (
          gameData.pendingBattles
            // @ts-ignore
            .filter((battle) => !battle.players.includes(walletAddress))
            .map((battle, index) => (
              // @ts-ignore
              <div key={battle.name + index} className={styles.flexBetween}>
                <p className={styles.joinBattleTitle}>
                  {/* @ts-ignore */}
                  {index + 1}. {battle.name}
                </p>
                <CustomButton
                  title='Join'
                  // @ts-ignore
                  handleClick={() => handleClick(battle.name)}
                />
              </div>
            ))
        ) : (
          <p className={styles.joinLoading}>
            Reload the page to see new battles
          </p>
        )}
      </div>

      <p className={styles.infoText} onClick={() => navigate('/create-battle')}>
        Or create a new battle
      </p>
    </>
  );
};

export default PageHOC(
  JoinBattle,
  <>
    Join <br /> a Battle
  </>,
  <>Join already existing battles</>
);
