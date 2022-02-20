import React, { useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { Arrow } from "./Arrow";
import useStyles from "../styles/Scrollbar";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import SubTitle from "./SubTitle";
import { usePalette } from "react-palette";
import alt from "../../assets/alt.png";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function HorizontalScrolling({
  isTrending = false,
  isAuthor = false,
  onSale = false,
  ...props
}) {
  const [items, setItems] = React.useState(props.getItems);
  const navigate = useNavigate();

  const classes = useStyles();
  const handleClick = (cid) => () => {
    console.log("cid", cid);
    const id = cid.toNumber();
    //Load Single page view
    navigate(`/singlePage/${id}`);
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
  console.log("items", items.length);
  // const [CollectiontokenIds, setCollectiontokenIds] = useState([[]]);
  var CollectiontokenIds = [];
  useEffect(() => {
    if (props.isCollection) {
      items.map((content, index) => {
        var CtokenIds = [];
        for (var i = 0; i < content.tokenIds.length; i++) {
          CtokenIds.push(content.tokenIds[i].toNumber());
        }
        if (content.tokenType === 0) {
          const filtered = props.TotalGoldIds.filter((value) =>
            CtokenIds.includes(value)
          );
          CollectiontokenIds.push(filtered);
        } else if (content.tokenType === 1) {
          const filtered = props.TotalSilverIds.filter((value) =>
            CtokenIds.includes(value)
          );
          CollectiontokenIds.push(filtered);
        } else if (content.tokenType === 2) {
          const filtered = props.TotalBronzeIds.filter((value) =>
            CtokenIds.includes(value)
          );
          CollectiontokenIds.push(filtered);
        }
      });
      console.log("CollectiontokenIds", CollectiontokenIds);
    }
  }, [CollectiontokenIds]);

  function Card({
    onClick,
    cid,
    author,
    authorAddr,
    contentType,
    coverImageHash,
    description,
    descriptionHash,
    publicationDate,
    title,
    tokenIds,
    tokenType,
    OwnedCollectionIds,
    index,
  }) {
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
            UserCollectiontokenIds={CollectiontokenIds}
            OwnedCollectionIds={OwnedCollectionIds[index]}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* {CollectiontokenIds.length > 0 ? ( */}
      <ScrollMenu
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        className={classes.scrollMenu}>
        {items.map((value, index) => (
          <Card
            itemId={value.cid} // NOTE: itemId is required for track items
            key={value.cid}
            cid={value.cid}
            author={value.author}
            authorAddr={value.authorAddr}
            contentType={value.contentType}
            coverImageHash={value.coverImageHash}
            description={value.description}
            descriptionHash={value.descriptionHash}
            publicationDate={value.publicationDate}
            title={value.title}
            tokenIds={value.tokenIds}
            tokenType={value.tokenType}
            OwnedCollectionIds={CollectiontokenIds}
            index={index}
            onClick={handleClick(value.cid)}
          />
        ))}
      </ScrollMenu>
      {/* ) : (<div>No</div>)}  */}
    </>
  );
}

export default HorizontalScrolling;
