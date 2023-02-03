import { getOrSetTypes } from "./dataAccess.js"

const types = getOrSetTypes("get")
let retainedType = null

document.addEventListener("clearRetainedRadio", () => {
    retainedType = null
})

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "type") {
            getOrSetTypes("set", parseInt(event.target.value))
            retainedType = parseInt(event.target.value)
            document.dispatchEvent(new CustomEvent("stateChanged"))
        }
})

export const Types = () => {
    let html = types.map(type => {
        let isChecked = ""
        if (retainedType === null) {
        } else if (retainedType === type.id) {
            isChecked = "checked"
        }
        return `<input type="radio" name="type" value="${type.id}" ${isChecked} />${type.type}`
    })

    return html
}