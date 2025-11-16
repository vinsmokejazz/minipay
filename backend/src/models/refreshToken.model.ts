import mongoose from "mongoose";

export interface IRefreshToken {
  userId: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
  isRevoked: boolean;
}

export interface RefreshTokenModel extends mongoose.Model<IRefreshToken> {
  revokeAllForUser(userId: string): Promise<any>;
}

const refreshTokenSchema = new mongoose.Schema<
  IRefreshToken,
  RefreshTokenModel
>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: "1d" },
    },
    isRevoked: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

refreshTokenSchema.index({ token: 1 });
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

refreshTokenSchema.statics.revokeAllForUser = async function (userId: string) {
  return this.updateMany({ userId }, { isRevoked: true });
};

export const RefreshToken = mongoose.model<IRefreshToken, RefreshTokenModel>(
  "RefreshToken",
  refreshTokenSchema
);
