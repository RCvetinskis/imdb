import useLangCodes from "../hooks/useLangCodes";

const useSortOptions = () => {
  const languages = useLangCodes();
  const priorityLanguages = ["en", "ru", "es", "lt"];
  const languageOptions = languages
    .map((currentLang) => ({
      value: currentLang.iso_639_1,
      label: currentLang.english_name,
    }))
    .sort((a, b) => {
      const aPriority = priorityLanguages.indexOf(a.value);
      const bPriority = priorityLanguages.indexOf(b.value);

      if (aPriority === -1 && bPriority === -1) {
        return a.label.localeCompare(b.label);
      } else if (aPriority === -1) {
        return 1;
      } else if (bPriority === -1) {
        return -1;
      } else {
        return aPriority - bPriority;
      }
    });
  const currentYear = new Date().getFullYear();
  const startYear = 1960;

  const yearsArray = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => ({
      value: startYear + index,
      label: startYear + index,
    })
  );

  const sortOptions = {
    languageOptions,
    sortBy: [
      {
        value: "popularity.desc",
        label: "Popularity Descending",
      },
      {
        value: "popularity.asc",
        label: "Popularity Ascending ",
      },
      {
        value: "revenue.asc",
        label: "Revenue Ascending ",
      },
      {
        value: "revenue.desc",
        label: "Revenue Descending ",
      },
      {
        value: "primary_release_date.asc",
        label: "Release Date Ascending ",
      },
      {
        value: "primary_release_date.desc",
        label: "Release Date Descending ",
      },
      {
        value: "vote_average.asc",
        label: "Rating Ascending ",
      },
      {
        value: "vote_average.desc",
        label: "Rating Descending ",
      },
    ],
    years: yearsArray.reverse(),
  };

  return sortOptions;
};

export default useSortOptions;
