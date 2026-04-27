jsx
const onSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);
  setError("");
  try {
    const userData = localStorage.getItem("held_user");
    const user = userData ? JSON.parse(userData) : null;
    const userId = user?.id;

    if (!userId) {
      navigate("/login");
      return;
    }

    await api.post(`/api/journal-entries/user/${userId}`, form);
    sessionStorage.removeItem("selected_mood");
    navigate("/journal");
  } catch (err) {
    setError("Could not save entry. Please try again.");
  } finally {
    setSaving(false);
  }
};
