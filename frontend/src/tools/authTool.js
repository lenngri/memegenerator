import axios from "axios";
import { useStoreState, useStoreActions } from "easy-peasy";

const AuthTool = async () => {
  const token = useStoreState((state) => state.userSession.token);
  const authorigin = useStoreState((state) => state.userSession.authorigin);
  const setLoggedIn = useStoreActions((actions) => actions.setLoggedIn)

  // dynamically sets headers of request to private route
  const requestConfig = {
    headers: {
      authorigin: authorigin,
      authorization: `Bearer ${token}`,
    },
  };

  try {
    // sends get request to backend private route to authenticate logged-in user with token
    const response = await axios.get(
      process.env.REACT_APP_BURL + "/api/private",
      requestConfig
    );
    console.log(response.data.success)
    setLoggedIn(response.data.success)
  } catch (err) {
    console.log(err);
  }
};

export default AuthTool
