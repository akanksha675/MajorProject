const Listing=require("../models/listing");

module.exports.index= async(req,res)=>{
  const allListings=  await Listing.find({});
  res.render("listings/index", { allListings }); 

};


module.exports.renderNewForm=async(req,res)=>{
    res.render("listings/new");
  }

module.exports.showListing=async(req,res)=>{
  let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",
      populate:{
        path: "author",
      },
    }).populate("owner");
    if(!listing){
      req.flash("error","Listing you requested for does ot exist!");
       return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show",{listing});
  };

  module.exports.createListing=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    
     const newListing= new Listing(req.body.listing);
     newListing.owner=req.user._id; 
       newListing.image = { url, filename };
     await newListing.save();
     req.flash("success","New Listing Created")
     res.redirect("/listings")
  };

  module.exports.editListing=async(req,res)=>{
    let {id}=req.params;
  const listing=await Listing.findById(id);
   if(!listing){
    req.flash("error","Listing you requested for does ot exist!");
     return res.redirect("/listings");
  }
  let originalImageUrl=listing.image.url;
  originalImageUrl=originalImageUrl.replace("/upload","/upload/ w_250");
  res.render("listings/edit",{listing,originalImageUrl});
}

module.exports.updateListing=async(req,res)=>{
  let {id}=req.params;
 let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});
 if( typeof req.file!="undefined"){
   let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
 }    
req.flash("success","Listing Updeted")
res.redirect(`/listings/${id}`);
}

module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","New Listing Deleted")
    res.redirect("/listings");

    
}