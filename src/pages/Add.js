import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [highlights, setHighlights] = useState("");
  const [benefits, setBenefits] = useState("");
  const [category, setCategory] = useState("Gel");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false); // State for button disable

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Disable button

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("highlights", highlights);
      formData.append("benefits", benefits);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("image", image);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setTitle("");
        setHighlights("");
        setBenefits("");
        setCategory("Gel");
        setImage(false);
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Re-enable button
    }
  };

  return (
    <Container>
      <Form onSubmit={onSubmitHandler} className="d-flex flex-column gap-3">
        <Form.Group>
          <Form.Label>Upload Image</Form.Label>
          <div className="d-flex gap-2">
            <label htmlFor="image" className="cursor-pointer">
              <img
                className="w-25"
                src={!image ? assets.upload_area : URL.createObjectURL(image)}
                alt="Upload"
              />
              <Form.Control
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Type here"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Product Highlights</Form.Label>
          <Form.Control
            onChange={(e) => setHighlights(e.target.value)}
            value={highlights}
            as="textarea"
            placeholder="Write content here"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Product Benefits</Form.Label>
          <Form.Control
            onChange={(e) => setBenefits(e.target.value)}
            value={benefits}
            as="textarea"
            placeholder="Write benefits of the product"
            required
          />
        </Form.Group>

        <Row className="g-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Product Category</Form.Label>
              <Form.Select onChange={(e) => setCategory(e.target.value)}>
              <option value="" disabled selected>-- Select Category --</option>
                <option value="Gel">Gel</option>
                <option value="Shampoo">Shampoo</option>
                <option value="Soap">Soap</option>
                <option value="Lipscrub">Lipscrub</option>
                <option value="Oil">Oil</option>
                <option value="Serum">Serum</option>
                <option value="Powder">Powder</option>

              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                type="number"
                placeholder="Price"
                className="disable-scroll"
              />
            </Form.Group>
          </Col>
        </Row>

        <Button
          className="mt-3"
          variant="dark"
          type="submit"
          disabled={loading} // Disable button when loading
        >
          {loading ? "Adding Product..." : "Add Product"}
        </Button>
      </Form>
    </Container>
  );
};

export default Add;
