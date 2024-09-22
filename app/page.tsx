import React from 'react'
import Marketplace from '../components/marketplace'
import ConnectWallet from "../components/connectwallet"





const page = () => {
  return (
    <div>
      <div className=''><ConnectWallet/> </div>
      <div>
      <Marketplace/>
      
    </div>
    </div>
    
  )
}


export default page

