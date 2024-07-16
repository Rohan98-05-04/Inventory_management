import Link from "next/link";
import { useEffect, useState,useRef } from "react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { API_BASE_URL } from "../../../../utils/config";
// import { Multiselect } from "multiselect-react-dropdown";
import { ToastContainer, toast } from "react-toastify";
import Section from "@aio/components/Section";
import styles from "../product.module.css";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../../components/Spinner";
import Modal from "@aio/components/Modal";
import { API_BASE_URL } from "utils/config";
import Select from "react-select";
import Cookies from "js-cookie";


export default function UpdateProduct() {
  const [ProductName, setProductName] = useState("");
  const [Description, setProductDetail] = useState("");
  const [costPrice, setProductCostPrice] = useState();
  const [sellingPrice, setProductsellingPrice] = useState();
  const [image, setProductImage] = useState(" ");
  const [StockQuantity, setProductStockQty] = useState();
  const [warrentyPeriod, setProductWarrentyPeriod] = useState("");
  const [weight, setProductWeight] = useState("");
  const [dimension, setProductDimension] = useState("");
  const [CategoryID, setProductCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [SupplierID, setSupplierName] = useState("");
  const [lengthProduct, setLength] = useState("");
  const [width, setwidth] = useState("");
  const [height, setHeight] = useState("");
  const [productCategorySearch, setProductCategorySearch] = useState("");
  const [supplierSearch, setsupplierSearch] = useState("");
//const [defaultCategoryValue,setDefaultCategoryValue]=useState("")
//const [defaultSupplierValue,setDefaultSupplierValue]=useState("")
const [defaultCategoryName, setDefaultCategoryName] = useState({});
const [defaultSupplierName, setDefaultSupplierName] = useState({});
const[boardWarrent,setBoardWarrent]=useState("");
const[timerWarrenty,setTimerWarrenty]=useState("")
const[smpsWarrent,setSmpsWarrent]=useState("");
const[ledModuleWarrenty,setLedModuleWarrenty]=useState("");
const fileInputRef = useRef(null);


 
  const router = useRouter();



  //it is used for get id from the existing data in table
  const slug = router.query;
  
  const productItemId = slug.slug;
  



  //To show the respective input data in input fields in update page
  useEffect(() => {
    if (productItemId) {
      setIsLoading(true);
      const token = Cookies.get("token");
      const parseToken = JSON.parse(token) || {};

      const fetchProductDataById = async (productItemId) => {
        

        const response = await fetch(
          `${API_BASE_URL}/product/getProductById/${productItemId}`,
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
          
          
          setProductName(data?.result?.ProductName || " ");
          setProductDetail(data?.result?.Description || " ");
          setProductCostPrice(data?.result?.costPrice || 0);
          setProductsellingPrice(data?.result?.sellingPrice || 0);
          setProductStockQty(data?.result?.StockQuantity || 0);
          setProductImage(data?.result?.image || " ")
          setBoardWarrent(data?.result?.boardWarrent || " ");
          setTimerWarrenty(data?.result?.timerWarrenty || " ");
          setSmpsWarrent(data?.result?.smpsWarrent || " ");
          setLedModuleWarrenty(data?.result?.ledModuleWarrenty || " ");
          setProductWeight(data?.result?.weight || " ");
          //setProductDimension(data?.result?.dimension || " ");
          setLength(data?.result?.length || " ");
          setwidth(data?.result?.width || " ");
          setHeight(data?.result?.height || " ");
          setProductCategory(data?.result?.CategoryID || " ");
          setSupplierName(data?.result?.SupplierID || " ");
         // setDefaultCategoryValue(data?.result?.CategoryID?._id || " ")
          //setDefaultSupplierValue(data?.result?.SupplierID?._id || " ")
          setDefaultCategoryName({
            value:data?.result?.CategoryID?._id ,
            label:data?.result?.CategoryID?.CategoryName
          })
          setDefaultSupplierName({
            value:data?.result?.SupplierID?._id ,
            label:data?.result?.SupplierID?.SupplierName
          })

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
      };
      fetchProductDataById(productItemId);
    }
  }, [productItemId]);

  //This is used fetching all supplier data
  useEffect(() => {
    const token = Cookies.get("token");
    const parseToken = JSON.parse(token) || {};
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch(
        `${API_BASE_URL}/supplier/getAllActiveSupplier?search=${supplierSearch}`,
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
       
        setSupplierList(data.activeSuppliers);
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
    };
    fetchData();
  }, []);

  //This is used for fetching category Data
  useEffect(() => {
    setIsLoading(true);

    const token = Cookies.get("token");
    const parseToken = JSON.parse(token) || {};
    const fetchCategoryData = async () => {
      const response = await fetch(
        `${API_BASE_URL}/category/getAllCategory?search=${productCategorySearch}`,
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
        
        setCategoryList(data.data);
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
    };
    fetchCategoryData();
  }, []);

  //For FileChange
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    // Check if the selected file is a JPEG, JPG, or PNG
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png')) {
  
      setProductImage(file);
    } else {
      // alert('Please select a valid JPEG, JPG, or PNG file.');
      toast.error('Please select a valid JPEG, JPG, or PNG file.', {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
  
    }
  };
  //Update product data by id
  const updateProductCategoryById = (productItemId) => {
    // if (ProductName.trim() === "" || Description.trim() === "") {
    //   alert("Please fill required fields.");
    //   return;
    // }
    setIsLoading(true);
    const token = Cookies.get("token");
    const parseToken = JSON.parse(token) || {};
  //Here we check the id is object format or string format for Product category id
  let ProductCategoryId = "";
  if  (CategoryID.value) {
    ProductCategoryId = CategoryID.value;
  } else {
    ProductCategoryId = CategoryID._id;
  }
 // Here we check the id is object format or string format for supplier name id
 
  let supplierNameId = "";
  if ( SupplierID.value) {
    supplierNameId = SupplierID.value;
  } else {
    supplierNameId = SupplierID._id;
  }



    let productDetail = {
      ProductName: ProductName.trim() ? ProductName : undefined,
      image: image ? image : undefined,
      Description: Description.trim() ? Description : undefined,
      //StockQuantity: StockQuantity.trim() ? StockQuantity : undefined,
      StockQuantity:
        StockQuantity !== undefined &&
        StockQuantity !== null &&
        StockQuantity !== 0
          ? StockQuantity
          : undefined,
      sellingPrice:
        sellingPrice !== undefined &&
        sellingPrice !== null &&
        sellingPrice !== 0
          ? sellingPrice
          : undefined,
      costPrice:
        costPrice !== undefined && costPrice !== null && costPrice !== 0
          ? costPrice
          : undefined,
      // sellingPrice: sellingPrice.trim() ? sellingPrice : undefined,
      // costPrice: costPrice.trim() ? costPrice : undefined,
      // dimension:
      //   dimension !== undefined && dimension !== null && dimension !== 0
      //     ? dimension
      //     : undefined,
      //dimension: dimension.trim() ? dimension : undefined,
      // weight:
      //   weight !== undefined && weight !== null && weight !== 0
      //     ? weight
      //     : undefined,
      //weight: weight.trim() ? weight : undefined,
      // warrentyPeriod:
      //   warrentyPeriod !== undefined &&
      //   warrentyPeriod !== null &&
      //   warrentyPeriod !== 0
      //     ? warrentyPeriod
      //     : undefined,
          
      ...(lengthProduct ? { length: lengthProduct } : {}),
      ...(width ? { width: width } : {}),
      ...(height ? { height: height } : {}),
      ...(weight ? { weight: weight} : {}),
          ...(boardWarrent ? { boardWarrent: boardWarrent} : {}),
      ...(smpsWarrent ? { smpsWarrent: smpsWarrent} : {}),
      ...(timerWarrenty ? { timerWarrenty: timerWarrenty} : {}),
      ...(ledModuleWarrenty ? { ledModuleWarrenty: ledModuleWarrenty} : {}),
      //warrentyPeriod: warrentyPeriod.trim() ? warrentyPeriod : undefined,
     CategoryID: ProductCategoryId.trim()  ? ProductCategoryId : undefined,
      //CategoryID: CategoryID?.value.trim() || CategoryID?._id.trim() ?CategoryID?.value || CategoryID?._id : undefined ,
      SupplierID: supplierNameId.trim() ? supplierNameId : undefined,
      //SupplierID: SupplierID?.value.trim() || SupplierID?._id.trim() ? SupplierID?.value || SupplierID?._id : undefined
    };

    // Filter out undefined values from the object
    productDetail = Object.fromEntries(
      Object.entries(productDetail).filter(([_, v]) => v !== undefined)
    );
     
    const fetchData = async () => {
     
      const formData = new FormData();
      formData.append("ProductName", productDetail.ProductName);
      formData.append("costPrice", productDetail.costPrice);
      formData.append("sellingPrice", productDetail.sellingPrice);
      formData.append("StockQuantity", productDetail.StockQuantity);
      
      formData.append("image", image);
      formData.append("Description", productDetail.Description);
      formData.append("length", lengthProduct);
      formData.append("width", width);
      formData.append("height", height);
      formData.append("weight", weight);
      if(productDetail.boardWarrent){
        formData.append("boardWarrent", productDetail.boardWarrent);
      }
      if(productDetail.smpsWarrent){
        formData.append("smpsWarrent", productDetail.smpsWarrent);
      }
      if(productDetail.timerWarrenty){
        formData.append("timerWarrenty", productDetail.timerWarrenty);
      }
      if(productDetail.ledModuleWarrenty){
        formData.append("ledModuleWarrenty", productDetail.ledModuleWarrenty);
      }
      // formData.append("dimension", productDetail.dimension);
      // formData.append("weight", productDetail.weight);
      // formData.append("warrentyPeriod", productDetail.warrentyPeriod);
      formData.append("CategoryID", productDetail.CategoryID);
      formData.append("SupplierID", productDetail.SupplierID);
      const response = await fetch(
        `${API_BASE_URL}/product/updateProduct/${productItemId}`,
        {
          method: "PUT",
          // headers: {
          //   "Content-Type": "application/json"        },
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${parseToken}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
       
        
        toast.success("Update successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        router.push("/product");
        setIsLoading(false);
        // setIsModalOpen(true);
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
  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/product");
  };
  const handleModalSubmit = () => {
    setIsModalOpen(false);
    router.push("/product-warehouse");
  };

  // Function to handle canceling the modal
  const handleModalCancel = () => {
    setIsModalOpen(false);
    router.push("/product");
  };


  //It is used for get the value when change the value in dropdown list
  const handleInputChangeCategory = (inputValue) => {
    // Implement searching logic here if needed
    
    setProductCategorySearch(inputValue);
    
  };
  const handleInputChangeSupplier = (inputValue) => {
    // Implement searching logic here if needed
    
    setsupplierSearch(inputValue);
  };
  const handleCategoryChange=(userData)=>{
    
    setDefaultCategoryName(userData)
    setProductCategory(userData)
  }

  const handleSupplierChange=(userData)=>{
    
    setDefaultSupplierName(userData)
    setSupplierName(userData)
  }
  return (
    <Section>
      {isLoading && <Spinner />}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        heading="Do you want to add warehouse and quantity"
        positiveText="Confirm"
        onSubmit={handleModalSubmit}
        onCancel={handleModalCancel}
      />
      <div className="donarPage w-100">
        <ToastContainer position="top-right" autoClose={5000} />

        <div className="addDonarForm">
          <h2 className={`${styles.formHeaderext}`}>
            Update the Product Details
          </h2>
          <div >
          {typeof image=="object" ? (<img className={`${styles.productImage}`} src={URL.createObjectURL(image)}  alt=""/>): (<img className={`${styles.productImage}`} src={(image)}  alt=""/>)}
        </div>
          <form >
            <div className="formMainDiv">
              <div className="label-form eventInp">
                <label htmlFor="name" className="required">Product Name</label>
                <br />
                <input
                  type="text"
                  id="name"
                  value={ProductName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="label-form eventInp">
                <label htmlFor="img" className="required">Product Image</label>
                <br />
                <input
                  type="file"
                  id="img"
                 // name="image"
                  //value={image}
                  ref={fileInputRef}
                  accept=".jpg, .jpeg, .png"
                  onChange={handleFileChange}
                />
              </div>
              {/* <div className="label-form eventInp">
              <label htmlFor="category">Product Category</label>
              <br />
              <select name="category" 
                onChange={(e) =>setProductCategory(e.target.value)}>
                  <option value={CategoryID._id}>{CategoryID.CategoryName}</option>
                   {categoryList.map(val=><option key={val._id} value={val._id}>{val.CategoryName}</option>) }

                </select>
                
              
            </div> */}

              <div className="label-form eventInp">
                <label htmlFor="category" className="required">Product Category</label>
                <br />

                <Select
                  // name="customerid"
                  options={categoryList.map((element) => ({
                    value: element._id,
                    label: element.CategoryName,
                  }))}
              placeholder="Select One"
                
                  onChange={handleCategoryChange}
                  onInputChange={handleInputChangeCategory}
                  value={defaultCategoryName}
                  
                  //isSearchable
                />
              </div>

              {/* <div className="label-form eventInp">
              <label htmlFor="supplier">Supplier Name</label>
              <br />
              <select name="supplier" 
                onChange={(e) =>setSupplierName(e.target.value)}>
                  <option value={SupplierID._id}>{SupplierID.SupplierName}</option>
                   {supplierList.map(val=><option key={val._id} value={val._id}>{val.SupplierName}</option>) }

                </select>
              
            </div> */}

              <div className="label-form eventInp">
                <label htmlFor="supplier" className="required">Supplier Name</label>
                <br />

                <Select
                  // name="customerid"
                  options={supplierList.map((element) => ({
                    value: element._id,
                    label: element.SupplierName,
                  }))}
                  placeholder="Select One"
                 
                  onChange={handleSupplierChange}
                  onInputChange={handleInputChangeSupplier}
                  value={defaultSupplierName}
                  //isSearchable
                />
              </div>
              <div className="label-form eventInp">
                <label htmlFor="costprice" className="required">Cost Price</label>
                <br />
                <input
                  type="number"
                  id="price"
                  value={costPrice}
                  onChange={(e) => setProductCostPrice(e.target.value)}
                />
              </div>
              <div className="label-form eventInp">
                <label htmlFor="sellingPrice" className="required">Selling Price</label>
                <br />
                <input
                  type="number"
                  id="price"
                  value={sellingPrice}
                  onChange={(e) => setProductsellingPrice(e.target.value)}
                />
              </div>
              <div className="label-form eventInp">
                <label htmlFor="StockQuantity" className="required">Stock Quantity</label>
                <br />
                <input
                  type="number"
                  id="weight"
                  value={StockQuantity}
                  onChange={(e) => setProductStockQty(e.target.value)}
                />
              </div>

              <div className="label-form eventInp">
              <label htmlFor="BoardWarrent">Board Warranty</label>
              <br />
              <input
                type="number"
                id="BoardWarrent"
                value={boardWarrent}
                onChange={(e) => setBoardWarrent(e.target.value)}
              />
            </div>
            <div className="label-form eventInp">
              <label htmlFor="wty">SMPS Warranty</label>
              <br />
              <input
                type="number"
                id="wty"
                value={smpsWarrent}
                onChange={(e) => setSmpsWarrent(e.target.value)}
              />
            </div>
            <div className="label-form eventInp">
              <label htmlFor="wty">Timer Warranty</label>
              <br />
              <input
                type="number"
                id="wty"
                value={timerWarrenty}
                onChange={(e) => setTimerWarrenty(e.target.value)}
              />
            </div>
            <div className="label-form eventInp">
              <label htmlFor="wty">Led Module Warranty</label>
              <br />
              <input
                type="number"
                id="wty"
                value={ledModuleWarrenty}
                onChange={(e) => setLedModuleWarrenty(e.target.value)}
              />
            </div>
              <div className="label-form eventInp">
                <label htmlFor="weight">Weight</label>
                <br />
                <input
                  type="number"
                  id="weight"
                  value={weight}
                  onChange={(e) => setProductWeight(e.target.value)}
                />
              </div>
              <div className="label-form eventInp">
              <label htmlFor="dimension">Dimension</label>
              <br />
              <input
                  type="number"
                  id="dimension"
                  placeholder="Length"
                  value={lengthProduct}
                  onChange={(e) => setLength(e.target.value)}
                />
            </div>
            <div className="label-form eventInp">
            <label>&nbsp;</label>
            <input
                  type="number"
                  id="dimension"
                  placeholder="Width"
                  value={width}
                  onChange={(e) => setwidth(e.target.value)}
                />
            </div>
            <div className="label-form eventInp">
            <label>&nbsp;</label>
            <input
                  type="number"
                  id="dimension"
                  placeholder="Height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
            </div>

              <div className="label-form textAraeLabel">
                <label htmlFor="description" className="required">Product Detail</label>
                <br />
                <textarea
                  className="textareaEvent"
                  type="text"
                  id="description"
                  value={Description}
                  onChange={(e) => setProductDetail(e.target.value)}
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
                  onClick={() => updateProductCategoryById(productItemId)}
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

