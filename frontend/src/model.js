import { action, thunk, persist } from 'easy-peasy';

const model = {
  // state
  imgflipTemplates: [],
  serverTemplates: [],
  template: null,
  stageRef: null,
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
  fetchServerTemplates: thunk(async (actions) => {
    const res = await fetch('/template/retrieve');
    console.log('Fetched something from server', res);
    const templates = await res.json();
    actions.setImgflip(templates);
  }),
  // actions
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
  setLoggedIn: action((state, auth) => {
    state.userSession.isLoggedIn = auth;
    console.log(auth ? 'User logged in.' : 'User logged out.');
  }),
};

export default model;
