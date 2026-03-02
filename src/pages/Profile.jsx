import { FiUser, FiLock, FiEdit2 } from "react-icons/fi";
import ProfileForm from "../components/Dashboard/Profile/ProfileForm";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import ProfileButton from "../components/Dashboard/Profile/ProfileButton";
import PasswordChangeForm from "../components/Dashboard/Profile/PasswordChangeForm";
import SectionHeader from "../components/ui/SectionHeader";
import { useToast } from "../components/ui/Toast";

const Profile = () => {
  const { user, updateUserProfile, changePassword } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm(user);

  useEffect(() => {
    Object.keys(user).forEach((key) => setValue(key, user[key]));
  }, [setValue, user]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const profilePayload = {
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        address: data.address,
      };
      await updateUserProfile(profilePayload);
      toast.success("Profile updated successfully!");

      if (data.current_password && data.new_password) {
        await changePassword({
          current_password: data.current_password,
          new_password: data.new_password,
        });
        toast.success("Password changed successfully!");
      }
      setIsEditing(false);
    } catch (error) {
      toast.error(error?.message || "Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="section-container">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          title="Personal Information"
          description="Manage your personal information and account settings"
        />

        <div className="card-modern p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
              <FiUser className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-800">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-sm text-slate-500">{user?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <ProfileForm
              register={register}
              errors={errors}
              isEditing={isEditing}
            />
            <PasswordChangeForm
              register={register}
              errors={errors}
              isEditing={isEditing}
              watch={watch}
            />
            <ProfileButton
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              isLoading={isLoading}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
