import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession();

  if (session) {
    console.log("Session:", session);
    console.log("User:", session.user);
    console.log("ID Token:", (session as any).idToken); // send this to backend
  }
  return (
    <div>
      {session?.user ? (
        <>
          <h1>Welcome, {session.user.name}</h1>
          <p>{session.user.email}</p>
        </>
      ) : (
        <h1>You are not logged in</h1>
      )}
    </div>
  );
}
