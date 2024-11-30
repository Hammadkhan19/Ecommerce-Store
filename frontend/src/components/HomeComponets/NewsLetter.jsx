import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // To manage the submission status

  const handleSubscribe = () => {
    if (!email) {
      setStatus("Please enter a valid email.");
      return;
    }

    setStatus("Submitting...");
    setTimeout(() => {
      setStatus("Thanks for subscribing!");
      setEmail(""); // Clear the input field
    }, 2000); // Simulate a delay for the "Submitting" state
  };

  return (
    <div className="relative bg-black text-white p-5 rounded-3xl mx-auto max-w-5xl mt-8 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
      <p className="text-2xl md:text-3xl font-bold text-start">
        STAY UP TO DATE ABOUT OUR LATEST OFFERS
      </p>

      <div className="flex-grow">
        {/* Input Field using NextUI */}
        <Input
          clearable
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          bordered
          size="lg"
          css={{
            input: {
              color: "#ffffff",
              backgroundColor: "#1a1a1a",
              borderColor: "#ffffff",
              "::placeholder": {
                color: "#b0b0b0",
              },
            },
          }}
        />
      </div>

      {/* Button Below the Input */}
      <Button
        auto
        className="mx-auto md:ml-4"
        shadow
        rounded
        size="lg"
        onClick={handleSubscribe}
        disabled={status === "Submitting..."}
        css={{ width: "100%", marginTop: "1rem" }}
      >
        Subscribe Now
      </Button>

      {/* Status Message */}
      {status && <p className="mt-4 text-center text-green-400">{status}</p>}
    </div>
  );
}
