import React, { useState } from 'react';
import axios from 'axios';
import { getToken, getEmail } from './utils';

const Home = () => {
  const [agreementDetails, setAgreementDetails] =useState([])
    
    const getAgreementDetails =async ()=>{
      const token = getToken()
      console.log(token)
      const email = getEmail()
      console.log(email)
      const tenantId = email === 'vara@gmail.com'? 5 :1;
       const result = await axios.get('http://localhost:3030/api/agreement', {
        headers: {
          'Authorization':token,
          'TenantId': tenantId,
        },
      });
      console.log(result.data.data)
      console.log(typeof result.data.data)
      setAgreementDetails(result.data.data)
    }
    
  return (
    <div>
      <h2>Home Page</h2>
      <h2>User Information</h2>
      <button onClick={getAgreementDetails}>Get Agreement Details</button>
      <ul>
    {agreementDetails.map((item) => (
        <li key={item.id}>{item.contractNumber}</li>
    ))}
</ul>
    </div>
  );
};

export default Home;
