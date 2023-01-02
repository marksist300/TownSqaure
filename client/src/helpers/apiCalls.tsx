const server = import.meta.env.VITE_SERVER_DOMAIN;

const fetcher = async (url: string, bodyData: any) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "Application/json",
    },
    method: "POST",
    mode: "cors",
    body: bodyData,
  });
  const data = await response.json();
  return data;
};
// LOGIN API CALL
export const loginAPICall = async (userCredentials: any, dispatch: any) => {
  dispatch({ type: "LOGIN_INIT" });
  try {
    const post = await fetch(`${server}/auth/login`, {
      headers: {
        "Content-Type": "Application/json",
      },
      method: "POST",
      mode: "cors",
      body: userCredentials,
    });
    const data = await post.json();
    dispatch({ type: "LOGIN_SUCCEED", payload: data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error });
  }
};
// SIGNUP API CALL

export const signupAPICall = async (userCredentials: any, dispatch: any) => {
  dispatch({ type: "SIGNUP_INIT" });
  try {
    const post = await fetch(`${server}/auth/signup`, {
      headers: {
        "Content-Type": "Application/json",
      },
      method: "POST",
      mode: "cors",
      body: userCredentials,
    });
    const data = await post.json();
    dispatch({ type: "SIGNUP_SUCCEED", payload: data });
  } catch (error) {
    dispatch({ type: "SIGNUP_FAIL", payload: error });
  }
};

//<----~POSTS~----->

//Fetch
export const fetchPostUser = async (userId: string) => {
  try {
    const response = await fetch(`${server}/users?userId=${userId}`, {
      headers: {
        "Content-Type": "Application/json",
      },
      method: "GET",
      mode: "cors",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error({ fetchPostUser_Error: error });
  }
};

// Like a post
export const likePostAPICall = async (postId: string, userId: string) => {
  try {
    const post = await fetch(`${server}/post/like/${postId}`, {
      headers: {
        "Content-Type": "Application/json",
      },
      method: "PUT",
      mode: "cors",
      body: JSON.stringify({ userId: `${userId}` }),
    });
    const data = await post.json();
    return data;
  } catch (error) {
    console.error({ likePost_Error: error });
  }
};
