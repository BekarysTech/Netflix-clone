import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
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
            return {
                id: '1',
                email: credentials.email,
                name: 'User'
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
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }

