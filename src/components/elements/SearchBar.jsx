
import React, { useState } from "react";
import "./SearchBar.css";
import { useStyles } from "../styles/SearchBar";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { InputBase } from "@material-ui/core";

function SearchBar({ data }) {
const {
    search,
    searchIcon,
    inputInput,
    inputRoot,
    } = useStyles();
const [filteredData, setFilteredData] = useState([]);
const [wordEntered, setWordEntered] = useState("");

console.log("data", data);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

return (
    <div className="search">
      <div className="searchInputs">
         <InputBase
                placeholder='Search Content ...'
                value={wordEntered}
                onChange={handleFilter}
                classes={{
                    root: inputRoot,
                }}
                inputProps={{ "aria-label": "search" }}
            />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={`/singlePage/${value.cid}/${value.cid}/${value.cid}`} target="_blank">
                <img src={value.coverImageHash} style={{width: "100%", height: "100%", objectFit: "contain"}}/>
                {value.tokenType === 0 ? (<p>GOLD   {value.title}</p>):
                (<>{
                  value.tokenType === 1 ? (<p>SILVER   {value.title}</p>) : (<p>BRONZE   {value.title}</p>)
                }</>)
                }
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;