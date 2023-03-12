import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import style from "./Search.module.scss";
import Nav from "../../components/Navbar/Nav";
function SearchPage() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(null);
  const [noResult, setNoResult] = useState(true);
  const [searchedUserData, setSearchedUserData] = useState("");
  const [error, setError] = useState(false);

  // Handle submit for native search bar
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setSearchQuery(searchForm);
    // setSearchForm("");
  };

  useEffect(() => {
    async function getUsersData() {
      try {
        if (searchQuery) {
          return;
          // get request

          //IF Data
          // Take data => store it in state and pass as props to SearchCard Component.
          //if no result set noResult = true

          // Else if an error respond appropriately
        }
      } catch (error) {
        setError(true);
      }
    }
    getUsersData();
  }, [searchQuery]);

  return (
    <>
      <Nav />
      <main>
        <h1>Showing results for {searchQuery ? searchQuery : "..."}</h1>
        {noResult ? (
          <div className={style.resultTitleCard}>
            <span>No one found matching those details...</span>
          </div>
        ) : (
          searchedUserData && (
            <div>
              <span>
                {searchedUserData && searchedUserData.length} "{searchQuery}"
                people matched your criteria.
              </span>
            </div>
          )
        )}

        {/*Mapped loop of Search Cards displaying users found   */}
      </main>
    </>
  );
}

export default SearchPage;
