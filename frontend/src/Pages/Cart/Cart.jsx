import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import "../Cart/Cart.css";
import { CartQty, RemovefromCart, price } from "../../slice/Cartslice";
import { Link, useNavigate } from "react-router-dom";
import Signin from "../Signin/Signin";
import SigninModal from "./Modal";
import Bar from "../../Component/Navbar/Navbar";
import WestIcon from "@mui/icons-material/West";

const Cart = () => {
  const product = useSelector((state) => state.cart);
  const profile = useSelector((state) => state.login);
  const [Display, setDisplay] = useState(false);
  const [Hide, setHide] = useState(false);

  const [tax, settax] = useState(50);
  const dispatch = useDispatch();
  const [cartQty, setcartQty] = useState(0);
  const [productQty, setproductQty] = useState({});
  const [productPrice, setproductprice] = useState("");
  const navigate = useNavigate();

  const Totalqty = product.CartItem.reduce((total, next) => {
    return total + next.qty;
  }, 0);

  const Totalprice = product.CartItem.reduce((total, next) => {
    return total + next.price;
  }, 0);

  const Deletehandler = (e, id) => {
    e.preventDefault();
    dispatch(RemovefromCart(id));
  };

  const checkout = (e) => {
    e.preventDefault();

    if (profile.isLoggediin === true) {
      navigate("/shipping");
    } else {
      setDisplay(true);
      setHide(false);
    }
  };
  const Shopnow = (e) => {
    e.preventDefault();
    navigate("/shop");
  };
  const id = localStorage.getItem("id");
  return (
    <>
      <SigninModal Display={Display} Hide={Hide} setDisplay={setDisplay} />
      {/* <Bar /> */}

      {product.CartItem.length === 0 ? (
        <>
          <div
            className="notfound"
            style={{
              color: "aliceblue",
              backgroundColor: "#cacaca",
              height: "100vh",
            }}
          >
            <img
              src="https://o.remove.bg/downloads/2bbd3642-f63c-4f9f-b2a9-9d78f7581fc3/image-removebg-preview.png"
              alt=""
            />

            <h6> Your Cart is empty !!</h6>

            <Button variant="contained" onClick={Shopnow}>
              Shop Now{" "}
            </Button>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="cart" style={{ color: "aliceblue" }}>
            <Container className=" Cart-box ">
              <div className="link">
                <Link to={`/product/${id} `}>
                  <span>
                    {" "}
                    <WestIcon />{" "}
                  </span>{" "}
                  Go Back
                </Link>
              </div>

              <div
                className="d-flex pt-5 w-90"
                style={{
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Col className="col-8 " style={{}}>
                  <h1>{`Shopping Cart ( ${product.CartItem.length} item)`}</h1>

                  <div className="cart-box ">
                    {product.CartItem.map((cartI) => {
                      return (
                        <div
                          className="cart-item d-flex"
                          style={{
                            marginBottom: "5%",
                            alignItems: "center",
                            textAlign: "center",
                            // gap: "10%",
                            justifyContent: "space-between",
                          }}
                        >
                          <div className="col-3">
                            <img
                              src={cartI.productImage}
                              alt={cartI.productName}
                            />
                          </div>

                          <div
                            className="name-brand col-5"
                            style={{ textTransform: "capitalize" }}
                          >
                            <h5>{cartI.productName}</h5>
                            <p> {`  ${cartI.productBrand}`}</p>
                          </div>
                          <div className="col-1">
                            <select
                              onChange={(e) =>
                                setcartQty(Number(e.target.value))
                              }
                            >
                              {[...Array(cartI.productStock).keys()].map(
                                (Qty) => {
                                  return (
                                    <>
                                      {
                                        <option value={Qty + 1}>
                                          {Qty + 1}
                                        </option>
                                      }
                                    </>
                                  );
                                }
                              )}

                              <option value={cartI.qty} selected disabled>
                                {cartI.qty}
                              </option>
                            </select>
                          </div>

                          <div className="col-2">
                            <p className="price"> {`Rs: ${cartI.price}`}</p>
                          </div>
                          <div className="col-1">
                            <Button
                              variant="contained"
                              className="btn bg-danger"
                              style={{ color: "white" }}
                              onClick={(e) => Deletehandler(e, cartI.productId)}
                            >
                              <DeleteIcon />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Col>

                <>
                  <Col
                    className=" Summary col-4"
                    md={4}
                    // style={{ width: "30%" }}
                  >
                    <Col className="summary_box">
                      <div className="title">
                        {" "}
                        <h5>Order Summary</h5>
                      </div>

                      <Col
                        className="subtotal d-flex mt-5"
                        style={{
                          justifyContent: "space-between",
                          alignItems: "baseline",
                        }}
                      >
                        <h5>Subtotal </h5>

                        <p>{Totalprice * Totalqty}</p>
                      </Col>

                      <Col
                        className="tax d-flex"
                        style={{
                          justifyContent: "space-between",
                          alignItems: "baseline",
                        }}
                      >
                        <h5>Shipping + Tax </h5>

                        <p>{tax}</p>
                      </Col>

                      <div
                        className="coupon d-flex"
                        style={{
                          justifyContent: "space-between",
                          alignItems: "baseline",
                        }}
                      >
                        <h5>Coupon code </h5>

                        <p>
                          <Link> Add coupon code </Link>
                        </p>
                      </div>
                      <hr />

                      <div
                        className="total d-flex"
                        style={{
                          justifyContent: "space-between",
                          alignItems: "baseline",
                        }}
                      >
                        <h5>Total </h5>
                        <p> Rs {Totalprice * Totalqty + tax}</p>
                      </div>

                      <Button fullWidth onClick={checkout}>
                        CheckOut
                      </Button>
                    </Col>

                    <Col className="text-center mt-4 shopping">
                      <div>
                        <h5>or</h5> <Link to="/shop"> Continue Shopping </Link>
                      </div>
                    </Col>
                  </Col>
                </>
              </div>
            </Container>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
