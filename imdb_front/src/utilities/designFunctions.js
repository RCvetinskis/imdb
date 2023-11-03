function classNameRating(rating) {
  if (rating >= 7) return " rating green";
  if (rating >= 5) return " rating gold";
  if (rating < 5) return " rating red";
}

export { classNameRating };
