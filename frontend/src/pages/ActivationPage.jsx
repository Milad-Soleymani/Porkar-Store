import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { server } from '../server';

const ActivationPage = () => {
    const { activation_token } = useParams();
    const [error, setError] = useState();

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post(`${server}/user/activation/`,
                        { activation_token });
                    console.log(res.data.message)
                } catch (err) {
                    console.log(err)
                    setError(true)
                }
            };
            activationEmail()
        }
    }, []);
    return (
        <div style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {
                error ? (
                    <p>Your token is expierd</p>
                ) : (
                    <p>Your account has been created successfully</p>
                )
            }
        </div>
    )
}

export default ActivationPage;