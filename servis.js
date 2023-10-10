export default class ServicesRequest {
    static async getUsers() {
      try {
        const responce = await fetch("http://localhost:3001/users");
        const data = await responce.json();
        return data;
      } catch (err) {
        console.error(err);
      }
    }
    static async postUser(body) {
      try {
        await fetch("http://localhost:3001/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } catch (err) {
        console.error(err);
      }
    }
  }

