// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NftExchanger {
    event ApplySale(
        address CA,
        uint256 tokenId,
        uint256 price,
        address indexed applyer
    );
    event Sale(
        address CA,
        uint256 tokenId,
        uint256 price,
        address indexed buyer,
        address indexed seller
    );
    event TransferFrom(
        address CA,
        uint256 tokenId,
        uint256 price,
        address indexed from,
        address indexed to
    );

    event GetApprovalForAllFromOtherContract(
        address indexed CA,
        address indexed owner,
        address indexed spender,
        bool check,
        bytes data
    );

    event CheckId(address indexed CA);

    event Minting(address CA, string uri, address indexed minter);

    struct SaleInfo {
        address onwer;
        uint256 tokenId;
        uint256 price;
    }

    mapping(string => address) public nftList;

    mapping(address => mapping(uint256 => SaleInfo)) private _sales;

    function makeTransfer(
        string memory nftName,
        address from,
        address to,
        uint256 tokenId
    ) public {
        IERC721(nftList[nftName]).transferFrom(from, to, tokenId);
    }

    function addNftList(string memory nftName, address CA) public {
        nftList[nftName] = CA;
    }

    function getNftList(string memory nftName) public view returns (address) {
        return nftList[nftName];
    }

    function mint(string memory nftKey, string memory uri)
        public
        payable
        returns (bool)
    {
        (bool success, bytes memory data) = nftList[nftKey].call(
            abi.encodeWithSignature(
                "exchangeMint(address,string)",
                msg.sender,
                uri
            )
        );
        emit Minting(nftList[nftKey], uri, msg.sender);
        return success;
    }

    function applySale(
        string memory nftName,
        uint256 tokenId,
        uint256 price
    ) public {
        require(
            IERC721(nftList[nftName]).ownerOf(tokenId) == msg.sender,
            "nft owner != msg.sender"
        );
        address owner = msg.sender;
        _sales[nftList[nftName]][tokenId] = SaleInfo(owner, tokenId, price);
        emit ApplySale(nftList[nftName], tokenId, price, owner);
    }

    function getSales(string memory nftName, uint256 tokenId)
        public
        view
        returns (
            address,
            uint256,
            uint256
        )
    {
        SaleInfo memory _sale = _sales[nftList[nftName]][tokenId];
        address _owner = _sale.onwer;
        uint256 _tokenId = _sale.tokenId;
        uint256 _price = _sale.price;
        return (_owner, _tokenId, _price);
    }

    function buySale(string memory nftName, uint256 tokenId) public payable {
        (address _owner, uint256 _tokenId, uint256 _price) = getSales(
            nftName,
            tokenId
        );
        require(_price == msg.value);
        address payable seller = payable(_owner);
        address buyer = msg.sender;
        seller.transfer(msg.value);
        makeTransfer(nftName, _owner, buyer, tokenId);
        delete _sales[nftList[nftName]][_tokenId];
        emit Sale(nftList[nftName], _tokenId, _price, buyer, seller);
    }

    function getApprovalForAllFromOtherContract(string memory nftName) public {
        (bool check, bytes memory data) = nftList[nftName].delegatecall(
            abi.encodeWithSignature(
                "setApprovalForAll(address,bool)",
                address(this),
                true
            )
        );
    }

    function checkApprovalForAll(string memory nftName) public returns (bytes memory) {
        (bool check, bytes memory data) = nftList[nftName].delegatecall(
            abi.encodeWithSignature(
                "isApprovedForAll(address,address)",
                msg.sender,
                address(this)
            )
        );

        return data;
    }
}
