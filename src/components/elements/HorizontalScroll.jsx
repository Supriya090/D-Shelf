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
  ...props
}) {
  const onSale = props.onSale ? props.onSale : false;
  const CollectionOnSale = props.CollectionOnSale ? props.CollectionOnSale : false;
  const [items, setItems] = React.useState(props.getItems);
  const precision = 1000000000
  const navigate = useNavigate();

  const classes = useStyles();
  const handleClick = (cid,itemId,price) => () => {
    console.log("cid", itemId);
    const id = cid.toNumber();

    // itemId = itemId.toNumber();
    
    //Load Single page view
    navigate(`/singlePage/${id}/${itemId}/${price}`);
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
    price,
    itemId,
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
    tokenId,
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
          price = {price}
          itemId = {itemId}
            isTrending={isTrending}
            isAuthor={isAuthor}
            onSale={onSale}
            tokenId={tokenId}
            CollectionOnSale={CollectionOnSale}
            isCollection={props.isCollection}
            src={coverImageHash}
            title={title}
            author={author}
            buyContent={props.buyContent}
            UserCollectiontokenIds={CollectiontokenIds}
            OwnedCollectionIds={OwnedCollectionIds[index]}
            tokenType={tokenType}
            setup = {props.setup}
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
            itemId={value.itemId} // NOTE: itemId is required for track items
            key={value.cid}
            cid={value.cid}
            price={value.price}
            author={value.author}
            authorAddr={value.authorAddr}
            contentType={value.contentType}
            coverImageHash={value.coverImageHash}
            description={value.description}
            descriptionHash={value.descriptionHash}
            publicationDate={value.publicationDate}
            title={value.title}
            tokenIds={value.tokenIds}
            tokenId={value.tokenId}
            tokenType={value.tokenType}
            OwnedCollectionIds={CollectiontokenIds}
            index={index}
            onClick={handleClick(value.cid,value.tokenId,(value.price)/precision)}
          />
        ))}
      </ScrollMenu>
      {/* ) : (<div>No</div>)}  */}
    </>
  );
}

export default HorizontalScrolling;
