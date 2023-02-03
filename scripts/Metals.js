import { getMetals, setMetal } from "./dataAccess.js"

const metals = getMetals()
let retainedMetal = null

document.addEventListener("clearRetainedRadio", () => {
    retainedMetal = null
})

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "metal") {
            setMetal(parseInt(event.target.value))
            retainedMetal = parseInt(event.target.value)
            document.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
)

export const Metals = () => {
    let html = "<ul>"

    // This is how you have been converting objects to <li> elements
/*     for (const metal of metals) {
        html += `<li>
            <input type="radio" name="metal" value="${metal.id}" /> ${metal.metal}
        </li>`
    } */
    const listItems = metals.map(metal => {
        let isChecked = ""
        if (retainedMetal === null) {
        } else if (retainedMetal === metal.id) {
            isChecked = "checked"
        }
        return `<li>
            <input type="radio" name="metal" value="${metal.id}" ${isChecked} /> ${metal.metal}
        </li>`
    })

    html += listItems.join("")
    html += "</ul>"
    return html
}

