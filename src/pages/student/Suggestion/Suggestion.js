
import React from "react";

//import Footer from "./components/Footer.jsx";

//import { FullPageChat } from "flowise-embed-react"
import { BubbleChat } from 'flowise-embed-react'
import Segmentation from "./Segmentation";
import avatar from "../../../../src/assets/assistant-avatar.png"

const Suggestion = () => {
    

    return (
        <>
        <div> <Segmentation/> </div>
        <div style={{ width: '50%', height: '50%' }}>
        <BubbleChat chatflowid="49089b3e-ea67-46fa-b289-0bba03b1d610" apiHost="https://flowise-22cw.onrender.com"
            theme={{
                chatWindow: {
                    welcomeMessage: "Hello! Welcome to edubridgebd chatbot",
                    backgroundColor: "#ffffff",
                    height: 700,
                    width: 400,
                    fontSize: 16,
                    poweredByTextColor: "#fcfafa",
                    botMessage: {
                        backgroundColor: "#f7f8ff",
                        textColor: "#303235",
                        showAvatar: true,
                        avatarSrc: "https://i.ibb.co/nQFjX17/assistant-avatar.png",
                    },
                    userMessage: {
                        backgroundColor: "#3B81F6",
                        textColor: "#ffffff",
                        showAvatar: true,
                        avatarSrc: "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
                    },
                    textInput: {
                        placeholder: "Type your question",
                        backgroundColor: "#ffffff",
                        textColor: "#303235",
                        sendButtonColor: "#3B81F6",
                    }
                }
            }}
        />
        </div>
        
      {/* <main>
        <Chat />
      </main> */}
      {/* <Footer /> */}
    </>
    );
}

export default Suggestion;