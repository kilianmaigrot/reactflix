import React, { FC, useState } from 'react';
import * as SC from './movieSearchFooter.style';

export interface FooterDataSearchBar {
  limit: number;
  offset: number;
  movieTotal: number,
}

interface MovieSearchFooterComponentProps {
  onChange: (newFooterData: FooterDataSearchBar) => void;
  movieTotal: number;
}

const MovieSearchFooterComponent: FC<MovieSearchFooterComponentProps> = ({ onChange, movieTotal }: MovieSearchFooterComponentProps) => {
  const [footerData, setFooterData] = useState<FooterDataSearchBar>({
    limit: 9,
    offset: 0,
    movieTotal,
  });

  const updateFooterData = (name: string, value: number) => {
    setFooterData((prevState) => {
      let updatedData: FooterDataSearchBar;
      if (name === 'limit') {
        updatedData = {
          ...prevState,
          [name]: value,
          offset: 0,
        };
      } else {
        updatedData = {
          ...prevState,
          [name]: value,
        };
      }
      onChange(updatedData);
      return updatedData;
    });
  };
  
  return (
    <SC.MovieSearchFooter>
      <span>
        <span>Film par page</span>
        <SC.DropDown value={footerData.limit} onChange={(e) => updateFooterData('limit', parseInt(e.target.value, 10))}>
          <option value='6'>6</option>
          <option value='9'>9</option>
          <option value='12'>12</option>
          <option value='15'>15</option>
          <option value='18'>18</option>
        </SC.DropDown>
      </span>
      <span>
        <span>
          Affichage des films&nbsp;
          {footerData.offset + 1}
        &nbsp;à&nbsp;
          {Math.min(footerData.offset + footerData.limit, movieTotal)}
        &nbsp;sur&nbsp;
          {movieTotal}
        </span>
        <SC.DropDown value={footerData.offset} onChange={(e) => updateFooterData('offset', parseInt(e.target.value, 10))}>
          {Array.from({ length: Math.ceil(movieTotal / footerData.limit) }, (_, index) => (
            <option key={index} value={index * footerData.limit}>
              {index + 1}
            </option>
          ))}
        </SC.DropDown>
      </span>
    </SC.MovieSearchFooter>
  );
};

export default MovieSearchFooterComponent;
