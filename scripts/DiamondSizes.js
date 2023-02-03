import { getSizes, setSize } from "./dataAccess.js"

const sizes = getSizes()
//declare a retainedSize variable that doesn't have a value now, but can store something later
let retainedSize = null

document.addEventListener("clearRetainedRadio", () => {
    retainedSize = null
})

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "size") {
            setSize(parseInt(event.target.value))
            //store the event.target in the retainedSize variable
            retainedSize = parseInt(event.target.value)
            document.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
)

export const DiamondSizes = () => {
    let html = "<ul>"

    const listItems = sizes.map(size => {
        //declare a variable isChecked that is an empty string
        let isChecked = ""

        //check if retainedSize still is set to null
        if (retainedSize === null){
            //then do nothing
        }
        //else, check if the parsed integer of retainedSize's value equals the current iteration of the size object's id property
        else if (retainedSize === size.id) {
            //then set isChecked to a value of "checked"
            isChecked = "checked"
        }
        //lastly return the list interpolating the value of isChecked. if it has a value of "checked", the button will be checked and if not, they'll all be blank
        return `<li>
            <input type="radio" name="size" value="${size.id}" ${isChecked} /> ${size.carets}
        </li>`
    })

    html += listItems.join("")

    html += "</ul>"

    return html
}

