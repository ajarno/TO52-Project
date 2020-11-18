import API from "./API";

const headers = {
  headers: {
    "Content-Type": "application/json",
  },
};

const tokenHeaders = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

const signIn = (email, password) =>
  API.post("auth/jwt/create/", { email, password }, headers);

const signUp = (email, password) =>
  API.post("auth/users/", { email, password }, headers);

const getUsers = () => API.get("auth/users/", tokenHeaders);

const getCurrentUser = () => {
  console.log("toekn", tokenHeaders);
  API.get("auth/users/me/", tokenHeaders);
};

const verifyToken = (body) => API.post("auth/jwt/verify/", body, headers);

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
