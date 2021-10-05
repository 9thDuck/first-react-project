import React, { useContext, useState, useEffect } from "react";
import { stays } from "./stays";

export const AppContext = React.createContext();

export const UseStaysProvider = ({ children }) => {
  const [searchData, setSearchData] = useState({
    city: "",
    maxGuestCount: 1,
  });
  const [searchBarFocus, setSearchBarFocus] = useState({
    location: false,
    maxGuestCount: false,
  });

  const isSearchBarFocused = Object.values(searchBarFocus).filter(
    (val) => val
  ).length;

  const filteredStays = stays.filter((stay) => {
    const { city, maxGuests } = stay;
    const cityRegex = new RegExp(searchData.city, "i");
    if (searchData.city === "") {
      return stay;
    }
    if (cityRegex.test(city) && searchData.maxGuestCount <= maxGuests) {
      return stay;
    }
  });

  const handleSubmit = (input) => {
    setSearchData(input);
    setSearchBarFocus({ location: false, maxGuestCount: false });
  };

  const searchBarFocusHandler = (box) => {
    if (box === "location") {
      setSearchBarFocus({ location: true, maxGuestCount: false });
    } else if (box === "maxGuestCount") {
      setSearchBarFocus({ location: false, maxGuestCount: true });
    }
  };

  return (
    <AppContext.Provider
      value={{
        filteredStays,
        handleSubmit,
        searchBarFocus,
        searchBarFocusHandler,
        isSearchBarFocused,
        stays,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useStays = () => useContext(AppContext);
