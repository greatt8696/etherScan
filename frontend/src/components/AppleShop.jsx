import React, { useEffect, useState } from 'react'
import AppleShopContract from "../contracts/AppleShop.json"

// props로 web3, account 받는 컴포넌트
const AppleShop = ({web3, account}) => {
    const [apple,setApple] = useState();
    const [deployed, setDeployed] = useState();
    const [CA, setCA] = useState();

    // 사과 구매하기 버튼 함수
    const buy = async () =>{
        await deployed.methods.buyApple().send({
            from : account,
            to : CA,
            value : web3.utils.toWei("1", "ether")
        });
        const currentApple = await deployed.methods.getApple().call();
        setApple(currentApple);
    }

    // 사과 판매하기 버튼 함수
    const sell = async () =>{
        const eth = web3.utils.toWei("1" , "ether");
        await deployed.methods.sellApple(eth).send({
            from : account,
            to : CA
        });
        const currentApple = await deployed.methods.getApple().call();
        setApple(currentApple);
    }

    // 생명 주기 마운트
    useEffect(()=>{
        // 즉시 실행 함수 async
        (async()=>{
            if(!web3) return;
            // 네트워크 아이디
            const networkId = await web3.eth.net.getId();
            // 컨트랙트 조회 인스턴스 객체
            const instance = await new web3.eth.Contract(
                AppleShopContract.abi,
                // CA 값
                AppleShopContract.networks[networkId].address
            );

            // 인스턴스 객체 사과 갯수 가져오는 함수 호출
            const currentApple = await instance.methods.getApple().call();
            setApple(currentApple);
            setDeployed(instance);
            setCA(AppleShopContract.networks[networkId].address);
        })();
    }, [])


    return (
        <div>
            <div>사과 한개 가격 : 1 ETH</div>
            <div>내가 가지고 있는 사과 : {apple} 개</div>
            <button onClick={buy}>구매하기</button>

            <div>사과 판매 가격 : {apple} ETH</div>
            <button onClick={sell}>사과 전체 판매하기</button>
        </div>
    )
}

export default AppleShop