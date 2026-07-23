const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("../Major_Project1/models/listing.js");

app.set("view engine", "ejs");
app.set("views", path.join((__dirname, "views")));
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

app.get("/listings", async (req, res) => {
  const allList = await Listing.find();
  res.render("listings/index.ejs", { allList });
});

app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const singleList = await Listing.findById(id);
  res.render("listings/show.ejs", { singleList });
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
app.get("/", (req, res) => {
  res.send("Hi I'm root");
});
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
