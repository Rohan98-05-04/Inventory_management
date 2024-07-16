import Link from "next/link";
import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { API_BASE_URL } from "../../../../utils/config";
// import { Multiselect } from "multiselect-react-dropdown";
import { ToastContainer, toast } from 'react-toastify';
import Section from "@aio/components/Section";
import styles from "../warehouse.module.css";
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../../components/Spinner'; 
import Modal from "@aio/components/Modal";
import { API_BASE_URL } from "utils/config";



export default function UpdateSupplier() {
    const [name, setWarehouseName] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [postalcode, setPostalCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
 



 const router = useRouter();
 const  slug  = router.query;
 const wareItemId=slug.slug;


useEffect(()=>{
    if(wareItemId){
        setIsLoading(true);
    
        const fetchWarehouseDataById = async (wareItemId) => {
           
    
          const response = await fetch(`${API_BASE_URL}/warehouse/getWarehouseById/${wareItemId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
          });
          
          if (response.ok) {
            
            const data = await response.json();
            setWarehouseName(data?.result?.name || " ")
            setPhoneNumber(data?.result?.phone || " ")
            setEmail(data?.result?.email || " ")
            setCountry(data?.result?.country || " ")
            setState(data?.result?.state || " ")
            setCity(data?.result?.city || " ")
            setAddress1(data?.result?.address1 || " ")
            setAddress2(data?.result?.address2 || " ")
            setPostalCode(data?.result?.zipCode || " ")
            setIsLoading(false);
            
          } else {
            const data = await response.json();
            setIsLoading(false);
    }
    }
    fetchWarehouseDataById(wareItemId);
    }
    
},[wareItemId])


  const updateWarehouseDetails= (wareItemId) => {
    setIsLoading(true);
    const warehouseDetail = {
        name, 
         email,
         phone:phonenumber,
         address1,
         city,
         state,
        zipCode: postalcode,
        country,
         address2,
      }


    const fetchData = async () => {
      const response = await fetch(`${API_BASE_URL}/warehouse/updateWarehouseById/${wareItemId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(warehouseDetail),
      });

      if (response.ok) {
         const data = await response.json();
         toast.success('Update successfully', {
           position: toast.POSITION.TOP_RIGHT,
         });
         router.push("/warehouse");
         setIsLoading(false);
        
       } else {
         const data = await response.json();
         toast.error(data.error, {
           position: toast.POSITION.TOP_RIGHT,
         });
         setIsLoading(false);
       }
     };
     fetchData();
  };

  return (
    <Section>
       {isLoading &&    <Spinner/>  }
    <div className="donarPage w-100">
      <ToastContainer position="top-right" autoClose={5000} />

      <div className="addDonarForm">
        <h2 className={`${styles.formHeaderext}`}>Update Supplier Details</h2>
        <form>
        <div className="formMainDiv">
            <div className="label-form eventInp">
              <label htmlFor="name">Warehouse Name</label>
              <br />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setWarehouseName(e.target.value)}
              />
            </div>
            <div className="label-form eventInp">
              <label htmlFor="name">Email</label>
              <br />
              <input
                type="email"
                id="name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="label-form eventInp">
              <label htmlFor="name">Phone number</label>
              <br />
              <input
                type="number"
                id="name"
                value={phonenumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            
            <div className="label-form textAraeLabel">
              <label htmlFor="address1">Address1</label>
              <br />
              <input              
                type="text"
                id="name"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
            </div>
            
            <div className="label-form textAraeLabel">
              <label htmlFor="address2">Address2</label>
              <br />
              <input              
                type="text"
                id="name"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>

            <div className="label-form textAraeLabel">
              <label htmlFor="city">City</label>
              <br />
              <input              
                type="text"
                id="name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
           
           
         

            <div className="label-form textAraeLabel">
              <label htmlFor="state">State</label>
              <br />
              <input              
                type="text"
                id="name"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>

            <div className="label-form textAraeLabel">
              <label htmlFor="country">Country</label>
              <br />
              <input              
                type="text"
                id="name"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className="label-form textAraeLabel">
              <label htmlFor="postalcode">Postal Code</label>
              <br />
              <input              
                type="text"
                id="name"
                value={postalcode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            </div>
          

        

          <div className="d-flex ">
            <div className="submitEvent addDonarSubmitBtnMain">
              <button
                className="addDonarSubmitBtn"
                type="button"
                onClick={() => updateWarehouseDetails(wareItemId)}
              >
                Update
              </button>
            </div>
            <div className="nextDonarSubmitBtnMain"></div>
          </div>
        </form>
      </div>
    </div>
    </Section>
  );
}