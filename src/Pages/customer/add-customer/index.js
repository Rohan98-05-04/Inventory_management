import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { API_BASE_URL } from "../../../../utils/config";
// import { Multiselect } from "multiselect-react-dropdown";
import { ToastContainer, toast } from 'react-toastify';
import Section from "@aio/components/Section";
import styles from "../customer.module.css";
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../../components/Spinner'; 
import Cookies from "js-cookie";
export default function AddCustomer() {
  const [name, setCustomerName] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [PanNo, setPanNumber] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const router = useRouter();


  const addCustomerCategory = () => {
    // if (name.trim() === "" || description.trim() === "") {
    //   alert("Please fill required fields.");
    //   return;
    // }
    // let customerDetail = {
    //   Name:name, 
    //   Email: email,
    //   Phone: phonenumber,
    //   PanNo: pannumber,
    //   Address1: address1,
    //   city: city,
    //   state: state,
    //   pincode: postalcode,
    //   country:country,
    //   Address2: address2,
    // }

    let customerDetail = {
      Name: name.trim() ? name : undefined,
      CompanyName:CompanyName.trim() ? CompanyName : undefined,
      Email: email.trim() ? email : undefined,
      Phone: phonenumber.trim() ? phonenumber : undefined,
      Address1: address1.trim() ? address1 : undefined,
      city: city.trim() ? city : undefined,
      state: state.trim() ? state : undefined,
     // pincode: postalcode.trim() ? postalcode : undefined,
     ...(postalcode ? { pincode: postalcode } : {}),
      country: country.trim() ? country : undefined,
      Address2: address2.trim() ? address2 : undefined,
      PanNo: PanNo.trim() ? PanNo : undefined,
    };

    
    // Filter out undefined values from the object
    customerDetail = Object.fromEntries(Object.entries(customerDetail).filter(([_, v]) => v !== undefined));
    const fetchData = async () => {
      
      const token = Cookies.get("token");
      const parseToken = JSON.parse(token) || {};
      const response = await fetch(`${API_BASE_URL}/customer/addCustomer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${parseToken}`,
        },
        body: JSON.stringify(customerDetail),
      });
     

      if (response.ok) {
        const data = await response.json();
        toast.success('Add successfully', {
          position: toast.POSITION.TOP_RIGHT,
        });
        router.push("/customer");
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
        <h2 className={`${styles.formHeaderext}`}>Enter Customer Details</h2>
        <form>
          <div className="formMainDiv">
            <div className="label-form eventInp">
              <label htmlFor="name" className="required">Customer Name</label>
              <br />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
          
             <div className="label-form eventInp">
              <label htmlFor="name" className="required">Phone Number</label>
              <br />
              <input
                type="number"
                id="name"
                value={phonenumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="label-form eventInp">
              <label htmlFor="name" className="required">Email</label>
              <br />
              <input
                type="email"
                id="name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="label-form eventInp">
              <label htmlFor="name">Company Name</label>
              <br />
              <input
                type="text"
                id="name"
                value={CompanyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="label-form eventInp">
              <label htmlFor="name">Pan Number</label>
              <br />
              <input
                type="text"
                id="name"
                value={PanNo}
                onChange={(e) => setPanNumber(e.target.value)}
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
                type="number"
                id="name"
                value={postalcode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            </div>
          

        

          <div className="d-flex ">
            <div className="submitEvent addDonarSubmitBtnMain">
            <Link href='/customer'> <button
                className="addDonarSubmitBtn"
                type="button">
                Back
              </button></Link>
              
            </div>
            <div className="nextDonarSubmitBtnMain">
            <button
                className="addDonarSubmitBtn"
                type="button"
                onClick={addCustomerCategory}
              >
                Submit
              </button>
           
            </div>
          </div>
        </form>
      </div>
    </div>
    </Section>
  );
}
