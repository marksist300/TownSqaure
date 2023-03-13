import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Nav from "../../components/Navbar/Nav";
import SearchCard from "../../components/SearchCard/SearchCard";
import { useUserSearchMutation } from "../../features/user/userApiSlice";
import style from "./Search.module.scss";
function SearchPage() {
  const [noResult, setNoResult] = useState(false);
  const [searchedUserData, setSearchedUserData] = useState([]);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const userFound = searchParams.get("person");
  // Handle submit for native search bar
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const [UserSearch] = useUserSearchMutation();

  useEffect(() => {
    async function getUsersData() {
      try {
        if (userFound) {
          console.log("Running Effect in SEARCH => ", userFound);
          // get request
          const result = await UserSearch(userFound).unwrap();
          // console.log("results", result.users);
          if (result.users.length > 0) {
            setSearchedUserData(result.users);
          } else if (result.users.length === 0) {
            setNoResult(true);
          }
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
          <div className={style.resultTitleCard}>
            <span>
              {searchedUserData && searchedUserData.length === 1
                ? `1 person found `
                : `${searchedUserData.length} people found `}{" "}
              matched your criteria.
            </span>
          </div>
        )}
        <div className={style.cardContainer}>
          {/* <SearchCard user={null} />
          <SearchCard user={null} />
          <SearchCard user={null} />
          <SearchCard user={null} />
          <SearchCard user={null} />
          <SearchCard user={null} /> */}
          {searchedUserData &&
            searchedUserData.map((user, i) => (
              <SearchCard user={user} key={`user@${i}`} />
            ))}
        </div>
        {/*Mapped loop of Search Cards displaying users found   */}
      </main>
    </>
  );
}

export default SearchPage;
