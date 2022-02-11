import jwt from 'jsonwebtoken'
import sha256 from 'sha256'


const LOGIN=async(req,res)=>{
    const {username,password} = req.body
    const [ loggedUser ] = await req.fetch(
        `select userid,role from users where
         username=$1 and password=$2`,username,sha256(password)
    )

    if(!loggedUser){
        res.status(400).json({message:"Password or username wrong"})
    }

    else{
        return res.json({
            status: 201,
            message: "The user successfully logged!",
            token: jwt.sign(
                loggedUser,
                process.env.SECRET_KEY
              )
        })
    }
}

const REGISTER = async (req, res) => {
	const {firstname,lastname,phone,bestCategory,password,role="user",username} = req.body
    
    try{
        const [ newUser ] = await req.fetch(`
            insert into users (
                firstname,
                lastname,
                phone,
                bestCategory,
                password,
                role,
                username
            ) values ($1, $2, $3,$4,$5,$6,$7)
            returning userid,role
        `, firstname, lastname, phone, bestCategory,sha256(password),role,username)


	return res.json({
		status: 201,
		message: "The user successfully registered!",
		token: jwt.sign(
            newUser,
            process.env.SECRET_KEY
        )
	})
}

    catch(error){
        res.status(400).json({message:error.message})
    }
}

export default{
    LOGIN,
    REGISTER
}