import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
    try {
        const editionDrop = await sdk.getContract("0xFf423fC0149dEFACf4A51f752cb8F7d208FD4e09", "edition-drop");
        await editionDrop.createBatch([
            {
                name: "Cup Dream & Helmet",
                description: "This NFT will give you access to NarutoDAO!",
                image: readFileSync("scripts/assets/honda_cup.jpg"),
            },
        ]);
        console.log("✅ Successfully created a new NFT in the drop!");
    } catch (error) {
        console.error("failed to create the new NFT", error);
    }
})();