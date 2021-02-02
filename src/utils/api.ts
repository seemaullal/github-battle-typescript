import { params } from './secrets';

export interface User {
  login: string;
  avatar_url: string;
  message?: string;
  followers: number;
  name: string | null;
  location: string | null;
  following: number;
  company: string | null;
  html_url: string;
}

export interface Repository {
  name: string;
  owner: User;
  html_url: string;
  stargazers_count: number;
  forks: number;
  open_issues: number;
}

export interface Player {
  profile: User;
  score: number;
}

function getErrorMsg(message: string, username: string): string {
  if (message === 'Not Found') {
    return `${username} doesn't exist`;
  }

  return message;
}

function getProfile(username: string): Promise<User> {
  return fetch(`https://api.github.com/users/${username}${params}`)
    .then(result => result.json())
    .then((profile: User) => {
      if (profile.message) {
        throw new Error(getErrorMsg(profile.message, username));
      }

      return profile;
    });
}

function getRepos(username: string): Promise<Repository[]> {
  return fetch(
    `https://api.github.com/users/${username}/repos${params}&per_page=100`
  )
    .then(res => res.json())
    .then(repos => {
      if (repos.message) {
        throw new Error(getErrorMsg(repos.message, username));
      }

      return repos as Repository[];
    });
}

function getStarCount(repos: Repository[]) {
  return repos.reduce(
    (count, { stargazers_count }) => count + stargazers_count,
    0
  );
}

function calculateScore(followers: number, repos: Repository[]) {
  return followers * 3 + getStarCount(repos);
}

function getUserData(player: string): Promise<Player> {
  return Promise.all([getProfile(player), getRepos(player)]).then(
    ([profile, repos]) => ({
      profile,
      score: calculateScore(profile.followers, repos),
    })
  );
}

function sortPlayers(players: [Player, Player]) {
  return players.sort((a, b) => b.score - a.score);
}

export function battle(players: [string, string]) {
  return Promise.all([
    getUserData(players[0]),
    getUserData(players[1]),
  ]).then(results => sortPlayers(results));
}

export function fetchPopularRepos(language: string): Promise<Repository[]> {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  return fetch(endpoint)
    .then(res => res.json())
    .then((data: { items: Repository[]; message?: string }) => {
      if (!data.items) {
        throw new Error(data.message);
      }

      return data.items;
    });
}
