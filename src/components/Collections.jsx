import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useStyles as marketStyles } from "./styles/MarketPlace";
import { useStyles as homeStyles } from "./styles/Home";
import HorizontalScrolling from "./elements/HorizontalScroll";
import ListHead from "./elements/ListHead";
import { useEffect } from "react";
import loader from "../assets/loading-yellow.gif";

const Collections = (props) => {
  var defaultAccount;
  var bookContract;
  var marketContract;
  var provider;
  var signer;
  var filtered;
  var TotalUnlistedIds = [];

  const marketClasses = marketStyles();
  const homeClasses = homeStyles();

  const [UserContents, setContents] = useState([]);
  const [UsergoldContents, setGoldContents] = useState([]);
  const [UsersilverContents, setSilverContents] = useState([]);
  const [UserbronzeContents, setBronzeContents] = useState([]);
  const [TotalBronzeIds, setTotalBronzeIds] = useState(null);
  const [TotalSilverIds, setTotalSilverIds] = useState(null);
  const [TotalGoldIds, setTotalGoldIds] = useState(null);
  const [TotalIds, setTotalIds] = useState(null);
  const [listedContents,setListedContents] = useState([])
  const [purchasedContents,setPurchasedContents] = useState([])

  useEffect(() => {

    const addContent = (content,item={itemId:"b"}) => {
      let listed = {
        tokenId : content.tokenIds[0],
        tokenIds : content.tokenIds,
        itemId : item.itemId,
        title : content.title,
        tokenType : content.tokenType,
        cid : content.cid,
        publicationDate : content.publicationDate,
        author : content.author,
        authorAddr: content.authorAddr,
        coverImageHash: content.coverImageHash,
        descriptionHash: content.descriptionHash,
        description: content.description,
        price:item.price
        }
        return listed
    }

    const addItemId = (contentArray,item={itemId:0}) => {
      const array = []
      for (const content of contentArray) {
        let listed = {
          tokenId : content.tokenIds[0],
          tokenIds : content.tokenIds,
          itemId : item.itemId,
          title : content.title,
          tokenType : content.tokenType,
          cid : content.cid,
          publicationDate : content.publicationDate,
          author : content.author,
          authorAddr: content.authorAddr,
          coverImageHash: content.coverImageHash,
          descriptionHash: content.descriptionHash,
          description: content.description,
          price:0,
          }
        array.push(listed)
      }
      return array
    }


    if (props.connButtonText === "Wallet Connected") {
      props
        .setup()
        .then((value) => {
          defaultAccount = value[0];
          bookContract = value[1];
          marketContract = value[2];
          provider = value[3];
          signer = value[4];
        })
        .then(async () => {
          const items =  await marketContract.fetchListeditems()
          console.log("listed..........",items)
          let listedcontent = []
          for(const item of items){
            const content = await bookContract.getContentofToken(item.tokenId)
            listedcontent.push(addContent(content,item)) 
          }
          setListedContents(listedcontent)
          console.log("Listed Contents",listedcontent)

          const myitems =  await marketContract.fetchMyNFTs()
          console.log("purchased..........",myitems)
          const mycontent = []
          for(const item of myitems){
            console.log("token",item.tokenId)
            const content = await bookContract.getContentofToken(item.tokenId)
            mycontent.push(addContent(content,item)) 
          }
          setPurchasedContents(addItemId(mycontent))
          console.log("Purchased Contents",mycontent)

          const totalTokens = await bookContract.getTokensOwnedByUser()
          setTotalIds(totalTokens);
          console.log("Total Tokens",totalTokens);
          const UnlistedTokenOfUser = await marketContract.FilterTokens(totalTokens)
            for (var i = 0; i < UnlistedTokenOfUser.length; i++) {
              TotalUnlistedIds.push(UnlistedTokenOfUser[i].toNumber());
            }
          console.log("Unlisted Token Of User",TotalUnlistedIds)
        })
        .then(async() => {
          console.log(TotalUnlistedIds);
          await bookContract.getTotalgoldTokens()
          .then((totalGoldTokens) => {
            var TotalGoldIds = [];
            for (var i = 0; i < totalGoldTokens.length; i++) {
              TotalGoldIds.push(totalGoldTokens[i].toNumber());
            }
            filtered = TotalGoldIds.filter((value) => TotalUnlistedIds.includes(value));
            console.log("Total Gold Ids",filtered);
            setTotalGoldIds(filtered);
          });

          await bookContract.getTotalsilverTokens()
          .then((totalSilverTokens) => {
            var TotalSilverIds = [];
            for (var i = 0; i < totalSilverTokens.length; i++) {
              TotalSilverIds.push(totalSilverTokens[i].toNumber());
            }
            filtered = TotalSilverIds.filter((value) => TotalUnlistedIds.includes(value));
            console.log("Total Silver Ids",filtered);
            setTotalSilverIds(filtered);
          });

          await bookContract.getTotalbronzeTokens()
          .then((totalBronzeTokens) => {
            var TotalBronzeIds = [];
            for (var i = 0; i < totalBronzeTokens.length; i++) {
              TotalBronzeIds.push(totalBronzeTokens[i].toNumber());
            }
            filtered = TotalBronzeIds.filter((value) => TotalUnlistedIds.includes(value));
            console.log("Total Bronze Ids",filtered);
            setTotalBronzeIds(filtered);
          });

          const UserContents = await bookContract.getAllContentsOfUser()
          console.log("User owned Content : ", UserContents);
          setContents(addItemId(UserContents));

          const UserGoldContents = await bookContract.getContentsByTokenTypeofUser("gold", defaultAccount)
          console.log("User owned gold Content : ", UserGoldContents);
          setGoldContents(addItemId(UserGoldContents));

          const UserSilverContents = await bookContract.getContentsByTokenTypeofUser("silver", defaultAccount)
          console.log("User owned silver Content : ", UserSilverContents);
          setSilverContents(addItemId(UserSilverContents));

          const UserBronzeContents = await bookContract.getContentsByTokenTypeofUser("bronze", defaultAccount)
          console.log("User owned bronze Content : ", UserBronzeContents);
          setBronzeContents(addItemId(UserBronzeContents));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.connButtonText]);

  return (
    <div className={homeClasses.mainContent}>
      <div className={marketClasses.heading} style={{ marginTop: "30px" }}>
        <Typography>My Content Collections</Typography>
      </div>
      <div className={homeClasses.itemsList}>
        <div className={homeClasses.auctions}>
          <ListHead title={""} leftButton={"On Sale"} />
          {listedContents.length === 0 ? (
            <img
              src={loader}
              alt='loading...'
              className={marketClasses.loader}
            />
          ) : (
            <HorizontalScrolling 
              getItems={listedContents} 
              isCollection={false}
              CollectionOnSale={true}
              setup={props.setup} 
            />
          )}
        </div>
        <div
          className={homeClasses.notableContents}
          style={{ marginTop: "80px" }}>
          <ListHead title={""} leftButton={"Purchased"} />
          {purchasedContents.length !== 0 ? (
            <HorizontalScrolling
              getItems={purchasedContents}
              isCollection={false}
              setup={props.setup}
            />
          ) : (
            <img
              src={loader}
              alt='loading...'
              className={marketClasses.loader}
            />
          )}
        </div>
        <div
          className={homeClasses.notableContents}
          style={{ marginTop: "80px" }}>
          <ListHead title={""} leftButton={"Gold"} />
          {UsergoldContents.length !== 0 && TotalGoldIds !== 0 ? (
            <HorizontalScrolling
              getItems={UsergoldContents}
              isCollection={true}
              setup={props.setup}
              TotalGoldIds={TotalGoldIds}
              type='gold'
            />
          ) : (
            <img
              src={loader}
              alt='loading...'
              className={marketClasses.loader}
            />
          )}
        </div>
        <div
          className={homeClasses.notableContents}
          style={{ marginTop: "80px" }}>
          <ListHead title={""} leftButton={"Silver"} />
          {UsersilverContents.length !== 0 && TotalSilverIds !== 0 ? (
            <HorizontalScrolling
              getItems={UsersilverContents}
              isCollection={true}
              setup={props.setup}
              TotalSilverIds={TotalSilverIds}
              type='silver'
            />
          ) : (
            <img
              src={loader}
              alt='loading...'
              className={marketClasses.loader}
            />
          )}
        </div>
        <div
          className={homeClasses.notableCreators}
          style={{ marginTop: "80px" }}>
          <ListHead title={""} leftButton={"Bronze"} />
          {UserbronzeContents.length !== 0 && TotalBronzeIds !== 0 ? (
            <HorizontalScrolling
              setup = {props.setup}
              getItems={UserbronzeContents}
              isCollection={true}
              TotalBronzeIds={TotalBronzeIds}
              type='bronze'
            />
          ) : (
            <img
              src={loader}
              alt='loading...'
              className={marketClasses.loader}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;
