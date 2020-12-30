import API from "./API";

// ---------------------------------------------------------
// --------------------- DEFINE HEADERS --------------------
// ---------------------------------------------------------
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

// ---------------------------------------------------------
// ------- DEFINE USUAL FONCTIONS FOR AUTHENTICATION -------
// ---------------------------------------------------------
const signUp = (email, password) =>
  API.post("auth/users/", { email, password });

const signIn = (email, password) =>
  API.post("auth/jwt/create/", { email, password });

const fetchCurrentUser = () => API.get("auth/users/me/", authHeader);

const verifyToken = (body) => API.post("auth/jwt/verify/", body);

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

// ---------------------------------------------------------
// -------------- DEFINE CONVENIENT FONCTIONS --------------
// ---------------------------------------------------------
function isAuthentificated() {
  return new Promise((resolve, reject) => {
    if (sessionStorage.getItem("token")) {
      const body = { token: sessionStorage.getItem("token") };
      verifyToken(body)
        .then((result) => {
          if (result.status === 200) {
            resolve(true);
          }
        })
        .catch((e) => {
          sessionStorage.removeItem("token")
          resolve(false);
          reject(Error("La vérification de token a échouée"));
        });
    }
  });
}

function useAuthenticated() {
  return sessionStorage.getItem("token") !== null;
}

function logout() {
  sessionStorage.removeItem("token");
  window.location.href = "/auth/sign-in";
}

// ---------------------------------------------------------
// ------------------------ EXPORTS ------------------------
// ---------------------------------------------------------
export {
  authHeader,
  authHeaderForm,
  signIn,
  signUp,
  fetchCurrentUser,
  updatePassword,
  resetPassword,
  resetPasswordConfirm,
  isAuthentificated,
  useAuthenticated,
  logout,
};
