"use server";

import { google } from "@ai-sdk/google";
import { UseAppKitAccountReturn, UseAppKitNetworkReturn } from "@reown/appkit";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function continueConversation(
  history: Message[],
  walletData: UseAppKitAccountReturn,
  networkDeets: UseAppKitNetworkReturn

) {
  "use server";

  if (!walletData?.isConnected) {
    throw new Error("Wallet must be connected to continue conversation");
  }

  const stream = createStreamableValue();
  const model = google("models/gemini-1.5-flash");

  // Create a prompt including wallet data
  const prompt = `You are an assistant with access to wallet information. 
  1. Current wallet address: ${walletData.address}. 
  2. All the accounts: ${walletData.allAccounts}.
  3. caipaddress is ${walletData.caipAddress}.
  4. embedded wallet info is ${walletData.embeddedWalletInfo}.
  5. Status is ${walletData.status}.
  6. ChainId is ${networkDeets.chainId}.

  User history: ${JSON.stringify(history)}. Respond accordingly.`;

  try {
    const { textStream } = await streamText({
      model,
      messages: [{ role: "system", content: prompt }, ...history], // Include the prompt as the first message
    });

    (async () => {
      try {
        for await (const chunk of textStream) {
          stream.update(chunk);
        }
        stream.done();
      } catch (error) {
        console.error('Streaming error:', error);
        stream.error(error);
      }
    })();

    return {
      messages: history,
      newMessage: stream.value,
    };
  } catch (error) {
    console.error('Conversation error:', error);
    stream.error(error);
    throw error;
  }
}
