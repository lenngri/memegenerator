import { action, thunk, persist } from 'easy-peasy';
import axios from 'axios';

const model = {
  // STATE
  imgflipTemplates: [],
  serverTemplates: [],
  serverMemes: [],
  editor: {
    image: null,
    templateObject: null,
    memeObject: null,
    templateNew: null,
    stageRef: null,
  },
  userSession: persist(
    {
      isLoggedIn: false,
      user: null,
      token: null,
      authorigin: null,
    },
    { storage: localStorage }
  ),
  auth0Client: null,

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
  fetchServerMemes: thunk(async (actions) => {
    const res = await axios.get(process.env.REACT_APP_BURL + '/api/meme/retrieve');
    actions.setServerMemes(res.data.data.memes);
    console.log('Fetched templates from server with status code:', res.status);
  }),

  // ACTIONS
  setImgflip: action((state, templates) => {
    state.imgflipTemplates = templates;
  }),
  setServerTemplates: action((state, templates) => {
    state.serverTemplates = templates;
  }),
  setServerMemes: action((state, memes) => {
    state.serverMemes = memes;
  }),
  // editor state actions
  setEditorState: action((state, { image, templateObject, templateNew, memeObject }) => {
    // set image
    if (image !== undefined) state.editor.image = image;
    // set templateObject
    if (templateObject !== undefined) state.editor.templateObject = templateObject;
    // set templateNew flag
    if (templateNew !== undefined) state.editor.templateNew = templateNew;
    // set memeObject
    if (memeObject !== undefined) state.editor.memeObject = memeObject;
    // Finished
    console.log('Editor state updated.');
  }),
  setStageRef: action((state, stageRef) => {
    state.editor.stageRef = stageRef;
    console.log('New stageRef set.');
  }),
  // user session actions
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
  setAuthOrigin: action((state, authorigin) => {
    state.userSession.authorigin = authorigin
    console.log('New authorigin set.')
  }),
  setAuth0Client: action((state, auth0Config) => {
    state.auth0Client = auth0Config;
    console.log("New auth0Client set");
  })
};

export default model;
