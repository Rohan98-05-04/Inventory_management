
import Link from 'next/link';
import React from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect , useState } from 'react';
import { API_BASE_URL } from '../../../utils/config';
import Pagination from "react-js-pagination";
import Switch from "react-switch";
import Section from '@aio/components/Section';
import styles from "./order.module.css";
import { AiFillEdit } from 'react-icons/ai';
import Spinner from '../../components/Spinner'; 
import { MdDeleteForever } from 'react-icons/md';
import Modal from "@aio/components/Modal";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from "react-toastify";
import Image from 'next/image';
import { TbTruckReturn } from 'react-icons/tb';
import Dropdown from 'react-bootstrap/Dropdown';

const Order = () => {
// const [TempleData, setTempleData] = useState([]);
// const [Data, setData] = useState([]);
const [activePage, setActivePage] = useState(1);
const [page, setPage] = useState(1);
const [size, setsize] = useState(10);
const [paginationData, setPaginationData] = useState([]);
const [search, setSearch] = useState('');
// const [isActive, setIsActive] = useState([]);
// const [eventId, seteventId] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [orderData, setOrderData] = useState([]);
const [isOrderDeleted, setIsOrderDeleted] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);
const[orderId,setOrderId]=useState(" ")


const handleSearchChange = (event) => {
  setSearch(event.target.value);
};

// const handleSwitchChange = (checked, index) => {

//   const updatedIs_id = [...eventId];
//   const updatedIsActive = [...isActive];
//   updatedIsActive[index] = checked;
//   setIsActive(updatedIsActive);
//   const token = localStorage.getItem('token');
//   const parseToken = JSON.parse(token) || {};
//   setIsLoading(true);
  
//   const fetchData = async () => {
//     const response = await fetch(`${API_BASE_URL}/event/manage-status/${updatedIs_id[index]}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${parseToken}`,
        
//       },
//       body: JSON.stringify({ "status":checked}),
//     });
    
//     if (response.ok) {
      
//       const data = await response.json();
      
//       setIsLoading(false);
//     } else {
//       const data = await response.json();
//       console.error(data.errorMessage);
//       setIsLoading(false);
//     }
//     }
//     fetchData();
// };

useEffect(() => {
   const token = Cookies.get("token");
           const parseToken = JSON.parse(token) || {};
         // setIsLoading(true);
          const fetchData = async () => {
            const response = await fetch(`${API_BASE_URL}/order/getAllOrder?page=${activePage}&size=${size}&search=${search}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                 'Authorization': `Bearer ${parseToken}`,
                
              },
              body: JSON.stringify(),
            });
            
            if (response.ok) {
              
              const data = await response.json();
              if(activePage>1 && data.data.length==0){
                setActivePage( activePage-1)
              }
              setPaginationData(data)
              setOrderData(data.data);
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
    fetchData();
}, [isOrderDeleted,activePage,search]);
const handlePageChange = (pageNumber) => {
  setActivePage( pageNumber);
}

//Delete function perforemd


const deleteOrderData=(orderid)=>{
 // setIsLoading(true);

   setIsModalOpen(true);
   setOrderId(orderid)
//   const token = localStorage.getItem('token');
//            const parseToken = JSON.parse(token) || {};
//   const fetchProductData = async () => {
//     const response = await fetch(`${API_BASE_URL}/order/deleteOrderById/${orderid}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//          'Authorization': `Bearer ${parseToken}`,
        
//       },
//       body: JSON.stringify(),
//     });
    
//     if (response.ok) {
      
//       const data = await response.json();

//       // if(isOrderDeleted===true){
//       //   setIsOrderDeleted(false)
//       // }else{
//       //   setIsOrderDeleted(true)
//       // }
      
      
//       setIsLoading(false);
//     } else {
//       const data = await response.json();
//       setIsLoading(false);
// }
// }
// fetchProductData();
}


//Update function performed

const updateOrderData=(orderid)=>{
  //setIsLoading(true);

  const token = Cookies.get("token");
           const parseToken = JSON.parse(token) || {};
  const fetchOrderDataById = async () => {
    const response = await fetch(`${API_BASE_URL}/order/updateOrderById/${orderid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${parseToken}`,
        
      },
      body: JSON.stringify(),
    });
    
    if (response.ok) {
      
      const data = await response.json();  
      setIsLoading(false);
    } else {
      const data = await response.json();
      setIsLoading(false);
}
}
fetchOrderDataById();
}
//Perform action on MOdal 
const closeModal = () => {
  setIsModalOpen(false);
  //router.push("/customer")
}
const handleModalSubmit = () => {
  setIsLoading(true);
  const token = Cookies.get("token");
           const parseToken = JSON.parse(token) || {};
  const fetchProductData = async () => {
    const response = await fetch(`${API_BASE_URL}/order/deleteOrderById/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${parseToken}`,
        
      },
      body: JSON.stringify(),
    });
    
    if (response.ok) {   
      const data = await response.json(); 
     
      setIsLoading(false);
    } else {
      const data = await response.json();
      toast.error(data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    
      setIsLoading(false);
}
if(isOrderDeleted===true){
  setIsOrderDeleted(false)
}else{
  setIsOrderDeleted(true)
}
setIsModalOpen(false); 
}
fetchProductData();
   
}

// Function to handle canceling the modal
const handleModalCancel = () => {
  setIsModalOpen(false);
}
  return (
      <div className='donarPage'>
         {isLoading &&    <Spinner/>  }
         <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        heading="Please Confirm to Delete the Order "
        positiveText="Confirm"
        negativeText="Cancel"
        onSubmit={handleModalSubmit}
        onCancel={handleModalCancel}
      />
        <div className='donarDetailMainPage'>
        <Section>
        <div>
  <h2 className={`${styles.formHeaderext}`}>Order Details</h2>
</div>
      <div className={`${styles.donationButtons} d-flex justify-content-between mb-3  `}>
        <div className={`${styles.addDonarsearchMain} input-group `}>
        <input type="text"  className={`${styles.addDonarSearch} form-control  `}
           placeholder="Search"
           onChange={(e) => setSearch(e.target.value)}
            aria-label="Search" />          <div className="input-group-append">
            <button onClick={handleSearchChange} className={`btn btn-outline-secondary searchBtn ${styles.button}`} type="button">
              Search
            </button>
          </div>
        </div>
       <Link href='/order/add-order'> <button  className={`btn addDonarBtn ${styles.button}`}>Add Order</button></Link>
       {/* <Link href='/event/add-event-category'> <button className={`btn  addDonarBtn ${styles.button}`}>Add Event Category</button></Link> */}
      </div>
      </Section>
      <Section>
      {orderData.length !==0 ? (
     <div className='table-responsive w-100'>
      <table className='table'>
      <thead>
        <tr>
          <th scope="col">Product Name</th>
          <th scope="col">Bill Number</th>
          <th scope="col">Total Amount</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
      {orderData.map((order, index) => (
              <tr key={index}>
                <td>
                <Link href={`/order/show-data/${order._id}`} className={`${styles.ColorSpan}`}> 
                  {order.products.map((element,index)=>(
                   index<=2 ? (<span >{index > 0 && ', '}
                   {element.productName}</span>):("")
                 
                  ))}
                      {order.products.length > 3?(<span>.....</span>):("")} 
                      </Link>
                </td>
                <td>{order.BillNumber}</td>
                <td>{order.TotalAmount}</td>
                <td>{order.Status}</td>
                <td className={`${styles.ActionButtons}`}><Link href={`/order/${order._id}`}>
               <AiFillEdit className='red'/></Link>
               {order.Status==="Delivered"?<Link href={`/order/return-order/${order._id}`}>
               <TbTruckReturn className={`blue ${styles.dltbutton}`}/></Link>:" "}
               
               <MdDeleteForever className={`red ${styles.dltbutton}`} onClick={()=> deleteOrderData(order._id)}/>
               </td>
              </tr>
            ))}
      </tbody>
    </table>
    </div>
    ) : (
      <div className='errorImage'> 
            <Image className='noDataFoundImg'
            src={"/no_data_found.png"} width={"400"} height={"400"} alt="logo"
            />
      </div>
    )}
    </Section>
    <Section>
    {orderData.length !==0 ? (
    <div>
      {paginationData?.totalDocuments !== undefined&&(
        <Pagination
          activePage={activePage}
          itemsCountPerPage={size}
          totalItemsCount={paginationData?.totalDocuments}
          pageRangeDisplayed={5}
          onChange={handlePageChange.bind(this)}
          itemClass="page-item"
      linkClass="page-link"

        />
        )}
      </div>
      ) : (
        <p></p>
       )}
      </Section>

    </div>
    </div>
  );
};

export default Order;





