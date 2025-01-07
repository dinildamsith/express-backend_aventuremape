import mongoose from "mongoose";

// Define Guide Schema
const GuideSchema = new mongoose.Schema({
    accEmail: { type: String, required: true, unique: true },
    accUserName: { type: String, required: true },
    accPassword: { type: String, required: true },
    accType: { type: String, required: true },
    guideCode: { type: String, required: false },
    guideImage: { type: String },
    guideName: { type: String },
    guideAbout: { type: String },
    guideAge: { type: String },
    guidePrice: { type: String },
    guideStatus: {type: String},
    languages: [{ type: String }],

    // Reviews array
    reviews: [
        {
            reviewerName: { type: String, required: true },
            reviewerEmail: { type: String, required: true },
            reviewerImage: { type: String }, // URL or path to the reviewer's image
            reviewerComment: { type: String, required: true },
            reviewDate: { type: Date, default: Date.now }, // Optional: Store the date of the review
        }
    ],

    // Image gallery array
    imageGallery: [],

    // // Orders referencing the 'Order' model
    // orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

// Create Guide Model
const GuideModel = mongoose.model("Guide", GuideSchema);

export { GuideModel };

// import mongoose from "mongoose";
//
// // Define Guide Schema
// const GuideSchema = new mongoose.Schema({
//     accEmail: { type: String, required: true, unique: true },
//     accUserName: { type: String, required: true },
//     accPassword: { type: String, required: true },
//     accType: { type: String, required: true },
//     guideCode: { type: String, required: false },
//     guideImage: { type: String },
//     guideName: { type: String },
//     guideAbout: { type: String },
//     guideAge: { type: String },
//     guidePrice: { type: String },
//     languages: { type: String },
//     orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
// });
//
// // Create Guide Model
// const GuideModel = mongoose.model("Guide", GuideSchema);
//
// export  {GuideModel}
