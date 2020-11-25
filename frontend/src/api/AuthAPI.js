import API from "./API";

const tokenHeaders = {
  headers: {
    "Content-type": "application/json",
    "Authorization: Bearer ": "" + localStorage.getItem("token"),
  },
};

const signIn = (email, password) =>
  API.post("auth/jwt/create/", { email, password });

const signUp = (email, password) =>
  API.post("auth/users/", { email, password });

const getUsers = () => API.get("auth/users/", tokenHeaders);

const getCurrentUser = () => API.get("auth/users/me/", tokenHeaders);

const verifyToken = (body) => API.post("auth/jwt/verify/", body);

const logout = localStorage.removeItem("token");

function isAuthentificated() {
  return new Promise((resolve, reject) => {
    if (localStorage.getItem("token")) {
      const body = { token: localStorage.getItem("token") };
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

export {
  getUsers,
  signIn,
  signUp,
  logout,
  isAuthentificated,
  getCurrentUser,
  tokenHeaders,
};
