import { useEffect } from "react";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePromote } from "../../hooks/usePromote";
import styles from "./Home.module.scss";

const Home = () => {
  const { users, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const { promoteUser, demoteUser, error, setError } = usePromote();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/user/all", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_USERS", payload: json });
      }

      if (!response.ok) {
        setError(json.error);
      }
    };

    fetchUsers();
  }, [user.token, dispatch, setError]);

  return (
    <>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.home}>
        {users && (
          <div className={styles.users}>
            {users.map((user) => {
              return (
                <div key={user._id} className={styles.user}>
                  <div className={styles.user__email}>Email: {user.email}</div>
                  <div className={styles.user__role}>
                    Roles:{" "}
                    {Object.keys(user.roles)
                      .map((role) => {
                        return role;
                      })
                      .join(", ")}
                  </div>
                  <div className={styles.user__promote}>
                    <button
                      className={styles.user__promote__button}
                      onClick={async () => await promoteUser(user.email)}
                    >
                      Promote
                    </button>
                    <button
                      className={styles.user__promote__button}
                      onClick={async () => await demoteUser(user.email)}
                    >
                      Demote
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
