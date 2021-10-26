pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTFarm is ERC721 {
    using SafeMath for uint256;

    struct GenericNFT {
        bool onSale;
        uint256 price;
        uint256 power;
        uint256 speed;
        uint256 dna;
    }

    event NFTCreated(uint256 id, uint256 power, uint256 speed, uint256 dna);
    event TokenTransferred(address newOwner);
    event PriceChanged(uint256 newPrice);
    event TokenURICreated(string tokenURI);

    GenericNFT[] public tokens;
    uint256 newNFTPrice;
    mapping (uint256 => uint32) public tokenSalePostedTime;

    constructor()
        ERC721("Generic NFT", "NFT")
        public
    {
        _setBaseURI("https://ipfs.io/ipfs/");
        newNFTPrice = 50000000000000000; // Price in gwei
    }

    function setTokenURI(uint256 tokenId, string calldata _tokenURI) external {
        require(msg.sender == ownerOf(tokenId));
        _setTokenURI(tokenId, _tokenURI);
        TokenURICreated(tokenURI(tokenId));
    }

    function doesTokenExist(uint256 tokenId) external view returns (bool) {
        return _exists(tokenId);
    }

    function createGenericNFT(
        uint256 newId,
        uint256 power,
        uint256 speed,
        uint256 dna
    ) private {
        tokens.push(
            GenericNFT(false, 0, power, speed, dna)
        );
        _safeMint(msg.sender, newId);
        emit NFTCreated(newId, power, speed, dna);
    }

    function createRandomFighter(uint256 userProvidedSeed) external payable {
        require(msg.value == newNFTPrice);
        uint256 pseudorandomNumber = uint256(keccak256(abi.encode(msg.sender, userProvidedSeed, tokens.length)));
        createGenericNFT(
            tokens.length,
            pseudorandomNumber % 90 + 10,
            (pseudorandomNumber % 9000) / 100 + 10,
            pseudorandomNumber
        );
    }

    function getURI(uint256 tokenId) external view returns (string memory, string memory) {
        return (
            baseURI(),
            tokenURI(tokenId)
        );
    }

    function getNumberOfNFTs() public view returns (uint256) {
        return tokens.length;
    }

    function getIsNFTOnSale(uint256 tokenId) public view returns (bool) {
        return tokens[tokenId].onSale;
    }

    function getNFTPrice(uint256 tokenId) public view returns (uint256) {
        return tokens[tokenId].price;
    }

    function setNFTPrice(uint256 tokenId, uint256 tokenPrice) external {
        require(msg.sender == ownerOf(tokenId));
        require(tokenPrice > 0);
        if (!tokens[tokenId].onSale) {
            tokens[tokenId].onSale = true;
            tokenSalePostedTime[tokenId] = uint32(now);
        }
        tokens[tokenId].price = tokenPrice;
        emit PriceChanged(tokenPrice);
    }

    function removeNFTPrice(uint256 tokenId) public {
        tokens[tokenId].onSale = false;
        tokens[tokenId].price = 0;
        emit PriceChanged(0);
    }
}
