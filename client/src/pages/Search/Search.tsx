import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import style from "./Search.module.scss";
import Nav from "../../components/Navbar/Nav";
import SearchCard from "../../components/SearchCard/SearchCard";
function SearchPage() {
  const location = useLocation();
  const [noResult, setNoResult] = useState(true);
  const [searchedUserData, setSearchedUserData] = useState("");
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const userFound = searchParams.get("person");
  console.log(userFound);
  // Handle submit for native search bar
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setSearchQuery(searchForm);
    // setSearchForm("");
  };

  useEffect(() => {
    async function getUsersData() {
      try {
        if (searchParams) {
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
  }, [searchParams]);

  return (
    <>
      <Nav />
      <main>
        <h1>Showing results for {userFound ? userFound : "..."}</h1>
        {noResult ? (
          <div className={style.resultTitleCard}>
            <span>No one found matching those details...</span>
          </div>
        ) : (
          searchedUserData && (
            <div>
              <span>
                {searchedUserData && searchedUserData.length} "{searchParams}"
                people matched your criteria.
              </span>
            </div>
          )
        )}
        <div className={style.cardContainer}>
          <SearchCard user={null} />
          <SearchCard user={null} />
          <SearchCard user={null} />
          <SearchCard user={null} />
          <SearchCard user={null} />
          <SearchCard user={null} />
        </div>
        {/*Mapped loop of Search Cards displaying users found   */}
      </main>
    </>
  );
}

export default SearchPage;
