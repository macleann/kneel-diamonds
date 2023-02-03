import { getStyles, setStyle } from "./dataAccess.js"

const styles = getStyles()
let retainedStyle = null

document.addEventListener("clearRetainedRadio", () => {
    retainedStyle = null
})

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "style") {
            setStyle(parseInt(event.target.value))
            retainedStyle = parseInt(event.target.value)
            document.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
)

export const JewelryStyles = () => {
    let html = "<ul>"

    // Use .map() for converting objects to <li> elements
    const listItems = styles.map(style => {
        let isChecked = ""
        if (retainedStyle === null) {            
        } else if (retainedStyle === style.id) {
            isChecked = "checked"
        }
        return `<li>
            <input type="radio" name="style" value="${style.id}" ${isChecked} /> ${style.style}
        </li>`
    })

    // Join all of the strings in the array into a single string
    html += listItems.join("")

    html += "</ul>"
    return html
}

