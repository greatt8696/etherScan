import { map } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useWeb3 from "../../hooks/useWeb3";
import {
  Plus,
  Minus,
  ChevronDown,
  LogIn,
  LogOut,
  User,
  Users,
  Wallet,
} from "lucide-react";
import axios, { all } from "axios";
import { baseUriConfig } from "../../../baseUriConfig";

const Main = ({ msg, type }) => {
  const [web3, account] = useWeb3();
  const [data, setData] = useState({
    mintingSize: 5,
  });
  const [cardOpen, setCardOpen] = useState([]);

  const nav = useNavigate();
  const dispatch = useDispatch();

  const [uris, setUris] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCardOpen(Array(data.mintingSize).fill(true));
  }, [data.mintingSize]);

  useEffect(() => {
    const getUris = async () => {
      const uriRequestList = uris.map((uri) => axios(uri));
      const result = await Promise.all(uriRequestList).then((results) =>
        results.map((data) => data.data)
      );
      setCards(result);
    };
    getUris();
  }, [uris]);

  const minusClickHandler = () =>
    setData({ data: data.mintingSize--, ...data });
  const plusClickHandler = () => setData({ data: data.mintingSize++, ...data });

  /*
  const mintingSizeClickHandler = (e) => {
    console.log(e.target)
    e.target.name === 'minus'
      ? setData({ data: data.mintingSize--, ...data })
      : setData({ data: data.mintingSize++, ...data })
  }*/

  const mintingClickHandler = async () => {
    const contract = web3.getContractInstance();
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const uris = await axios(
      `http://${baseUriConfig}:3000/nft/equipNft/minting/${data.mintingSize}`
    ).then((result) => result.data.data.uris);

    web3
      .sendTransaction(
        {
          functionName: "batchMint",
          args: [data.mintingSize, uris],
          from: account[0],
        },
        contract[3] //equipMinting
      )
      .on("receipt", () => {
        setUris(uris);
      });
  };

  const SIZE = 33;
  const DURATION = 1000;
  const stepTime = DURATION / SIZE;
  const arr = Array(SIZE)
    .fill(false)
    .map((_, idx) => parseInt(stepTime * idx));

  const cardClick = (e) => {
    e.target.style.opacity = "0";
    console.log(e.target.style);
  };

  const makeAoura = (grade) => {
    let color;
    switch (grade) {
      case "Ggyu":
        color = "bg-black";
        break;
      case "Normal":
        color = "bg-white";
        break;
      case "Rare":
        color = "bg-blue-500";
        break;
      case "Unique":
        color = "bg-yellow-500";
        break;
      case "epic":
        color = "bg-purple-500";
        break;
      case "Legend":
        color = "bg-orage-500";
        break;
      case "Myth":
        color = "bg-red-500";
        break;
      default:
        break;
    }
    return color;
  };

  return (
    <div className="w-full grid grid-cols-6 gap-5">
      <div className="col-span-4 h-full flex flex-wrap gap-4">
        {cards.map((card) => (
          <div className="relative rounded-2xl cursor-pointer group">
            {card.attributes.map((attribute, idx) => {
              return (
                attribute.trait_type === "grade" &&
                cardOpen[idx] && (
                  <div
                    className={`w-[200px] h-[400px] ${makeAoura(
                      attribute.value
                    )} absolute -top-8 left-8 rounded-full blur-3xl opacity-0 group-hover:opacity-100 group-hover:animate-ping z-20 transition-all`}
                  ></div>
                )
              );
            })}
            <div className="overflow-hidden relative rounded-2xl">
              <div
                className="w-[200px] h-[400px] bg-black absolute -top-8 left-8 rounded-full transition-all scale-150 z-40 blur-lg"
                onClick={cardClick}
              ></div>

              <div className="p-5 bg-slate-500/75  m-2 rounded-xl text-white font-bold">
                <p>{card.name}</p>
                <img src={card.image} alt="" className="w-16 h-16 mx-auto" />
                <p>내용</p>
                <p>{card.description}</p>
                <p>능력치</p>
                {card.attributes.map((attribute) => (
                  <div className="flex">
                    <p className="mr-5">{attribute.trait_type}</p>{" "}
                    <p>{attribute.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-2 bg-slate-200/30 h-full rounded-xl p-5 flex flex-col gap-5">
        <h1 className="text-white mx-auto font-bold text-3xl text-center ">
          민팅하긔
        </h1>
        <div className="w-30 h-30 bg-red-300 ">1</div>
        <div className="w-30 h-30 bg-red-300 ">1</div>
        <div className="flex justify-around">
          <button
            name="minus"
            onClick={minusClickHandler}
            className="p-2  bg-red-500 rounded-full"
          >
            <Minus
              name="minus"
              className="text-white ml-auto font-bold"
              size={20}
            />
          </button>
          <input
            className="bg-slate-200/30 text-center text-xl font-bold pl-2 rounded-lg"
            type="number"
            min={1}
            max={50}
            value={data.mintingSize}
          />
          <button
            name="plus"
            onClick={plusClickHandler}
            className="p-2  bg-green-500 rounded-full"
          >
            <Plus
              name="plus"
              className="text-white ml-auto font-bold"
              size={20}
            />
          </button>
        </div>

        <button
          onClick={mintingClickHandler}
          className="p-2  bg-green-500 rounded-full"
        >
          <p className="text-white font-bold">민팅 진행시캿</p>
        </button>
      </div>
      {/* <button className="w-20 h-6 bg-red-500"> 1</button>
      <div className="w-full flex gap-2 flex-wrap">
        {arr.fill(false).map((delay, idx) => (
          <div className="introY" style={{ animationDelay: `${delay}ms` }}>
            <div className="bg-yellow-300 w-44  h-60"></div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Main;
