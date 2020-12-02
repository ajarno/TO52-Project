import API from "./API";

const tokenHeaders = {
  headers: {
    "Content-type": "application/json",
    Authorization: sessionStorage.getItem("token")
      ? "JWT " + sessionStorage.getItem("token")
      : null,
  },
};

const signIn = (email, password) =>
  API.post("auth/jwt/create/", { email, password });

const signUp = (email, password) =>
  API.post("auth/users/", { email, password });

const fetchUsers = () => API.get("auth/users/");

const fetchCurrentUser = () => API.get("auth/users/me/");

const verifyToken = (body) => API.post("auth/jwt/verify/", body);

const logout = sessionStorage.removeItem("token");

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

export {
  fetchUsers,
  signIn,
  signUp,
  logout,
  isAuthentificated,
  fetchCurrentUser,
  tokenHeaders,
  verify,
};
