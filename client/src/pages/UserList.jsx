import AddUser from "../components/AddUser";
import UserDetails from "../components/UserDetails";
import { useUserContext } from "../context/userContext";
import useFetch from "../hooks/useFetch";

const UserList = () => {
  const { role, token } = useUserContext();
  const { data, error, isLoading, getData } = useFetch(
    `${process.env.REACT_APP_URL}/admins`
  );
  const handleDeleteUser = async (user) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/admin/${user._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      getData();
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleAddNewUser = async (user) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/add/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log(data);
      getData();
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleEdit = async (user, editedRole) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/admin/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ ...user, role: editedRole }),
        }
      );
      const data = await response.json();
      console.log(data);
      getData();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      {!isLoading ? (
        <>
          <div
            style={{
              display: "flex",
              gap: "20px",
              margin: "20px",
              flexWrap: "wrap",
            }}
          >
            {error && <p>{error}</p>}
            {data.map((user, index) => (
              <UserDetails
                key={index}
                user={user}
                onDelete={handleDeleteUser}
                onEdit={handleEdit}
              />
            ))}
          </div>
          {role === 1 && <strong> Total Admins : {data.length}</strong>}
          {role === 1 && (
            <>
              <h1>Add a new Admin</h1>
              <AddUser onAddUser={handleAddNewUser} />
            </>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default UserList;
