import Link from "next/link";
import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { API_BASE_URL } from "../../../../utils/config";
// import { Multiselect } from "multiselect-react-dropdown";
import { ToastContainer, toast } from 'react-toastify';
import Section from "@aio/components/Section";
import styles from "../users.module.css";
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../../components/Spinner'; 
import Modal from "@aio/components/Modal";
import { API_BASE_URL } from "utils/config";
import Cookies from "js-cookie";


export default function UpdateSupplier() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [postalcode, setPostalCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roleList, setRoleList] = useState([]);
    const [userRole, setUserRole] = useState("")


 



 const router = useRouter();
 const  slug  = router.query;
 const userItemId=slug.slug;


useEffect(()=>{
    if(userItemId){
        setIsLoading(true);
        const token = Cookies.get("token");
        const parseToken = JSON.parse(token) || {};
        const fetchUserDataById = async (userItemId) => {
           
    
          const response = await fetch(`${API_BASE_URL}/users/getUserById/${userItemId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${parseToken}`,
            },
            body: JSON.stringify(),
          });
          
          if (response.ok) {
            
            const data = await response.json();
            
            setUserRole(data?.result?.roleId || " ")
            setFirstName(data?.result?.FirstName || " ")
            setLastName(data?.result?.LastName || " ")
            setEmail(data?.result?.Email || " ")
            setCountry(data?.result?.Address?.Country || " ")
            setState(data?.result?.Address?.State || " ")
            setCity(data?.result?.Address?.City || " ")
            setPostalCode(data?.result?.Address?.ZipCode || " ")
            setIsLoading(false);
          } else {
            const data = await response.json();
            setIsLoading(false);
    }
    }
    fetchUserDataById(userItemId);
    }
    
},[userItemId])

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


  const updateUserDetails= (userItemId) => {
    setIsLoading(true);
    let roleUserNameId=""
    if(typeof userRole=="object"){
      roleUserNameId=userRole._id
    }else{
      roleUserNameId=userRole
    }
    let UserDetail = {
      roleId: roleUserNameId.trim() ? roleUserNameId : undefined,
      FirstName: firstname.trim() ? firstname : undefined,
      LastName: lastname.trim() ? lastname : undefined,
      Email: email.trim() ? email : undefined,
      Address: 
            {City: city.trim() ? city : undefined,
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
      const response = await fetch(`${API_BASE_URL}/users/updateUser/${userItemId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${parseToken}`,
       },
        body: JSON.stringify(UserDetail),
      });

      if (response.ok) {
         const data = await response.json();
         toast.success('Update successfully', {
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

  return (
    <Section>
       {isLoading &&    <Spinner/>  }
    <div className="donarPage w-100">
      <ToastContainer position="top-right" autoClose={5000} />

      <div className="addDonarForm">
        <h2 className={`${styles.formHeaderext}`}>Update User Details</h2>
        <form>
          <div className="formMainDiv">
          <div className="label-form eventInp">
              <label htmlFor="category"className="required">Role</label>
              <br />
              <select name="category" 
                onChange={(e) =>setUserRole(e.target.value)}>
                  <option value={userRole._id}>{userRole.roleName}</option>
                   {roleList.map(val=><option key={val._id} value={val._id}>{val.roleName}</option>) }
                </select>
            </div>
            <div className="label-form eventInp">
              <label htmlFor="name"className="required">First Name</label>
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
                onClick={() => updateUserDetails(userItemId)}
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </Section>
  );
}