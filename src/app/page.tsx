"use client"
import Logo from "../../public/favicon.svg";
import Instagram from "../../public/assets/icons/Instagram.svg";
import Circulo from "../../public/assets/icons/Circulo.svg";
import Image from "next/image";
import "./globals.css"
import "./home.css";
import Background from "./components/Background/Background"
import Text from "./components/Text/Text";
import "../app/components/Input/Input";
import Button from "./components/Button/Button";
import Link from "next/link";

function Home() {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Adicione a lógica para o que deve acontecer ao enviar o formulário, se necessário
    console.log("Formulário enviado, mas ação de envio foi prevenido.");
  };

  return (
    <>
      <Background className="background banner center">
        <div className="areaHeader">
          <div className="textAreaHeader">
            <Text className="title colorWhite">
              deixe suas indicações e<br />reclamações registradas aqui!
            </Text>
            <Text className="text colorGreenLight">
              procure conhecer o que as pessoas dizem sobre vários produtos
            </Text>
          </div>

          <div className="buttonAreaHeader">
            <div className="colButtonAreaHeader1">
              <Link href="/produto" passHref>
                <Button className="buttonReviews">avaliações</Button>
              </Link>
            </div>
            <div className="colButtonAreaHeader2">
              <Button className="buttonRegisterProducts">cadastrar produtos</Button>
            </div>
          </div>
        </div>
      </Background>

      <Background className="background backgroundWhite center">
        <div className="areaMain">
          <div className="areaDescriptionMain">
            <Text className="title colorGreenDark">procure produtos</Text>
            <Text className="text colorGreenLight">procure dentro das categorias o produto que deseja saber mais sobre</Text>
          </div>
        </div>
      </Background>

      <Background className="background backgroundWhiteFooter center">
        <div className="areaFooter">
          <div className="rowGeral">
            <div className="colDescriptionFooterAlignment1">
              <Text className="title colorGreenDark">quem somos</Text>

              <div className="logoAreaFooter">
                <Image src={Logo} alt="logo" className="styleImgLogo" />
                <Text className="colorGreenLight logoTextFooter">onlipinion</Text>
              </div>

              <Text className="textFooter colorGreenLight">
                <strong>Bem-vindo ao Onlipinion!</strong>
                <p>A Onlipinion surgiu de um projeto inovador do nosso curso técnico em TI. Durante o desenvolvimento, percebemos o imenso potencial do nosso site para se transformar em uma plataforma significativa e funcional.</p>
                <br />
                <strong>Nossa Missão:</strong>
                <p>A nossa missão é conectar pessoas e oferecer uma plataforma onde opiniões e experiências podem ser compartilhadas e discutidas. Buscamos alcançar o maior número possível de usuários, oferecendo informações que ajudem na formação de respostas e na solução de dúvidas que podem ser um obstáculo no dia a dia.</p>
                <br />
                <strong>O que Oferecemos:</strong>
                <p>Na Onlipinion, nosso objetivo é proporcionar o melhor possível com os recursos disponíveis. Estamos comprometidos em melhorar continuamente, mesmo que, por ora, nossas condições sejam limitadas. Cada feedback, cada sugestão e cada interação é uma oportunidade para aprimorar e evoluir.</p>
                <br />
                <strong>Nosso Compromisso:</strong>
                <p>Estamos dedicados a oferecer uma experiência enriquecedora e útil para todos os nossos usuários. Embora estejamos em constante crescimento e aprendizado, nossa paixão por fornecer um serviço valioso é o que nos motiva a buscar sempre o melhor.</p>
                <br />
                <p>Junte-se a nós e faça parte dessa jornada para transformar a forma como as opiniões e dúvidas são abordadas e resolvidas. A Onlipinion está aqui para ajudar, ouvir e crescer junto com você!</p>
              </Text>
            </div>

            <form className="colDescriptionFooterAlignment2" onSubmit={handleSubmit}>
              <Text className="titleContateNos colorGreenDark areaContateNos">contate-nos</Text>
              <div className="colBar">
                <input type="text" name="nome" className="fillBar marginFillBar" placeholder="Nome" />
                <input type="text" name="email" className="fillBar marginFillBar" placeholder="Email" />
                <input type="text" name="categoria" className="fillBar marginFillBar" placeholder="Categoria" />
                <textarea className="fillBarResposta marginFillBar" rows={3} maxLength={565} placeholder="Resposta"></textarea>
                <Button className="buttonSend">Enviar</Button>
              </div>
            </form>
          </div>

          <div className="positionCopyrightAreaFooterGeral">
            <div className="colDescriptionFooter1">
              <div className="positionCopyrightAreaFooterDescription">
                <div className="positionCopyrightAreaFooterAlignment">
                  <Button className="buttonScrollToTop"><Image src={Logo} alt="Logo" className="styleImgLogo" /></Button>
                  <div className="textLogoAreaFooter">
                    <Text className="colorGreenDark titleCopyright">© 2024 onlipinion</Text>
                    <Text className="colorGreenLight textCopyright">todos direitos reservados</Text>
                  </div>
                </div>

                <div className="instagramAreaFooter">
                  <Button className="buttonInstagramScrollToTop"><Image src={Instagram} alt="Instagram" className="styleImgInstagram" /></Button>
                  <Button className="buttonInstagramScrollToTop"><Text className="colorGreenDark titleRedesSociais">instagram</Text></Button>
                </div>
              </div>
            </div>

            <div className="colDescriptionFooter2">
                <Button className="buttonLogoScrollToTop"><Image src={Circulo} alt="Circulo" className="circulo" /></Button>
                <Button className="buttonLogoScrollToTop"><Image src={Logo} alt="Logo" className="styleImgLogo" /></Button>
            </div>
          </div>
        </div>
      </Background >
    </>
  );
};

export default Home;