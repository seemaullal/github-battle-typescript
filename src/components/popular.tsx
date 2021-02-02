import React, { useEffect, useState } from 'react';
import { fetchPopularRepos, Repository } from '../utils/api';
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from 'react-icons/fa';
import Card from './card';
import Loading from './loading';
import Tooltip from './tooltip';

const languages = [
  'All',
  'JavaScript',
  'Ruby',
  'Java',
  'CSS',
  'Python',
] as const;

type Language = typeof languages[number];

function LangaugesNav({
  selected,
  onUpdateLanguage,
}: {
  selected: Language;
  onUpdateLanguage: (language: Language) => void;
}) {
  return (
    <ul className="flex-center">
      {languages.map(language => (
        <li key={language}>
          <button
            className="clear-btn nav-link"
            style={
              language === selected ? { color: 'rgb(187, 46, 31)' } : undefined
            }
            onClick={() => onUpdateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

function ReposGrid({ repos }: { repos: Repository[] }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const {
          name,
          owner,
          html_url,
          stargazers_count,
          forks,
          open_issues,
        } = repo;
        const { login, avatar_url } = owner;

        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
              <ul className="card-list">
                <li>
                  <Tooltip text="Github username">
                    <FaUser color="rgb(255, 191, 116)" size={22} />
                    <a href={`https://github.com/${login}`}>{login}</a>
                  </Tooltip>
                </li>
                <li>
                  <FaStar color="rgb(255, 215, 0)" size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                  {open_issues.toLocaleString()} open
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

type PopularReducerActions =
  | {
      type: 'success';
      selectedLanguage: Language;
      repos: Repository[];
    }
  | { type: 'error'; error: Error };

interface PopularState extends Partial<Record<Language, Repository[]>> {
  error: null | string;
}

function popularReducer(state: PopularState, action: PopularReducerActions) {
  if (action.type === 'success') {
    return {
      ...state,
      [action.selectedLanguage]: action.repos,
      error: null,
    };
  } else if (action.type === 'error') {
    return {
      ...state,
      error: action.error?.message,
    };
  } else {
    throw new Error(`That action type isn't supported.`);
  }
}

export default function Popular() {
  const [selectedLanguage, setSelectedLanguage] = React.useState<Language>(
    'All'
  );
  const [state, dispatch] = React.useReducer(popularReducer, {
    error: null,
  });

  const fetchedLanguages = React.useRef<Language[]>([]);

  React.useEffect(() => {
    if (fetchedLanguages.current.includes(selectedLanguage) === false) {
      fetchedLanguages.current.push(selectedLanguage);

      fetchPopularRepos(selectedLanguage)
        .then(repos => dispatch({ type: 'success', selectedLanguage, repos }))
        .catch(error => dispatch({ type: 'error', error }));
    }
  }, [fetchedLanguages, selectedLanguage]);

  const isLoading = () => !state[selectedLanguage] && state.error === null;
  const selectedRepos = state[selectedLanguage];
  return (
    <>
      <LangaugesNav
        selected={selectedLanguage}
        onUpdateLanguage={setSelectedLanguage}
      />

      {isLoading() && <Loading text="Fetching Repos" />}

      {state.error && <p className="center-text error">{state.error}</p>}

      {selectedRepos && <ReposGrid repos={selectedRepos} />}
    </>
  );
}
