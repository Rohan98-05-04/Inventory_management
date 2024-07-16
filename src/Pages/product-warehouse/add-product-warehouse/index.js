import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { API_BASE_URL } from "../../../../utils/config";
// import { Multiselect } from "multiselect-react-dropdown";
import { ToastContainer, toast } from 'react-toastify';
import Section from "@aio/components/Section";
import styles from "../product.warehouse.module.css";
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../../components/Spinner'; 




export default function AddProductWarehouse() {
    // const [name, setProductName] = useState("");
    // const [warehouse, setWarehouse] = useState("");
    // const [quantity, setQuantity] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [data,setData]=useState([{productname:"",warehouse:"",quantity:""}])
    const warehouseName=["demo1","demo2", "demo3"]

    const router = useRouter();

  
    const addProductWarehouseCategory = () => {
      // if (name.trim() === "" || description.trim() === "") {
      //   alert("Please fill required fields.");
      //   return;
      // }
  
      // const token = localStorage.getItem("token");
      // const parseToken = JSON.parse(token) || {};
      // setIsLoading(true);
  
      // const fetchData = async () => {
      //   const response = await fetch(`${API_BASE_URL}//event/addeventCategory`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${parseToken}`,
      //     },
      //     body: JSON.stringify({ name, description }),
      //   });
  
      //   if (response.ok) {
      //     const data = await response.json();
      //     toast.success('Add successfully', {
      //       position: toast.POSITION.TOP_RIGHT,
      //     });
      //     router.push("/event");
      //     setIsLoading(false);
          
      //   } else {
      //     const data = await response.json();
      //     toast.error(data.errorMessage, {
      //       position: toast.POSITION.TOP_RIGHT,
      //     });
      //     setIsLoading(false);
      //   }
      // };
      // fetchData();
     
    };
    const addMoreInputFields=()=>{
      setData([...data,{productname:"",warehouse:"",quantity:""}])
    }

    const inputChange=(e,i)=>{
        const {name,value}=e.target
        const onChangeVal=[...data]
        onChangeVal[i][name]=value
        setData(onChangeVal)
    }
    return (
      <Section>
         {isLoading &&    <Spinner/>  }
      <div className="donarPage w-100">
        <ToastContainer position="top-right" autoClose={5000} />
  
        <div className="addDonarForm">
          <h2 className={`${styles.formHeaderext}`}>Enter Warehouse Details for Product</h2>
          {
          data.map((val,i)=>
          <form key={i}>
            <div className="formMainDiv">
              <div className="label-form eventInp">
                <label htmlFor="productname">Product Name</label>
                <br />
                <input
                  type="text"
                  id="name"
                  name="productname"
                  value={val.productname}
                  onChange={(e) =>inputChange(e,i)}
                />
              </div>
              <div className="label-form eventInp">
              <label htmlFor="warehouse">Warehouse </label>
              <br />
              <select name="warehouse" 
                onChange={(e) =>inputChange(e,i)}>
                  <option>Select One</option>
                   {warehouseName.map(val=><option key={val} value={val}>{val}</option>) }

                </select>
            </div>
              <div className="label-form eventInp">
                <label htmlFor="quantity">Quantity</label>
                <br />
                <input
                  type="number"
                  id="name"
                  name="quantity"
                  value={val.quantity}
                  onChange={(e) =>inputChange(e,i)}
                />
              </div>
             
              </div>
           
          </form>
         
          
          )}
          
          <div className="d-flex ">
              <div className="submitEvent addDonarSubmitBtnMain">
                <button
                  className="addDonarSubmitBtn"
                  type="button"
                  onClick={addProductWarehouseCategory}
                >
                  Submit
                </button>
              </div> 
              <div className="submitEvent addDonarSubmitBtnMain">
                <button
                  className="addDonarSubmitBtn"
                  type="button"
                  onClick={addMoreInputFields}
                >
                  Add more warehouse
                </button>
              </div> 
            </div>
        </div>
      </div>
      </Section>
    );
  }








