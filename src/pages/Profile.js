import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Profile() {
    const [profileData, setProfileData] = useState({});
    const { user,  } = useContext(AuthContext);

    useEffect(() => {

        async function fetchProfileData() {
            const token = localStorage.getItem('token');
            try {
                const result = await axios.get('http://localhost:3000/660/private-content', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfileData(result.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchProfileData();
    }, [])
  return (
    <>
      <h1>Profielpagina</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam:</strong> { user.username } </p>
        <p><strong>Email:</strong> { user.email } </p>
      </section>
        {Object.keys(profileData).length > 0 &&
            <section>
                <h2>Strikt geheime profiel-content</h2>
                <h3>{profileData.title}</h3>
                <p>{profileData.content}</p>
            </section>
        }
        <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
  );
}


export default Profile;