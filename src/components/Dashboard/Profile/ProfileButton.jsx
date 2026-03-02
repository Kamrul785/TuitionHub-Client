import { FiEdit2, FiSave, FiX } from "react-icons/fi";

const ProfileButton = ({ isEditing, setIsEditing, isLoading }) => {
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };
  return (
    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3">
      {isEditing ? (
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none gap-2"
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>{" "}
                Saving...
              </>
            ) : (
              <>
                <FiSave className="w-4 h-4" /> Save Changes
              </>
            )}
          </button>
          <button
            type="button"
            onClick={toggleEdit}
            disabled={isLoading}
            className="btn btn-ghost gap-2 text-slate-600"
          >
            <FiX className="w-4 h-4" /> Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={toggleEdit}
          className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none gap-2"
        >
          <FiEdit2 className="w-4 h-4" /> Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfileButton;
