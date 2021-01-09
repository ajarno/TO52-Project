import API from "./API";

function authHeaders() {
  if (sessionStorage.getItem("token")) {
    return {
      Authorization: "JWT " + sessionStorage.getItem("token"),
      accept: "application/json",
    };
  } else {
    return {};
  }
}

// -----------------------------------------------------------------
//                        GET REQUESTS
// -----------------------------------------------------------------
const fetchAdsByFiltering = (category, filters) => {
  let query = "/?";
  if (category) query = query.concat(`category=${category}`);
  if (filters["text"]) query = query.concat(`&text=${filters["text"]}`);
  if (filters["location"] && Object.keys(filters["location"]).length !== 0)
    query = query.concat(`&location=${filters["location"].name}`);
  if (filters["price"]) {
    if (filters["price"][0] > 0)
      query = query.concat(`&min_price=${filters["price"][0]}`);
    if (filters["price"][1] < 1500)
      query = query.concat(`&max_price=${filters["price"][1]}`);
  }

  // console.log(query);
  return API.get("/classifiedads".concat(query));
};

const fetchAdsByUser = (userId) => {
  let query = `/?userId=${userId}`;
  // console.log(query);
  return API.get("/classifiedads".concat(query));
};

const fetchAdById = (id) => API.get("/classifiedads/" + id);

// -----------------------------------------------------------------
//                        POST REQUESTS
// -----------------------------------------------------------------
const postAd = (data) => API.post("/classifiedads/", data, { headers: authHeaders() });
const postPictureAd = (picture) => API.post("/pictures/", picture, { headers: authHeaders() });
const postLocationAd = (loc) => API.post("/locations/", loc, { headers: authHeaders() });

// -----------------------------------------------------------------
//                        PUT REQUESTS
// -----------------------------------------------------------------
const putAd = (ad) => API.patch(`/classifiedads/${ad.id}/`, ad, { headers: authHeaders() });

// -----------------------------------------------------------------
//                       DELETE REQUESTS
// -----------------------------------------------------------------
const deleteAd = (id) => API.delete("/classifiedads/" + id, { headers: authHeaders() });
const deletePictureAd = (id) => API.delete("/pictures/" + id, { headers: authHeaders() });

// -----------------------------------------------------------------
//                           EXPORTS
// -----------------------------------------------------------------
export {
  fetchAdsByFiltering,
  fetchAdsByUser,
  fetchAdById,
  postAd,
  postPictureAd,
  postLocationAd,
  putAd,
  deleteAd,
  deletePictureAd,
};
