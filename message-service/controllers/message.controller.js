const Message = require('../models/message.model');

exports.sendMessages = async (req, res) => {
    const {sender, receiver, content } = req.body;
    try {
        const message = new Message({sender, receiver, content});
        await message.save();
        res.status(200).json({message: 'Message sent:', data: message});
    } catch(error) {
        res.status(500).json({message: 'Error sending message:', error});
    }
}

exports.Messages = async (req, res) => {
    const {userId} = req.params;
    try{
        const messages = await Message.find({
            $or: [
                {sender: userId},
                {receiver: userId}
            ]
        }).sort({timestamp: 1});
        res.status(200).json({message: 'Messages:', messages: messages});
    } catch(error) {
        res.status(500).json({message: 'Error fetching messages:', error});
    }
}