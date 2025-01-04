import express from 'express';
import  OrderModel  from '../model/orderModel';
import {VehicleModel} from "../model/vehicleModel";
import {BuyerModel} from "../model/buyerModel";


const router = express.Router();


// Response DTO structure
class ResponseDto {
    status: string;
    description: string;
    data: any;

    constructor() {
        this.status = '';
        this.description = '';
        this.data = null;
    }
}

const responseDTO = new ResponseDto();

//--------------------------------- Create Order Buy Vehicle Rent ---------------------------------
router.post('/api/v1/order/perches-vehicle', async (req, res) => {
    const { orderType,  orderPrice, orderStartDuration, orderEndDuration, buyerEmail, vehicle } = req.body;

    try {

        console.log(buyerEmail)
        const existingBuyer = await BuyerModel.findOne({ accEmail : buyerEmail });



        if (existingBuyer) {
            // Create a new order
            const orderEntity = new OrderModel({
                orderType,
                orderDate : Date.now(),
                orderPrice,
                orderStatus : "PENDING",
                orderStartDuration,
                orderEndDuration,
                buyerEmail,
                vehicle: vehicle
            });

            await orderEntity.save();
            // await VehicleModel.updateOne({accEmail: vehicle}, {$set: {vehicleStatus: 'UNAVAILABLE'}})
            responseDTO.status = 'SUCCESS';
            responseDTO.description = 'Order Created Successfully';
            return res.status(200).json(responseDTO);
        } else {
            responseDTO.status = 'FAILED';
            responseDTO.description = 'This email have no buyer acc. first create buyer acc';
            return res.status(400).json(responseDTO);
        }

    } catch (error) {
        console.error(error);
        responseDTO.status = 'FAILED';
        responseDTO.description = 'An error occurred while creating the order';
        return res.status(500).json(responseDTO);
    }
});

//-------------------- Pending Vehicle Orders Get ---------------------------------
router.get('/api/v1/order/pending-vehicle-orders/:email', async (req, res) => {

    const { email } = req.params;

    try {
        const orders = await OrderModel.find({ vehicle: email,orderStatus: 'PENDING', orderType: 'RENT_VEHICLE' });

        if (orders.length != 0) {
            responseDTO.status = 'SUCCESS';
            responseDTO.description = 'Pending Vehicle Orders Fetched Successfully';
            responseDTO.data = orders;
            return res.status(200).json(responseDTO);
        } else {
            responseDTO.status = 'FAILED';
            responseDTO.description = 'No pending vehicle orders found';
            return res.status(404).json(responseDTO);
        }

    } catch (error) {
        console.error(error);
        responseDTO.status = 'FAILED';
        responseDTO.description = 'An error occurred while fetching pending vehicle orders';
        return res.status(500).json(responseDTO);
    }
});


//-----------------------Pending vehicle order Accept
router.put('/api/v1/order/accept-vehicle-order/:orderId/:vehicle_mail', async (req, res) => {

    const {orderId} = req.params
    const {vehicle_mail} = req.params


    //----------check already accept or ongoing order have
    const onGoingOrAcceptOrder =  await OrderModel.findOne({ vehicle: vehicle_mail, orderStatus: 'ACCEPT' || 'ON_GOING' })


    //----------- accept or ongoing order not time accept order
    if (!onGoingOrAcceptOrder) {

        const order = await OrderModel.findOne({_id: orderId})
        if (order) {
            await OrderModel.updateOne({_id: orderId}, {$set: {orderStatus: "ACCEPT"}})
            responseDTO.status = 'SUCCESS';
            responseDTO.description = 'Order Accept Success.';
            responseDTO.data = order;
            return res.status(200).json(responseDTO);
        }

    } else {
        responseDTO.status = 'FAILED';
        responseDTO.description = 'This Vehicle Already This Time Some Buyer Buy!!!.';
        return res.status(404).json(responseDTO);
    }



})


export default router