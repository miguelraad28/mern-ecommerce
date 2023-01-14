const Role = require("../models/Role")
const ProductCategory = require("../models/ProductCategory")

const create = async ()  => {
    try {
        const count = await ProductCategory.estimatedDocumentCount()
        if(count > 0) return;
        const values = await Promise.all([
            new ProductCategory({name: "tecnologia", tags: ["celulares", "telefonos", "computadoras", "pc", "notebooks", "netbooks", "monitores"]}).save(),
            new ProductCategory({name: "hogar", tags: ["cama", "sofa", "placares", "escritorios"]}).save()
        ])
        console.log(values)
    } catch (error) {
        console.log(error)
    }
}

module.exports = create