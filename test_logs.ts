import { JsonRpcProvider, Contract, FetchRequest } from "ethers";

const governorAddress = "0x35D14f5e57e565CF87368Ed5370e42bA3a61FC50";
const governorAbi = [
  "event ProposalCreated(uint256 proposalId, address proposer, address[] targets, uint256[] values, string[] signatures, bytes[] calldatas, uint256 voteStart, uint256 voteEnd, string description)"
];

const main = async () => {
    // Ethers v6 provider without batching
    const req = new FetchRequest("https://data-seed-prebsc-1-s1.binance.org:8545");
    const provider = new JsonRpcProvider(req, 97, { batchMaxCount: 1, staticNetwork: true });

    const governor = new Contract(governorAddress, governorAbi, provider);

    const latestBlock = await provider.getBlockNumber();
    console.log("Latest block:", latestBlock);

    // Look back around 15,000 blocks (half a day) to find recent proposals
    const startBlock = latestBlock - 15000;
    
    console.log(`Fetching logs from ${startBlock} to ${latestBlock}...`);
    try {
        const logs = await governor.queryFilter(governor.filters.ProposalCreated(), startBlock, latestBlock);
        console.log("Total logs found:", logs.length);
        for (const log of logs) {
            console.log("Found proposal!");
            // @ts-ignore
            console.log("proposalId", log.args[0]);
            // @ts-ignore
            console.log("description:", log.args[8]);
        }
    } catch (e) {
        console.error(`Error querying chunk:`, e.message);
    }
}
main().catch(console.error);
