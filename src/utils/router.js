/**
 * Lightweight Hash Router Utility for Single Page App state restoration & deep linking.
 * Supports hashes:
 * - #workout
 * - #routine/:routineId
 * - #library
 * - #exercise/:exerciseId
 * - #builder
 * - #history
 */

export const parseHashRoute = () => {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash) return { tab: 'workout', id: null };

  const parts = hash.split('/');
  const routeType = parts[0];
  const id = parts[1] ? decodeURIComponent(parts[1]) : null;

  switch (routeType) {
    case 'exercise':
      return { tab: 'library', exerciseId: id };
    case 'routine':
      return { tab: 'workout', routineId: id };
    case 'library':
      return { tab: 'library', exerciseId: null };
    case 'builder':
      return { tab: 'builder', id: null };
    case 'history':
      return { tab: 'history', id: null };
    case 'workout':
    default:
      return { tab: 'workout', routineId: null };
  }
};

export const setHashRoute = (tab, id = null) => {
  let newHash = `#${tab}`;
  if (tab === 'library' && id) {
    newHash = `#exercise/${encodeURIComponent(id)}`;
  } else if (tab === 'workout' && id) {
    newHash = `#routine/${encodeURIComponent(id)}`;
  }
  if (window.location.hash !== newHash) {
    window.location.hash = newHash;
  }
};
