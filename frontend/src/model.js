import { action, thunk, persist } from 'easy-peasy';

const model = {
  // state
  imgflipTemplates: [],
  template: null,
  userSession: persist({
    isLoggedIn: false,
    user: null,
  }),
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
  setTemplate: action((state, template) => {
    state.template = template;
    console.log('New editor template set.');
  }),
  setLoggedIn: action((state, auth) => {
    state.userSession.isLoggedIn = auth;
    console.log(auth ? 'User logged in.' : 'User logged out.');
  }),
};

export default model;
