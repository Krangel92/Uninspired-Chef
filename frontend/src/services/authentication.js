// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Service request for log in to the api
export const login = async (userName, password) => {
  const payload = {
    userName: userName,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BACKEND_URL}/tokens`, requestOptions);

  // docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
  if (response.status === 201) {
    let data = await response.json();
    console.log("sucessfully logged in");
    return data.token;
  } else {
    throw new Error(
      `Received status ${response.status} when logging in. Expected 201`
    );
  }
};

// Service request for sign up to the api
export const signup = async (fullName, userName, email, password) => {
  const payload = {
    fullName: fullName,
    userName: userName,
    email: email,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  let response = await fetch(`${BACKEND_URL}/users`, requestOptions);

  //docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
  if (response.status === 201) {
    return;
  } else {
    throw new Error(
      `Received status ${response.status} when signing up. Expected 201`
    );
  }
};
