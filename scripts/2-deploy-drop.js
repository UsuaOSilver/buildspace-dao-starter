import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
    try {
        const editionDropAddress = await sdk.deployer.deployEditionDrop({
            name: "SaigonDAO Membership",
            description: "A DAO for Saigonese.",
            image: readFileSync("scripts/assets/Saigon_1970_75.jpg"),
            primary_sale_recipient: AddressZero,
        });
        
        const editionDrop = await sdk.getContract(editionDropAddress, "edition-drop");
        
        const metadata = await editionDrop.metadata.get();
        
        console.log(
            "✅ Successfully deployed editionDrop contract, address:",
            editionDropAddress,
        );
        console.log("✅ editionDrop metadata:", metadata);
    } catch (error) {
        console.log("failed to deploy editionDrop contract", error);
    }
})();