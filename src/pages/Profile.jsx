import { FiUser, FiLock, FiEdit2 } from "react-icons/fi";
import ProfileForm from "../components/Dashboard/Profile/ProfileForm";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import ProfileButton from "../components/Dashboard/Profile/ProfileButton";
import PasswordChangeForm from "../components/Dashboard/Profile/PasswordChangeForm";

const Profile = () => {
  const { user, updateUserProfile, changePassword, errorMsg, successMsg } =
    useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      // profile update
      setIsLoading(true);
      const profilePayload = {
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        address: data.address,
      };
      await updateUserProfile(profilePayload);
      // change password
      if (data.current_password && data.new_password) {
        await changePassword({
          current_password: data.current_password,
          new_password: data.new_password,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Page Header */}
        {errorMsg && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
            {successMsg}
          </div>
        )}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Personal Information
          </h1>
          <p className="text-slate-600 mt-1">
            Manage your personal information and account settings
          </p>
        </div>

        {/* Profile Information Card */}
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
  );
};

export default Profile;
