// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ERC721Enumerable.sol";

contract EquipToken is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    mapping(address => uint256[]) private _userOwnedTokenIds;
    Counters.Counter private _tokenIdCounter;
    uint256 private mintPrice = 100;
    address private _exchangeOperatorCA;

    constructor(address exchangeOperatorCA) ERC721("EquipToken", "EQT") {
        uint256 MINT_SIZE = 10;
        for (uint256 idx = 0; idx < MINT_SIZE; idx++) {
            ownerMint();
        }
        _exchangeOperatorCA = exchangeOperatorCA;
        setApprovalForAll(exchangeOperatorCA, true);
    }

    function exchangeMint(address to, string memory uri) public {
        require(msg.sender == _exchangeOperatorCA);
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function getOwnedTokenIds(address account)
        public
        view
        returns (uint256[] memory)
    {
        return _userOwnedTokenIds[account];
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function ownerMint() public onlyOwner {
        string memory _uri = "http://localhost:3000/api/equipNft/test.json";
        safeMint(msg.sender, _uri);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
        _userOwnedTokenIds[to].push(tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
