import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { Arrow } from "./Arrow";
import useStyles from "../styles/Scrollbar";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import SubTitle from "./SubTitle";
import { usePalette } from "react-palette";

// const getItems = content;

function HorizontalScrolling({
  getItems,
  isTrending,
  isAuthor,
  onSale,
  isCollection,
}) {
  const [items, setItems] = React.useState(getItems);
  const [selected, setSelected] = React.useState([]);
  const [position, setPosition] = React.useState(0);

  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const classes = useStyles();
  const handleClick =
    (id) =>
    ({ getItemById, scrollToItem }) => {
      const itemSelected = isItemSelected(id);

      setSelected((currentSelected) =>
        itemSelected
          ? currentSelected.filter((el) => el !== id)
          : currentSelected.concat(id)
      );
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

  function Card({ onClick, selected, title, itemId, img }) {
    const visibility = React.useContext(VisibilityContext);
    const { data } = usePalette(img);

    return (
      <div onClick={() => onClick(visibility)}>
        <div
          className={classes.card}
          style={{ backgroundColor: data.darkVibrant }}>
          <img src={img} alt={title} className={classes.image} />
          <SubTitle
            isTrending={isTrending}
            isAuthor={isAuthor}
            onSale={onSale}
            isCollection={isCollection}
            src={img}
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
      {items.map(({ id, title, url }) => (
        <Card
          itemId={id} // NOTE: itemId is required for track items
          title={title}
          key={id}
          img={url}
          onClick={handleClick(id)}
          selected={isItemSelected(id)}
        />
      ))}
    </ScrollMenu>
  );
}

export default HorizontalScrolling;
