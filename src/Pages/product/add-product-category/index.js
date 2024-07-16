import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 import { API_BASE_URL } from "../../../../utils/config";
// import { Multiselect } from "multiselect-react-dropdown";
import { ToastContainer, toast } from 'react-toastify';
import Section from "@aio/components/Section";
import styles from "../product.category.module.css";
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../../components/Spinner'; 
import Cookies from "js-cookie";





export default function AddProductCategory() {
    // const [name, setProductName] = useState("");
    // const [warehouse, setWarehouse] = useState("");
    // const [quantity, setQuantity] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [data,setData]=useState([{CategoryName:"",description:""}])
   const[CategoryName,setCategoryName]=useState("")
   const[description,setDescription]=useState("")
    const router = useRouter();

  
    const addproductCategory = () => {
      // if (name.trim() === "" || description.trim() === "") {
      //   alert("Please fill required fields.");
      //   return;
      // }
  
       const token = Cookies.get("token");
       const parseToken = JSON.parse(token) || {};
      setIsLoading(true);
      const productCategoryDetail = {CategoryName,description}
       
     
      const fetchData = async () => {
        const response = await fetch(`${API_BASE_URL}/category/addcategory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${parseToken}`,
          },
          body: JSON.stringify(productCategoryDetail),
        });
  
        if (response.ok) {
          const data = await response.json();
          toast.success('Add successfully', {
            position: toast.POSITION.TOP_RIGHT,
          });
          router.push("/product");
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
          <h2 className={`${styles.formHeaderext}`}>Enter Category Details for Product</h2>

          <form>
          <div className="formMainDiv">
            <div className="label-form eventInp">
              <label htmlFor="categoryname" className="required">Category Name</label>
              <br />
              <input
                type="text"
                id="name"
                value={CategoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
           
          <div className="label-form textAraeLabel">
              <label htmlFor="description" className="required">Category Description</label>
              <br />
              <textarea
              className="textareaEvent"
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

        

          <div className="d-flex ">
            <div className="submitEvent addDonarSubmitBtnMain">
            <Link href='/product'> <button
                className="addDonarSubmitBtn"
                type="button">
                Back
              </button></Link>
            </div>
            <div className="nextDonarSubmitBtnMain">
            <button
                className="addDonarSubmitBtn"
                type="button"
                onClick={addproductCategory}
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








