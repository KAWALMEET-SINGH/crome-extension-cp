import React, { useState } from "react"
import { FaArrowRight, FaChevronDown } from "react-icons/fa6"
import { TfiReload } from "react-icons/tfi"

interface PromptBoxProps {
  onInsert: (message: string) => void
}
//differs bw the recived data from the gpt
interface Message {
  text: string
  type: "sent" | "received"
}

const PromptBox: React.FC<PromptBoxProps> = ({ onInsert }) => {
  const [isGenerated, setGenerated] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState<Message[]>([])

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      const newMessages: Message[] = [
        { text: inputValue, type: "sent" },
        { text: "This is an AI generated response", type: "received" }
      ]
      setMessages([...messages, ...newMessages])
      setInputValue("")
      setGenerated(true)
    }
  }

  const handleInsert = () => {
    const receivedMessage = messages.find((msg) => msg.type === "received")
    if (receivedMessage) {
      onInsert(receivedMessage.text)
    }
  }

  return (
    <div className="outline-solid outline-black outline-spacing-2 flex flex-col flex-grow w-full h-full max-w-xl bg-gray-100 z-50 m-2 p-2">
      <div className="p-4 m-3">
        <input
          className=" w-full h-full border border-gray-100 focus:border-blue-500"
          type="text"
          placeholder="Enter your prompt"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex flex-row justify-end items-center gap-2">
          <button
            onClick={handleInsert}
            className={`${!isGenerated && "hidden"} m-1 rounded-md bg-white flex flex-row justify-center items-center font-semibold p-2 gap-2`}>
            <FaChevronDown /> Insert
          </button>
          <button
            onClick={handleSubmit}
            className="m-1 rounded-md gap-2 text-white bg-blue-500 flex flex-row justify-center items-center font-semibold p-2">
            {isGenerated ? <TfiReload /> : <FaArrowRight />}
            {isGenerated ? "Regenerate" : "Submit"}
          </button>
        </div>
      </div>
      <div className="flex flex-col p-4 overflow-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex w-full mt-2 space-x-3 max-w-xs ${message.type === "sent" ? "ml-auto justify-end" : ""}`}>
            <div
              className={
                message.type === "sent"
                  ? "bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg"
                  : "bg-gray-300 p-3 rounded-r-lg rounded-bl-lg"
              }>
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PromptBox
