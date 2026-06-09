import React from "react";

const One = async ({ params }) => {
  let { id } = await params;

  return (
    <div>
      <h1>This is fro id {id}</h1>
    </div>
  );
};

export default One;
