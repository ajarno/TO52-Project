export default function truncate(text, maxChar) {
  return text && text.length > maxChar ? text.slice(0, maxChar - 4).concat("...") : text;
};
