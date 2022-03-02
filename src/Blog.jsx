import React from "react";
import { Outlet } from "react-router-dom";
import { BoxLoading, CircleToBlockLoading } from 'react-loadingg';

function Blog() {
  return (
    <div className="home">
      <div className="container">
        <h1 className="text-center mt-5">Blog page</h1>
        <Outlet />
      </div>
      <div class="mt-2 col-md-12">
        <BoxLoading />;
      </div>
      <div class="mt-2 col-md-15">
        <CircleToBlockLoading />;
      </div>
    </div>
  );
}

export default Blog;