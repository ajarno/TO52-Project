import API from "./API";
import { authHeader, authHeaderForm } from "./AuthAPI";

const fetchUserProfileById = (id) => API.get("/profile/" + id);

const fetchUserProfile = () =>
  API.get("profile/me/", { headers: authHeader() });

function createUserProfile(formData) {
  return API.post("/profiles/", formData, { headers: authHeaderForm() });
}  

function updateUserProfile(id, formData) {
  return API.put("/profiles/" + id + "/", formData, {
    headers: authHeaderForm(),
  });  
}  

function createOrUpdateProfile(formData) {
  return new Promise((resolve, reject) => {
    fetchUserProfile()
      .then((result) => {
        if (result.status === 200) {
          updateUserProfile(result.data.profile.id, formData).then((result) => {
            if (result.status === 200) {
              resolve(true);
            } else {
              resolve(false);
            }  
          });  
        } else if (result.status === 204) {
          createUserProfile(formData).then((result) => {
            if (result.status === 201) {
              resolve(true);
            } else {
              resolve(false);
            }  
          });  
        }  
      })  
      .catch((e) => {});
  });    
}  

export {
  fetchUserProfileById,
  fetchUserProfile,
  createUserProfile,
  updateUserProfile,
  createOrUpdateProfile,
};
