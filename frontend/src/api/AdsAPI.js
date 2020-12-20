import API from "./API";

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
const postAd = () => API.post("/classifiedads/");
const postPictureAd = (picture) => API.post("/pictures/", picture);
const postLocationAd = (loc) => API.post("/locations/", loc);

// -----------------------------------------------------------------
//                        PUT REQUESTS
// -----------------------------------------------------------------
const putAd = (ad) => API.patch(`/classifiedads/${ad.id}/`, ad);

// -----------------------------------------------------------------
//                       DELETE REQUESTS
// -----------------------------------------------------------------
const deleteAd = (id) => API.delete("/classifiedads/" + id);
const deletePictureAd = (id) => API.delete("/pictures/" + id);

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
