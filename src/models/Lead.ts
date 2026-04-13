import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  submissions: string;
  repo: string;
  challenges?: string;
  createdAt: Date;
}

const LeadSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  organization: { type: String, required: true },
  submissions: { type: String, default: 'Not specified' },
  repo: { type: String, default: 'Not specified' },
  challenges: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const Lead = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
export default Lead;
