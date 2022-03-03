import React from "react";
import { Outlet } from "react-router-dom";
import { BatteryLoading } from 'react-loadingg';

function Blog() {
  return (
    <div className="home">
      <div className="container">
        <h1 className="text-center mt-5">Blog page</h1>
        <Outlet />
      </div>
      <div class="mt-2 col-md-12">
        <BatteryLoading color='#ffffff'/>
      </div>
    </div>
  );
}

export default Blog;