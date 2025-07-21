import withSession from '@/lib/session'
import axios from 'axios';

export default withSession(async (req, res) => {
    const { username, password } = req.body;  // no need to await here, req.body is synchronous
    // Add default fallback if env var is not set
    
    const backendApiHost = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    const loginUrl = `${backendApiHost}/api/login`;

    // Debug: log the URL before making the request
    console.log('Login URL:', loginUrl);

    try {
        const response = await axios.post(loginUrl, { username, password });

        if (response.status === 200) {
            const { user, api_token } = response.data;

            req.session.set('user', user);
            req.session.set('api_token', api_token);
            await req.session.save();
            return res.json({ logged_in: true });
        }

        const status = response.data.message;
        const errors = response.data.errors;
        return res.json({ status, logged_in: false, errors });

    } catch (err) {
        let status = 'Something went wrong';
        let errors = null;

        console.log(err);
        if (err.response) {
            status = err.response.data.message;
            errors = err.response.data.errors;
        }
        return res.json({ logged_in: false, status, errors });
    }
});
