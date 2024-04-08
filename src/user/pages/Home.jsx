import React, { useEffect, useState } from 'react'
import { get_user } from '../../api/Api'
import { base_url, get_products } from '../../Constant'

const Home = () => {
  const [data, setdata] = useState([])

  let getproducts = async () => {
    let res = await get_user(base_url, get_products)
    let filter = res.data.filter(item => item.available === true)
    setdata(filter)
  }
  useEffect(() => {
    getproducts()
  }, [])


  // Cart
  let handleCart = (ind) => {
    let Cart = data[ind];
    console.log(Cart);

  }
  return (
    <>
      <div className="row m-auto container col-md-12">
        {
          data.map((val, ind) => {
            return (
              <div className="col-md-3 mt-4">
                <div class="card" style={{ width: "18rem" }}>
                  <img class="card-img-top" src={val.productimage} alt="Card image cap" />
                  <div class="card-body">
                    <h5 class="card-title">{val.productname}</h5>
                    <p class="card-text">{val.desc}</p>
                    <a href="#" class="btn btn-primary" onClick={() => handleCart(ind)}>Add to Cart</a>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Home