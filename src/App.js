import React, { useState } from "react";
import { useStays } from "./context";
import { Card } from "./components/Card";
import Topbar from "./components/Topbar";
import { stays } from "./stays";
const App = () => {
  const { filteredStays } = useStays();
  const [chosenCountry, setChosenCountry] = useState("Finland");

  return (
    <main className="main">
      <Topbar className="top-bar" />
      <div className="results-info">
        <h2
          className="stays-in-country-subtitle"
          key="1"
        >{`Stays in ${chosenCountry}`}</h2>
        <h2 className="stays-count" key="2">
          {`${filteredStays.length} stays found`}
        </h2>
      </div>
      <section className="cards">
        {filteredStays.length ? (
          filteredStays.map((stay, index) => {
            return <Card stay={stay} index={index} />;
          })
        ) : (
          <h2 className="no-results-heading">
            Sorry, no matching results found.
          </h2>
        )}
      </section>
    </main>
  );
};

export default App;
