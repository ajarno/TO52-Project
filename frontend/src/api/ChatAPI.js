import API from "./API";
import { authHeader } from "./AuthAPI";

const fetchUserContacts = () =>
  API.get("chats/contacts/", { headers: authHeader() });

const fetchFromContactByAd = (contact_id, ad_id) =>
  API.get("chats/fromContactByAd/" + contact_id + "/" + ad_id, {
    headers: authHeader(),
  });

const addChat = (sender, receiver, related_ad, created_at, content) =>
  API.post(
    "chats/",
    {
      sender,
      receiver,
      related_ad,
      content,
    },
    { headers: authHeader() }
  );

export { fetchUserContacts, fetchFromContactByAd, addChat };
