import { action, thunk, persist } from 'easy-peasy';

const model = {
  // STATE
  imgflipTemplates: [],
  serverTemplates: [],
  template: null,
  stageRef: null,
  userSession: persist({
    isLoggedIn: false,
    user: null,
    token: null,
  }),
  // THUNKS
  fetchImgflip: thunk(async (actions) => {
    const res = await fetch('https://api.imgflip.com/get_memes');
    const templates = await res.json();
    actions.setImgflip(templates.data.memes);
    console.log('Fetched templates from imgflip with status code:', res.status);
  }),
  fetchServerTemplates: thunk(async (actions) => {
    const res = await fetch(process.env.REACT_APP_BURL + '/api/template/retrieve');
    console.log(res);
    const templates = await res.json();
    actions.setServerTemplates(templates);
    console.log('Fetched templates from server with status code:', res.status);
  }),
  // ACTIONS
  setImgflip: action((state, templates) => {
    state.imgflipTemplates = templates;
  }),
  setServerTemplates: action((state, templates) => {
    state.serverTemplates = templates;
  }),
  setTemplate: action((state, template) => {
    state.template = template;
    console.log('New editor template set.');
  }),
  setStageRef: action((state, stageRef) => {
    state.stageRef = stageRef;
    console.log('New stageRef set.');
  }),
  // user login actions
  setLoggedIn: action((state, auth) => {
    state.userSession.isLoggedIn = auth;
    console.log(auth ? 'User logged in.' : 'User logged out.');
  }),
  setUser: action((state, user) => {
    state.userSession.user = user;
    console.log('New user set.');
  }),
  setToken: action((state, token) => {
    state.userSession.token = token;
    console.log('New token set.');
  }),
};

export default model;
