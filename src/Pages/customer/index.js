import Link from 'next/link';
import React from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect , useState } from 'react';
import { API_BASE_URL } from '../../../utils/config';
import Pagination from "react-js-pagination";
import Switch from "react-switch";
import Section from '@aio/components/Section';
import styles from "./customer.module.css";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import Spinner from '../../components/Spinner'; 
import { MdDeleteForever } from 'react-icons/md';
import Modal from "@aio/components/Modal";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image'

const Customer = () => {
// const [TempleData, setTempleData] = useState([]);
// const [Data, setData] = useState([]);
const [activePage, setActivePage] = useState(1);
const [page, setPage] = useState(1);
const [size, setsize] = useState(10);
const [search, setSearch] = useState('');
const [paginationData, setPaginationData] = useState([]);
const [isActive, setIsActive] = useState([]);
const [customerId, setCustomerId] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [cusmtomerData, setCustomerData] = useState([]);
const [isCustomerDeleted, setIsCustomerDeleted] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);
const[custId,setCustId]=useState(" ")

const handleSearchChange = (event) => {
  setSearch(event.target.value);
};

const handleSwitchChange = (checked, index) => {

  const updatedIs_id = [...customerId];
  const updatedIsActive = [...isActive];
  updatedIsActive[index] = checked;
  setIsActive(updatedIsActive);
  const token = Cookies.get("token");
  const parseToken = JSON.parse(token) || {};
  setIsLoading(true);
  
  const fetchData = async () => {
    const response = await fetch(`${API_BASE_URL}/customer/changeActivation/${updatedIs_id[index]}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${parseToken}`,
        
      },
      body: JSON.stringify({ "isActive":checked}),
    });
    
    if (response.ok) {
      
      const data = await response.json();
      if(data.data.isActive == true){
        toast.success('Customer is Active', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }else{
        toast.success('Customer is InActive', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setIsLoading(false);
    } else {
      const data = await response.json();
      console.error(data.errorMessage);
      setIsLoading(false);
    }
    }
    fetchData();
};

//Perform delete function on customer data
const deleteCustomerData=(custid)=>{
  
  setIsModalOpen(true)
  setCustId(custid)
  //setIsLoading(true);
//   const token = localStorage.getItem('token');
//   const parseToken = JSON.parse(token) || {};
//   
//   const fetchCustomerData = async () => {
//     const response = await fetch(`${API_BASE_URL}/customer/deteteCustomer/${custid}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${parseToken}`,
        
//       },
//       body: JSON.stringify(),
//     });
    
//     if (response.ok) {
      
//       const data = await response.json();
//      
      
//       // if(isCustomerDeleted===true){
//       //   setIsCustomerDeleted(false)
       
//       // }else{
//       //   setIsCustomerDeleted(true)
//       // }
//       setIsLoading(false);
//     } else {
//       const data = await response.json();
//       setIsLoading(false);
// }
// }
// fetchCustomerData();
}
//This is used for paginantion for customer page 
useEffect(() => {
          setIsLoading(true);
          const token = Cookies.get("token");
          const parseToken = JSON.parse(token) || {};
          const fetchData = async () => {
            const response = await fetch(`${API_BASE_URL}/customer/getCustomer?page=${activePage}&size=${size}&search=${search}`, {
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
              setPaginationData(data)
              const initialIsActive = data.data.map((customer) => customer.isActive);
              const initialCustomerId = data.data.map((customer) => customer._id);
              setCustomerId(initialCustomerId);
              setIsActive(initialIsActive);
              setIsLoading(false);
            } else {
              const data = await response.json();
              setIsLoading(false);
    }
    }
    fetchData();
},[isCustomerDeleted,activePage,search]);

const handlePageChange = (pageNumber) => {
  setActivePage( pageNumber);
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
   
  const fetchCustomerData = async () => {
    const response = await fetch(`${API_BASE_URL}/customer/deteteCustomer/${custId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${parseToken}`,
        
      },
      body: JSON.stringify(),
    });
    
    if (response.ok) {
      
      const data = await response.json();
      
      
      // if(isCustomerDeleted===true){
      //   setIsCustomerDeleted(false)
       
      // }else{
      //   setIsCustomerDeleted(true)
      // }
      setIsLoading(false);
    } else {
      const data = await response.json();
      setIsLoading(false);
}
if(isCustomerDeleted===true){
  setIsCustomerDeleted(false)
 
}else{
  setIsCustomerDeleted(true)
}
setIsModalOpen(false);  
}
fetchCustomerData();
 
 
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
        heading="Please Confirm to Delete the Customer. "
        positiveText="Confirm"
        onSubmit={handleModalSubmit}
        onCancel={handleModalCancel}
      />
        <div className='donarDetailMainPage'>
        <Section>
        <div>
  <h2 className={`${styles.formHeaderext}`}>Customer Details</h2>
</div>
      <div className={`${styles.donationButtons} d-flex justify-content-between mb-3  `}>
        <div className={`${styles.addDonarsearchMain} input-group `}>
        <input type="text"  className={`${styles.addDonarSearch} form-control  `}
           placeholder="Search"
           onChange={(e) => setSearch(e.target.value)}
            aria-label="Search" />         
             <div className="input-group-append">
            <button  onClick={handleSearchChange} className={`btn btn-outline-secondary searchBtn ${styles.button}`} type="button">
              Search
            </button>
          </div>
        </div>
       <Link href='/customer/add-customer'> <button  className={`btn addDonarBtn ${styles.button}`}>Add Customer</button></Link>
       {/* <Link href='/event/add-event-category'> <button className={`btn  addDonarBtn ${styles.button}`}>Add Event Category</button></Link> */}

      </div>
      </Section>
      <Section>
      {cusmtomerData.length !==0 ? (
     <div className='table-responsive w-100'>
      <table className='table'>
      <thead>
        <tr>
          <th scope="col">Customer Name</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
      {cusmtomerData.map ((Temple, index) => (
              <tr key={index}>
                <td>{Temple.Name}</td>
                <td>{Temple.Phone}</td>
                <td><Link href={`/customer/${Temple._id}`}>
                <AiFillEdit className='red'/></Link>
                <Switch 
                    className={`red ${styles.dltbutton}`} 
                    onChange={(checked) => handleSwitchChange(checked, index)}
                    checked={isActive[index]}
                />
                {/* <MdDeleteForever className={`red ${styles.dltbutton}`} onClick={()=>deleteCustomerData(Temple._id)}/> */}
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
    {cusmtomerData.length !==0 ? (
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

export default Customer;

