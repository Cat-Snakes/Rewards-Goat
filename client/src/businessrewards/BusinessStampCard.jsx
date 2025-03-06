import React from 'react';
import '../dashboard/StampCard.css';
import starUnfilled from '../assets/star-unfilled.svg';

const BusinessStampCard = ({ totalStars, rewardName }) => {
    return (
      <div className='stamp-cards'>
        <p className='stamp-title'>{rewardName}</p>
        <div className='stamps-container'>
          <div className='stamps'>
            {Array.from({ length: totalStars }, (_, index) => (
              <img key={index} src={starUnfilled} alt='star icon svg' />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default BusinessStampCard;
