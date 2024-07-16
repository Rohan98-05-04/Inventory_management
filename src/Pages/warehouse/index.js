import Link from 'next/link';
import React from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect , useState } from 'react';
import { API_BASE_URL } from '../../../utils/config';
import Pagination from "react-js-pagination";
import Switch from "react-switch";
import Section from '@aio/components/Section';
import styles from "./warehouse.module.css";
import { AiFillEdit } from 'react-icons/ai';
import Spinner from '../../components/Spinner'; 
import { MdDeleteForever } from 'react-icons/md';

const Warehouse = () => {
// const [TempleData, setTempleData] = useState([]);
const [warehouseData, setWarehouseData] = useState([]);
const [paginationData, setPaginationData] = useState([]);
const [activePage, setActivePage] = useState(1);
const [page, setPage] = useState(1);
const [size, setsize] = useState(10);
const [search, setSearch] = useState('');
// const [isActive, setIsActive] = useState([]);
// const [eventId, seteventId] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [isWarehouseDeleted, setIsWarehouseDeleted] = useState(false);

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
const deleteWarehouseData=(warehouseid)=>{
  setIsLoading(true);
  const fetchProductData = async () => {
    const response = await fetch(`${API_BASE_URL}/warehouse/deleteWarehouseById/${warehouseid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${parseToken}`,
        
      },
      body: JSON.stringify(),
    });
    
    if (response.ok) {
      
      const data = await response.json();
     
      if(isWarehouseDeleted===true){
        setIsWarehouseDeleted(false)
      }else{
        setIsWarehouseDeleted(true)
      }
      
      
      setIsLoading(false);
    } else {
      const data = await response.json();
      setIsLoading(false);
}
}
fetchProductData();
}

useEffect(() => {
  // const token = localStorage.getItem('token');
  //         const parseToken = JSON.parse(token) || {};
          setIsLoading(true);
          
          const fetchData = async () => {
            const response = await fetch(`${API_BASE_URL}/warehouse/getAllWarehouse?page=${activePage}&size=${size}&search=${search}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${parseToken}`,
                
              },
              body: JSON.stringify(),
            });
            
            if (response.ok) {
              
              const data = await response.json();
             
              setWarehouseData(data.data)
              setPaginationData(data)
              setIsLoading(false);
            } else {
              const data = await response.json();
              setIsLoading(false);
    }
    }
    fetchData();
}, [isWarehouseDeleted,activePage,search]);

const handlePageChange = (pageNumber) => {
  setActivePage( pageNumber);
}
  return (
      <div className='donarPage'>
         {isLoading &&    <Spinner/>  }
        <div className='donarDetailMainPage'>
        <Section>
        <div>
  <h2 className={`${styles.formHeaderext}`}>Warehouse Details</h2>
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
       <Link href='/warehouse/add-warehouse'> <button  className={`btn addDonarBtn ${styles.button}`}>Add Warehouse</button></Link>
       {/* <Link href='/event/add-event-category'> <button className={`btn  addDonarBtn ${styles.button}`}>Add Event Category</button></Link> */}

      </div>
      </Section>
      <Section>
     <div className='table-responsive w-100'>
      <table className='table'>
      <thead>
        <tr>
          <th scope="col">Warehouse Name</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
      {warehouseData.map((warehouse, index) => (
              <tr key={index}>
                <td>{warehouse.name}</td>
                <td>{warehouse.phone}</td>
                <td><Link href={`/warehouse/${warehouse._id}`}>
               <AiFillEdit className='red'/></Link>
               <MdDeleteForever className={`red ${styles.dltbutton}`} onClick={()=>deleteWarehouseData(warehouse._id)}/>
                  </td>
              </tr>
            ))}
      </tbody>
    </table>
    </div>
    </Section>
    <Section>

    <div>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={size}
          totalItemsCount={paginationData?.totalDocuments}
          pageRangeDisplayed={5}
          onChange={handlePageChange.bind(this)}
          itemClass="page-item"
      linkClass="page-link"

        />
      </div>
      </Section>

    </div>
    </div>
  );
};

export default Warehouse;