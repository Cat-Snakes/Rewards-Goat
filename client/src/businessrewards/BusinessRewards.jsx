import react from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BusinessRewards.css';
import BusinessStampCard from './BusinessStampCard';

const BusinessRewards = () => {
  const [totalStars, setTotalStars] = useState(0);
  const [rewardName, setRewardName] = useState([]);
  const [rewards, setRewards] = useState([
    { rewardName: 'Hotdog', totalStars: 5 },
    { rewardName: 'CheeseBurger', totalStars: 10 },
    { rewardName: 'Steak', totalStars: 15 },
    { rewardName: 'Lobster', totalStars: 20 },
  ]);

  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const { username } = data;

  const dashboard = () => {
    navigate('/businessdashboard', { state: { username: username } });
  };

  const addReward = () => {
    const rewardsClone = rewards.slice();
    rewardsClone.push({
      rewardName: rewardName,
      totalStars: Number(totalStars),
    });
    console.log('The value of rewardsClone is', rewardsClone);
    console.log('The value of rewards is ', rewards);
    setRewards(rewardsClone);
  };

  return (
    <div className='businessrewards-containerone'>
      <div className='businessrewards-containertwo'>
        {rewards.map((reward, index) => (
          <BusinessStampCard
            key={index}
            totalStars={reward.totalStars}
            rewardName={reward.rewardName}
          />
        ))}
      </div>
      <div className='businessrewards-containerthree'>
        <button onClick={() => dashboard()}>Dashboard</button>
        <h4>Input Reward Name</h4>
        <input
          type='text'
          id='rewardName'
          placeholder='Reward Name'
          onChange={(e) => setRewardName(e.target.value)}
        />
        <h4>Number of Stars Required:</h4>
        <input
          type='number'
          id='rewardStars'
          placeholder='Number of rewards'
          onChange={(e) => setTotalStars(e.target.value)}
        />
        <button onClick={() => addReward()}>Add a reward</button>
      </div>
    </div>
  );
};
export default BusinessRewards;
