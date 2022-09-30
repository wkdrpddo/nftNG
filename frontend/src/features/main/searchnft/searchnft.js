import NavBar from "../../../common/navbar/NavBar"
import Footer from "../../../common/footer/Footer"
import Form from 'react-bootstrap/Form';
import React from 'react';
import { useState, useEffect } from "react"
import {
  MDBInputGroup,
  MDBBtn,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader
} from 'mdb-react-ui-kit';
import { nftContract } from "../../../common/web3/web3Config"
import "./searchnft.css"

function SearchNft() {

    const [txnHash, settxnHash] = useState("");
    const [tokenId, settokenId] = useState(4)

    const [brandNm, setbrandNm] = useState("");
    const [productNo, setproductNo] = useState("");
    const [serialNo, setserialNo] = useState("");
    const [mfd, setmfd] = useState("");
    const [madeIn, setmadeIn] = useState("");
    const [brandAdd, setbrandArr] = useState("");
    const [ownAdd, setownArr] = useState("");

    const onTxnHandler = (event) => {
        settxnHash(event.currentTarget.value);
        console.log('txnHash', txnHash)
    }

    const onSearch = async (e) => {
        console.log('검색버튼 클릭 후', txnHash);
        const tokenId = await nftContract.methods
            .getTokenIdFromTxnHash(txnHash).call()
        await settokenId(tokenId);
        console.log(tokenId)

        const nftinfo = await nftContract.methods.ngs(tokenId).call()
            console.log(nftinfo)
            console.log('nftinfo타입', typeof(nftinfo))
            // console.log(JSON.stringify(nftinfo.pruduct.brandNm));

        await setbrandNm(nftinfo.brandNm);
        await setproductNo(nftinfo.productNo);
        await setserialNo(nftinfo.serialNo);
        await setmfd(nftinfo.mfd);
        await setmadeIn(nftinfo.madeIn);
    }
    useEffect(() => {
        onSearch();
    }, [])
    
    return(
        <div className="input-add">
            <NavBar/>
            <div className="main-height">
                <br/><br/><br/><br/>
                <div>
                    <h1 style={{marginTop:50}}>상품이 진품임을 확인해 보세요.</h1>
                    {tokenId}
                </div>
                <div className="input-group">
                    <MDBInputGroup className='mb-6' style={{marginTop:40}}>
                        <input className='form-control' placeholder="해쉬 주소를 입력하세요." type='text' onChange={onTxnHandler}/>
                        <MDBBtn outline onClick={onSearch}>Search</MDBBtn>  
                    </MDBInputGroup>
                </div>
                <MDBCard shadow='0' border='info' background='white' className='mb-3'>
                    <MDBCardHeader>NFT 정보</MDBCardHeader>
                    <MDBCardBody>
                    <MDBCardTitle>브랜드 명 : {brandNm}</MDBCardTitle>
                    <MDBCardTitle>제품 번호 : {productNo}</MDBCardTitle>
                    <MDBCardTitle>시리얼 번호 : {serialNo}</MDBCardTitle>
                    <MDBCardTitle>제조 날짜 : {mfd}</MDBCardTitle>
                    <MDBCardTitle>제조국 : {madeIn}</MDBCardTitle>
                    <MDBCardTitle>발행자 주소 : {madeIn}</MDBCardTitle>
                    <MDBCardTitle>소유자 주소 : {madeIn}</MDBCardTitle>
                    <MDBCardText>
                        nft 정보입니다.
                    </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </div>
            <Footer/>
        </div>
    )

}

export default SearchNft;