// slices/userSlice.js
// export initial/default state objects for user and game slices
export const initialUserState = {
  uid: null,
  displayName: null,
  email: null,
  lastPlayed: null,
  loading: false,
  error: null,
};

// Initial state for game slice (if you keep it here for convenience).
export const initialGameState = {
  level: 1,
  score: 0,
  running: false,
  balloons: [], // local only
  sessionStats: null, // filled at level end
};
