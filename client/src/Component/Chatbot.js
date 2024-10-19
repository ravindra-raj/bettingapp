
import { useState, useRef, useEffect } from "react";
import './Chatbot.css';

const questionsAndAnswers = [
  {
    category: "General",
    question: "What is cricket betting?",
    answer: "Cricket betting involves placing wagers on the outcome of cricket matches or specific events during the match, such as the highest run-scorer or the number of wickets taken."
  },
  {
    category: "Transaction",
    question: "How can I deposit money into my account?",
    answer: "You can deposit money by going to the 'Deposit' section, selecting your preferred payment method (UPI, Paytm, PhonePe), entering the amount, and confirming the transaction."
  },
  {
    category: "Betting",
    question: "What types of bets can I place on a cricket match?",
    answer: "You can place bets on various outcomes, such as match winner, total runs, highest wicket-taker, and more."
  },
  {
    category: "Admin",
    question: "How can I monitor user transactions?",
    answer: "As an admin, you can monitor all user transactions in the 'Transaction History' section of the admin panel."
  },
  // Add more Q&A as needed
];

function Chatbot() {
  const [messages, setMessages] = useState([]); // To store the list of messages
  const inputRef = useRef();
  const chatContainerRef = useRef();

  // Set user type directly (e.g., 'User' or 'Admin')
  const [user] = useState("User"); // Change to "Admin" for admin responses

  const handleInput = () => {
    const message = inputRef.current.value.trim();
    if (!message) return;

    // Display user's message
    setMessages(prevMessages => [
      ...prevMessages,
      { sender: "user", text: message }
    ]);

    let response = "Sorry, I didn't understand that.";

    // Look for a matching question
    const foundQA = questionsAndAnswers.find(q =>
      message.toLowerCase().includes(q.question.toLowerCase())
    );

    if (foundQA) {
      response = foundQA.answer;
    } else {
      const depositKeywords = ["deposit", "add money"];
      const withdrawKeywords = ["withdraw", "take out money"];
      const betKeywords = ["bet", "place bet", "cricket match"];
      const transactionKeywords = ["transaction", "payment", "refund"];

      // Deposit questions
      if (new RegExp(depositKeywords.join("|")).test(message.toLowerCase())) {
        response = user.toLowerCase() === "user"
          ? "Sure, how much would you like to deposit?"
          : "A user is requesting to deposit money. Do you approve?";
      }

      // Withdraw questions
      if (new RegExp(withdrawKeywords.join("|")).test(message.toLowerCase())) {
        response = user.toLowerCase() === "user"
          ? "How much would you like to withdraw?"
          : "A user is requesting a withdrawal. Do you approve?";
      }

      // Bet questions
      if (new RegExp(betKeywords.join("|")).test(message.toLowerCase())) {
        response = user.toLowerCase() === "user"
          ? "Which match are you interested in, and how much would you like to bet?"
          : "A user is placing a bet. Do you approve?";
      }

      // Transaction-related questions
      if (new RegExp(transactionKeywords.join("|")).test(message.toLowerCase())) {
        response = user.toLowerCase() === "user"
          ? "You can check your transactions under the 'My Bets' section."
          : "You can monitor all transactions in the admin panel.";
      }
    }

    // Simulate bot response after a short delay
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: "bot", text: response }
      ]);
      inputRef.current.value = ""; // Clear the input field
    }, 1000);
  };

  // Scroll to the latest message
  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="Chat-App">
      <div className="wrapper">
        <div className="content">
          <div className="header1">
            <div className="img">
              <img src='bot_image.jpg' alt="Bot Avatar" />
            </div>
            <div className="right">
              <div className="name">ChatBot</div>
              <div className="status">Active</div>
            </div>
          </div>
          <div className="main">
            <div className="main_content">
              <div className="messages">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={msg.sender === "user" ? "human-message" : "bot-message"}
                  >
                    {msg.text}
                  </div>
                ))}
                <div ref={chatContainerRef}></div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="btm">
              <div className="chat-input">
                <input
                  className="abc"
                  type="text"
                  id="input"
                  placeholder="Enter your message"
                  ref={inputRef}
                />
              </div>
              <div className="btn">
                <button onClick={handleInput}>
                  <i className="fas fa-paper-plane"></i>Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;


