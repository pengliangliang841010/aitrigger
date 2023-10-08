import { NextApiHandler } from 'next';

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE';

export const handlerWrapper = (handlerMap: Partial<Record<Method, NextApiHandler>>) => async(req, res) => {
    const handler = handlerMap[req.method as Method];
    if (!handler) {
        res.status(500).json({
            message: 'Unsupported method'
        });
        return;
    }
    try {
        const result = await handler(req, res);
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({
            message: 'error: ' + e
        });
    }
};