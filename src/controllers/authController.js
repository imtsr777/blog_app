import jwt from 'jsonwebtoken'
import sha256 from 'sha256'
const LOGIN=(req,res)=>{
    res.send("LOGIN")
}

const REGISTER = async (req, res) => {
	const {firstname,lastname,phone,bestCategory,password,role="user"} = req.body
    
    try{
        const [ newUser ] = await req.fetch(`
            insert into users (
                firstname,
                lastname,
                phone,
                bestCategory,
                password,
                role
            ) values ($1, $2, $3,$4,$5,$6)
            returning userid,role
        `, firstname, lastname, phone, bestCategory,sha256(password),role)


	return res.json({
		status: 201,
		message: "The user successfully registered!",
		token: jwt.sign(
            newUser,
            process.env.SECRET_KEY,
            {
              expiresIn: "86400",
            }
          )
	})}
    
    catch(error){
        res.status(400).json({message:error.message})
    }
}

export default{
    LOGIN,
    REGISTER
}