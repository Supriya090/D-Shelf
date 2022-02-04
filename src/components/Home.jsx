import { Button, Divider, Typography, Tooltip } from "@material-ui/core";
import React from "react";
import dummy from "../assets/dummy.jpg";
import dummy2 from "../assets/dummy1.jpg";
import { useStyles } from "./styles/Home";
import HorizontalScrolling from "./elements/HorizontalScroll";
import { content } from "./elements/dummyImages";
import ListHead from "./elements/ListHead";
import { useNavigate } from "react-router";
import ReadMore from "./elements/ReadMore";

const auctionContent = content;

const Home = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const marketRoute = () => {
    navigate("/marketplace", { replace: true });
  };
  const singleRoute = () => {
    navigate("/singlePage", { replace: true });
  };

  return (
    <div className={classes.mainContent}>
      <div className={classes.featuredContent}>
        <div className={classes.featured}>
          <Typography>Featured Contents</Typography>
          <div className={classes.NFTFeatures}>
            <div>
              <div className={classes.owner}>
                <Typography>
                  Title : The Crow&apos;s Vow <br /> Owner : Susan Briscoe (
                  0xD43f4536...5e4 ) <br />
                  Author : Susan Briscoe <br />
                </Typography>
                <Tooltip title='$10000'>
                  <Button
                    variant='contained'
                    className={classes.exploreButton}
                    style={{
                      color: "#fff",
                      backgroundColor: "#000",
                      fontWeight: 500,
                      cursor: "default",
                    }}>
                    4 ETH
                  </Button>
                </Tooltip>
              </div>
              <Divider />
              <ReadMore>
                <div className={classes.description}>
                  <Typography>
                    Following the story of a marriage come undone, this moving
                    book-length sequence is broken down into four seasons,
                    distilling the details of the failed relationship through
                    physical processes of nature, such as the buzzing life of
                    wildflowers and birds that the speaker's wife and mother,
                    studies daily for clues on happiness. Intricately
                    constructed and brimming with resourceful linguistic play,
                    these poems are elemental odes on the end of love and its
                    eventual renewal.
                  </Typography>
                </div>
              </ReadMore>
            </div>
          </div>
          <Button
            variant='contained'
            className={classes.exploreButton}
            style={{ marginTop: "40px" }}>
            Explore More
          </Button>
        </div>
        <div className={classes.currentBid}>
          <img src={dummy} alt='NFTImage' className={classes.NFTImage} />
        </div>
      </div>
      <div className={classes.itemsList}>
        <div className={classes.auctions}>
          <ListHead title={"On Auctions"} leftButton={"On Sale"} />
          <HorizontalScrolling getItems={auctionContent} onSale={true} />
        </div>
        <div className={classes.notableContents} style={{ marginTop: "80px" }}>
          <ListHead
            title={"Notable Contents"}
            leftButton={"Trending"}
            hasRightButton={true}
          />
          <HorizontalScrolling getItems={auctionContent} isTrending={true} />
        </div>
        <div className={classes.notableCreators} style={{ marginTop: "80px" }}>
          <ListHead
            title={"Notable Writers"}
            leftButton={"Popular"}
            hasRightButton={true}
          />
          <HorizontalScrolling getItems={auctionContent} isAuthor={true} />
        </div>
      </div>
      <Button
        variant='contained'
        className={classes.exploreButton}
        style={{ margin: "50px 0px" }}
        onClick={marketRoute}>
        Explore Marketplace
      </Button>
    </div>
  );
};

export default Home;

/*
// https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

import React, {useState} from 'react'
import {ethers} from 'ethers'
import SimpleStorage_abi from './contracts/SimpleStorage_abi.json'

const SimpleStorage = () => {

	// deploy simple storage contract and paste deployed contract address here. This value is local ganache chain
	let contractAddress = '0xCF31E7c9E7854D7Ecd3F3151a9979BC2a82B4fe3';

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [currentContractVal, setCurrentContractVal] = useState(null);

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		updateEthers();
	}

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}


	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, SimpleStorage_abi, tempSigner);
		setContract(tempContract);	
	}

	// const setHandler = (event) => {
	// 	event.preventDefault();
	// 	console.log('sending ' + event.target.setText.value + ' to the contract');
	// 	contract.set(event.target.setText.value);
	// }

	// const getCurrentVal = async () => {
	// 	let val = await contract.get();
	// 	setCurrentContractVal(val);
	// }
	
	return (
		<div>
		<h4> {"Get/Set Contract interaction"} </h4>
			<button onClick={connectWalletHandler}>{connButtonText}</button>
			<div>
				<h3>Address: {defaultAccount}</h3>
			</div>
			<form onSubmit={setHandler}>
				<input id="setText" type="text"/>
				<button type={"submit"}> Update Contract </button>
			</form>
			<div>
			<button onClick={getCurrentVal} style={{marginTop: '5em'}}> Get Current Contract Value </button>
			</div>
			{currentContractVal}
			{errorMessage}
		</div>
	);
}

export default SimpleStorage;
*/
