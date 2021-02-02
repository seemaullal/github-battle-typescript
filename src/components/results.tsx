import { useEffect, useReducer } from 'react';
import { battle, User, Player } from '../utils/api';
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaCode,
  FaUser,
} from 'react-icons/fa';
import Card from './Card';
import PropTypes from 'prop-types';
import Loading from './Loading';
import Tooltip from './Tooltip';
import queryString from 'query-string';
import { Link, useLocation } from 'react-router-dom';

function ProfileList({ profile }: { profile: User }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239, 115, 115)" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <Tooltip text="User's location">
            <FaCompass color="rgb(144, 115, 255)" size={22} />
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltip text="User's company">
            <FaBriefcase color="#795548" size={22} />
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers color="rgb(129, 195, 245)" size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  );
}

type ResultReducerAction =
  | { type: 'loading' }
  | { type: 'error'; error: string }
  | { type: 'winner'; winner: Player | null; loser: Player | null };

type ResultState = {
  winner: null | Player;
  loser: null | Player;
  error: null | string;
  loading: boolean;
};

function resultsReducer(
  state: ResultState,
  action: ResultReducerAction
): ResultState {
  switch (action.type) {
    case 'winner':
      return {
        winner: action.winner,
        loser: action.loser,
        error: null,
        loading: false,
      };
    case 'error':
      return {
        winner: null,
        loser: null,
        error: action.error,
        loading: false,
      };
    case 'loading':
      return {
        winner: null,
        loser: null,
        error: null,
        loading: true,
      };
  }
}

export default function Results() {
  const [state, dispatch] = useReducer(resultsReducer, {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  });

  const { search } = useLocation();
  const { playerOne, playerTwo } = queryString.parse(search);
  useEffect(() => {
    battle([playerOne as string, playerTwo as string])
      .then(players => {
        dispatch({
          type: 'winner',
          winner: players[0],
          loser: players[1],
        });
      })
      .catch(({ message }) => {
        dispatch({ type: 'error', error: message });
      });
  });
  const { loading, winner, loser, error } = state;
  if (loading) {
    return <Loading text="Battling" />;
  }

  if (error || !winner || !loser) {
    return <p className="center-text error">{error}</p>;
  }

  return (
    <>
      <div className="grid space-around container-sm">
        <Card
          header={winner.score === loser.score ? 'Tie' : 'Winner'}
          subheader={`Score: ${winner.score.toLocaleString()}`}
          avatar={winner.profile.avatar_url}
          href={winner.profile.html_url}
          name={winner.profile.login}
        >
          <ProfileList profile={winner.profile} />
        </Card>
        <Card
          header={winner.score === loser.score ? 'Tie' : 'Loser'}
          subheader={`Score: ${loser.score.toLocaleString()}`}
          avatar={loser.profile.avatar_url}
          name={loser.profile.login}
          href={loser.profile.html_url}
        >
          <ProfileList profile={loser.profile} />
        </Card>
      </div>
      <Link to="/battle" className="btn dark-btn btn-space">
        Reset
      </Link>
    </>
  );
}
