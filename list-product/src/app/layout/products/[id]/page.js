import React from "react";

const page = async ({ params }) => {
  let { id } = await params;

  return (
    <div>
      <h1>this is for id - {id}</h1>
    </div>
  );
};

export default page;
