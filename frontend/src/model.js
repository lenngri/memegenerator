import { action, thunk, persist } from 'easy-peasy';
import axios from 'axios';

const model = {
  // STATE
  imgflipTemplates: [],
  serverTemplates: [],
  memeToEdit: {
    image: null,
    templateObject: null,
  },
  stageRef: null,
  userSession: persist({
    isLoggedIn: false,
    user: null,
    token: null,
  }),
  // THUNKS
  fetchImgflip: thunk(async (actions) => {
    const res = await axios.get('https://api.imgflip.com/get_memes');
    actions.setImgflip(res.data.data.memes);
    console.log('Fetched templates from imgflip with status code:', res.status);
  }),
  fetchServerTemplates: thunk(async (actions) => {
    const res = await axios.get(process.env.REACT_APP_BURL + '/api/template/retrieve');
    actions.setServerTemplates(res.data);
    console.log('Fetched templates from server with status code:', res.status);
  }),
  // ACTIONS
  setImgflip: action((state, templates) => {
    state.imgflipTemplates = templates;
  }),
  setServerTemplates: action((state, templates) => {
    state.serverTemplates = templates;
  }),
  setMemeToEdit: action((state, { image, templateObject }) => {
    state.memeToEdit.image = image;
    if (templateObject !== undefined) state.memeToEdit.templateObject = templateObject;
    else state.memeToEdit.templateObject = null;
    console.log('New editor memeToEdit set.', image, templateObject);
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
