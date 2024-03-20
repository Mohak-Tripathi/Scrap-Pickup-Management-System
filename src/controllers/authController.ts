
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()


interface RegisterUserRequest {
    email: string;
    username: string;
    password: string;
}


interface LoginUserRequest {
    email: string;
    password: string;
}


interface UserProfileRequest  {
    email: string;
    username: string;
    password: string;
    first_name: string
    last_name: string
    avatar_id: string
    identity_proof: string
    userId: number
    addresses: any[]

}





// interface LoginUserRequest {
//   email: string;
//   password: string;
// }

// interface Params {
//   id: string; // Assuming the ID is a string, adjust the type accordingly
// }


// Register a user   => /api/v1/register
export const registerUser = async (req: Request<{}, {}, RegisterUserRequest>,
    res: Response,
    next: NextFunction) => {
    try {

        const { email, username, password } = req.body

        if (!email || !username || !password) {
            res.status(400).json({
                data: {},
                responseMessage: "please provide email, username or password",
                responseCode: 30001,
                errors: []
            });
        }

        //hash password before sending  through bcrypt npm package. 
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 5);


        const result = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword

            },
        })


        res.status(200).json({
            data: { result },
            responseMessage: "user is successfully registered",
            responseCode: 0,
            errors: []
        });


    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            data: {},
            responseMessage: "user registeration failed",
            responseCode: 30003,
            errors: [{ error }]
        });

    }
}



// login a user   => /api/v1/login

export const loginUser = async (req: Request<{}, {}, LoginUserRequest>,
    res: Response,
    next: NextFunction) => {
    try {
        const { email, password } = req.body;

        // Checks if email and password is entered by user
        if (!email || !password) {
            return res.status(400).json({
                data: {},
                responseMessage: "Please provide email and password.",
                responseCode: 30004,
                errors: []
            });
        }

        // Finding user in database
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                data: {},
                responseMessage: "Invalid Email or Password",
                responseCode: 30005,
                errors: []
            });
        }

        // Compare provided password with hashed password from the database
        const isPasswordMatched = await bcrypt.compare(password, user.password);

        // Check if passwords match
        if (!isPasswordMatched) {
            return res.status(401).json({
                data: {},
                responseMessage: "Invalid Email or Password",
                responseCode: 30006,
                errors: []
            });
        }

        // Passwords match, user is successfully logged in
        res.status(200).json({
            data: {},
            responseMessage: "User is successfully logged in.",
            responseCode: 30007,
            errors: []
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            data: {},
            responseMessage: "User login failed.",
            responseCode: 30008,
            errors: [{ error }]
        });
    }
}



export const userProfile = async (req: Request<{}, {}, UserProfileRequest>,
    res: Response,
    next: NextFunction) => {
    try {
        const { first_name, last_name, avatar_id, identity_proof, addresses } = req.body;

        if (!first_name || !last_name || !avatar_id || !identity_proof || !addresses) {
            return res.status(400).json({
                data: {},
                responseMessage: "Please provide complete user profile details.",
                responseCode: 30009,
                errors: []
            });
        }




        const userProfile = await prisma.userProfile.create({
            data: {
                first_name,
                last_name,
                avatar_id,
                identity_proof,
                userId: 4
            },
            // include: {
            //     addresses: true
            // }
        });



        const createdUsersAdress = await prisma.address.createMany({
            data: addresses as any[],
        });



        res.status(200).json({
            data: userProfile,
            responseMessage: "UserProfile is successfully updated.",
            responseCode: 300010,
            errors: []
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            data: {},
            responseMessage: "UserProfile updation failed.",
            responseCode: 300011,
            errors: [{ message: "An error occurred while updating user profile." }]
        });
    }
}




export const getAllUserProfile = async (req: Request<{}, {}, RegisterUserRequest>,
    res: Response,
    next: NextFunction) => {
    try {
        // Finding all user profiles in the database
        const allUserProfiles = await prisma.userProfile.findMany();

        // Check if user profiles exist
        if (!allUserProfiles || allUserProfiles.length === 0) {
            return res.status(404).json({
                data: {},
                responseMessage: "No user profiles found",
                responseCode: 30005,
                errors: []
            });
        }

        // Return the found user profiles
        res.status(200).json({
            data: allUserProfiles,
            responseMessage: "Successfully fetched all user profiles.",
            responseCode: 30007,
            errors: []
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            data: {},
            responseMessage: "Failed to fetch user profiles.",
            responseCode: 30008,
            errors: [{ message: "An error occurred while fetching user profiles." }]
        });
    }
}


//   }
// );

// Login User  =>  /api/v1/login
// export const loginUser = catchAsyncErrors(
//     async (
//         req: Request<{}, {}, LoginUserRequest>,
//         res: Response,
//         next: NextFunction
//     ): Promise<void> => {
//         const { email, password } = req.body;

//         // Checks if email and password is entered by user
//         if (!email || !password) {
//             return next(new ErrorHandler("Please enter email & password", 400));
//         }

//         // Finding user in database
//         const user: UserDocument = await User.findOne({ email }).select(
//             "+password"
//         ); //becz in model it is false.

//         if (!user) {
//             return next(new ErrorHandler("Invalid Email or Password", 401)); //401=> bad request
//         }

//         // Checks if password is correct or not
//         const isPasswordMatched: boolean = await user.comparePassword(password);

//         if (!isPasswordMatched) {
//             return next(new ErrorHandler("Invalid Email or Password", 401));
//         }

//         // const token= user.getJwtToken()

//         // res.status(201).json({   // before sendToken function
//         //     success: true,
//         //     token
//         // })

//         sendToken(user, 200, res); // SENDING WHOLE "res" object too in jwtToken.js
//     }
// );

