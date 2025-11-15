import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema({
  employee: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Employee", 
    required: true 
  },

  evaluatedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "HR", 
    required: true 
  },

  period: { 
    type: String, 
    required: true 
  }, // example: "Q1 2025"

  objectives: [{
    title: { type: String, required: true },
    description: String,
    deadline: Date,
    status: { 
      type: String, 
      enum: ["In Progress", "Achieved", "Not Achieved"], 
      default: "In Progress" 
    }
  }],

  scores: [{
    criteria: { type: String, required: true },  
    score: { type: Number, min: 0, max: 10, required: true }
  }],

  overallRating: { type: Number, min: 0, max: 10 },

  feedback: { type: String },
  
}, { timestamps: true });

export default mongoose.model("Performance", performanceSchema);
