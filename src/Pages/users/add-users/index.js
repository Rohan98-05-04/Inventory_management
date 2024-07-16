import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { API_BASE_URL } from "../../../../utils/config";
// import { Multiselect } from "multiselect-react-dropdown";
import { ToastContainer, toast } from 'react-toastify';
import Section from "@aio/components/Section";
import styles from "../users.module.css";
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../../components/Spinner'; 
import Cookies from "js-cookie";

export default function AddUsers() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [userRole, setUserRole] = useState("")


  const router = useRouter();


  const addUser= () => {
    // if (name.trim() === "" || description.trim() === "") {
    //   alert("Please fill required fields.");
    //   return;
    // }

    // const token = localStorage.getItem("token");
    // const parseToken = JSON.parse(token) || {};
    // setIsLoading(true);
    
    let UserDetail = {
        roleId: userRole.trim() ? userRole : undefined,
        FirstName: firstname.trim() ? firstname : undefined,
        LastName: lastname.trim() ? lastname : undefined,
        Email: email.trim() ? email : undefined,
        Password: password.trim() ? password : undefined,
        Address: 
        {
            City: city.trim() ? city : undefined,
            State: state.trim() ? state : undefined,
            ZipCode: postalcode.trim() ? postalcode : undefined,
            Country: country.trim() ? country : undefined,
        }
      };
      
      // Filter out undefined values from the object
      UserDetail = Object.fromEntries(Object.entries(UserDetail).filter(([_, v]) => v !== undefined));
      
    const fetchData = async () => {
      setIsLoading(true);
      const token = Cookies.get("token");
      const parseToken = JSON.parse(token) || {};
      const response = await fetch(`${API_BASE_URL}/users/addUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${parseToken}`,
        },
        body: JSON.stringify(UserDetail),
      });

      if (response.ok) {
        const data = await response.json();
        
        toast.success('Add successfully', {
          position: toast.POSITION.TOP_RIGHT,
        });
        router.push("/users");
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

  useEffect(() => {

    setIsLoading(true);

    
    const token = Cookies.get("token");
          const parseToken = JSON.parse(token) || {};

    const fetchUserData = async () => {
      const response = await fetch(`${API_BASE_URL}/role/getAllRole`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${parseToken}`,
        },
        body: JSON.stringify(),
      });
      
      if (response.ok) {
        
        const data = await response.json();
        
        setRoleList(data.data);
        // setData(data.data);
        // setTempleData(data.data.data);
        // const initialIsActive = data.data.data.map((event) => event.isActive);
        // setIsActive(initialIsActive);
        // const initialeventId = data.data.data.map((event) => event._id);
        // seteventId(initialeventId);
        setIsLoading(false);
      } else {
        const data = await response.json();
        setIsLoading(false);
}
}
fetchUserData();
},[]);

  return (
    <Section>
       {isLoading &&    <Spinner/>  }
    <div className="donarPage w-100">
      <ToastContainer position="top-right" autoClose={5000} />

      <div className="addDonarForm">
        <h2 className={`${styles.formHeaderext}`}>Enter Users Details</h2>
        <form>
          <div className="formMainDiv">
          <div className="label-form eventInp">
              <label htmlFor="category" className="required">Role</label>
              <br />
              <select name="category" 
                onChange={(e) =>setUserRole(e.target.value)}>
                  <option>Select One</option>
                   {roleList.map(val=><option key={val._id} value={val._id}>{val.roleName}</option>) }
                </select>
            </div>
            <div className="label-form eventInp">
              <label htmlFor="name" className="required">First Name</label>
              <br />
              <input
                type="text"
                id="name"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="label-form eventInp">
              <label htmlFor="name" className="required">Last Name</label>
              <br />
              <input
                type="text"
                id="name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="label-form eventInp">
              <label htmlFor="email" className="required">Email</label>
              <br />
              <input
                type="email"
                id="name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="label-form eventInp">
              <label htmlFor="name"className="required">Password</label>
              <br />
              <input
                type="text"
                id="name"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <Link href='/users'> <button
                className="addDonarSubmitBtn"
                type="button">
                Back
              </button></Link>
            </div>
            <div className="nextDonarSubmitBtnMain">
            <button
                className="addDonarSubmitBtn"
                type="button"
                onClick={addUser}
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
