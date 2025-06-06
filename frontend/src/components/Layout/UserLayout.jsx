import React from 'react'
import Header from '../Common/Header'
import Footer from "../Common/Footer"
import { Outlet } from "react-router-dom"

const UserLayout = () => {
  return (
    <>
      <Header />
      <main>
        {/* phần nội dung chính thay đổi theo từng trang – thì chỗ cần thay là <Outlet />. */}
        <Outlet /> 
      </main>
      <Footer />
    </>
  )
}

export default UserLayout
