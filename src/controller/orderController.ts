import express from 'express';
import  OrderModel  from '../model/orderModel';


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


router.post('/api/v1/order/perches-vehicle', async (req, res) => {
    const { orderType,  orderPrice, orderStartDuration, orderEndDuration, buyerEmail, vehicle } = req.body;

    try {

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

        responseDTO.status = 'SUCCESS';
        responseDTO.description = 'Order Created Successfully';
        return res.status(200).json(responseDTO);
    } catch (error) {
        console.error(error);
        responseDTO.status = 'FAILED';
        responseDTO.description = 'An error occurred while creating the order';
        return res.status(500).json(responseDTO);
    }
});

export default router