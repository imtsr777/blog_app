const registerValidator = (req,res,next) =>{
    const {firstname,lastname,password,phone,bestCategory} = req.body
    try{
        if(!firstname) throw new Error("Firstname must")
        if(!lastname) throw new Error("Last must")
        if(!phone) throw new Error("Phone must")
        if(!bestCategory) throw new Error("Category must")
        if(!password) throw new Error("Password must")

        if(typeof(firstname) !== 'string' || firstname.length>15 || firstname.length<3){
            throw new Error("Username must be string max length 14 min length 5")
        }

        if(typeof(lastname) !== 'string' || lastname.length>15 || lastname.length<3){
            throw new Error("Username must be string max length 14 min length 5")
        }
        
        if(!(/^[a-zA-Z0-9]{4,16}$/.test(password))){
            throw new Error("Password min len 4 max len 16")
        }
        if(!/^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/.test(phone)){
            throw new Error("Phone number error")   
        }
        if(typeof(bestCategory) !== 'string' || bestCategory.length>30 || bestCategory.length<3){
            throw new Error("Category must be min 3 max 30 length")
        }
    }

    catch(error){
        return res.status(400).json({message:error.message})
    }

    return next()
}

export default {
    registerValidator
}