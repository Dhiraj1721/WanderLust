const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("../Major_Project1/models/listing.js");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join((__dirname, "views")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then((res) => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
// Index route
app.get("/listings", async (req, res) => {
  const allList = await Listing.find();
  res.render("listings/index.ejs", { allList });
});
//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// show route to show single entity
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const singleList = await Listing.findById(id);
  res.render("listings/show.ejs", { singleList });
});

// create route
app.post("/listings", async (req, res) => {
  //let { title, description, image, price, location, country } = req.body;
  let newList = new Listing(req.body.listing);
  await newList.save();
  res.redirect("/listings");
});
// app.get("/testListing", async (req, res) => {
//   const testListing = new Listing({
//     title: "My new Home",
//     description: "Avaliable for rent",
//     price: 5000,
//     location: "Nagpur, Maharashtra",
//     country: "India",
//   });

//   await testListing.save();

//   console.log("data was saved");
//   res.send("Data saved in DB");
// });

//edit route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const singleList = await Listing.findById(id);
  res.render("listings/edit.ejs", { singleList });
});

// updated route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  console.log(req.body.listing);
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//delete route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deleteList = await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

app.get("/", (req, res) => {
  res.send("Hi I'm root");
});
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

// Important words of listing I used for different works

// 1) listings = It is my endpoint for route to perform crud operations on Listing file .
//2) listing = I used this is in ejs file to convert value into obj and access those value in app.js as a object
// It help me to reduce coding space and access object value in a single line

// 3)
