import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { API_BASE_URL } from "../../../../utils/config";
// import { Multiselect } from "multiselect-react-dropdown";
import { ToastContainer, toast } from "react-toastify";
import Section from "@aio/components/Section";
import styles from "../order.module.css";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../../components/Spinner";
import Select from "react-select";
import Cookies from "js-cookie";

export default function DetailOrder() {
  // var currentDate=new Date().toISOString().slice(0,10);

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [OrderDate, setOrderDate] = useState("");
  const [Status, setStatus] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customerData, setCustomerData] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [defaultCustomerValue, setDefaultCustomerValue] = useState("");
  const [defaultProductValue, setDefaultProductValue] = useState("");
  const [defaultCustomerName, setDefaultCustomerName] = useState({});
  const [tableProductsData, setTableProductsData] = useState([]);
  const [billingNo, setBillingNo] = useState();

 
  const router = useRouter();

  const details = router.query;
  const orderItemId = details.details;
  
  

  useEffect(() => {
    if (orderItemId) {
      setIsLoading(true);
      const token = Cookies.get("token");
      const parseToken = JSON.parse(token) || {};
      const fetchProductDataById = async (orderItemId) => {
        const response = await fetch(
          `${API_BASE_URL}/order/getOrderById/${orderItemId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${parseToken}`,
            },
            body: JSON.stringify(),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setTableProductsData(data?.result?.products);
          console.log("tableProductsData",tableProductsData)
          setBillingNo(data?.result?.BillNumber || " ")
          setCustomerId(data?.result?.customerId || " ");
          setProductId(data?.result?.productId || " ");
          setOrderDate(data?.result?.OrderDate.slice(0, 10) || " ");
          setStatus(data?.result?.Status || " ");
          setTotalAmount(data?.result?.TotalAmount || " ");
          setDefaultCustomerName({
            value: data?.result?.customerId?._id,
            label: data?.result?.customerId?.Name,
          });
          setIsLoading(false);
        } else {
          const data = await response.json();
          setIsLoading(false);
        }
      };
      fetchProductDataById(orderItemId);
    }
  }, [orderItemId]);
  
  //This is used fetching all supplier data
  useEffect(() => {
    setIsLoading(true);
    const token = Cookies.get("token");
    const parseToken = JSON.parse(token) || {};
    const fetchData = async () => {
      const response = await fetch(`${API_BASE_URL}/customer/getCustomer`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${parseToken}`,
        },
        body: JSON.stringify(),
      });
      
      if (response.ok) {
        
        const data = await response.json();
        setCustomerData(data.data);
        setIsLoading(false);
      } else {
        const data = await response.json();
        setIsLoading(false);
}
}
fetchData();
},[]);

    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const token = Cookies.get("token");
        const parseToken = JSON.parse(token) || {};
        setIsLoading(true);
        
        const fetchData = async () => {
          const response = await fetch(`${API_BASE_URL}/product/getProducts`, {

            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
               'Authorization': `Bearer ${parseToken}`,
              
            },
            body: JSON.stringify(),
          });
          
          if (response.ok) {
            
            const data = await response.json();
            setProductData(data.data) 
            setIsLoading(false);
            

          } else {
            const data = await response.json();
            setIsLoading(false);
  }
  }
  fetchData();
}, []);

    return(
        
        <div className='donarPage'>
            {isLoading &&    <Spinner/>  }
        <div className='donarDetailMainPage'>
        <Section>
        <div>
            <h2 className={`${styles.formHeaderext}`}>Order Details</h2>
        </div>
        <div className={`${styles.donationButtons} d-flex justify-content-between mb-3  `}>
        <div className={`${styles.addDonarsearchMain} input-group `}>   
              <div className="input-group-append">
                <Link href='/order'><button  className={`btn addDonarBtn ${styles.button}`} type="button">Back</button></Link>
            </div>
        </div>
      </div>
        </Section>
        <Section className={`${styles.SectionBox}`}>
        <div className={`${styles.Orderbox}`}>
            <div className={`${styles.box}`}>
                        <h4 className={`${styles.boxItem}`}>Bill Number: <b>{billingNo}</b></h4>
                        <h4 className={`${styles.boxItem}`}>Status : <b><i>{Status}</i></b></h4>
                        <h4 className={`${styles.boxItem}`}>Total Amount : <b>&#8377;{totalAmount}</b></h4>
                        <h4 className={`${styles.boxItem}`}>Order Date : <b>{OrderDate}</b></h4>
                        <h4 className={`${styles.boxItem}`}>Customer Name : <b>{defaultCustomerName.label}</b></h4>
                    </div><hr />
            <div className={`${styles.OrderEachBox}`}>
            {tableProductsData != 0 ? (tableProductsData.map((value, index) => (
                <div key={index} className={`${styles.OrderDetailBox}`}>
                    <div className={`${styles.OrderDetailInside}`}>
                        <h2>{value.productName}</h2><hr />
                        <h4>Quantity : {value.actualQuantity}</h4>
                        <h4>Selling Price : <b>&#8377;{value.sellingPrice}</b></h4>
                        {value.boardWarrent ? (<h4 >Board Warranty : {value.boardWarrent}</h4>) : (<h4></h4>)}
                        {value.smpsWarrent ? (<h4 >SMPS Warranty : {value.smpsWarrent}</h4>) : (<p></p>)}
                        {value.timerWarrenty ? (<h4 >Timer Warranty : {value.timerWarrenty}</h4>) : (<p></p>)}
                        {value.ledModuleWarrenty  ? (<h4 >Led Module Warranty : {value.ledModuleWarrenty}</h4>) : (<p></p>)}
                    </div>
                </div>
            ))) : (<p></p>)} 
            </div>
        </div> 
        </Section>
        
        </div>
        </div>
    )
}