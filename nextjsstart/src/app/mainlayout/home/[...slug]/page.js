import React from "react";

const page = async ({ params }) => {
  let { slug } = await params;

  console.log(slug);
  return (
    <div>
      <h1>Hey multiple params</h1>
    </div>
  );
};

export default page;
