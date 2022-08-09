import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import ShareWidget from '@components/ShareWidget';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

describe('ShareWidget Tests', () => {
  describe('ShareWidget Filter', () => {
    test('ShareWidget no filter test', () => {
      render(
        <ShareWidget shareLinkText="Share link text" modalTitle="Modal title" />
      );
      expect(screen.getAllByRole('button')).toHaveLength(1);
      fireEvent.click(screen.getByText('Share link text'));
      expect(screen.getAllByRole('button')).toHaveLength(3);
    });
    test('ShareWidget filter test', () => {
      render(
        <ShareWidget
          shareLinkText="Share link text"
          modalTitle="Modal title"
          filter={[
            'Email',
            'Facebook',
            'Blogger',
            'LinkedIn',
            'Pinterest',
            'reddit',
            'tumblr',
            'WhatsApp',
            'Yahoo Mail',
            'Twitter',
          ]}
        />
      );
      fireEvent.click(screen.getByText('Share link text'));
      expect(screen.getAllByRole('button')).toHaveLength(13);
      fireEvent.click(screen.getAllByRole('button')[1]);
      expect(screen.getAllByRole('button')).toHaveLength(1);
      fireEvent.click(screen.getByText('Share link text'));
      expect(screen.getAllByRole('button')).toHaveLength(13);
      fireEvent.click(
        (
          screen.getAllByRole('button')[1]?.parentNode?.parentNode?.parentNode
            ?.parentNode?.parentNode as Element
        ).childNodes[1]
      );
      expect(screen.getAllByRole('button')).toHaveLength(1);
    });

    describe('ShareWidget Custom Share Buttons', () => {
      test('ShareWidget custom share buttons test', () => {
        render(
          <ShareWidget
            shareLinkText="Share link text"
            modalTitle="Modal title"
            customShareButtonsProps={[
              {
                name: 'Platform 1',
                icon: faGlobe,
                url: 'http://example.com',
              },
              {
                name: 'Platform 2',
                icon: faGlobe,
                url: 'http://example.com',
              },
            ]}
          />
        );
        fireEvent.click(screen.getByText('Share link text'));
        expect(screen.getAllByRole('button')).toHaveLength(5);
      });
    });

    describe('ShareWidget French Labels', () => {
      test('ShareWidget no French labels', () => {
        render(
          <ShareWidget
            shareLinkText="Share link text"
            modalTitle="Modal title"
          />
        );
        fireEvent.click(screen.getByText('Share link text'));
        expect(
          screen.getByText(
            'No endorsement of any products or services is expressed or implied.'
          )
        ).toHaveClass('row');
        expect(screen.getByText('Close')).toHaveClass('btn btn-primary');
      });
      test('ShareWidget French labels', () => {
        render(
          <ShareWidget
            french
            shareLinkText="Share link text"
            modalTitle="Modal title"
          />
        );
        fireEvent.click(screen.getByText('Share link text'));
        expect(
          screen.getByText(
            'Aucun appui n’est accordé, soit de façon expresse ou tacite, à aucun produit ou service.'
          )
        ).toHaveClass('row');
        expect(screen.getByText('Fermer')).toHaveClass('btn btn-primary');
      });
    });

    describe('ShareWidget Button Actions', () => {
      test('Modal pop up link and close button', async () => {
        render(
          <ShareWidget
            shareLinkText="Share link text"
            modalTitle="Modal title"
          />
        );
        fireEvent.click(screen.getByText('Share link text'));
        await waitFor(() => {
          expect(screen.getByRole('dialog')).toHaveClass('modal');
        });

        fireEvent.click(screen.getByText('Close'));
        await waitFor(() => {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
      });
      test('Modal pop up link and header close button', async () => {
        render(
          <ShareWidget
            shareLinkText="Share link text"
            modalTitle="Modal title"
          />
        );
        fireEvent.click(screen.getByText('Share link text'));
        await waitFor(() => {
          expect(screen.getByRole('dialog')).toHaveClass('modal');
        });

        fireEvent.click(screen.getByText('Close'));
        await waitFor(() => {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
      });
    });
  });
});
