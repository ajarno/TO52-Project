import API from "./API";

function authHeader() {
  if (sessionStorage.getItem("token")) {
    return {
      Authorization: "JWT " + sessionStorage.getItem("token"),
      accept: "application/json",
    };
  } else {
    return {};
  }
}

function authHeaderForm() {
  if (sessionStorage.getItem("token")) {
    return {
      Authorization: "JWT " + sessionStorage.getItem("token"),
      accept: "application/json",
      "content-type": "multipart/form-data",
    };
  } else {
    return {};
  }
}

const signIn = (email, password) =>
  API.post("auth/jwt/create/", { email, password });

const signUp = (email, password) =>
  API.post("auth/users/", { email, password });

const fetchUsers = () => API.get("auth/users/");

const fetchCurrentUser = () => API.get("auth/users/me/", authHeader);

const verifyToken = (body) => API.post("auth/jwt/verify/", body);

function logout() {
  sessionStorage.removeItem("token");
  window.location.href = "/auth/sign-in";
}
function isAuthentificated() {
  return new Promise((resolve, reject) => {
    if (sessionStorage.getItem("token")) {
      const body = { token: sessionStorage.getItem("token") };
      console.log(body);
      verifyToken(body)
        .then((result) => {
          if (result.status === 200) {
            resolve(true);
          }
        })
        .catch((e) => {
          console.log(e);
          resolve(false);
          reject(Error("La vérification de token a échouée"));
        });
    }
  });
}
const verify = (uid, token) => {
  const body = JSON.stringify({ uid, token });
  API.post("auth/users/activation/", body);
};

const updatePassword = (new_password, re_new_password, current_password) =>
  API.post(
    "auth/users/set_password/",
    {
      new_password,
      re_new_password,
      current_password,
    },
    { headers: authHeader() }
  );

const resetPassword = (email) =>
  API.post(
    "auth/users/reset_password/",
    {
      email,
    },
    { headers: authHeader() }
  );

const resetPasswordConfirm = (uid, token, new_password) =>
  API.post(
    "auth/users/reset_password_confirm/",
    {
      uid,
      token,
      new_password,
    },
    { headers: authHeader() }
  );

export {
  fetchUsers,
  signIn,
  signUp,
  logout,
  isAuthentificated,
  fetchCurrentUser,
  authHeader,
  verify,
  updatePassword,
  resetPassword,
  resetPasswordConfirm,
  authHeaderForm,
};
