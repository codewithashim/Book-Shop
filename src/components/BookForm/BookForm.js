import React, { createFactory, useContext, useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import "./bookform.css";
import {
  addDoc,
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import BlogForm from "../BlogForm/BlogForm";
import CartContext from "../../CartContext";
function BookForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [imageFiles, setImageFiles] = useState({}); // Update to an object for multiple files
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState(["Popular"]);
  const [activeTab, setActiveTab] = useState("book");
  const [selectedId, setSelectedId] = useState("");
  const [bookToUpdate, setBookToUpdate] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);

  const [discountPercentage, setDiscountPercentage] = useState("");
  const [coupons, setCoupons] = useState([
    { name: "", price: "", categories: [] },
  ]);

  const { allBooksData } = useContext(CartContext);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const docRef = doc(db, "categories", "category");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCategories(docSnap.data().categories);
    } else {
    }
  };

  function handleImageChange(e, key) {
    setImageFiles((prevState) => ({
      ...prevState,
      [key]: e.target.files[0],
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urls = await uploadImagesAndGetUrls();
    if (urls) {
      addData(urls);
    }
  };
  const uploadImagesAndGetUrls = async () => {
    const date = Date.now();
    const storage = getStorage();
    const promises = Object.entries(imageFiles).map(async ([key, file]) => {
      const mountainsRef = ref(storage, `images/${date}/${key}`);
      await uploadBytes(mountainsRef, file);
      return getDownloadURL(ref(storage, `images/${date}/${key}`));
    });

    try {
      const urls = await Promise.all(promises);
      return {
        url: urls[0],
        url1: urls[1],
        url2: urls[2],
        url3: urls[3],
      };
    } catch (error) {
      console.error("Error uploading images: ", error);
      return null;
    }
  };

  const addData = async (urls) => {
    setLoading(true);
    try {
      await addDoc(collection(db, "books"), {
        name: name,
        price: price,
        description: description,
        ...urls,
        features,
        category: category,
        discountPercentage: discountPercentage,
        quantity,
      });

      window.alert("Book Added");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setLoading(true);
  };

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }
  async function handleCategoryRemoval(category) {
    setLoading(true);
    const categoryDocRef = doc(db, "categories", "category");

    try {
      await updateDoc(categoryDocRef, {
        categories: arrayRemove(category),
      });
      console.log("Category removed successfully");
    } catch (error) {
      console.error("Error removing category: ", error);
    }

    const booksCollectionRef = collection(db, "books");
    const q = query(booksCollectionRef, where("category", "==", category));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      try {
        await deleteDoc(doc.ref);
        console.log("Book removed successfully");
      } catch (error) {
        console.error("Error removing book: ", error);
      }
    });
    window.alert("Category Removed");
    setLoading(false);
  }

  const handleBookRemoval = async () => {
    setLoading(true);
    const bookRef = doc(db, "books", selectedId);
    // await updateDoc(bookRef, {
    //   ...bookToUpdate,
    //   ...definedUrls,
    // });
    await deleteDoc(bookRef);
    window.alert("Book deleted successfully");
  };

  function handleNewCategory(e) {
    e.preventDefault();
    const newCategory = prompt("Enter a new category:");
    if (newCategory) {
      addCategoryToFirebase([...categories, newCategory]);
    }
  }

  const addCategoryToFirebase = async (data) => {
    setLoading(true);
    try {
      await setDoc(doc(db, "categories", "category"), {
        categories: data,
      });
      getCategories();
      window.alert("Category Added");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setLoading(false);
  };
  const addCoupon = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(coupons, ">>><<");
    try {
      await setDoc(doc(db, "coupon", "coupon"), {
        coupons: coupons,
      });
      getCategories();
      window.alert("Coupon Added");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);
  const fetchCoupons = async () => {
    try {
      const docRef = doc(db, "coupon", "coupon");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.coupons) {
          setCoupons(data.coupons);
        }
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching coupons: ", error);
    }
  };

  const removeCouponInput = (couponIndex) => {
    setCoupons((prevCoupons) =>
      prevCoupons.filter((_, index) => index !== couponIndex)
    );
  };

  const handleBookIdChange = (e) => {
    setSelectedId(e.target.value);

    // Reset the bookToUpdate state to the initial state with all fields
    setBookToUpdate({
      name: "",
      description: "",
      price: "",
      quantity: "",
      discountPercentage: "",
      features: "",
      url: "",
      url1: "",
      url2: "",
      url3: "",
    });

    const objectToFind = allBooksData.find(
      (object) => Object.keys(object)[0] === e.target.value
    );

    if (objectToFind) {
      const bookData = Object.values(objectToFind)[0];
      setBookToUpdate({
        name: bookData.name || "",
        description: bookData.description || "",
        price: bookData.price || "",
        quantity: bookData.quantity || "",
        discountPercentage: bookData.discountPercentage || "",
        features: bookData.features || "",
        url: bookData.url || "",
        url1: bookData.url1 || "",
        url2: bookData.url2 || "",
        url3: bookData.url3 || "",
      });
    }
  };
  const handleBookUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const urls = await uploadImagesAndGetUrls();
    if (urls) {
      const definedUrls = Object.fromEntries(
        Object.entries(urls).filter(([key, value]) => value !== undefined)
      );
      const bookRef = doc(db, "books", selectedId);
      await updateDoc(bookRef, {
        ...bookToUpdate,
        ...definedUrls,
      });
      window.alert("Book Updated");
    }
    setLoading(false);
  };

  const addCouponInput = () => {
    setCoupons([...coupons, { name: "", price: "", categories: [] }]);
  };

  const handleCheckboxChange = (event, couponIndex, category) => {
    const { checked } = event.target;

    setCoupons((prevCoupons) =>
      prevCoupons.map((coupon, index) => {
        if (index !== couponIndex) return coupon;

        if (checked) {
          return { ...coupon, categories: [...coupon.categories, category] };
        } else {
          return {
            ...coupon,
            categories: coupon.categories.filter((cat) => cat !== category),
          };
        }
      })
    );
  };

  const handleCouponChange = (value, couponIndex, field) => {
    setCoupons((prevCoupons) =>
      prevCoupons.map((coupon, index) => {
        if (index !== couponIndex) return coupon;

        return { ...coupon, [field]: value };
      })
    );
  };

  return (
    <div>
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "book" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("book");
          }}
        >
          Add Book
        </button>
        <button
          className={`tab-button ${activeTab === "blog" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("blog");
          }}
        >
          Add Blog
        </button>
        <button
          className={`tab-button ${activeTab === "updateBook" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("updateBook");
          }}
        >
          Update Book
        </button>
        <button
          className={`tab-button ${
            activeTab === "updateCoupon" ? "active" : ""
          }`}
          onClick={() => {
            setActiveTab("updateCoupon");
          }}
        >
          Update Coupon
        </button>
        <button
          className={`tab-button ${
            activeTab === "deleteCategory" ? "active" : ""
          }`}
          onClick={() => {
            setActiveTab("deleteCategory");
          }}
        >
          Delete Category
        </button>
        <button
          className={`tab-button ${activeTab === "deleteBook" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("deleteBook");
          }}
        >
          Delete Book
        </button>
        <button
          className={`tab-button ${activeTab === "inventory" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("inventory");
          }}
        >
          Inventory
        </button>
      </div>

      <div>
        {activeTab === "book" && (
          <div className="form-container">
            <div>Add Book</div>
            <form onSubmit={handleSubmit}>
              <label className="formlabel">
                Category:
                <select
                  className="forminput"
                  value={category}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
              <button
                className="forminput"
                type="button"
                onClick={handleNewCategory}
              >
                Add new category
              </button>

              <label className="formlabel">
                Name:
                <input
                  className="forminput"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="formlabel">
                Price:
                <input
                  className="forminput"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
              <label className="formlabel">
                Quantity
                <input
                  className="forminput"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </label>
              <label className="formlabel">
                Discount Percentage:
                <input
                  className="forminput"
                  type="number"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                />
              </label>
              <label className="formlabel">
                Description:
                <textarea
                  className="forminput"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <label className="formlabel">
                Features: (seperate by ";")
                <textarea
                  className="forminput"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                />
              </label>

              <label className="formlabel">
                Image 1:
                <input
                  className="forminput"
                  type="file"
                  onChange={(e) => handleImageChange(e, "image1")}
                />
              </label>
              <label className="formlabel">
                Image 2:
                <input
                  className="forminput"
                  type="file"
                  onChange={(e) => handleImageChange(e, "image2")}
                />
              </label>
              <label className="formlabel">
                Image 3:
                <input
                  className="forminput"
                  type="file"
                  onChange={(e) => handleImageChange(e, "image3")}
                />
              </label>
              <label className="formlabel">
                Image 4:
                <input
                  className="forminput"
                  type="file"
                  onChange={(e) => handleImageChange(e, "image4")}
                />
              </label>
              <button className="forminput" type="submit">
                Submit
              </button>
            </form>
          </div>
        )}

        {activeTab === "blog" && <BlogForm />}

        {activeTab === "updateBook" && (
          <div className="form-container">
            <div>Update Book</div>
            <form onSubmit={handleBookUpdate}>
              <label className="formlabel">
                Book:
                <select
                  className="forminput"
                  // value={bookIdToUpdate}
                  onChange={(e) => handleBookIdChange(e)}
                >
                  <option value="">Select a book to update</option>
                  {allBooksData.length &&
                    allBooksData.map((book) => {
                      return (
                        <option
                          key={Object.keys(book)[0]}
                          value={Object.keys(book)[0]}
                        >
                          {Object.values(book)[0].name}
                        </option>
                      );
                    })}
                </select>
              </label>
              <label className="formlabel">
                Name:
                <input
                  className="forminput"
                  type="text"
                  value={bookToUpdate.name}
                  onChange={(e) =>
                    setBookToUpdate({
                      ...bookToUpdate,
                      name: e.target.value,
                    })
                  }
                />
              </label>
              <label className="formlabel">
                Price:
                <input
                  className="forminput"
                  type="number"
                  value={bookToUpdate.price}
                  onChange={(e) =>
                    setBookToUpdate({
                      ...bookToUpdate,
                      price: e.target.value,
                    })
                  }
                />
              </label>
              <label className="formlabel">
                Quantity:
                <input
                  className="forminput"
                  type="number"
                  value={bookToUpdate.quantity}
                  onChange={(e) =>
                    setBookToUpdate({
                      ...bookToUpdate,
                      quantity: e.target.value,
                    })
                  }
                />
              </label>
              <label className="formlabel">
                Discount Percentage:
                <input
                  className="forminput"
                  type="number"
                  value={bookToUpdate?.discountPercentage}
                  onChange={(e) =>
                    setBookToUpdate({
                      ...bookToUpdate,
                      discountPercentage: e.target.value,
                    })
                  }
                />
              </label>
              <label className="formlabel">
                Description:
                <textarea
                  className="forminput"
                  value={bookToUpdate.description}
                  onChange={(e) =>
                    setBookToUpdate({
                      ...bookToUpdate,
                      description: e.target.value,
                    })
                  }
                />
              </label>
              <label className="formlabel">
                Features: (seperate by ";")
                <textarea
                  className="forminput"
                  value={bookToUpdate.features}
                  onChange={(e) =>
                    setBookToUpdate({
                      ...bookToUpdate,
                      features: e.target.value,
                    })
                  }
                />
              </label>

              <label className="formlabel">
                Image 1:
                <input
                  className="forminput"
                  type="file"
                  onChange={(e) => handleImageChange(e, "image1")}
                />
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    marginBottom: "1rem",
                  }}
                >
                  {bookToUpdate.url}
                </p>
              </label>
              <label className="formlabel">
                Image 2:
                <input
                  className="forminput"
                  type="file"
                  onChange={(e) => handleImageChange(e, "image2")}
                />
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    marginBottom: "1rem",
                  }}
                >
                  {bookToUpdate.url1}
                </p>
              </label>
              <label className="formlabel">
                Image 3:
                <input
                  className="forminput"
                  type="file"
                  onChange={(e) => handleImageChange(e, "image3")}
                />
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    marginBottom: "1rem",
                  }}
                >
                  {bookToUpdate.url1}
                </p>
              </label>
              <label className="formlabel">
                Image 4:
                <input
                  className="forminput"
                  type="file"
                  onChange={(e) => handleImageChange(e, "image4")}
                />
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    marginBottom: "1rem",
                  }}
                >
                  {bookToUpdate.url1}
                </p>
              </label>
              <button className="forminput" type="submit">
                Update
              </button>
            </form>
          </div>
        )}
        {activeTab === "updateCoupon" && (
          <div className="form-container">
            <div>Add Coupon</div>
            <form onSubmit={addCoupon}>
              {coupons.map((coupon, index) => (
                <div key={index}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <label style={{ marginBottom: "20px" }}>
                      Categories To Show Coupon In
                    </label>
                    {categories.map((category) => (
                      <div style={{ display: "flex", marginTop: "10px" }}>
                        <label style={{ width: "200px" }}>{category}</label>
                        <input
                          type="checkbox"
                          className="selectedCheckboxes"
                          value={category}
                          checked={coupon.categories.includes(category)}
                          onChange={(e) =>
                            handleCheckboxChange(e, index, category)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="formlabel">
                      Coupon Name:
                      <input
                        className="forminput"
                        type="text"
                        value={coupon.name}
                        onChange={(e) =>
                          handleCouponChange(e.target.value, index, "name")
                        }
                      />
                    </label>
                    <label className="formlabel">
                      Coupon Price Percentage
                      <input
                        className="forminput"
                        type="number"
                        value={coupon.price}
                        onChange={(e) =>
                          handleCouponChange(e.target.value, index, "price")
                        }
                      />
                    </label>
                    <label className="formlabel">
                      Custom Line:
                      <input
                        className="forminput"
                        type="text"
                        value={coupon.customLine}
                        onChange={(e) =>
                          handleCouponChange(
                            e.target.value,
                            index,
                            "customLine"
                          )
                        }
                      />
                    </label>
                  </div>
                  <button
                    className="forminput"
                    type="button"
                    onClick={() => removeCouponInput(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                className="forminput"
                type="button"
                onClick={addCouponInput}
              >
                Add More
              </button>
              <button className="forminput" type="submit">
                Update
              </button>
            </form>
          </div>
        )}
        {activeTab === "deleteCategory" && (
          <div style={{ height: "40vh" }} className="form-container">
            <div>Delete Category</div>
            <select
              className="forminput"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <p>
              Deleting a category will remove all the books from that category
            </p>
            <button
              style={{ marginTop: "20px" }}
              onClick={() => {
                if (category.length === 0) window.alert("Select a category");
                else {
                  handleCategoryRemoval(category);
                }
              }}
              className="forminput"
            >
              Delete
            </button>
          </div>
        )}
        {activeTab === "deleteBook" && (
          <div style={{ height: "40vh" }} className="form-container">
            <div>Delete Book</div>
            <select
              className="forminput"
              onChange={(e) => handleBookIdChange(e)}
            >
              <option value="">Select a book to update</option>
              {allBooksData.length &&
                allBooksData.map((book) => {
                  return (
                    <option
                      key={Object.keys(book)[0]}
                      value={Object.keys(book)[0]}
                    >
                      {Object.values(book)[0].name}
                    </option>
                  );
                })}
            </select>

            <button
              style={{ marginTop: "20px" }}
              onClick={() => {
                handleBookRemoval();
              }}
              className="forminput"
            >
              Delete
            </button>
          </div>
        )}
        {activeTab === "inventory" && (
          <div className="form-container">
            <div>Update Inventory</div>
            <form onSubmit={handleBookUpdate}>
              <label className="formlabel">
                Book:
                <select
                  className="forminput"
                  // value={bookIdToUpdate}
                  onChange={(e) => handleBookIdChange(e)}
                >
                  <option value="">Select a book to update</option>
                  {allBooksData.length &&
                    allBooksData.map((book) => {
                      return (
                        <option
                          key={Object.keys(book)[0]}
                          value={Object.keys(book)[0]}
                        >
                          {Object.values(book)[0].name} - Quantity{" "}
                          {Object.values(book)[0].quantity || "NIL"}
                        </option>
                      );
                    })}
                </select>
              </label>
              <label className="formlabel">
                Inventory Quantity:
                <input
                  className="forminput"
                  type="text"
                  value={bookToUpdate.quantity}
                  onChange={(e) =>
                    setBookToUpdate({
                      ...bookToUpdate,
                      quantity: e.target.value,
                    })
                  }
                />
              </label>

              <button className="forminput" type="submit">
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookForm;
