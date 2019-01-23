const Order = require('../models/order');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        const query = getOrdersQuery(req);
        const orders = await Order
            .find(query)
            .sort({date: -1})
            .skip(+req.query.offset)
            .limit(+req.query.limit);
        res.status(200).json(orders);
    } catch (error) {
        errorHandler(res, error);
    }
};

function getOrdersQuery(req) {
    const query = {
        user: req.user.id
    };
    if (req.query.start) {
        query.date = {
            $gte: req.query.start
        }
    }
    if (req.query.end) {
        if (!query.date) {
            query.date = {};
        }
        query.date = {
            $lte: req.query.end
        }
    }
    if (req.query.order) {
        query.order = +req.query.order
    }
    return query;
}

module.exports.create = async (req, res) => {
    try {
        const lastOrder = await Order
            .findOne({ user: req.user.id} )
            .sort({ date: -1 });
        const maxOrderIndex = lastOrder ? lastOrder.order : 0;
        const order = await new Order({
            order: maxOrderIndex + 1,
            list: req.body.list,
            user: req.user.id
        }).save();
        res.status(201).json(order);
    } catch (error) {
        errorHandler(res, error);
    }
};
