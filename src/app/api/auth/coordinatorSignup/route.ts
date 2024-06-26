
import { string, z } from "zod";

import { NextRequest, NextResponse } from "next/server";

import Coordinator from "@/models/coordinator.model";

import { middleware } from "@/middleware";

import { createUserAndSetSession } from "@/action/userSignup";

interface CustomNextRequest extends NextRequest {

    user: string;
}



let coordinatorSchema = z.object({

    college: z.string(),
    branch: z.array(z.string()),
    programe: z.string(),

})




async function CoordinatorSignUp(coordinator: any) {

    try {


        try {

            coordinatorSchema.parse(coordinator);

        } catch (error: any) {

            console.log(error.message);

            throw new Error("validation error in coordinator");

        }


        const { college,branch, programe } = coordinator;

        console.log("data is ",college,branch,programe);


        //create the new entry in Db 

        const newUser = await Coordinator.create({
            
            college:college,
            branches:branch, 
            programe:programe,

        });

        // successfully return the resposne 

        return newUser;


    } catch (error: any) {


        console.log(error.message);

        return NextResponse
            .json(
                {
                    message: "some error occurred while creating a Coordinator",
                    error: error.message,
                    data: null,
                    success: false,
                }, {
                status: 500
            });

    }
}








export async function POST(req: NextRequest, res: NextResponse) {


    try {

        const body = await req.json();

        const { user, coordinator } = body;

        console.log(user,coordinator);

        // create the coordinator

        let newCoordinator;

        let newUser;


        try{


            const newCoordinator = await CoordinatorSignUp(coordinator);
    
            const newUser = await createUserAndSetSession(user, "kdj", newCoordinator._id);

            console.log(newCoordinator);

            console.log(newUser);


        }catch(error:any){

            return NextResponse.json({

                message:"Error creating coordinator",
                error:error.message,
                data:null,
                
            },{

                status:400
            })

        }

        return NextResponse.json({

            message: "coordinaotor created successfully",
            data: {

                newCoordinator,
                newUser,
            },
        },{

            status:200,
        })


    } catch (error: any) {

        console.log(error.message);

        return NextResponse.json({

            message: "coordinaotor created successfully",
            data:null,
            error:error.message,
            
        },{

            status:500,
        })

    }
}







export async function GET(req: CustomNextRequest, res: NextResponse) {

    try {

        // const { userId } = body;

        await middleware(req);

        let userId = req.user;

        if (!userId) {

            return NextResponse
                .json(
                    {
                        message: "user id is not provided  ",
                        error: "",
                        data: null,
                        success: false,
                    },
                    {
                        status: 401
                    }
                );
        }


        const coordinator = await Coordinator.findOne({ user: userId });

        if (!coordinator) {

            return NextResponse
                .json(
                    {
                        message: "no coordinator found with id '" + userId,
                        error: "",
                        data: null,
                        success: false,
                    },
                    {
                        status: 401
                    }
                );
        }

        return NextResponse
            .json(
                {
                    message: "Sucessfully find coordinator details  '" + userId,
                    error: "",
                    data: coordinator,
                    success: false,
                },
                {
                    status: 200
                }
            );

    } catch (error: any) {

        console.log(error.message);

        return NextResponse
            .json(
                {
                    message: "some error occurred while creating a Coordinator",
                    error: error.message,
                    data: null,
                    success: false,
                }, {
                status: 500
            });

    }
}



