import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User,
  Edit,
  Save,
  X,
  Mail,
  Phone,
  Calendar,
  Shield,
  Wallet,
  Camera,
} from "lucide-react";

// Define the form data type
interface FormData {
  username: string;
  email: string;
  phone: string;
  joinDate: string;
  membershipLevel: string;
  walletAddress: string;
  userImage: string;
}

export default function AccountInfoCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "John Doe",
    email: "john@example.com",
    phone: "+8801712345678",
    joinDate: "01 Jan 2023",
    membershipLevel: "Gold Member",
    walletAddress: "0x5f...e29a",
    userImage: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    // If the input is an image file
    if (name === "userImage" && files && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setFormData((prev) => ({ ...prev, userImage: imageUrl }));
    } else {
      // For all text fields
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved data:", formData);
  };

  return (
    <div className="lg:col-span-2 glass-card rounded-xl p-5 sm:p-6 md:p-8 lg:p-10 border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-accent/5 shadow-xl mx-auto max-w-4xl w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
          Account Information
        </h2>

        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-primary to-success hover:shadow-lg transition-all"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              className="bg-success hover:bg-success/80 text-white"
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button variant="destructive" onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Avatar + Username */}
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20 flex-wrap">
          <div className="relative">
            {formData.userImage ? (
              <img
                src={formData.userImage}
                alt="User Avatar"
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border-2 border-primary shadow-md"
              />
            ) : (
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-primary">
                <User className="h-8 w-8 text-white" />
              </div>
            )}

            {isEditing && (
              <label
                htmlFor="userImage"
                className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full cursor-pointer shadow-md hover:bg-primary/80 transition"
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
          </div>

          <div className="flex-1 min-w-[180px]">
            <div className="text-sm text-muted-foreground">Username</div>
            {isEditing ? (
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="text-base font-semibold"
              />
            ) : (
              <div className="text-lg sm:text-xl font-bold text-foreground">
                {formData.username}
              </div>
            )}
          </div>
        </div>

        {/* Editable Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              label: "Email",
              name: "email",
              icon: Mail,
              color: "text-primary",
            },
            {
              label: "Phone",
              name: "phone",
              icon: Phone,
              color: "text-success",
            },
            {
              label: "Member Since",
              name: "joinDate",
              icon: Calendar,
              color: "text-warning",
            },
            {
              label: "Membership Level",
              name: "membershipLevel",
              icon: Shield,
              color: "text-accent",
            },
          ].map(({ label, name, icon: Icon, color }) => (
            <div
              key={name}
              className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg"
            >
              <Icon className={`h-6 w-6 ${color}`} />
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">{label}</div>
                {isEditing ? (
                  <Input
                    name={name as keyof FormData}
                    value={formData[name as keyof FormData]}
                    onChange={handleChange}
                    className="text-sm font-semibold"
                  />
                ) : (
                  <div className="text-sm font-semibold text-foreground">
                    {formData[name as keyof FormData]}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Wallet Address */}
        <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
          <div className="flex items-center gap-3 mb-2">
            <Wallet className="h-6 w-6 text-primary" />
            <div className="text-sm text-muted-foreground">Wallet Address</div>
          </div>
          {isEditing ? (
            <Input
              name="walletAddress"
              value={formData.walletAddress}
              onChange={handleChange}
              className="font-mono text-sm"
            />
          ) : (
            <div className="text-sm font-mono text-foreground break-all">
              {formData.walletAddress}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
