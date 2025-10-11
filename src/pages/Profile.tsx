// import { useState, ChangeEvent } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   User,
//   Edit,
//   Save,
//   X,
//   Mail,
//   Phone,
//   Calendar,
//   Shield,
//   Wallet,
//   Camera,
// } from "lucide-react";

// // Define the form data type
// interface FormData {
//   username: string;
//   email: string;
//   phone: string;
//   joinDate: string;
//   membershipLevel: string;
//   walletAddress: string;
//   userImage: string;
// }

// export default function AccountInfoCard() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState<FormData>({
//     username: "John Doe",
//     email: "john@example.com",
//     phone: "+8801712345678",
//     joinDate: "01 Jan 2023",
//     membershipLevel: "Gold Member",
//     walletAddress: "0x5f...e29a",
//     userImage: "",
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value, files } = e.target;

//     // If the input is an image file
//     if (name === "userImage" && files && files[0]) {
//       const imageUrl = URL.createObjectURL(files[0]);
//       setFormData((prev) => ({ ...prev, userImage: imageUrl }));
//     } else {
//       // For all text fields
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     console.log("Saved data:", formData);
//   };

//   return (
//     <div className="glass-card rounded-xl border-2 border-success/30 bg-gradient-to-br from-success/10 via-primary/5 to-accent/10 shadow-xl relative overflow-hidden p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-4xl mx-auto">
//       {/* Decorative floating bars */}
//       <div className="absolute top-2 right-2 opacity-20">
//         <div className="flex gap-1 sm:gap-2 md:gap-3">
//           {[...Array(3)].map((_, i) => (
//             <div
//               key={i}
//               className="h-6 w-2 sm:h-8 sm:w-3 md:h-10 md:w-4 rounded-full animate-float"
//               style={{
//                 background: `linear-gradient(45deg, hsl(var(--success)), hsl(var(--primary)))`,
//                 animationDelay: `${i * 0.2}s`,
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl sm:text-2xl font-bold text-foreground">
//           Account Information
//         </h2>

//         {!isEditing ? (
//           <Button
//             onClick={() => setIsEditing(true)}
//             className="bg-gradient-to-r from-primary to-success hover:from-primary/80 hover:to-success/80 hover:shadow-lg transition-all border-0 text-white h-9 sm:h-10 px-3 sm:px-4 text-sm"
//           >
//             <Edit className="h-4 w-4 mr-2" />
//             Edit Profile
//           </Button>
//         ) : (
//           <div className="flex gap-2">
//             <Button
//               onClick={handleSave}
//               className="bg-success hover:bg-success/80 text-white border-0 h-9 sm:h-10 px-3 sm:px-4 text-sm"
//             >
//               <Save className="h-4 w-4 mr-1" />
//               Save
//             </Button>
//             <Button
//               variant="outline"
//               onClick={() => setIsEditing(false)}
//               className="border-red-500/50 text-red-400 hover:bg-red-500/10 h-9 sm:h-10 px-3 sm:px-4 text-sm"
//             >
//               <X className="h-4 w-4 mr-1" />
//               Cancel
//             </Button>
//           </div>
//         )}
//       </div>

//       <div className="space-y-6">
//         {/* Avatar + Username */}
//         <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-success/10 rounded-lg border border-success/20 flex-wrap">
//           <div className="relative">
//             {formData.userImage ? (
//               <img
//                 src={formData.userImage}
//                 alt="User Avatar"
//                 className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border-2 border-success shadow-md"
//               />
//             ) : (
//               <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-r from-primary to-success">
//                 <User className="h-8 w-8 text-white" />
//               </div>
//             )}

//             {isEditing && (
//               <label
//                 htmlFor="userImage"
//                 className="absolute bottom-0 right-0 bg-success text-white p-1.5 rounded-full cursor-pointer shadow-md hover:bg-success/80 transition h-7 w-7 flex items-center justify-center"
//               >
//                 <Camera className="h-4 w-4" />
//                 <input
//                   type="file"
//                   id="userImage"
//                   name="userImage"
//                   accept="image/*"
//                   onChange={handleChange}
//                   className="hidden"
//                 />
//               </label>
//             )}
//           </div>

//           <div className="flex-1 min-w-[180px]">
//             <div className="text-sm text-muted-foreground">Username</div>
//             {isEditing ? (
//               <Input
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="text-base font-semibold border-success/30 focus:border-success"
//               />
//             ) : (
//               <div className="text-lg sm:text-xl font-bold text-foreground">
//                 {formData.username}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Editable Fields */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {[
//             {
//               label: "Email",
//               name: "email",
//               icon: Mail,
//               color: "text-primary",
//               bgColor: "from-primary/10 to-primary/5",
//               borderColor: "border-primary/20",
//             },
//             {
//               label: "Phone",
//               name: "phone",
//               icon: Phone,
//               color: "text-success",
//               bgColor: "from-success/10 to-success/5",
//               borderColor: "border-success/20",
//             },
//             {
//               label: "Member Since",
//               name: "joinDate",
//               icon: Calendar,
//               color: "text-warning",
//               bgColor: "from-warning/10 to-warning/5",
//               borderColor: "border-warning/20",
//             },
//             {
//               label: "Membership Level",
//               name: "membershipLevel",
//               icon: Shield,
//               color: "text-accent",
//               bgColor: "from-accent/10 to-accent/5",
//               borderColor: "border-accent/20",
//             },
//           ].map(({ label, name, icon: Icon, color, bgColor, borderColor }) => (
//             <div
//               key={name}
//               className={`flex items-center gap-3 p-4 bg-gradient-to-r ${bgColor} rounded-lg border ${borderColor}`}
//             >
//               <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${color}`} />
//               <div className="flex-1">
//                 <div className="text-xs text-muted-foreground">{label}</div>
//                 {isEditing ? (
//                   <Input
//                     name={name as keyof FormData}
//                     value={formData[name as keyof FormData]}
//                     onChange={handleChange}
//                     className={`text-sm font-semibold ${borderColor} focus:${borderColor.replace(
//                       "/20",
//                       "/40"
//                     )}`}
//                   />
//                 ) : (
//                   <div className="text-sm font-semibold text-foreground">
//                     {formData[name as keyof FormData]}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Wallet Address */}
//         <div className="p-4 bg-gradient-to-r from-primary/10 to-success/10 rounded-lg border border-success/20">
//           <div className="flex items-center gap-3 mb-2">
//             <Wallet className="h-5 w-5 sm:h-6 sm:w-6 text-success" />
//             <div className="text-sm text-muted-foreground">Wallet Address</div>
//           </div>
//           {isEditing ? (
//             <Input
//               name="walletAddress"
//               value={formData.walletAddress}
//               onChange={handleChange}
//               className="font-mono text-sm border-success/30 focus:border-success"
//             />
//           ) : (
//             <div className="text-sm font-mono text-foreground break-all">
//               {formData.walletAddress}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

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
    <div className="glass-card rounded-xl border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 via-green-400/5 to-emerald-500/10 shadow-xl relative overflow-hidden p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-4xl mx-auto">
      {/* Decorative floating bars */}
      <div className="absolute top-2 right-2 opacity-20">
        <div className="flex gap-1 sm:gap-2 md:gap-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-6 w-2 sm:h-8 sm:w-3 md:h-10 md:w-4 rounded-full animate-float"
              style={{
                background: `linear-gradient(45deg, hsl(142, 76%, 36%), hsl(142, 70%, 45%))`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
          Account Information
        </h2>

        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:shadow-lg transition-all border-0 text-white h-9 sm:h-10 px-3 sm:px-4 text-sm shadow-md"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 h-9 sm:h-10 px-3 sm:px-4 text-sm shadow-md"
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="border-green-500/50 text-green-600 hover:bg-green-500/10 hover:border-green-500/70 h-9 sm:h-10 px-3 sm:px-4 text-sm"
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Avatar + Username */}
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20 flex-wrap">
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

        {/* Editable Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              label: "Email",
              name: "email",
              icon: Mail,
              color: "text-green-500",
              bgColor: "from-green-500/10 to-green-400/5",
              borderColor: "border-green-500/20",
            },
            {
              label: "Phone",
              name: "phone",
              icon: Phone,
              color: "text-green-600",
              bgColor: "from-green-600/10 to-green-500/5",
              borderColor: "border-green-600/20",
            },
            {
              label: "Member Since",
              name: "joinDate",
              icon: Calendar,
              color: "text-emerald-500",
              bgColor: "from-emerald-500/10 to-emerald-400/5",
              borderColor: "border-emerald-500/20",
            },
            {
              label: "Membership Level",
              name: "membershipLevel",
              icon: Shield,
              color: "text-teal-500",
              bgColor: "from-teal-500/10 to-teal-400/5",
              borderColor: "border-teal-500/20",
            },
          ].map(({ label, name, icon: Icon, color, bgColor, borderColor }) => (
            <div
              key={name}
              className={`flex items-center gap-3 p-4 bg-gradient-to-r ${bgColor} rounded-lg border ${borderColor} hover:shadow-md transition-shadow`}
            >
              <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${color}`} />
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">{label}</div>
                {isEditing ? (
                  <Input
                    name={name as keyof FormData}
                    value={formData[name as keyof FormData]}
                    onChange={handleChange}
                    className={`text-sm font-semibold ${borderColor} focus:${borderColor.replace(
                      "/20",
                      "/40"
                    )} focus:ring-${color.replace("text-", "")}/20`}
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
        <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <Wallet className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
            <div className="text-sm text-muted-foreground">Wallet Address</div>
          </div>
          {isEditing ? (
            <Input
              name="walletAddress"
              value={formData.walletAddress}
              onChange={handleChange}
              className="font-mono text-sm border-green-500/30 focus:border-green-500 focus:ring-green-500/20"
            />
          ) : (
            <div className="text-sm font-mono text-green-400 break-all bg-black/20 px-3 py-2 rounded border border-green-500/10">
              {formData.walletAddress}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
