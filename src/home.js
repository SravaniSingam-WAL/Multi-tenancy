import React, { useState } from "react";
import axios from "axios";
import { getToken, getEmail } from "./utils";

const Home = () => {
  const [agreementDetails, setAgreementDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [contractNumber, setContractNumber] = useState();
  const [searchResult,setSearchResult] =useState()
  const handleSearch = async (e) => {
    console.log(e.target.value, "----value--------");
    setSearchTerm(e.target.value);
    const token = getToken();
    console.log(token);
    const email = getEmail();
    console.log(email);
    const tenantId = email === "dhruv@gmail.com" ? 2 : 1;
    
    if(e.target.value){
      const result = await axios.get(
        `http://localhost:3030/api/agreement/${e.target.value}`,
        {
          headers: {
            Authorization: token,
            TenantId: tenantId,
          },
        }
      );
      console.log(result.data.data, "result");
      setSearchResult(result.data.data)
    }
  };
  const handleAdd = async (e) => {
    setContractNumber(e.target.value)
    if(e.target.value){
    const contractInfo=agreementDetails.find(user => user.contractNumber === e.target.value) || {'contractNumber' : e.target.value}
    console.log(contractInfo)
    const token = getToken();
    console.log(token);
    const email = getEmail();
    console.log(email);
    const tenantId = email === "dhruv@gmail.com" ? 2 : 1;
    console.log(e.target.value, "----value--------");
    const result = await axios.post(
      "http://localhost:3030/api/agreement",
      {contractInfo
      },
      {
        headers: {
          Authorization: token,
          TenantId: tenantId,
        },
      }
    );
    console.log(result, "result");
    }
  };
  const getAgreementDetails = async () => {
    const token = getToken();
    console.log(token);
    const email = getEmail();
    console.log(email);
    const tenantId = email === "dhruv@gmail.com" ? 2 : 1;
    const result = await axios.get("http://localhost:3030/api/agreements", {
      headers: {
        Authorization: token,
        TenantId: tenantId,
      },
    });
    console.log(result.data.data);
    console.log(typeof result.data.data);
    console.log(result.data.data)
    setAgreementDetails(result.data.data);
  };
const addFunction = async()=>{
  const token = getToken();
  console.log(token);
  const email = getEmail();
  console.log(email);
  const tenantId = email === "dhruv@gmail.com" ? 2 : 1;
  const result = await axios.get("http://localhost:3030/api/add", {
    headers: {
      Authorization: token,
      TenantId: tenantId,
    },
  });
  console.log(result.data.data);
  console.log(typeof result.data.data);
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
    <br></br>
    <button onClick={addFunction}>Add</button>
      <br></br>
      <br></br>
      <label htmlFor="searchInput">Search Contract Number</label>
      <input id="searchInput" value={searchTerm} onChange={handleSearch} />
      {searchResult && <div>
        <h4>Search result</h4>
        {searchResult.map((item) => (
          <li key={item.id}>Contract Number : {item.contractNumber} , TenantId : {item.userId}</li>
        ))}
      </div>}
      
      <br></br>
      <br></br>
      <label htmlFor="addContract"> Add Contract Number</label>
      <input id="addContract" value={contractNumber} onChange={handleAdd} />
    </div>
  );
};

export default Home;
