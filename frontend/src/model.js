import { action, thunk } from 'easy-peasy';

const model = {
  // state
  imgflipTemplates: [],
  userSession: {
    isLoggedIn: false,
    user: null,
  },
  // thunks
  fetchImgflip: thunk(async (actions) => {
    const res = await fetch('https://api.imgflip.com/get_memes');
    const templates = await res.json();
    actions.setImgflip(templates.data.memes);
  }),
  // actions
  setImgflip: action((state, templates) => {
    state.imgflipTemplates = templates;
  }),
  setLoggedIn: action((state, auth) => {
    state.userSession.isLoggedIn = auth;
    console.log(auth ? 'User logged in.' : 'User logged out.');
  }),
};

export default model;
