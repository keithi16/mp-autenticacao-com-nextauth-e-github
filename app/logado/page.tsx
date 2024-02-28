import Image from "next/image"
import detailImg2 from '@/app/assets/detail2.png'
import { FaArrowCircleRight } from "react-icons/fa"
import LogoutButton from "../components/logout-button"
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

 
export default async function LogadoPage() {
    const session = await getServerSession(authOptions);

    console.log(session)
    if(!session) {
        return redirect('/')
    }

    const user = session.user

    const repoCount = 
    session.user.githubProfile.public_repos + 
    (session.user.githubProfile.total_private_repos ?? 0);
    const repoUrl = session.user.githubProfile.repos_url;

    const gistCount = 
    session.user.githubProfile.public_gists + 
    (session.user.githubProfile.total_private_gists ?? 0);
    const gistsUrl = `https://api.github.com/users/${session.user.githubProfile.login}/gists`;

    const followerCounter = session.user.githubProfile.followers;
    const followersUrl = session.user.githubProfile.followers_url;


    return (
        <main className="md:px-28 py-10 px-8 relative min-h-screen container mx-auto">
            <Image 
                src={detailImg2} 
                alt="Imagem detalhe de fundo"
                className="absolute invisible xl:visible right-20 bottom-40" 
            />
            
            <header className="text-center py-12 md:pb-24">
                <Image 
                    src={user?.image ?? ''} 
                    alt="Imagem Avatar"
                    width={100} 
                    height={100} 
                    className="rounded-full mx-auto"
                />

                <h1 className="md:text-6xl text-4xl mt-6">
                    Boas vindas, <span className="font-bold">{user?.name}</span>
                </h1>

                <h3 className="md:text-3xl text-lg font-extralight mt-6">Que tal analisarmos seu Github?</h3>
            </header>

            <section className="max-w-xl mb-12">
                <hr />
                <ItemButton URL={repoUrl}>Menus Repositórios ({repoCount})</ItemButton>
                <ItemButton URL={gistsUrl}>Meus Gists ({gistCount})</ItemButton>
                <ItemButton URL={followersUrl}>Meus Seguidores ({followerCounter})</ItemButton>
            </section>

            <LogoutButton />
        </main>
    )
}
        
function ItemButton({children, URL}: {children: React.ReactNode, URL: string}) {
    return (
        <>
            <Link href={URL} className="flex items-center justify-between text-lg md:text-xl py-8 w-full">
                {children}
                <FaArrowCircleRight className="-rotate-45 text-violet-500" />
            </Link>
            <hr />
        </>
    )
}