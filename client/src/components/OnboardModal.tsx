// @ts-nocheck
import { useState, useEffect } from 'react';
import Modal from 'react-modal';

import styles from '../styles';
import { CustomButton } from '.';
import { useGlobalContext } from '../context';
import { GetParams, SwitchNetwork } from '../utils/onboard.js';
import { useNavigate } from 'react-router-dom';

const OnboardModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { updateCurrentWalletAddress } = useGlobalContext();
  const [step, setStep] = useState(-1);
  const navigate = useNavigate();

  async function resetParams() {
    const currentStep = await GetParams();
    if (currentStep.step === 0) {
      navigate('/landing-page');
      setIsOpen(false);
    } else {
      setStep(currentStep.step);
      setIsOpen(currentStep.step !== -1);
    }
  }

  useEffect(() => {
    resetParams();

    window?.ethereum?.on('chainChanged', () => {
      resetParams();
    });

    window?.ethereum?.on('accountsChanged', () => {
      resetParams();
    });
  }, []);

  const generateStep = (st) => {
    switch (st) {
      case 0:
        return (
          <>
            <p className={styles.modalText}>
              You don't have Core Wallet installed!
            </p>
            <CustomButton
              title='Download Core'
              handleClick={() => window.open('https://core.app/', '_blank')}
            />
          </>
        );

      case 1:
        return (
          <>
            <p className={styles.modalText}>
              You haven't connected your account to Core Wallet!
            </p>
            <CustomButton
              title='Connect Account'
              handleClick={updateCurrentWalletAddress}
            />
          </>
        );

      case 2:
        return (
          <>
            <p className={styles.modalText}>
              You're on a different network. Switch to Fuji C-Chain.
            </p>
            <CustomButton title='Switch' handleClick={SwitchNetwork} />
          </>
        );

      case 3:
        return (
          <>
            <p className={styles.modalText}>
              Oops, you don't have AVAX tokens in your account
            </p>
            <CustomButton
              title='Grab some test tokens'
              handleClick={() =>
                window.open('https://faucet.avax.network/', '_blank')
              }
            />
          </>
        );

      default:
        return <p className={styles.modalText}>Good to go!</p>;
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      className={`absolute inset-0 ${styles.flexCenter} flex-col ${styles.glassEffect}`}
      overlayClassName='Overlay'
      ariaHideApp={false}
    >
      {generateStep(step)}
    </Modal>
  );
};

export default OnboardModal;
