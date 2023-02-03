import { database } from "./database.js"

export const getMetals = () => {
    return database.metals.map(metal => ({...metal}))
}

export const setMetal = (id) => {
    database.orderBuilder.metalId = id
}

export const getSizes = () => {
    return database.sizes.map(size => ({...size}))
}

export const setSize = (id) => {
    database.orderBuilder.sizeId = id
}

export const getStyles = () => {
    return database.styles.map(style => ({...style}))
}

export const setStyle = (id) => {
    database.orderBuilder.styleId = id
}

export const getOrSetTypes = (getOrSet, id) => {
    if (getOrSet === "get") {
        return database.types.map(type => ({...type}))
    } else if (getOrSet === "set") {
        database.orderBuilder.typeId = id
    } else {
        return null
    }
}

export const getOrders = () => {
    return database.customOrders.map(customOrder => ({...customOrder}))
}

export const addCustomOrder = () => {
    //copy the current state of user choices
    const newOrder = {...database.orderBuilder}

    if (database.customOrders.length === 0) {
        newOrder.id = 1
    } else {
        const lastIndex = database.customOrders.length - 1
        newOrder.id = database.customOrders[lastIndex].id + 1
    }

    //add a timestamp to the order
    newOrder.timestamp = Date.now()

    //add the new order object to custom orders state
    database.customOrders.push(newOrder)

    //reset the temporary state for user choices
    database.orderBuilder = {}

    //broadcast a notification that permanent state has changed
    document.dispatchEvent(new CustomEvent("clearRetainedRadio"))
    document.dispatchEvent(new CustomEvent("stateChanged"))
}