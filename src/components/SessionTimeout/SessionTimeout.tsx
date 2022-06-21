import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '@components/Button';
import '../../style.css';

export interface SessionTimeoutProps extends React.HTMLAttributes<HTMLElement> {
  /** Sets the inactivity timeout. Once this expires, the plugin's modal dialog will appear and prompt the user to continue or end their session */
  inactivityTime?: number;
  /** Sets the period of time before the plugin's modal dialog will appear and prompt the user to continue or end their session, regardless of activity */
  sessionTime?: number;
  /** Sets the period of time the user has to perform an action once the modal dialog is displayed */
  reactionTime?: number;
  /** URL that users are sent to when their session has expired */
  logoutURL?: string;
  /** Makes the session timeout modal popup french */
  french?: boolean;
}

const SessionTimeout = ({
  inactivityTime = 15 * 60,
  sessionTime = 30 * 60,
  reactionTime = 3 * 60,
  logoutURL = '',
  french = false,
}: SessionTimeoutProps) => {
  const [show, setShow] = React.useState(false);
  let inactivityTimer: NodeJS.Timeout;
  let sessionTimer: NodeJS.Timeout;
  let reactionTimer: NodeJS.Timeout;

  function resetInactivity() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      setShow(true);
    }, inactivityTime * 1000);
  }

  React.useEffect(() => {
    clearTimeout(reactionTimer);
    if (show) {
      reactionTimer = setTimeout(() => {
        window.location.href = logoutURL;
      }, reactionTime * 1000);
    } else {
      resetInactivity();
      sessionTimer = setTimeout(() => {
        setShow(true);
      }, sessionTime * 1000);
    }
  }, [show]);

  React.useEffect(() => {
    document.onmousemove = () => resetInactivity();
    document.onkeydown = () => resetInactivity();
    return () => {
      clearTimeout(inactivityTimer);
      clearTimeout(sessionTimer);
      clearTimeout(reactionTimer);
      document.removeEventListener('mousemove', resetInactivity);
      document.removeEventListener('keydown', resetInactivity);
    };
  }, [resetInactivity]);

  return (
    <Modal
      show={show}
      centered
      animation={false}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header style={{ background: '#2e5274', color: 'white' }}>
        <Modal.Title>
          {french
            ? "Avertissement d'expiration de la session"
            : 'Session timeout warning'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {french
          ? 'Votre session expirera automatiquement prochainement.'
          : 'Your session will expire automatically soon.'}
        <br />
        {french
          ? 'Sélectionner « Continuer la session » pour prolonger votre session.'
          : 'Select "Continue session" to extend your session.'}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            setShow(false);
            clearTimeout(reactionTimer);
          }}
        >
          {french ? 'Continuer la session' : 'Continue session'}
        </Button>
        <Button
          variant="default"
          onClick={() => {
            window.location.href = logoutURL;
          }}
        >
          {french ? 'Mettre fin à la session' : 'End session now'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SessionTimeout;
