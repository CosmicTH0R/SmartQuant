import bcrypt from 'bcryptjs';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import User from '../models/userSchema.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect current password' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const setup2FA = async (req, res) => {
  try {
    const secret = speakeasy.generateSecret({ name: 'YourAppName (2FA)' });
    const user = await User.findById(req.user.id);
    user.twoFASecret = secret.base32;
    await user.save();

    const qrCodeDataURL = await qrcode.toDataURL(secret.otpauth_url);
    res.status(200).json({ qrCodeDataURL });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verify2FA = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await User.findById(req.user.id);

    const verified = speakeasy.totp.verify({
      secret: user.twoFASecret,
      encoding: 'base32',
      token: code,
    });

    if (!verified) return res.status(400).json({ message: 'Invalid 2FA code' });

    user.is2FAEnabled = true;
    await user.save();

    res.status(200).json({ message: '2FA enabled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const disable2FA = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await User.findById(req.user.id);

    const verified = speakeasy.totp.verify({
      secret: user.twoFASecret,
      encoding: 'base32',
      token: code,
    });

    if (!verified) return res.status(400).json({ message: 'Invalid 2FA code' });

    user.is2FAEnabled = false;
    user.twoFASecret = undefined;
    await user.save();

    res.status(200).json({ message: '2FA disabled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signOutAllDevices = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.tokenVersion = (user.tokenVersion || 0) + 1;
    await user.save();
    res.status(200).json({ message: 'Signed out of all devices' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
