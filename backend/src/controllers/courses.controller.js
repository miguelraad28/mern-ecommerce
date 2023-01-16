const coursesController = {}
const Course = require("../models/Course")

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
coursesController.getCourses = async(req, res) => {
    res.json(await Course.find())
}
coursesController.getCourse = async(req, res) => {
    res.json(await Course.find(req.params.courseId))
}
coursesController.updateCourse = async(req, res) => {

}
coursesController.deleteCourse = async(req, res) => {

}
module.exports = coursesController