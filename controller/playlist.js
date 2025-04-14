const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;


const getAll = async(req, res) =>{
    // #swagger.tags = ["Playlist"]
    const result = await mongodb.getDatabase().db().collection("playlist").find();
    result.toArray().then((users) =>{
        res.setHeader("Content-type", "application/json");
        res.status(200).json(users);
    });
};


const getSingle = async (req, res) => {
    // #swagger.tags = ["Playlist"]
   try {
       const userId = new ObjectId(req.params.userId);
       const playlistId = new ObjectId(req.params.playlistId);
       const result = await mongodb.getDatabase().db().collection("playlist").find({ userId: userId, _id: playlistId });
       const product = await result.toArray();

       res.setHeader("Content-type", "application/json");
       res.status(200).json(product[0]);
   } catch (err) {
       res.status(500).json({ message: "An error occurred while fetching the product", error: err });
   }
};

const createPlaylist = async (req, res) => {
    // #swagger.tags = ["Playlist"]
   try {
       const userId = new ObjectId(req.params.userId);
       const product = {
           userId: userId,
           playlistName: req.body.playlistName
       };

       const response = await mongodb.getDatabase().db().collection("playlist").insertOne(product);

       if (response.acknowledged > 0) {
           res.status(204).send();
       } else {
           res.status(500).json(response.error || "Some error occurred while creating the product");
       }
   } catch (err) {
       res.status(500).json({ message: "An error occurred while creating the product", error: err });
   }
};


const updatePlaylist = async (req, res) => {
    // #swagger.tags = ["Playlist"]
   try {
       const userId = new ObjectId(req.params.userId);
       const playlistId = new ObjectId(req.params.playlistId);

       const updatedProduct = {
        playlistName: req.body.playlistName
       };

       // Use updateOne with $set to update specific fields while keeping _id unchanged
       const response = await mongodb.getDatabase().db().collection("playlist").updateOne(
           { userId: userId, _id: playlistId }, // Find product by sellerId and productId
           { $set: updatedProduct } // Update only specified fields
       );

       if (response.modifiedCount > 0) {
           res.status(204).send();
       } else {
           res.status(400).json({ message: "No changes made or product not found." });
       }
   } catch (err) {
       res.status(500).json({ message: "An error occurred while updating the product", error: err });
   }
};

const deletePlaylist = async (req, res) => {
    // #swagger.tags = ["Playlist"]
   try {

       const userId = new ObjectId(req.params.userId);
       const playlistId = new ObjectId(req.params.playlistId);

       const response = await mongodb.getDatabase().db().collection("playlist").deleteOne({ userId: userId, _id: playlistId });

       if (response.deletedCount > 0) {
           res.status(204).send();
       } else {
           res.status(500).json(response.error || "An error occurred while deleting the product");
       }
   } catch (err) {
       res.status(500).json({ message: "An error occurred while deleting the product", error: err });
   }
};

module.exports = {
    getAll,
    getSingle,
    createPlaylist,
    updatePlaylist,
    deletePlaylist
}