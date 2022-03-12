import React, { useState } from "react";
import { useStyles } from "../styles/Search";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { InputBase, Badge } from "@material-ui/core";

function SearchBar({ data }) {
  const searchStyles = useStyles();
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
    <div className={searchStyles.search}>
      <div className={searchStyles.searchInputs}>
        <InputBase
          placeholder='Search Content ...'
          value={wordEntered}
          onChange={handleFilter}
          classes={{
            root: searchStyles.inputRoot,
          }}
          inputProps={{ "aria-label": "search" }}
        />
        <div className={searchStyles.searchIcon}>
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id='clearBtn' onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className={searchStyles.dataResult}>
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a
                className={searchStyles.dataItem}
                href={`/singlePage/${value.cid}/${value.tokenIds[0]}`}
                target='_blank'
                alt={value.title}>
                <>
                  <img
                    src={value.coverImageHash}
                    style={{
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                  <p>{value.title}</p>
                </>
                {value.tokenType === 0 ? (
                  <Badge
                    className={searchStyles.badge}
                    style={{ backgroundColor: "#C9B037" }}>
                    GOLD
                  </Badge>
                ) : (
                  <>
                    {value.tokenType === 1 ? (
                      <Badge
                        className={searchStyles.badge}
                        style={{ backgroundColor: "#B4B4B4" }}>
                        SILVER
                      </Badge>
                    ) : (
                      <Badge
                        className={searchStyles.badge}
                        style={{ backgroundColor: "#AD8A56" }}>
                        BRONZE
                      </Badge>
                    )}
                  </>
                )}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
