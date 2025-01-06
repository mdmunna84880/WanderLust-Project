const Listing = require("../models/listing");
let category;

module.exports.filter = async(req, res, next)=>{
     category = req.body;
     console.log(category);
}

module.exports.index = async (req, res, next)=>{
    let allListing;
    if(category){
        allListing = await Listing.find(category);
    }else{
        allListing = await Listing.find();
    }
    res.render("listings/index.ejs", {allListing});
};

module.exports.renderNew = (req, res)=>{
    res.render("listings/new");
}

module.exports.showListing = async (req, res, next)=>{
    let {id} = req.params;
    const listing =  await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
    if(!listing){
        req.flash("error", "Listing you request for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
}

module.exports.createNewListing = async (req, res)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url : url, filename: filename};
    await newListing.save();
    req.flash("success", "New Listings is created!");
    res.redirect("/listings");
}

module.exports.editListing = async (req, res, next)=>{
    let {id} = req.params;
    const listing =  await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you request for does not exist!");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_200,w_300")
    res.render("listings/edit.ejs", {listing, originalImageUrl});
}

module.exports.updateListing = async (req, res, next)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, req.body.listing);
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url : url, filename: filename};
        await listing.save();
    }
    req.flash("success", "The Listing is updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async(req, res, next)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing is deleted");
    res.redirect("/listings");
}

