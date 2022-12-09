import mongoose from "mongoose";

const myDatabase = async (mongooseUrl) => {
  //   console.log("my database");
  mongoose
    .connect(mongooseUrl)
    .then((e) => console.log(">> mongoose connected >>"))
    .catch((e) => console.log("&& mongoose not connected &&"));
};
export default myDatabase;
