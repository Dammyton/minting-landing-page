// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract MyNFT is ERC721 {
    using Counters for Counters.Counter;

    // This creates a Counter object for the token IDs, and initializes it to 0
    Counters.Counter private _tokenIds;

    constructor() ERC721("MyNFT", "MNFT") {}

    function mint(address recipient) public returns (uint256) {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();

        // This mints a new token to the specified recipient with the new token ID
        _mint(recipient, newTokenId);

        return newTokenId;
    }

    // This is the receive function for the contract, which allows it to receive Ether
    receive() external payable {}
}
