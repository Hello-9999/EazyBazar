import React, { useEffect, useState } from "react";
import NavBar from "../../Component/Navbar/Navbar";
import Bar from "../../Component/Navbar/Navbar";
import axios from "axios";
import { Getdata } from "../../services/axios.services";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";

const Home = () => {
  const [Product, setProduct] = useState([]);

  // const response =
  const Jwt = useSelector((state) => state.login.Jwt);
  console.log(Jwt);

  const ProductData = async () => {
    const response = await Getdata(`product`, `${Jwt}`);
    setProduct(response.data.data.results);
    // console.log(response.data.data.results)
    return response;
  };

  useEffect(() => {
    ProductData();
  }, []);
  return (
    <>
      <div>
        <Bar />
        {Product.map((products) => {
          console.log(products);
          return (
            <>
              <div className="container">
                <Card>
                  <Card.Header>
                    <Card.Title >
                      <Card.Img src={products.productImage} />
                    </Card.Title>
                   
                  </Card.Header>
                  <Card.Body>
                    <Card.Title style={{textAlign:'center'}}>{products.name}</Card.Title>
                     <Card.Text style={{display:'flex'}}><p>Category : </p> <h4> { products.category}</h4> </Card.Text>
                     <Card.Body>{products.description}</Card.Body>

                     <Card.Text  style={{textAlign:'center'}}><h3>RS : {products.price}</h3> </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Home;