import Image from "next/image";
import detailImg1 from '@/app/assets/detail1.svg'
import LoginButton from "./components/login-button";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions)

  if(session) {
    return redirect('/logado')
  }

  return (
    <main className="text-center md:pt-40 pt-12 px-4 max-w-5xl font-light relative min-h-screen container mx-auto">
        <Image src={detailImg1} alt="Imagem detalhe de fundo"
        className="absolute -left-20 -z-10 bottom-0 md:visible invisible"></Image>
       
       <header>
          <h1 className="md:text-7xl sm:text-6xl text-4xl bg-neutral-50">
            Desbloqueie o poder da <span className="font-medium">Análise do Github</span>
          </h1>

          <p className="font-extralight text-neutral-600 md:text-xl mt-6 md:mt-10">Eleve o desenvolvimento de software com análises automáticas do GitHub, revelando métricas e KPIs inestimáveis para aprimorar a entrega e a qualidade do software.
          </p>
       </header>

        <LoginButton />
    </main>
  );
}
