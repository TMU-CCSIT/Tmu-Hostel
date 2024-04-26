
import mongoose, { Document } from 'mongoose';

export interface ICoordinator extends Document {

    college: string;
    course: string;
    programe: string;
}


const coordinatorSchema = new mongoose.Schema(
    {
        college: {
            type: String,
            required: true,
        },
        course: {
            type: String,
            required: true,
        },
        programe: [
            {
                type: String,
                required: true
            }
        ],
    },
    {
        timestamps: true
    }
);

const Coordinator = mongoose.models.Coordinator<ICoordinator> || mongoose.model('Coordinator', coordinatorSchema);
export default Coordinator;
