// import { useEffect, useRef, useState } from "react";
// import Table from "react-bootstrap/Table";
// import Pagination from "react-js-pagination";
// import { GiExpense } from "react-icons/gi";
// import { GiProfit } from "react-icons/gi";
// import { BsFillCartCheckFill, BsFillPersonPlusFill } from "react-icons/bs";
// import HeaderSection from "@aio/components/HeaderSection";
// import Section from "@aio/components/Section";
// import { API_BASE_URL } from "../../../utils/config";
// import Spinner from "../../components/Spinner";
import React from "react";
import styles from "src/Pages/dashboard/Home.module.css"
import { MdDeleteForever, MdOutlinePayment, MdSell } from "react-icons/md";


export default function NegativeModal(prop) {
  const positiveValue=Math.abs(prop.number)
    return (
      <>
        <div className={styles.purchaseSell} id="profitloss">
          <div>
            <p className={styles.boxHead}>{prop.text}</p>
            <p className={styles.boxAmount}> {positiveValue}</p>
          </div>
          <div className={styles.iconContainer}>
            <MdSell className={styles.overviewIcon} />
          </div>
        </div>
      </>
    );
  }