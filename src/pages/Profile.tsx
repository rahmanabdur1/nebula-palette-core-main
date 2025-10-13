import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User,
  Edit,
  Save,
  X,
  Calendar,
  Shield,
  Wallet,
  Camera,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react";

interface FormData {
  username: string;
  joinDate: string;
  membershipLevel: string;
  walletAddress: string;
  userImage: string;
}

export default function AccountInfoCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "John Doe",
    joinDate: "01 Jan 2023",
    membershipLevel: "Gold Member",
    walletAddress: "0x5f...e29a",
    userImage: "/logo.png",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "userImage" && files && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setFormData((prev) => ({ ...prev, userImage: imageUrl }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved data:", formData);
  };

  return (
    <div className="glass-card rounded-xl border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 via-green-400/5 to-emerald-500/10 shadow-xl relative overflow-hidden p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-4xl mx-auto">
      {/* Avatar + Username + Socials */}
      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20 flex-wrap justify-between relative">
        <div className="flex items-center gap-4 relative">
          <div className="relative">
            {formData.userImage ? (
              <img
                src={formData.userImage}
                alt="User Avatar"
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border-2 border-green-500 shadow-md"
              />
            ) : (
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                <User className="h-8 w-8 text-white" />
              </div>
            )}

            {/* Camera Icon */}
            {isEditing && (
              <label
                htmlFor="userImage"
                className="absolute bottom-0 right-0 bg-green-500 text-white p-1.5 rounded-full cursor-pointer shadow-md hover:bg-green-600 transition h-7 w-7 flex items-center justify-center"
              >
                <Camera className="h-4 w-4" />
                <input
                  type="file"
                  id="userImage"
                  name="userImage"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            )}

            {/* Edit Button */}
            {!isEditing && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="absolute top-0 right-0 h-7 w-7 p-0 flex items-center justify-center border-green-500/50 text-green-600 hover:bg-green-500/10 hover:border-green-500/70"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="flex-1 min-w-[180px]">
            <div className="text-sm text-muted-foreground">Username</div>
            {isEditing ? (
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="text-base font-semibold border-green-500/30 focus:border-green-500 focus:ring-green-500/20"
              />
            ) : (
              <div className="text-lg sm:text-xl font-bold text-foreground">
                {formData.username}
              </div>
            )}
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-wrap sm:flex-row gap-3 sm:gap-5 items-center">
          {/* Telegram */}
          <a
            href="
https://t.me/futureprospace_officialchannel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 240 240"
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="currentColor"
            >
              <path d="M120 0C53.73 0 0 53.73 0 120s53.73 120 120 120 120-53.73 120-120S186.27 0 120 0zm56.09 83.2l-18.88 88.98c-1.44 6.48-5.25 8.1-10.64 5.04l-29.44-21.7-14.2 13.66c-1.56 1.56-2.88 2.88-5.88 2.88l2.1-29.6 53.81-48.64c2.34-2.1-.51-3.3-3.63-1.2l-66.54 41.82-28.6-8.94c-6.2-1.92-6.3-6.2 1.28-9.18l111.4-42.96c5.2-1.92 9.8 1.28 8.3 9.44z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/username"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 transition"
          >
            <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>

          {/* Twitter */}
          <a
            href="https://twitter.com/username"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 transition"
          >
            <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/junayedahmedniloy0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-800 transition"
          >
            <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2  gap-4 mt-6">
        {/* Member Since */}
        <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="h-5 w-5 text-green-500" />
            <span className="text-sm text-muted-foreground">Member Since</span>
          </div>
          {isEditing ? (
            <Input
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
              className="text-sm font-mono border-green-500/30 focus:border-green-500 focus:ring-green-500/20"
            />
          ) : (
            <div className="text-sm font-mono text-green-400 bg-black/20 px-2 py-1 rounded border border-green-500/10">
              {formData.joinDate}
            </div>
          )}
        </div>

        {/* Wallet Address */}
        <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-1">
            <Wallet className="h-5 w-5 text-green-500" />
            <span className="text-sm text-muted-foreground">
              Wallet Address
            </span>
          </div>
          {isEditing ? (
            <Input
              name="walletAddress"
              value={formData.walletAddress}
              onChange={handleChange}
              className="font-mono text-sm border-green-500/30 focus:border-green-500 focus:ring-green-500/20"
            />
          ) : (
            <div className="text-sm font-mono text-green-400 bg-black/20 px-2 py-1 rounded border border-green-500/10">
              {formData.walletAddress}
            </div>
          )}
        </div>

        {/* User ID */}
        <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-1">
            <User className="h-5 w-5 text-green-500" />
            <span className="text-sm text-muted-foreground">User ID</span>
          </div>
          <div className="text-sm font-mono text-green-400 bg-black/20 px-2 py-1 rounded border border-green-500/10">
            1856131324
          </div>
        </div>

        {/* Ref By */}
        <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-1">
            <User className="h-5 w-5 text-green-500" />
            <span className="text-sm text-muted-foreground">Ref By</span>
          </div>
          <div className="text-sm font-mono text-green-400 bg-black/20 px-2 py-1 rounded border border-green-500/10">
            4194951871
          </div>
        </div>
      </div>

      {/* Save/Cancel Buttons */}
      {isEditing && (
        <div className="flex justify-end gap-2 mt-4">
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 h-9 sm:h-10 px-4 text-sm shadow-md"
          >
            <Save className="h-4 w-4 mr-1" /> Save
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsEditing(false)}
            className="border-green-500/50 text-green-600 hover:bg-green-500/10 hover:border-green-500/70 h-9 sm:h-10 px-4 text-sm"
          >
            <X className="h-4 w-4 mr-1" /> Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
