import styled from 'styled-components'
import { FaFacebookSquare, FaInstagram, FaTwitter, FaPinterest, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'
import { mobile } from '../responsive/responsive'


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${mobile({
        flexDirection: 'column',
    })}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`
const Logo = styled.h1`
    flex: 1;

    ${mobile({
        textAlign: 'center',
    })}
`
const Desc = styled.p`
    margin: 20px 0;

    ${mobile({
        textAlign: 'center',
    })}
`
const SocialContainer = styled.div`
    display: flex;

    ${mobile({
        justifyContent: 'center',
        padding: '0 50px',
    })}
`
const SocialIcon = styled.div`
    font-size: 1.15rem;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    cursor: pointer;
`
const Center = styled.div`
    flex: 1;
    padding: 20px;

    ${mobile({
        display: 'none',
    })}
`
const Title = styled.h3`
    margin-bottom: 30px;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 5px;
`
const Right = styled.div`
    flex: 1;
    padding: 20px;

    ${mobile({
        backgroundColor: '#fff8f8',
    })}
`
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`
const PaymentContainer = styled.div`
    display: flex;
    align-items: center;

    ${mobile({
        justifyContent: 'center',
    })}
`
const Payment = styled.img`
    width: 50%;
    margin-right: 5px;
`

const Footer = () => {

    return (
        <>
            <Container>
                <Left>
                    <Logo>Cocci E-Shop</Logo>
                    <Desc>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Luctus venenatis lectus magna
                        fringilla urna porttitor rhoncus dolor.
                    </Desc>
                    <SocialContainer>
                        <SocialIcon bg='1877f2' >
                            <FaFacebookSquare />
                        </SocialIcon>
                        <SocialIcon bg='c13584' >
                            <FaInstagram />
                        </SocialIcon>
                        <SocialIcon bg='1da1f2' >
                            <FaTwitter />
                        </SocialIcon>
                        <SocialIcon bg='e60023' >
                            <FaPinterest />
                        </SocialIcon>
                    </SocialContainer>
                </Left>
                <Center>
                    <Title>Useful Links</Title>
                    <List>
                        <ListItem>Home</ListItem>
                        <ListItem>Cart</ListItem>
                        <ListItem>Mens wear</ListItem>
                        <ListItem>Womens wear</ListItem>
                        <ListItem>Accessories</ListItem>
                        <ListItem>My Account</ListItem>
                        <ListItem>Order Tracking</ListItem>
                        <ListItem>Wishlist</ListItem>
                        <ListItem>Terms & Conditions</ListItem>
                    </List>
                </Center>
                <Right>
                    <Title>Contact</Title>
                    <ContactItem>
                        <FaMapMarkerAlt style={{ marginRight: '10px' }} />
                        Don Giovanni Verità Street, Voltri 16158 - Genova(IT)
                    </ContactItem>
                    <ContactItem>
                        <FaPhoneAlt style={{ marginRight: '10px' }} />
                        +39 010 123 456
                    </ContactItem>
                    <ContactItem>
                        <FaEnvelope style={{ marginRight: '10px' }} />
                        contact@coccigabry.dev
                    </ContactItem>
                    <PaymentContainer>
                        <Payment src='https://www.pngarts.com/files/10/Credit-Card-Trust-Badges-Free-PNG-Image.png' />
                        <Payment style={{ width: '20%' }} src='https://www.pngarts.com/files/12/Dogecoin-Accepted-Payment-PNG-Transparent-Image.png' />
                    </PaymentContainer>
                </Right>
            </Container>
        </>
    )
}

export default Footer