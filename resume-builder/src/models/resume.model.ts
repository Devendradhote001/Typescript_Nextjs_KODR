import { IResume } from "@/types/resume.types";
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema<IResume>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user id is required"],
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    summary: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    jobRole: {
      type: String,
      default: "",
    },
    personalInfo: {
      type: {
        fullName: String,
        email: String,
        mobile: String,
        githubUrl: String,
        linkedUrl: String,
        portfolio: String,
      },
      default: {},
    },

    education: {
      type: [
        {
          institute: String,
          degree: String,
          startDate: Date,
          endDate: Date,
          marks: String,
        },
      ],
      default: [],
    },
    projects: {
      type: [
        {
          title: String,
          description: String,
          techStack: [String],
          githubLink: String,
          liveLink: String,
        },
      ],
    },
    workExperience: {
      type: [
        {
          company: String,
          designation: String,
          description: String,
          startDate: Date,
          endDate: Date,
        },
      ],
    },
    experienceLevel: Number,
    achievements: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const ResumeModel =
  mongoose.models.Resume || mongoose.model("Resume", resumeSchema);
export default ResumeModel;
