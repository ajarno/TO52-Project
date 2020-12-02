import API from "./API";

const fetchUserProfileById = (id) => API.get("/profil/" + id);

function createUserProfile(
  user,
  //avatar,
  surname,
  first_name,
  birthday,
  tel,
  address_street,
  address_postal_code,
  address_city,
  address_country
) {
  console.log("user id", user);
  return API.post("/profiles/", {
    // avatar,
    surname,
    first_name,
    birthday,
    tel,
    address_street,
    address_postal_code,
    address_city,
    address_country,
  });
}

function updateUserProfile(
  id,
  user,
  //avatar,
  surname,
  first_name,
  birthday,
  tel,
  address_street,
  address_postal_code,
  address_city,
  address_country
) {
  return API.put("/profiles/" + id + "/", {
    // avatar,
    surname,
    first_name,
    birthday,
    tel,
    address_street,
    address_postal_code,
    address_city,
    address_country,
  });
}

function createOrUpdateProfile(
  user,
  //avatar,
  surname,
  first_name,
  birthday,
  tel,
  address_street,
  address_postal_code,
  address_city,
  address_country
) {
  fetchUserProfile()
    .then((result) => {
      if (result.status === 200) {
        console.log("resultat", result);
        console.log("resultat data", result.data);
        console.log("resultat profil", result.data.profile);
        console.log("resultat profil", result.data.profile.id);
        updateUserProfile(
          result.data.profile.id,
          user,
          //avatar,
          surname,
          first_name,
          birthday,
          tel,
          address_street,
          address_postal_code,
          address_city,
          address_country
        );
      } else if (result.status === 204) {
        createUserProfile(
          user,
          //avatar,
          surname,
          first_name,
          birthday,
          tel,
          address_street,
          address_postal_code,
          address_city,
          address_country
        );
      }
    })
    .catch((e) => {});
}

const fetchUserProfile = () => API.get("profile/me/");
export {
  fetchUserProfileById,
  fetchUserProfile,
  createUserProfile,
  updateUserProfile,
  createOrUpdateProfile,
};
