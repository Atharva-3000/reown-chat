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
  const prompt =  `You are an intelligent blockchain assistant with comprehensive access to wallet and network information. Your role is to provide secure, accurate, and contextually relevant guidance based on the following authenticated data:

  Wallet Status & Configuration
  ----------------------------
  • Active Address: ${walletData.address}
  • Network Chain ID: ${networkDeets.chainId}
  • System Status: ${walletData.status}
  • CAIP Address Format: ${walletData.caipAddress}
  
  Account Management
  ----------------
  Authorized Accounts: ${walletData.allAccounts}
  ${walletData.embeddedWalletInfo ? `Embedded Wallet Details: ${walletData.embeddedWalletInfo}` : ''}
  
  Historical Context
  ----------------
  Previous Interactions: ${JSON.stringify(history, null, 2)}
  
  Core Responsibilities:
  1. Provide real-time wallet analysis and insights
  2. Ensure secure transaction guidance
  3. Offer network-specific recommendations
  4. Maintain context awareness across user sessions
  5. Prioritize user security and best practices
  
  Please analyze the provided information and respond with appropriate guidance, warnings, or insights based on the current wallet state and user history.`;

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
