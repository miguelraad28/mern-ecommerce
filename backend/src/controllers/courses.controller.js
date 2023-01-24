const coursesController = {}
const Course = require("../models/Course")

coursesController.getCartDetail = async(req, res) => {
    const cart = req.headers["cart"].split(",")
    res.json(await Course.find({_id : cart}))
}
coursesController.getCourses = async(req, res) => {
    res.json(await Course.find())
}
coursesController.getCourse = async(req, res) => {
    res.json(await Course.findById(req.params.courseId))
}
coursesController.createCourse = async (req, res) => {
    const { name, description, category, price, offerPrice, priceUSD, offerPriceUSD, visibility, source } = req.body
    console.log(req)
    const newCourse = new Course({
        name,
        description,
        category,
        price,
        offerPrice,
        visibility,
        source
    })

    const savedCourse = await newCourse.save()
    res.json({...savedCourse._doc})
}
coursesController.updateCourse = async(req, res) => {

}
coursesController.deleteCourse = async(req, res) => {

}
module.exports = coursesController