"use client"

import React, { useEffect } from 'react';

function page() {

    const SERVERURL = process.env.NEXT_PUBLIC_API_SERVERURL;

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const userID = 'MEGA4143'
            const password = '9111'
            // http://localhost:3005/gradap/login?userID=mega4143&password=9111
            const API_URL = `${SERVERURL}/gradap/login?userID=${userID}&password=${password}`;

            const res = await fetch(API_URL);
            const response = await res.json();
            const { result, user_name, user_depart, user_level } = response[0];

            console.log("user_name", user_name)
            console.log("result", result)

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>

        </div>
    );
}

export default page;
