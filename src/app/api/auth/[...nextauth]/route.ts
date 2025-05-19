import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // This is where you would typically validate against your backend
        // For now, we'll use the mock users from your existing auth provider
        const mockUsers = [
          {
            id: "1",
            name: "Admin User",
            email: "admin@user.com",
            roles: ["admin"],
            avatar: "https://i.pravatar.cc/150?img=1",
          },
          {
            id: "2",
            name: "School Admin",
            email: "school@user.com",
            roles: ["school"],
            avatar: "https://i.pravatar.cc/150?img=2",
          },
          {
            id: "3",
            name: "Doctor User",
            email: "doctor@user.com",
            roles: ["doctor"],
            avatar: "https://i.pravatar.cc/150?img=3",
          },
          {
            id: "4",
            name: "Student User",
            email: "student@user.com",
            roles: ["student"],
            avatar: "https://i.pravatar.cc/150?img=4",
          },
        ];

        const user = mockUsers.find((u) => u.email === credentials?.email);

        if (user) {
          // In a real app, you would verify the password here
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            roles: user.roles,
            image: user.avatar,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.roles = user.roles;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).roles = token.roles;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
