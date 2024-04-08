import React, { useEffect, useRef, useState } from 'react'
import { base_url, get_products, post_products, post_users } from '../../Constant';
import { get_user, post_user } from '../../api/Api';
import { Switch } from "@mui/material";
import Producttable from '../body/Producttale';
import axios from 'axios';
import "../../../src/App.css"
import Swal from 'sweetalert2'
import EditIcon from '@mui/icons-material/Edit';

const Product = () => {
  const [product, setproduct] = useState([]);
  const [view, setview] = useState({});


  let productname = useRef();
  let price = useRef();
  let desc = useRef();


  let handlesubmit = async () => {
    const products = {
      productname: productname.current.value,
      productimage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVyEYbEPxZygtn68FkDs5lJ2RJGuKvmt0wCA&usqp=CAU",
      price: price.current.value,
      desc: desc.current.value,
      available: true,
    }
    let res = await post_user(base_url, post_products, products);
    if (res) {
      setproduct([...product, res.data]);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Product has been Added",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }



  let getproducts = async () => {
    const res = await get_user(base_url, get_products)
    setproduct(res.data)
  }



  let handleSwitch = async (id, available, index) => {
    console.log(available);

    let data = product[index];
    console.log(data);
    await axios.put(`http://localhost:3001/Products/${data.id}`, {
      ...data,
      available,
    });

    setproduct(
      product.map((val, ind) => (val.id === id ? { ...data, available } : val))
    );
  };


  let handledelete = async (id) => {
    let res = await axios.delete(`http://localhost:3001/Products/${id}`)
    setproduct(product.filter((item) => item.id !== id));

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Product Deleted",
      showConfirmButton: false,
      timer: 1100
    });
  }


  let handleupdate = (ind) => {
    let upadte = product[ind];
    setview(upadte)
  }

  let handleview = (e) => {
    setview({ ...view, [e.target.name]: e.target.value })
  }
  console.log(view);

  let updatedproduct = async () => {
    let updatedData = await axios.put(`http://localhost:3001/Products/${view.id}`, view)
    console.log(updatedData);

    setproduct(product.map((val, ind) => {
      if (val.id == updatedData.data.id) {
        return updatedData.data
      } else {
        return val
      }
    })
    )
  }

  useEffect(() => {
    getproducts();
  }, []);



  return (

    <>

      <div className="row col-12">
        <div className="col-4">
          <div class="card" style={{ width: "18rem" }}>
            <div class="card-body">

              <div class="form-group">
                <label for="productname">product name</label>
                <input type="productname" class="form-control" id="productname" aria-describedby="productname" placeholder="Enter product name" ref={productname}  />
              </div>
              <div class="form-group">
                <label for="price">price</label>
                <input type="price" class="form-control" id="price" aria-describedby="price" placeholder="Enter price" ref={price} />
              </div>
              <div class="form-group">
                <label for="desc">desc</label>
                <input type="desc" class="form-control" id="desc" aria-describedby="desc" placeholder="Enter description" ref={desc} />
              </div>
              <button type="submit" class="btn btn-primary" onClick={handlesubmit}>Submit</button>

            </div>
          </div>
        </div>



        <div className="col-8">
          <table class="table ">
            <thead class="thead-dark">
              <tr className='text-center'>
                <th scope="col">id</th>
                <th scope="col">product Image</th>
                <th scope="col">product Name</th>
                <th scope="col">price</th>
                <th scope="col">Description</th>
                <th scope="col">available</th>
                <th scope='col'>Delete</th>
                <th scope='col'>Edit</th>
              </tr>
            </thead>
            <tbody>
              {product?.map((val, ind) => {
                return (
                  <>
                    <tr className='text-center align-middle'>
                      <td >
                        <b>{val.id}</b>
                      </td>
                      <td>
                        <img src={val.productimage} width={60} height={60} />
                      </td>
                      <td>{val.productname}</td>
                      <td>{val.price}</td>
                      <td>{val.desc}</td>
                      <td><Switch
                        checked={val.available}
                        onChange={(e) =>
                          handleSwitch(val.id, e.target.checked, ind)
                        }
                      />
                      </td>
                      <td><button className='btn btn-danger' onClick={() => handledelete(val.id)}>Delete</button></td>
                      <td onClick={() => handleupdate(ind)} data-toggle="modal" data-target="#exampleModal"><EditIcon /></td>
                    </tr>
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>

                          <div class="modal-body">

                            <div class="card" style={{ width: "100%" }}>
                              <div class="card-body">

                                <div class="form-group">
                                  <label for="productname">product name</label>
                                  <input type="productname" class="form-control" id="productname" aria-describedby="productname" placeholder="Enter product name" name='productname' onChange={handleview} value={view.productname} />
                                </div>
                                <div class="form-group">
                                  <label for="price">price</label>
                                  <input type="price" class="form-control" id="price" aria-describedby="price" placeholder="Enter price" name='price' onChange={handleview} value={view.price} />
                                </div>
                                <div class="form-group">
                                  <label for="desc">desc</label>
                                  <input type="desc" class="form-control" id="desc" aria-describedby="desc" placeholder="Enter description" name='desc' onChange={handleview} value={view.desc} />
                                </div>

                              </div>

                            </div>

                          </div>

                          <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={updatedproduct}>Save changes</button>
                          </div>
                        </div>
                      </div>
                    </div></>
                );
              })}
            </tbody>
          </table>
          {/* <Producttable product={product} /> */}
        </div>
      </div>
    </>



  )
}

export default Product