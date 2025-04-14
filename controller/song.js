const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async(req, res) =>{
    // #swagger.tags = ["Song"]
    const result = await mongodb.getDatabase().db().collection("song").find();
    result.toArray().then((users) =>{
        res.setHeader("Content-type", "application/json");
        res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
    // #swagger.tags = ["Song"]
   try {
       const playlistId = new ObjectId(req.params.playlistId);
       const songId = new ObjectId(req.params.songId);
       const result = await mongodb.getDatabase().db().collection("song").find({ playlistId: playlistId, _id: songId });
       const product = await result.toArray();

       res.setHeader("Content-type", "application/json");
       res.status(200).json(product[0]);
   } catch (err) {
       res.status(500).json({ message: "An error occurred while fetching the product", error: err });
   }
};


const createSong = async (req, res) => {
    // #swagger.tags = ["Song"]
   try {
       const playlistId = new ObjectId(req.params.playlistId);
       const product = {
           playlistId: playlistId,
           artist: req.body.artist,
           songTitle: req.body.songTitle
       };

       const response = await mongodb.getDatabase().db().collection("song").insertOne(product);

       if (response.acknowledged > 0) {
           res.status(204).send();
       } else {
           res.status(500).json(response.error || "Some error occurred while creating the product");
       }
   } catch (err) {
       res.status(500).json({ message: "An error occurred while creating the product", error: err });
   }
};

const updatesong = async (req, res) => {
    // #swagger.tags = ["Song"]
   try {
       const playlistId = new ObjectId(req.params.playlistId);
       const songId = new ObjectId(req.params.songId);

       const updatedProduct = {
        artist: req.body.artist,
        songTitle: req.body.songTitle
       };

       // Use updateOne with $set to update specific fields while keeping _id unchanged
       const response = await mongodb.getDatabase().db().collection("song").updateOne(
           { playlistId: playlistId, _id: songId }, // Find product by sellerId and productId
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

const deletesong = async (req, res) => {
    // #swagger.tags = ["Song"]
   try {

       const playlistId = new ObjectId(req.params.playlistId);
       const songId = new ObjectId(req.params.songId);

       const response = await mongodb.getDatabase().db().collection("song").deleteOne({ playlistId: playlistId, _id: songId });

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
    createSong,
    getAll,
    getSingle,
    updatesong,
    deletesong
}