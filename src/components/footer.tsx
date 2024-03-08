interface SocialInfo {
    link: string,
    logo: string,
    altLogo: string
}

const socialMedias: SocialInfo[] = [{
    link: 'https://www.instagram.com/cleiton.42/',
    logo:  'assets/images/intagram.png',
    altLogo: 'icone do Instagram'
},
{
    link: 'https://github.com/Boomber42',
    logo:  'assets/images/github.png',
    altLogo: 'icone do Github'
},
{
    link: 'https://www.facebook.com/Cleiton.S.Mares',
    logo:  'assets/images/Facebook.png',
    altLogo: 'icone do Facebook'
},
]

export default function Footer() {
    return(
        <footer className="rodape">
            <h4>&copy; S.H.I.E.L.D.</h4>
            <ul className="icones">
                {socialMedias.map((element: SocialInfo) => {
                    return(
                        <li>
                            <a href= {element.link} target='blank'>
                                <img src= {element.logo} alt= {element.altLogo}/>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </footer>
    )
}