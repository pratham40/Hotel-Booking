import express from 'express';
import { Webhook } from 'svix';
import User from '../models/User.js'; // Assuming you have this

const router = express.Router();

router.post('/webhook', async (req, res) => {
    const payload = req.body;  // Raw buffer due to express.raw
    const headers = req.headers;
    const secret = process.env.CLERK_WEBHOOK_SECRET;

    const wh = new Webhook(secret);

    let evt;
    try {
        evt = wh.verify(payload, headers);
        console.log('✅ Event:', evt);

        if (evt.type === 'user.created') {
            const { id, email_addresses, first_name, last_name } = evt.data;
            const email = email_addresses[0]?.email_address;

            await User.create({
                clerkId: id,
                email,
                firstName: first_name,
                lastName: last_name
            });

            console.log(`User ${email} created.`);
        }

        res.status(200).json({ success: true });
    } catch (err) {
        console.error('Webhook signature failed:', err.message);
        res.status(400).json({ error: 'Invalid signature' });
    }
});

export default router;
