import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
           id: 'credentials',
           name: 'Credentials',
           credentials: {
            email: {
                label: 'Email',
                type: 'text'
            },
            password: {
                label: 'Password',
                type: 'password'
            }
           },
           async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
                return null;
            }

            // TODO: Add database check here
            // const user = await prisma.user.findUnique({
            //     where: {
            //         email: credentials.email
            //     }
            // })

            // if (!user || !user?.hashedPassword) {
            //     return null;
            // }

            // const isCorrectPassword = await bcrypt.compare(
            //     credentials.password, 
            //     user.hashedPassword
            // )

            // if (!isCorrectPassword) {
            //     return null;
            // }

            // return user;
            
            // Temporary: Accept any email/password for testing
            // Email-ден username алу (уақытша, кейін база деректерінен алу керек)
            const emailName = credentials.email.split('@')[0];
            return {
                id: '1',
                email: credentials.email,
                name: emailName.charAt(0).toUpperCase() + emailName.slice(1)
            };
        },
        })
    ],
    pages: {
        signIn: '/auth',
        error: '/auth',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

