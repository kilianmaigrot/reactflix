import React, { FC, useState, FormEvent } from 'react';
import * as SC from './movieSearchBar.style';

export interface FormDataSearchBar {
  searchParam: string;
  searchText: string;
  sortParam: string;
  sortOrder: string;
}

interface MovieSearchBarComponentProps {
  onConfirm: (formData: FormDataSearchBar) => void; 
}

const MovieSearchBarComponent: FC<MovieSearchBarComponentProps> = ({ onConfirm }: MovieSearchBarComponentProps) => {
  const [formData, setFormData] = useState<FormDataSearchBar>({
    searchParam: 'title',
    searchText: '',
    sortParam: 'id_movie',
    sortOrder: 'ASC',
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onConfirm(formData);
  };

  const updateFormData = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <SC.MovieSearchBar onSubmit={handleSubmit}>
      <span>Rechercher par</span>
      <SC.DropDown value={formData.searchParam} onChange={(e) => updateFormData('searchParam', e.target.value)}>
        <option value='title'>Titre</option>
        <option value='year'>Année de sortie</option>
        <option value='director'>Réalisateur</option>
        <option value='genre'>Genre</option>
        <option value='summary'>Sommaire</option>
      </SC.DropDown>
      <SC.FormInput type='text' value={formData.searchText} onChange={(e) => updateFormData('searchText', e.target.value)} />
      <span>Trier par</span>
      <SC.DropDown value={formData.sortParam} onChange={(e) => updateFormData('sortParam', e.target.value)}>
        <option value='title'>Titre</option>
        <option value='year'>Année de sortie</option>
        <option value='director'>Réalisateur</option>
        <option value='genre'>Genre</option>
        <option value='summary'>Sommaire</option>
      </SC.DropDown>
      <SC.DropDown value={formData.sortOrder} onChange={(e) => updateFormData('sortOrder', e.target.value)}>
        <option value='ASC'>Ascendant</option>
        <option value='DESC'>Descendant</option>
      </SC.DropDown>
      <SC.FormButton type='submit'>Confirmer</SC.FormButton>
    </SC.MovieSearchBar>
  );
};

export default MovieSearchBarComponent;
