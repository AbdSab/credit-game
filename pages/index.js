import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image';
import { useEffect } from 'react';


export default function Home() {
  useEffect(() => {
    sessionStorage.removeItem('borrower_id');
    sessionStorage.removeItem('loaner_id');
  }, [])
  
  return (
    <main style={{textAlign:'center'}}>
      <Head>
          <title>Credit game</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/light.css" />
      </Head>
      <h3>{`Instruction`}</h3>
      <p>
        {`Actuellement vous participez à une expérience économique. L’expérience est présentée sous une forme électronique. L’expérience se répète 5 fois consécutivement.`}
      </p>
      <h3>{`Démarche`}</h3>
      <p>
        {`Vous allez obtenir un statut de joueur soit « 1 » ou « 2 » ceci grâce au tirage au sort. Si vous obtenu le statut joueur 1, vous commencez en premier l’expérience. Soyez attentif en manipulant le jeu. Vers la fin du jeu, vous êtes invités à prêter le joueur 2 une somme financière pour qu’il puisse aussi joueur son rôle. Vous avez la liberté d’accepter ou refuser ce prêt. Si vous obtenu le statut joueur 2, vous allez attendre que le joueur 1 vous attribue un support financier sous forme de crédit.  Vous avez la liberté de rembourser ou pas le crédit. En cas de remboursement, est évidant de céder un montant doublé. `}
      </p>
      <h3>{`Avant l’expérience`}</h3>
      <p style={{marginBottom: '40px'}}>
        {`Si vous avez une question n’hésitez pas à l’adresser à l’expérimentateur avant le début de l’expérience`}
      </p>
      <Link href="/select"><a style={{color:'black', padding:'10px', backgroundColor: '#C0D9D9'}}>{`Passer à l’expérience`}</a></Link>
      <div style={{display: 'flex', justifyContent:'space-between', marginTop: '48px'}}>
        <Image src="/fsjes.png" width={160} height={64} alt="asd"/>
        <Image src="/labo.png" width={160} height={64} alt="asd"/>
      </div>
    </main>
  )
}
