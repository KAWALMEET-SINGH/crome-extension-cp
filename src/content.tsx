import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect } from "react"
//~ neede for imports for non js or ts files
import "~style.css";
import PromptBox from "~component/PromptBox";
import { createRoot } from 'react-dom/client'

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const handleInsert = (message: string) => {
    const targetElement = document.querySelector(".msg-form__contenteditable") as HTMLElement
    const receivedMessage = document.createElement("p")
    receivedMessage.textContent = message
    targetElement.innerHTML = receivedMessage.outerHTML
    targetElement.setAttribute('aria-label', message)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      //adds element in the main page by DOM API
      const targetElement = document.querySelector(".msg-form__contenteditable") as HTMLElement
      const targetElementForPrompts = document.querySelector(".msg-s-message-list") as HTMLElement

      if (targetElement && targetElementForPrompts) {
        clearInterval(interval)

        const buttonContainer = document.createElement("div")
        buttonContainer.className = "absolute bottom-0 right-0 mb-2 mr-2"

        const button = document.createElement("button")
        button.textContent = "🪄"
        button.className = "absolute bottom-0 right-0 bg-white border border-black text-white px-4 py-2 rounded-full"
        button.onclick = () => {
          console.log("Button Clicked!")

          const promptBoxContainer = document.createElement("div")
          promptBoxContainer.className = "absolute bottom-50 w-full flex flex-row justify-center item-center"

          targetElementForPrompts.append(promptBoxContainer)

          const root = createRoot(promptBoxContainer)
          root.render(<PromptBox onInsert={handleInsert} />)
        }

        buttonContainer.appendChild(button)
        targetElement.appendChild(buttonContainer)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return null
}

export default PlasmoOverlay
