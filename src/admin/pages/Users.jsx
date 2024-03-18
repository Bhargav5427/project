import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Form from '../body/Form'
import Table from '../body/Table'
import { base_url, get_users } from '../../Constant'

const Users = () => {

  const [data, setdata] = useState([])

  // Get all users data from the server and store it in the state.
  let getUsersData = async () => {
    let res = await axios.get(base_url + get_users);
    setdata(res.data)
  }
  useEffect(() => {
    getUsersData()
  })


  return (
    <>
      <div className="container row mt-5 col-12 mr-auto ml-auto w-75">
        <div className="col-md-4">
          <Form />
        </div>
        <div className="col-md-8">
          <Table data={data} />
        </div>
      </div>
    </>
  )
}

export default Users