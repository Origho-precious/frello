import Mongoose from "mongoose";

const { Schema, ObjectId } = Mongoose;

const categorySchema = Schema(
	{
		title: { type: String, required: true },
		list: { type: [String], required: false, default: [] },
	},
	{ timestamps: true }
);

const boardSchema = new Schema(
	{
		createdBy: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		members: {
			type: [ObjectId],
			required: false,
			ref: "User",
			default: [],
		},
		title: {
			type: String,
			required: true,
		},
		categories: {
			type: [categorySchema],
			required: false,
			default: [],
		},
	},
	{ timestamps: true }
);

const Board = Mongoose.model("Board", boardSchema);

export default Board;
