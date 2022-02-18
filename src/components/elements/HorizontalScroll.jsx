import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { Arrow } from "./Arrow";
import useStyles from "../styles/Scrollbar";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import SubTitle from "./SubTitle";
import { usePalette } from "react-palette";
import alt from "../../assets/alt.png";

// const getItems = content;

function HorizontalScrolling(props) {
  let isTrending=false;
  let isAuthor=false;
  let onSale = false;
  const [items, setItems] = React.useState(props.getItems);

  const classes = useStyles();
  const handleClick = (index, author, authorAddr, contentType, coverImageHash, description, 
    descriptionHash, publicationDate, title, tokenIds, tokenType) => () => {
      //Load single page View
    };

  function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } =
      React.useContext(VisibilityContext);

    return (
      <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
        <ArrowBackIosRoundedIcon className={classes.arrow} />
      </Arrow>
    );
  }

  function RightArrow() {
    const { isLastItemVisible, scrollNext } =
      React.useContext(VisibilityContext);

    return (
      <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
        <ArrowForwardIosRoundedIcon className={classes.arrow} />
      </Arrow>
    );
  }

  function Card({ onClick, author, authorAddr, contentType, coverImageHash, description, 
       descriptionHash, publicationDate, title, tokenIds, tokenType }) {
    const visibility = React.useContext(VisibilityContext);
    const { data } = usePalette(coverImageHash);

    return (
      <div onClick={() => onClick(visibility)}>
        <div
          className={classes.card}
          style={{ backgroundColor: data.darkMuted }}>
          <img
            src={coverImageHash}
            alt={title}
            className={classes.image}
            onError={(e) => {
              e.target.src = alt;
              e.target.onerror = null; // prevents looping
            }}
          />
          <SubTitle
            isTrending={isTrending}
            isAuthor={isAuthor}
            onSale={onSale}
            isCollection={props.isCollection}
            src={coverImageHash}
            title={title}
            author={author}
            setup={props.setup}
          />
        </div>
      </div>
    );
  }

  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      className={classes.scrollMenu}>
      {items.map((value, index) => (
        <Card
          itemId={index} // NOTE: itemId is required for track items
          key={index}
          author = {value.author}
          authorAddr = {value.authorAddr}
          contentType = {value.contentType}
          coverImageHash = {value.coverImageHash}
          description = {value.description} 
          descriptionHash = {value.descriptionHash} 
          publicationDate = {value.publicationDate} 
          title = {value.title} 
          tokenIds = {value.tokenIds} 
          tokenType = {value.tokenType}
          onClick={handleClick(index, value.author, value.authorAddr, value.contentType, value.coverImageHash, value.description, 
            value.descriptionHash, value.publicationDate, value.title, value.tokenIds, value.tokenType)}
        />
      ))}
    </ScrollMenu>
  );
}

export default HorizontalScrolling;
