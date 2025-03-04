import Item from "../models/item.js";

export function getAllItems(req, res) {
    Item.find().then(
        (items)=>{
            res.json(items)
        }
    ).catch(
        ()=>{
            res.json({
                message:"Error"
            })
        }
    )
    
}

export function saveItem(req, res) {
    const item = new Item(req.body)
    item.save().then(
        ()=>{
            res.json({
                message:"Item Saved"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message:"Error"
            })
        }
    )

}

export function getGoodItems(req, res) {
    res.json({
        message:"Good Items"        
    })
}

export function searchItem(req, res) {
    //normal way
    //const itemName = req.body.name;

    //get name url
    const itemName = req.params.name;

    Item.find({
        name:itemName
    }).then(
        (items)=>{
            res.json(items)
        }
    ).catch(
        ()=>{
            res.json({
                message:"Error"
            })
        }
    )
}

