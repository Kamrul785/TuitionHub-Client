import React from "react";

const ProfileButton = ({ isEditing, setIsEditing, isLoading }) => {
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div>
      {isEditing ? (
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Saving...
              </>
            ) : (
              "Save"
            )}
          </button>
          <button
            onClick={toggleEdit}
            className="btn btn-error"
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button onClick={toggleEdit} className="btn btn-primary mt-6">
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfileButton;
