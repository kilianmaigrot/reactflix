import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { MovieTileObject } from 'components/MovieTile';
import { withTranslation, WithTranslation } from 'react-i18next';
import * as SC from './modale.style';

interface ModaleComponentProps extends WithTranslation {
  open: boolean;
  movieData: MovieTileObject;
  onClose: () => void;
  onDelete: (movieId: number) => void;
}

const ModaleComponent: FC<ModaleComponentProps> = ({
  open, movieData, onClose, onDelete, 
}) => {
  const modalRoot = document.getElementById('modaleDiv');
  if (!open || !modalRoot) return null;

  return ReactDOM.createPortal(
    <>
      <SC.ModalShadow onClick={onClose} />
      <SC.Modal>
        <SC.ModalBanner>Confirmation de la suppression</SC.ModalBanner>
        <SC.ModalContent>
          Êtes-vous sûr de vouloir supprimer le film suivant ?
          <br />
          <br />
          Film :&nbsp; 
          {movieData.title}
          <br />
          Identifiant :&nbsp; 
          {movieData.id_movie}
          <br />
          Réalisateur :&nbsp; 
          {movieData.director}
          <br />
          Année :&nbsp; 
          {movieData.year}
          <br />
        </SC.ModalContent>
        <SC.ModalFooter>
          <SC.ModaleButton onClick={() => { onDelete(movieData.id_movie); onClose(); }}> Confirmer </SC.ModaleButton>
          <SC.ModaleButton onClick={onClose}> Annuler </SC.ModaleButton>
        </SC.ModalFooter>
      </SC.Modal>
    </>,
    modalRoot,
  );
};

const ModaleComponentWithTranslation = withTranslation()(ModaleComponent);

export default ModaleComponentWithTranslation;
