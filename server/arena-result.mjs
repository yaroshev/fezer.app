export const MIN_VOTES_FOR_WINNER = 25;

export function resolveWinner(closed, votesA, votesB) {
  if (!closed) return null;
  if (votesA + votesB < MIN_VOTES_FOR_WINNER) return 'inconclusive';
  if (votesA === votesB) return 'tie';
  return votesA > votesB ? 'a' : 'b';
}
