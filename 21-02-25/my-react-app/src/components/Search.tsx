import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const termFromUrl = searchParams.get("term") || "";

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTerm = formData.get("search") as string;

    if (newTerm.trim() !== "") {
      setSearchParams({ term: newTerm });
    }
  };

  return (
    <>
      <h2>Search Page</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search Here"
          defaultValue={termFromUrl}
        />
        <button type="submit">Search</button>
      </form>

      <p>
        <strong>Search Term:</strong> {termFromUrl || "No search term provided"}
      </p>
      <p>
        <strong>Full URL:</strong>{" "}
        {window.location.pathname + window.location.search}
      </p>
    </>
  );
};

export default Search;
