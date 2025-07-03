
import Order from "../models/order.js";
import Product from "../models/products.js";
export async function createOrder(req, res) {

    if(req.user == null){
        res.status(401).json({
            message:"Unauthorized, Only logged in users can create orders"
        })
        return;
    }

    const body= req.body;
    const orderData={                 //this is the data that will be saved in the database when the order is created
        orderID: "",
        email: req.user.email,
        name: body.name,
        address: body.address,
        phoneNo: body.phoneNo,
        billItems: [],
        total: 0

    }

    Order.find().sort({
        date: -1,                   //this will find the last bill that was created

    }).limit(1).then(async (lastBills)=>{
        if(lastBills.length == 0){
            orderData.orderID="ORD0001"  //if there is no  last bill then the order id will be ORD0001
            }
        else{
            const lastBill=lastBills[0];         //if there is a last bill then the order id will be the last bill id +1
            const lastOrderID=lastBill.orderID;          //this will get the last order id ,"ORD0051"
            const lastOrderNumber=lastOrderID.replace("ORD","");     //this will remove the ORD from the order id ,"0051"
            const lastOrderNumberInt=parseInt(lastOrderNumber);     //this will convert the order number to an integer, 51
            const newOrderNumberInt=lastOrderNumberInt+1;     //this will add 1 to the order number, 52
            const newOrderNumberStr=newOrderNumberInt.toString().padStart(4,"0"); //this will convert the order number to a string and pad it with 0s, "0052"
            orderData.orderID="ORD"+newOrderNumberStr; //this will add the ORD to the order number, "ORD0052"
        }

        console.log("Request Body:", body);
        


        for(let i=0; i<body.billItems.length; i++){           //this will loop through all the bill items
            const product = await Product.findOne({productId : body.billItems[i].productId})
            if(product == null){
                res.status(404).json({
                    message : "Product with product id "+ body.billItems[i].productId +" not found"
                })
                return;
            }
            orderData.billItems[i]={
                productId : product.productId,
                productName : product.name,
                image : product.images[0],
                quantity :body.billItems[i].quantity,
                price : product.price
            }
            orderData.total= orderData.total + product.price * body.billItems[i].quantity
            }

    
        const order=new Order(orderData);         //create the new order with the order data
        order.save().then(()=>{
            res.status(201).json({
                message:"Order created successfully"
            })
        }).catch((err)=>{   
            console.error(err)
            res.status(500).json({
                message:"Order not saved"
            })
        })

    })
}

export function getOrders(req, res) {
    if(req.user == null){
        res.status(401).json({
            message:"Unauthorized, Only logged in users can view orders"
        })
        return;
    }
    if(req.user.role == "admin"){
        Order.find().then((orders)=>{
            res.status(200).json(orders)
        }).catch((err)=>{
            res.status(500).json({
                message:"Orders not found"
            })
        })
    }else{
        Order.find({
            email: req.user.email
        }).then((orders)=>{
            res.status(200).json(orders)
        }).catch((err)=>{
            res.status(500).json({
                message:"Orders not found"
            })
        })
    }
}
