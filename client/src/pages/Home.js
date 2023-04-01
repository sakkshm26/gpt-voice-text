import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import API from "../api";
import { Dna } from "react-loader-spinner";

const Home = () => {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageList, setMessageList] = useState([]);

  if (!browserSupportsSpeechRecognition) {
    alert("Browser does not support speech recognition!");
  }

  const handleSubmit = async () => {
    setLoading(true);
    SpeechRecognition.stopListening()

    if (!inputValue.length) {
      alert("Please enter a message!");
      return;
    }

    try {
      const response = await API.post("http://localhost:4000/getreply", {
        message: inputValue,
      });

      setMessageList((prev) => [
        ...prev,
        { sender: "user", text: inputValue },
        { sender: "gpt", text: response.data.message },
      ]);
    } catch (err) {
      alert("Some error occurred!");
    }

    setInputValue("");
    setLoading(false);
  };

  useEffect(() => {
    setInputValue(transcript);
  }, [transcript]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your message or use mic!"
          style={{
            fontSize: 18,
            width: "50vw",
            borderRadius: 10,
            height: 100,
            padding: 20,
          }}
          maxLength={100}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "50vw",
            marginTop: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{ fontSize: 30, cursor: "pointer" }}
              onClick={SpeechRecognition.startListening}
            >
              🎙️
            </p>
            <p
              style={{
                fontSize: 20,
                color: "red",
                marginLeft: 10,
                cursor: "pointer",
              }}
              onClick={SpeechRecognition.stopListening}
            >
              ❌
            </p>
          </div>
          {loading ? (
            <Dna
              visible={true}
              height="50"
              width="50"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          ) : null}
          {listening ? (
            <p style={{ fontSize: 18, color: "white", marginTop: 10 }}>
              Listening...
            </p>
          ) : null}
          <button
            style={{
              width: 80,
              height: 40,
              borderRadius: 8,
              cursor: "pointer",
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
      <div style={{ padding: "0 25vw", marginTop: 50 }}>
        {messageList.map((message, key) => {
          if (message.sender === "user") {
            return (
              <p
                style={{ color: "white", fontSize: 15, marginTop: 20, lineHeight: 1.3 }}
                key={key}
              >
                <span style={{ color: "#ade300" }}>You{" - "}</span>
                {message.text}
              </p>
            );
          } else {
            return (
              <p
                style={{ color: "white", fontSize: 15, marginTop: 20, lineHeight: 1.3 }}
                key={key}
              >
                <span style={{ color: "#34d9ff" }}>GPT{" - "}</span>
                {message.text}
              </p>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Home;
