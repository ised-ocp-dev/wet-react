import React from 'react';
import Modal from '@components/Modal';
import Button from '@components/Button';
import ContainerRB from 'react-bootstrap/Container';
import RowRB from 'react-bootstrap/Row';
import ColRB from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faShareFromSquare as shareIcon,
  faEnvelopeSquare as emailIcon,
  faX as xMark,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookSquare as facebookIcon,
  faBlogger as bloggerIcon,
  faLinkedin as linkedInIcon,
  faTwitterSquare as twitterIcon,
  faPinterestSquare as pinterestIcon,
  faRedditSquare as redditIcon,
  faTumblrSquare as tumblrIcon,
  faWhatsappSquare as whatsappIcon,
  faYahoo as yahooIcon,
} from '@fortawesome/free-brands-svg-icons';
import '../../style.css';

interface ShareButtonProps {
  name: string;
  icon: IconDefinition;
  url: string;
}

interface ShareButtonsProps {
  filter: string[];
  customShareButtonsProps: ShareButtonProps[];
  url: string;
}

export interface ShareWidgetProps extends React.HTMLAttributes<HTMLElement> {
  /** The label for the link that opens the ShareWidget modal. */
  shareLinkText: string;
  /** Title displayed in the ShareWidget modal. */
  modalTitle: string;
  /** List of the default share buttons you wish display. List can include: Email, Facebook, Blogger, LinkedIn, Pinterest, reddit, tumblr, WhatsApp, Yahoo Mail, Twitter. Filter names are case sensitive. */
  filter?: string[];
  /** List of objects containing the following props: 'name' of type string, 'icon' of type IconDefinition, and 'url' of type string. The 'url' prop should be a functional sharable link rahter than a link to content you wish to share. */
  customShareButtonsProps?: ShareButtonProps[];
  /** Link to the content you wish to share. Required if the 'filter' prop is defined. */
  url?: string;
  /** Translate the component's text to French. */
  french?: boolean;
}

const ShareButton = ({ name, icon, url }: ShareButtonProps) => (
  <Button href={url} size="lg" style={{ width: '100%', marginBottom: 10 }}>
    <FontAwesomeIcon icon={icon} />
    {` ${name}`}
  </Button>
);

const ShareButtons = ({
  filter,
  customShareButtonsProps,
  url,
}: ShareButtonsProps) => {
  const defaultShareButtonsProps: ShareButtonProps[] = [
    {
      name: 'Email',
      icon: emailIcon,
      url: `mailto:?body=${url}`,
    },
    {
      name: 'Facebook',
      icon: facebookIcon,
      url: `http://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      name: 'Blogger',
      icon: bloggerIcon,
      url: `https://www.blogger.com/blog-this.g?t=${url}`,
    },
    {
      name: 'LinkedIn',
      icon: linkedInIcon,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    },
    {
      name: 'Pinterest',
      icon: pinterestIcon,
      url: `http://pinterest.com/pin/create/link/?url=${url}`,
    },
    {
      name: 'reddit',
      icon: redditIcon,
      url: `https://reddit.com/submit?url=${url}`,
    },
    {
      name: 'tumblr',
      icon: tumblrIcon,
      url: `https://www.tumblr.com/share/link?url=${url}`,
    },
    {
      name: 'WhatsApp',
      icon: whatsappIcon,
      url: `https://api.whatsapp.com/send?text=${url}`,
    },
    {
      name: 'Yahoo Mail',
      icon: yahooIcon,
      url: `https://compose.mail.yahoo.com/?body=${url}`,
    },
    {
      name: 'Twitter',
      icon: twitterIcon,
      url: `https://twitter.com/intent/tweet?text=${url}`,
    },
  ];

  const shareButtons: React.ReactElement[] = [];

  defaultShareButtonsProps.forEach((value) => {
    if (filter.includes(value.name)) {
      shareButtons.push(
        <ShareButton
          icon={value.icon}
          name={value.name}
          url={value.url}
          key={value.name}
        />
      );
    }
  });

  customShareButtonsProps.forEach((value) => {
    shareButtons.push(
      <ShareButton
        icon={value.icon}
        name={value.name}
        url={value.url}
        key={value.name}
      />
    );
  });

  const half: number = Math.ceil(shareButtons.length / 2);

  return (
    <RowRB>
      <ColRB lg={6} md={6} sm={6} xl={6} xs={6} xxl={6}>
        {shareButtons.slice(0, half)}
      </ColRB>
      <ColRB lg={6} md={6} sm={6} xl={6} xs={6} xxl={6}>
        {shareButtons.slice(half)}
      </ColRB>
    </RowRB>
  );
};

const ShareWidget = ({
  filter = [],
  customShareButtonsProps = [],
  french = false,
  url = '',
  shareLinkText,
  modalTitle,
  ...rest
}: ShareWidgetProps) => {
  const [showModal, setShowModal] = React.useState(false);
  const disclaimer = french
    ? 'Aucun appui n’est accordé, soit de façon expresse ou tacite, à aucun produit ou service.'
    : 'No endorsement of any products or services is expressed or implied.';
  const closeLabel = french ? 'Fermer' : 'Close';

  return (
    <>
      {/* Link that opens the modal */}
      <Button variant="link" onClick={() => setShowModal(true)}>
        <FontAwesomeIcon icon={shareIcon} />
        {` ${shareLinkText}`}
      </Button>

      {/* Modal containing the share buttons */}
      <Modal
        show={showModal}
        animation={false}
        centered
        onHide={() => setShowModal(false)}
        {...rest}
      >
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContainerRB fluid>
            <ShareButtons
              filter={filter}
              customShareButtonsProps={customShareButtonsProps}
              url={url}
            />
            <RowRB>{disclaimer}</RowRB>
          </ContainerRB>
        </Modal.Body>
        <Modal.Footer style={{ display: 'flex' }}>
          <Button
            variant="primary"
            onClick={() => setShowModal(false)}
            style={{ left: 0 }}
          >
            {closeLabel}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShareWidget;
