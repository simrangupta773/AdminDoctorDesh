import React from 'react';
import { MDBDataTable } from 'mdbreact';

export  const DatatablePage = (props) => {
  return (
    <MDBDataTable
    scrollX
    
    //scrollY
    //autoWidth
    scrollCollapse
    entries={20}
    entriesOptions={[ 20, 30, 50 ]}
    striped
    bordered
    hover

    
    
    //small
    data={props.tabledata}

    />
  );
}
