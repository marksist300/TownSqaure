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

  // Handle submit for nav search bar
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const [UserSearch] = useUserSearchMutation();

  useEffect(() => {
    async function getUsersData() {
      try {
        if (userFound) {
          const result = await UserSearch(userFound).unwrap();
          if (result.users.length > 0) {
            setSearchedUserData(result.users);
          } else if (result.users.length === 0) {
            setNoResult(true);
            setSearchedUserData([]);
          }
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
        {userFound === null ? (
          <h1>Start your Search here</h1>
        ) : (
          <h1>Showing results for {`${userFound}`}</h1>
        )}
        {userFound === null ? (
          <div className={style.resultTitleCard}>Who are you looking for?</div>
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
          {searchedUserData &&
            searchedUserData.map((user, i) => (
              <SearchCard user={user} key={`user@${i}`} />
            ))}
        </div>
      </main>
    </>
  );
}

export default SearchPage;
