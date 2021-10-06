import React, { useState, useEffect } from "react";
import { Search, Room, Remove, Add, Close } from "@material-ui/icons";
import { useStays } from "../context";

const Searchbar = () => {
  const {
    handleSubmit,
    searchBarFocus,
    searchBarFocusHandler,
    isSearchBarFocused,
    stays,
    filteredStays,
    showAll,
  } = useStays();
  const [city, setLocation] = useState("");
  const [maxGuestCount, setMaxGuestCount] = useState(0);
  const [adultGuestCount, setAdultGuestCount] = useState(0);
  const [childGuestCount, setChildGuestCount] = useState(0);

  const locations = [
    ...new Set(
      stays.map((stay) => {
        const { city, country } = stay;
        return `${city}, ${country}`;
      })
    ),
  ];

  const cityAndGuestCountSetter = (e) => {
    e.preventDefault();
    handleSubmit({ city, maxGuestCount });
  };

  return (
    <article
      className={`search-bar ${isSearchBarFocused ? "search-bar-focused" : ""}`}
    >
      <form onSubmit={cityAndGuestCountSetter}>
        <input
          type="text"
          className="location"
          onChange={(e) => setLocation(e.currentTarget.value)}
          onClick={() => searchBarFocusHandler("location")}
          placeholder={"Enter Location"}
          value={city}
          required
        />
        <input
          type="number"
          className="guest-count"
          onChange={(e) => setMaxGuestCount(e.currentTarget.value)}
          placeholder="Add Guests"
          onClick={() => searchBarFocusHandler("maxGuestCount")}
          value={maxGuestCount}
          required
        />
        <button className="submit-btn" type="submit">
          <Search /> {`${isSearchBarFocused ? "search" : ""}`}
        </button>
      </form>

      <div
        className={`extended-search-drawer ${
          isSearchBarFocused ? "display-extended-drawer" : ""
        }`}
      >
        {filteredStays.length < 14 && (
          <button className="remove-selection" onClick={() => showAll()}>
            <Close />
          </button>
        )}
        <div className="location-btns-container">
          {searchBarFocus.location &&
            locations.map((location, index) => {
              return (
                <button
                  className="location-btn"
                  key={index}
                  onClick={() =>
                    setLocation(location.split(" ")[0].slice(0, -1))
                  }
                >
                  <Room />
                  {location}
                </button>
              );
            })}
        </div>
        <div className="guest-count-selector-container">
          {searchBarFocus.maxGuestCount && (
            <div className="adults-count-container">
              <div className="adult-count-info">
                <h4>Adults</h4>
                <p>Ages 13 or above</p>
              </div>
              <div className="adult-count-btn-and-count-container">
                <button
                  className="adult-count-minus-btn count-adjust-btn"
                  onClick={() => {
                    if (adultGuestCount !== 0 && maxGuestCount !== 0) {
                      setAdultGuestCount(adultGuestCount - 1);
                      setMaxGuestCount(maxGuestCount - 1);
                    }
                  }}
                >
                  <Remove className="symbol" />
                </button>
                <span>{adultGuestCount}</span>
                <button
                  className="adult-count-plus-btn count-adjust-btn"
                  onClick={() => {
                    setAdultGuestCount(adultGuestCount + 1);
                    setMaxGuestCount(maxGuestCount + 1);
                  }}
                >
                  <Add className="symbol" />
                </button>
              </div>
              <div className="children-count-container">
                <div className="children-count-info">
                  <h4>Children</h4>
                  <p>Ages 2-12</p>
                </div>
                <div className="child-count-btn-and-count-container">
                  <button
                    className="child-count-minus-btn count-adjust-btn"
                    onClick={() => {
                      if (childGuestCount !== 0 && maxGuestCount !== 0) {
                        setChildGuestCount(childGuestCount - 1);
                        setMaxGuestCount(maxGuestCount - 1);
                      }
                    }}
                  >
                    <Remove className="symbol" />
                  </button>
                  <span>{childGuestCount}</span>
                  <button
                    className="child-count-plus-btn count-adjust-btn"
                    onClick={() => {
                      setChildGuestCount(childGuestCount + 1);
                      setMaxGuestCount(maxGuestCount + 1);
                    }}
                  >
                    <Add className="symbol" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default Searchbar;
